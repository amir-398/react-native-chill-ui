/**
 * Creates a Date object suitable for TimePicker defaultTime prop.
 * The resulting Date will display the same time in UTC as the local time provided.
 *
 * This avoids timezone display confusion where selecting "14:30" would show as "12:30:00.000Z" in logs.
 *
 * @example
 * ```tsx
 * // Use current time
 * <TimePicker defaultTime={createTimePickerDate()} />
 *
 * // Use specific time
 * const customTime = new Date();
 * customTime.setHours(14, 30, 0);
 * <TimePicker defaultTime={createTimePickerDate(customTime)} />
 *
 * // Or just pass hours/minutes directly
 * <TimePicker defaultTime={createTimePickerDate(14, 30)} />
 * ```
 *
 * @param source - Source Date object, or hour value when used with minute parameter
 * @param minute - Optional minute value when first parameter is hour
 * @param second - Optional second value
 * @returns Date object with UTC time matching the local time values
 */
export function getTimePickerDateNow(source?: Date | number, minute?: number, second?: number): Date {
  const date = new Date();

  // If called with hour, minute, second numbers
  if (typeof source === 'number') {
    date.setUTCHours(source, minute || 0, second || 0, 0);
    return date;
  }

  // If called with a Date object or no arguments
  const sourceDate = source || new Date();
  date.setUTCHours(sourceDate.getHours(), sourceDate.getMinutes(), sourceDate.getSeconds(), 0);

  return date;
}
