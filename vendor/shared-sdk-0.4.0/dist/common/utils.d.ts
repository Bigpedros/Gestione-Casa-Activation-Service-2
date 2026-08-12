/**
  * Cleans string and collapses multiple spaces into a single space.
  */
export declare function normalizeText(str: string | null | undefined): string | null;
/**
  * Normalizes email address to lowercase and trimmed string.
  */
export declare function normalizeEmail(email: string | null | undefined): string | null;
/**
  * Formal validation for email addresses.
  */
export declare function isValidEmail(email: string | null | undefined): boolean;
/**
  * Prudent phone number validation (allows +, spaces, dots, dashes, digits; length 3-25).
  */
export declare function isValidPhone(phone: string | null | undefined): boolean;
/**
  * Validates ISO 8601 date string format and value.
  */
export declare function isValidIsoDate(dateStr: string | null | undefined): boolean;
/**
  * Checks if dateA is less than or equal to dateB (chronological order).
  */
export declare function isChronological(dateA: string, dateB: string): boolean;
//# sourceMappingURL=utils.d.ts.map