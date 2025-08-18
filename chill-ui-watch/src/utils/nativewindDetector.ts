/**
 * Utility to detect if NativeWind is available in the current environment.
 * This allows components to gracefully fall back to StyleSheet when NativeWind is not installed.
 */

let isNativeWindAvailable: boolean | null = null;

/**
 * Checks if NativeWind is available by attempting to require it.
 * Caches the result to avoid repeated checks.
 *
 * @returns boolean indicating if NativeWind is available
 */
export function isNativeWindInstalled(): boolean {
  if (isNativeWindAvailable !== null) {
    return isNativeWindAvailable;
  }

  try {
    // Try to import nativewind to check if it's available
    require('nativewind');
    isNativeWindAvailable = true;
  } catch {
    // NativeWind is not available
    isNativeWindAvailable = false;
  }

  return isNativeWindAvailable;
}

/**
 * Resets the cached NativeWind availability check.
 * Useful for testing or when the environment changes.
 */
export function resetNativeWindDetection(): void {
  isNativeWindAvailable = null;
}
