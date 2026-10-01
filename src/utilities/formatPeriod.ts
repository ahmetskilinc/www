// Experience dates are month-precision; read them in London time so a month
// picked in the admin never drifts into the previous month.
const TIME_ZONE = "Europe/London";

const monthLabel = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: TIME_ZONE });
const monthParts = new Intl.DateTimeFormat("en-US", { month: "numeric", year: "numeric", timeZone: TIME_ZONE });

const monthIndex = (date: Date) => {
  const parts = monthParts.formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return get("year") * 12 + get("month") - 1;
};

const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;

/** "1 yr 3 mos" — counts both the start and end month, like LinkedIn. */
const formatDuration = (months: number) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years ? plural(years, "yr") : "", rest ? plural(rest, "mo") : ""].filter(Boolean).join(" ");
};

type Period = { startDate: string; endDate?: string | null; current?: boolean | null };

export const formatPeriod = ({ startDate, endDate, current }: Period, now = new Date()) => {
  const start = new Date(startDate);
  const end = current || !endDate ? null : new Date(endDate);
  const months = monthIndex(end ?? now) - monthIndex(start) + 1;

  return {
    range: `${monthLabel.format(start)} - ${end ? monthLabel.format(end) : "Present"}`,
    duration: months > 0 ? formatDuration(months) : "",
  };
};
