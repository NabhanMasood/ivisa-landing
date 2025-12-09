/**
 * Visa Type Utility Functions
 * Handles parsing and formatting of visa types including custom entry types
 */

export interface ParsedVisaType {
  validity: number
  entryType: 'single' | 'multiple' | 'custom'
  entryTypeValue: string
  display: string
  raw: string
}

/**
 * Parse visa type string into structured object
 * Supports both old format (90-single, 90-multiple) and new custom formats (90-Double Entry)
 * @param visaType - Format: "{validity}-{entryTypeValue}"
 * @returns Parsed visa type object or null if invalid
 */
export function parseVisaType(visaType: string | null | undefined): ParsedVisaType | null {
  if (!visaType || typeof visaType !== 'string') {
    return null
  }

  const parts = visaType.split('-')
  if (parts.length < 2) {
    return null // Invalid format
  }

  const validity = parseInt(parts[0])
  if (isNaN(validity) || validity <= 0) {
    return null
  }

  // Join remaining parts in case custom entry name contains hyphens
  const entryTypeValue = parts.slice(1).join('-')

  // Determine entry type category
  let entryType: 'single' | 'multiple' | 'custom'
  let entryTypeDisplay: string

  if (entryTypeValue === 'single') {
    entryType = 'single'
    entryTypeDisplay = 'Single Entry'
  } else if (entryTypeValue === 'multiple') {
    entryType = 'multiple'
    entryTypeDisplay = 'Multiple Entry'
  } else {
    entryType = 'custom'
    entryTypeDisplay = entryTypeValue // Use custom name as-is
  }

  return {
    validity,
    entryType,
    entryTypeValue,
    display: `${validity} - ${entryTypeDisplay}`,
    raw: visaType
  }
}

/**
 * Format visa type for display in UI
 * @param visaType - Visa type string
 * @returns Formatted display string
 */
export function formatVisaTypeForDisplay(visaType: string | null | undefined): string {
  const parsed = parseVisaType(visaType)
  if (!parsed) {
    return visaType || 'Unknown'
  }

  return parsed.display
}

/**
 * Format entry type for display
 * @param entryTypeValue - Entry type value (single, multiple, or custom name)
 * @returns Formatted entry type display string
 */
export function formatEntryTypeForDisplay(entryTypeValue: string): string {
  if (entryTypeValue === 'single') {
    return 'Single Entry'
  } else if (entryTypeValue === 'multiple') {
    return 'Multiple Entry'
  } else {
    return entryTypeValue // Custom entry type - use as-is
  }
}

/**
 * Validate visa type format
 * @param visaType - Visa type string to validate
 * @returns true if valid, false otherwise
 */
export function isValidVisaType(visaType: string | null | undefined): boolean {
  if (!visaType || typeof visaType !== 'string') {
    return false
  }

  // Accept format: {validity}-{any string}
  const visaTypeRegex = /^\d+-.+$/
  if (!visaTypeRegex.test(visaType)) {
    return false
  }

  // Additional validation: ensure validity is a number
  const [validity] = visaType.split('-')
  return !isNaN(parseInt(validity)) && parseInt(validity) > 0
}

/**
 * Construct visaType from visa product data
 * According to API spec: {validity}-{entryTypeValue}
 * - For single: use "single"
 * - For multiple: use "multiple"
 * - For custom: use customEntryName
 * @param visaProduct - Visa product object with validity, entryType, and optional customEntryName
 * @returns Visa type string in format "{validity}-{entryTypeValue}"
 */
export function constructVisaType(visaProduct: {
  validity: number
  entryType?: 'single' | 'multiple' | 'custom' | string
  customEntryName?: string | null
}): string {
  const { validity, entryType, customEntryName } = visaProduct

  let entryTypeValue: string

  // Priority: Use customEntryName if provided (for custom entry types)
  if (customEntryName) {
    entryTypeValue = customEntryName
  } else if (entryType) {
    // Use entryType as-is - no validation, accepts any value
    entryTypeValue = entryType
  } else {
    // Fallback: empty string (will result in format like "30-" which should be caught by validation)
    entryTypeValue = ''
  }

  return `${validity}-${entryTypeValue}`
}

/**
 * Get display text for entry type from visa product
 * @param visaProduct - Visa product object
 * @returns Display string for entry type
 */
export function getEntryTypeDisplay(visaProduct: {
  entryType?: 'single' | 'multiple' | 'custom' | string
  customEntryName?: string | null
}): string {
  if (visaProduct.entryType === 'custom' && visaProduct.customEntryName) {
    return visaProduct.customEntryName
  } else if (visaProduct.entryType === 'single') {
    return 'Single Entry'
  } else if (visaProduct.entryType === 'multiple') {
    return 'Multiple Entry'
  }
  return visaProduct.entryType || 'Unknown'
}

