import dayjs from 'dayjs';

export function dateInputStringToUnix(date: string) {
  return dayjs(new Date(date)).unix();
}
