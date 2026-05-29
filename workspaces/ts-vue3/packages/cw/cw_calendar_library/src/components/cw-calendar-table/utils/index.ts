import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export const DefaultFormatType = 'YYYY-MM-DD';

export function getDay(value: string | Date | number | null | undefined, defaultValue: Dayjs | null): Dayjs | null {
  if (value === null || value === undefined || value === '') {
    return defaultValue;
  }
  if (typeof value === 'string') {
    return dayjs(value, DefaultFormatType);
  }
  return dayjs(value);
}
