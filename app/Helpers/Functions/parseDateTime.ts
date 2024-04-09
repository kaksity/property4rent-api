import businessConfig from 'Config/businessConfig'
import { DateTime } from 'luxon'
/**
 * @description Method takes a date as a string and parse it to luxon date time object
 * @author DP
 * @export
 * @param {string} date
 * @return {*}  {DateTime}
 */
export default function parseDateTime(date: string): DateTime {
  return DateTime.fromFormat(date, businessConfig.defaultDateFormat)
}
