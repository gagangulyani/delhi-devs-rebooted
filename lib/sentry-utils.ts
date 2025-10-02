/**
 * Sentry Utility Functions
 * 
 * Reusable helper functions for common Sentry operations.
 * Import these utilities throughout your application for consistent monitoring.
 */

import * as Sentry from "@sentry/nextjs";

const { logger } = Sentry;

// ============================================================================
// Error Handling Utilities
// ============================================================================

/**
 * Wrapper for try-catch with automatic Sentry error capture
 * 
 * @example
 * const result = await withErrorCapture(
 *   async () => await fetchUserData(userId),
 *   { operation: "fetch_user", userId }
 * );
 */
export async function withErrorCapture<T>(
  fn: () => Promise<T>,
  context?: {
    operation?: string;
    tags?: Record<string, string>;
    level?: Sentry.SeverityLevel;
  }
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    logger.error(
      logger.fmt`Error in ${context?.operation || "operation"}`,
      {
        error: error instanceof Error ? error.message : String(error),
        ...context,
      }
    );

    Sentry.captureException(error, {
      level: context?.level || "error",
      tags: context?.tags,
    });

    throw error;
  }
}

/**
 * Wrapper for synchronous functions with error capture
 */
export function withErrorCaptureSync<T>(
  fn: () => T,
  context?: {
    operation?: string;
    tags?: Record<string, string>;
    level?: Sentry.SeverityLevel;
  }
): T {
  try {
    return fn();
  } catch (error) {
    logger.error(
      logger.fmt`Error in ${context?.operation || "operation"}`,
      {
        error: error instanceof Error ? error.message : String(error),
        ...context,
      }
    );

    Sentry.captureException(error, {
      level: context?.level || "error",
      tags: context?.tags,
    });

    throw error;
  }
}

// ============================================================================
// Tracing Utilities
// ============================================================================

/**
 * Wrapper for tracking async operations with automatic span creation
 * 
 * @example
 * const events = await withTracing(
 *   "db.query",
 *   "Fetch Events",
 *   async (span) => {
 *     span.setAttribute("table", "events");
 *     return await fetchEvents();
 *   }
 * );
 */
export async function withTracing<T>(
  op: string,
  name: string,
  fn: (span: any) => Promise<T>,
  attributes?: Record<string, any>
): Promise<T> {
  return Sentry.startSpan(
    { op, name },
    async (span) => {
      // Add any initial attributes
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          span.setAttribute(key, value);
        });
      }

      try {
        const result = await fn(span);
        span.setAttribute("success", true);
        return result;
      } catch (error) {
        span.setAttribute("error", true);
        span.setAttribute(
          "error.message",
          error instanceof Error ? error.message : String(error)
        );
        throw error;
      }
    }
  );
}

/**
 * Track a UI interaction (button click, form submission, etc.)
 */
export function trackUIInteraction(
  name: string,
  attributes?: Record<string, any>
): void {
  Sentry.startSpan(
    {
      op: "ui.interaction",
      name,
    },
    (span) => {
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          span.setAttribute(key, value);
        });
      }

      logger.debug(logger.fmt`UI Interaction: ${name}`, attributes);
    }
  );
}

/**
 * Track an API call with automatic timing and status code capture
 */
export async function trackAPICall<T>(
  method: string,
  endpoint: string,
  fn: () => Promise<Response>
): Promise<T> {
  return withTracing(
    "http.client",
    `${method} ${endpoint}`,
    async (span) => {
      span.setAttribute("http.method", method);
      span.setAttribute("http.url", endpoint);

      const response = await fn();

      span.setAttribute("http.status_code", response.status);
      span.setAttribute("http.status_text", response.statusText);

      if (!response.ok) {
        span.setAttribute("error", true);
        const errorText = await response.text();
        logger.error(`API call failed: ${method} ${endpoint}`, {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      logger.debug(logger.fmt`API call successful: ${method} ${endpoint}`, {
        status: response.status,
      });

      return response.json();
    }
  );
}

/**
 * Track a database query with automatic error handling
 */
export async function trackDBQuery<T>(
  operation: string,
  table: string,
  fn: () => Promise<{ data: T | null; error: any }>
): Promise<T> {
  return withTracing(
    "db.query",
    `${operation} ${table}`,
    async (span) => {
      span.setAttribute("db.system", "supabase");
      span.setAttribute("db.operation", operation);
      span.setAttribute("db.table", table);

      logger.debug(logger.fmt`DB Query: ${operation} ${table}`);

      const { data, error } = await fn();

      if (error) {
        span.setAttribute("error", true);
        span.setAttribute("error.message", error.message);
        
        logger.error(`Database query failed: ${operation} ${table}`, {
          error: error.message,
          code: error.code,
        });

        Sentry.captureException(new Error(error.message), {
          tags: {
            db_operation: operation,
            db_table: table,
          },
        });

        throw error;
      }

      if (Array.isArray(data)) {
        span.setAttribute("result.count", data.length);
        logger.debug(logger.fmt`DB Query returned ${data.length} rows`);
      }

      return data as T;
    }
  );
}

// ============================================================================
// User Context Utilities
// ============================================================================

/**
 * Set user context for error tracking
 */
export function setUserContext(user: {
  id: string;
  email?: string;
  username?: string;
  [key: string]: any;
}): void {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  });

  // Add any additional user properties as tags
  const { id, email, username, ...rest } = user;
  Object.entries(rest).forEach(([key, value]) => {
    if (typeof value === "string" || typeof value === "number") {
      Sentry.setTag(`user_${key}`, String(value));
    }
  });

  logger.info(logger.fmt`User context set: ${username || id}`, {
    userId: id,
  });
}

/**
 * Clear user context (e.g., on logout)
 */
export function clearUserContext(): void {
  Sentry.setUser(null);
  logger.info("User context cleared");
}

// ============================================================================
// Breadcrumb Utilities
// ============================================================================

/**
 * Add a breadcrumb for tracking user actions
 */
export function addBreadcrumb(
  message: string,
  data?: Record<string, any>,
  level: Sentry.SeverityLevel = "info"
): void {
  Sentry.addBreadcrumb({
    message,
    level,
    data,
    timestamp: Date.now() / 1000,
  });
}

/**
 * Add a navigation breadcrumb
 */
export function addNavigationBreadcrumb(from: string, to: string): void {
  addBreadcrumb(`Navigation: ${from} → ${to}`, {
    from,
    to,
    type: "navigation",
  });
}

/**
 * Add a user action breadcrumb
 */
export function addUserActionBreadcrumb(
  action: string,
  details?: Record<string, any>
): void {
  addBreadcrumb(`User action: ${action}`, {
    action,
    ...details,
    type: "user_action",
  });
}

// ============================================================================
// Logging Utilities
// ============================================================================

/**
 * Structured logging helpers with consistent formatting
 */
export const log = {
  trace: (message: string, data?: Record<string, any>) => {
    logger.trace(message, data);
  },

  debug: (message: string, data?: Record<string, any>) => {
    logger.debug(message, data);
  },

  info: (message: string, data?: Record<string, any>) => {
    logger.info(message, data);
  },

  warn: (message: string, data?: Record<string, any>) => {
    logger.warn(message, data);
  },

  error: (message: string, data?: Record<string, any>) => {
    logger.error(message, data);
  },

  fatal: (message: string, data?: Record<string, any>) => {
    logger.fatal(message, data);
  },
};

// ============================================================================
// Context Utilities
// ============================================================================

/**
 * Set custom context for error reporting
 */
export function setContext(
  name: string,
  context: Record<string, any>
): void {
  Sentry.setContext(name, context);
}

/**
 * Set a tag for filtering errors
 */
export function setTag(key: string, value: string): void {
  Sentry.setTag(key, value);
}

/**
 * Set multiple tags at once
 */
export function setTags(tags: Record<string, string>): void {
  Sentry.setTags(tags);
}

// ============================================================================
// Performance Monitoring Utilities
// ============================================================================

/**
 * Measure the execution time of a function
 */
export async function measurePerformance<T>(
  operationName: string,
  fn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - startTime;

    logger.debug(logger.fmt`${operationName} completed`, {
      duration: `${duration.toFixed(2)}ms`,
      success: true,
    });

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;

    logger.error(logger.fmt`${operationName} failed`, {
      duration: `${duration.toFixed(2)}ms`,
      error: error instanceof Error ? error.message : String(error),
    });

    throw error;
  }
}

/**
 * Create a custom metric
 */
export function recordMetric(
  name: string,
  value: number,
  unit?: string
): void {
  logger.info(logger.fmt`Metric: ${name}`, {
    metric: name,
    value,
    unit: unit || "count",
  });

  // You can also add custom metric tracking here if using Sentry metrics
}

// ============================================================================
// Error Classification Utilities
// ============================================================================

/**
 * Check if an error should be reported to Sentry
 */
export function shouldReportError(error: Error): boolean {
  // Don't report certain types of errors
  const ignoredErrors = [
    "AbortError",
    "CanceledError",
    "NetworkError", // User's network issues
  ];

  return !ignoredErrors.includes(error.name);
}

/**
 * Get error severity level based on error type
 */
export function getErrorSeverity(error: Error): Sentry.SeverityLevel {
  if (error.name === "ValidationError") return "warning";
  if (error.name === "AuthenticationError") return "error";
  if (error.name === "DatabaseError") return "fatal";
  return "error";
}

// ============================================================================
// Type Definitions
// ============================================================================

export type SentryOperation =
  | "ui.click"
  | "ui.interaction"
  | "form.submit"
  | "http.client"
  | "http.server"
  | "db.query"
  | "navigation"
  | "validation"
  | "authentication"
  | "authorization";

export type SentrySpanAttributes = {
  [key: string]: string | number | boolean | undefined;
};
