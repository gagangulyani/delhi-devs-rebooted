const TIME_ZONE = "Asia/Kolkata";

const parts = (iso: string) => {
  const date = new Date(iso);
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, ...options }).format(date);

  return {
    day: format({ day: "2-digit" }),
    month: format({ month: "short" }).toUpperCase(),
    year: format({ year: "numeric" }),
    weekday: format({ weekday: "short" }).toUpperCase(),
    date: format({ weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    time: format({ hour: "numeric", minute: "2-digit" }),
  };
};

export const eventDate = parts;

export const eventTimeRange = (start: string, end?: string) => {
  const startTime = parts(start).time;
  return end ? `${startTime} - ${parts(end).time} IST` : `${startTime} IST`;
};
