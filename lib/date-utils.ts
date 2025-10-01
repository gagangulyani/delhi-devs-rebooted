/**
 * Modern date formatting utilities using native JavaScript
 * No external dependencies, better performance, and full browser support
 */

export const dateUtils = {
  /**
   * Format a date string for display
   * @param dateString - ISO date string
   * @returns Formatted date string like "Oct 1, 2025 at 2:30 PM"
   */
  formatEventDate: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  },

  /**
   * Format a date for form inputs (datetime-local)
   * @param dateString - ISO date string
   * @returns Date string in YYYY-MM-DDTHH:mm format
   */
  formatForInput: (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  },

  /**
   * Get relative time from now
   * @param dateString - ISO date string
   * @returns Relative time string like "in 3 days", "2 hours ago"
   */
  getRelativeTime: (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = date.getTime() - now.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    // Future dates
    if (diffMs > 0) {
      if (diffMinutes < 60) {
        return diffMinutes <= 1 ? 'in 1 minute' : `in ${diffMinutes} minutes`;
      } else if (diffHours < 24) {
        return diffHours === 1 ? 'in 1 hour' : `in ${diffHours} hours`;
      } else if (diffDays === 1) {
        return 'tomorrow';
      } else if (diffDays < 7) {
        return `in ${diffDays} days`;
      } else if (diffDays < 30) {
        const weeks = Math.round(diffDays / 7);
        return weeks === 1 ? 'in 1 week' : `in ${weeks} weeks`;
      } else if (diffDays < 365) {
        const months = Math.round(diffDays / 30);
        return months === 1 ? 'in 1 month' : `in ${months} months`;
      } else {
        const years = Math.round(diffDays / 365);
        return years === 1 ? 'in 1 year' : `in ${years} years`;
      }
    }

    // Past dates
    const absDiffMinutes = Math.abs(diffMinutes);
    const absDiffHours = Math.abs(diffHours);
    const absDiffDays = Math.abs(diffDays);

    if (absDiffMinutes < 60) {
      return absDiffMinutes <= 1 ? '1 minute ago' : `${absDiffMinutes} minutes ago`;
    } else if (absDiffHours < 24) {
      return absDiffHours === 1 ? '1 hour ago' : `${absDiffHours} hours ago`;
    } else if (absDiffDays === 1) {
      return 'yesterday';
    } else if (absDiffDays < 7) {
      return `${absDiffDays} days ago`;
    } else if (absDiffDays < 30) {
      const weeks = Math.round(absDiffDays / 7);
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else if (absDiffDays < 365) {
      const months = Math.round(absDiffDays / 30);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else {
      const years = Math.round(absDiffDays / 365);
      return years === 1 ? '1 year ago' : `${years} years ago`;
    }
  },

  /**
   * Check if a date is in the past
   * @param dateString - ISO date string
   * @returns true if the date is in the past
   */
  isPast: (dateString: string): boolean => {
    return new Date(dateString) < new Date();
  },

  /**
   * Check if a date is today
   * @param dateString - ISO date string
   * @returns true if the date is today
   */
  isToday: (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  },

  /**
   * Check if a date is tomorrow
   * @param dateString - ISO date string
   * @returns true if the date is tomorrow
   */
  isTomorrow: (dateString: string): boolean => {
    const date = new Date(dateString);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  },

  /**
   * Get a short date format for compact display
   * @param dateString - ISO date string
   * @returns Short date like "Oct 1"
   */
  formatShort: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  },

  /**
   * Get time only format
   * @param dateString - ISO date string
   * @returns Time like "2:30 PM"
   */
  formatTime: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
};

export default dateUtils;