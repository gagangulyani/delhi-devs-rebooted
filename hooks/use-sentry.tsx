/**
 * Sentry React Hooks
 * 
 * Custom React hooks for integrating Sentry monitoring into components
 */

"use client";

import { useCallback, useEffect, useRef } from "react";
import * as Sentry from "@sentry/nextjs";
import { 
  addBreadcrumb, 
  trackUIInteraction,
  log,
  withErrorCapture 
} from "@/lib/sentry-utils";

/**
 * Hook for tracking component lifecycle and errors
 * 
 * @example
 * function MyComponent() {
 *   useSentryComponent("MyComponent");
 *   return <div>...</div>;
 * }
 */
export function useSentryComponent(componentName: string) {
  useEffect(() => {
    addBreadcrumb(`Component mounted: ${componentName}`, {
      component: componentName,
      type: "lifecycle",
    });

    return () => {
      addBreadcrumb(`Component unmounted: ${componentName}`, {
        component: componentName,
        type: "lifecycle",
      });
    };
  }, [componentName]);
}

/**
 * Hook for tracking button clicks with Sentry
 * 
 * @example
 * function CreateEventButton() {
 *   const handleClick = useSentryClick(
 *     "Create Event Button",
 *     () => {
 *       // Your click logic
 *       router.push("/events/create");
 *     },
 *     { page: "events" }
 *   );
 * 
 *   return <button onClick={handleClick}>Create Event</button>;
 * }
 */
export function useSentryClick<T extends any[]>(
  actionName: string,
  onClick: (...args: T) => void | Promise<void>,
  attributes?: Record<string, any>
) {
  return useCallback(
    (...args: T) => {
      trackUIInteraction(actionName, {
        ...attributes,
        timestamp: Date.now(),
      });

      log.debug(`UI Click: ${actionName}`, attributes);

      return onClick(...args);
    },
    [actionName, onClick, attributes]
  );
}

/**
 * Hook for tracking form submissions with Sentry
 * 
 * @example
 * function EventForm() {
 *   const { handleSubmit, isSubmitting, error } = useSentryForm(
 *     "Create Event Form",
 *     async (data) => {
 *       return await createEvent(data);
 *     }
 *   );
 * 
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {error && <div>Error: {error.message}</div>}
 *       <button disabled={isSubmitting}>Submit</button>
 *     </form>
 *   );
 * }
 */
export function useSentryForm<T, R>(
  formName: string,
  onSubmit: (data: T) => Promise<R>
) {
  const isSubmitting = useRef(false);
  const error = useRef<Error | null>(null);

  const handleSubmit = useCallback(
    async (data: T) => {
      return Sentry.startSpan(
        {
          op: "form.submit",
          name: `${formName} Submission`,
        },
        async (span) => {
          isSubmitting.current = true;
          error.current = null;

          span.setAttribute("form.name", formName);
          span.setAttribute("form.field_count", Object.keys(data as object).length);

          log.info(`Form submission started: ${formName}`);

          try {
            const result = await onSubmit(data);

            span.setAttribute("success", true);
            log.info(`Form submission successful: ${formName}`);

            addBreadcrumb(`Form submitted: ${formName}`, {
              form: formName,
              success: true,
            });

            return result;
          } catch (err) {
            const errorObj = err instanceof Error ? err : new Error(String(err));
            error.current = errorObj;

            span.setAttribute("error", true);
            span.setAttribute("error.message", errorObj.message);

            log.error(`Form submission failed: ${formName}`, {
              error: errorObj.message,
            });

            Sentry.captureException(errorObj, {
              tags: {
                form: formName,
                operation: "form_submit",
              },
            });

            addBreadcrumb(`Form submission failed: ${formName}`, {
              form: formName,
              error: errorObj.message,
            }, "error");

            throw errorObj;
          } finally {
            isSubmitting.current = false;
          }
        }
      );
    },
    [formName, onSubmit]
  );

  return {
    handleSubmit,
    isSubmitting: isSubmitting.current,
    error: error.current,
  };
}

/**
 * Hook for tracking API calls with Sentry
 * 
 * @example
 * function EventsList() {
 *   const { data, loading, error, refetch } = useSentryAPI(
 *     "Fetch Events",
 *     async () => {
 *       const response = await fetch("/api/events");
 *       return response.json();
 *     },
 *     { autoFetch: true }
 *   );
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   return <div>{data.map(...)}</div>;
 * }
 */
export function useSentryAPI<T>(
  operationName: string,
  fetchFn: () => Promise<T>,
  options: {
    autoFetch?: boolean;
    attributes?: Record<string, any>;
  } = {}
) {
  const { autoFetch = false, attributes = {} } = options;
  
  const data = useRef<T | null>(null);
  const loading = useRef(false);
  const error = useRef<Error | null>(null);

  const fetch = useCallback(async () => {
    return Sentry.startSpan(
      {
        op: "http.client",
        name: operationName,
      },
      async (span) => {
        loading.current = true;
        error.current = null;

        // Add attributes
        Object.entries(attributes).forEach(([key, value]) => {
          span.setAttribute(key, value);
        });

        log.debug(`API call started: ${operationName}`);

        try {
          const result = await fetchFn();
          data.current = result;

          span.setAttribute("success", true);
          log.debug(`API call successful: ${operationName}`);

          return result;
        } catch (err) {
          const errorObj = err instanceof Error ? err : new Error(String(err));
          error.current = errorObj;

          span.setAttribute("error", true);
          span.setAttribute("error.message", errorObj.message);

          log.error(`API call failed: ${operationName}`, {
            error: errorObj.message,
          });

          Sentry.captureException(errorObj, {
            tags: {
              operation: operationName,
              type: "api_call",
            },
          });

          throw errorObj;
        } finally {
          loading.current = false;
        }
      }
    );
  }, [operationName, fetchFn, attributes]);

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [autoFetch, fetch]);

  return {
    data: data.current,
    loading: loading.current,
    error: error.current,
    refetch: fetch,
  };
}

/**
 * Hook for tracking user actions with breadcrumbs
 * 
 * @example
 * function EventDetails({ eventId }) {
 *   const trackAction = useSentryBreadcrumbs("EventDetails");
 * 
 *   const handleViewDetails = () => {
 *     trackAction("Viewed event details", { eventId });
 *     // Your logic
 *   };
 * 
 *   return <button onClick={handleViewDetails}>View Details</button>;
 * }
 */
export function useSentryBreadcrumbs(context: string) {
  return useCallback(
    (action: string, data?: Record<string, any>) => {
      addBreadcrumb(`[${context}] ${action}`, {
        context,
        action,
        ...data,
      });

      log.debug(`User action: ${action}`, { context, ...data });
    },
    [context]
  );
}

/**
 * Hook for tracking performance of expensive operations
 * 
 * @example
 * function DataProcessor() {
 *   const measurePerformance = useSentryPerformance("DataProcessor");
 * 
 *   const processData = async (data) => {
 *     return measurePerformance(
 *       "Process Data",
 *       async () => {
 *         // Expensive operation
 *         return await heavyProcessing(data);
 *       },
 *       { dataSize: data.length }
 *     );
 *   };
 * }
 */
export function useSentryPerformance(component: string) {
  return useCallback(
    async <T,>(
      operationName: string,
      operation: () => Promise<T>,
      attributes?: Record<string, any>
    ): Promise<T> => {
      return Sentry.startSpan(
        {
          op: "performance.measure",
          name: `${component}: ${operationName}`,
        },
        async (span) => {
          const startTime = performance.now();

          Object.entries(attributes || {}).forEach(([key, value]) => {
            span.setAttribute(key, value);
          });

          try {
            const result = await operation();
            const duration = performance.now() - startTime;

            span.setAttribute("duration_ms", duration);
            span.setAttribute("success", true);

            log.debug(
              `Performance: ${component} - ${operationName}`,
              {
                duration: `${duration.toFixed(2)}ms`,
                ...attributes,
              }
            );

            return result;
          } catch (error) {
            const duration = performance.now() - startTime;

            span.setAttribute("duration_ms", duration);
            span.setAttribute("error", true);

            throw error;
          }
        }
      );
    },
    [component]
  );
}

/**
 * Hook for wrapping async operations with error handling
 * 
 * @example
 * function UserProfile() {
 *   const withErrorHandling = useSentryErrorHandler("UserProfile");
 * 
 *   const loadProfile = withErrorHandling(
 *     async (userId) => {
 *       return await fetchUserProfile(userId);
 *     },
 *     { operation: "load_profile" }
 *   );
 * }
 */
export function useSentryErrorHandler(context: string) {
  return useCallback(
    <T extends any[], R>(
      fn: (...args: T) => Promise<R>,
      options?: {
        operation?: string;
        tags?: Record<string, string>;
      }
    ) => {
      return async (...args: T): Promise<R> => {
        return withErrorCapture(
          () => fn(...args),
          {
            operation: options?.operation || context,
            tags: {
              context,
              ...options?.tags,
            },
          }
        );
      };
    },
    [context]
  );
}

/**
 * Hook that tracks component mounting and sets up error boundary
 * 
 * @example
 * function CriticalComponent() {
 *   useSentryMonitoring("CriticalComponent", {
 *     trackMount: true,
 *     tags: { critical: "true" }
 *   });
 * }
 */
export function useSentryMonitoring(
  componentName: string,
  options: {
    trackMount?: boolean;
    tags?: Record<string, string>;
    attributes?: Record<string, any>;
  } = {}
) {
  const { trackMount = true, tags = {}, attributes = {} } = options;

  useEffect(() => {
    if (!trackMount) return;

    // Set component context
    Sentry.setContext("component", {
      name: componentName,
      ...attributes,
    });

    // Set tags
    if (Object.keys(tags).length > 0) {
      Sentry.setTags(tags);
    }

    log.debug(`Component monitoring started: ${componentName}`, {
      tags,
      attributes,
    });

    addBreadcrumb(`Component monitored: ${componentName}`, {
      component: componentName,
      ...attributes,
    });

    return () => {
      log.debug(`Component monitoring ended: ${componentName}`);
    };
  }, [componentName, trackMount, tags, attributes]);
}
