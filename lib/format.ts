const dateTime = new Intl.DateTimeFormat("hy-AM", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Yerevan",
});

export function formatDateTime(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : dateTime.format(date);
}
