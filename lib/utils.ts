import { ClassValue, clsx } from "clsx";
import { add, getDaysInMonth, getMonth, set } from "date-fns";
import { twMerge } from "tailwind-merge";

export const EVENT_API_MAIN = "https://loket-rest-api.vercel.app";
export const EVENT_API_LOCAL = "http://localhost:5000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeMap = new Map([
  [
    "tommorow",
    {
      title: "Tommorow",
      value: add(new Date(), {
        days: 1,
      }),
    },
  ],
  [
    "this-week",
    {
      title: "This week",
      value: add(new Date(), {
        days: 7,
      }),
    },
  ],
  [
    "this-month",
    {
      title: "This month",
      value: set(new Date(), { date: getDaysInMonth(new Date()) }),
    },
  ],
  [
    "next-month",
    {
      title: "Next month",
      value: set(new Date(), { month: getMonth(new Date()) + 1 }),
    },
  ],
]);

export const sortMap = new Map([
  ["name-asc", { title: "Name from A to Z", value: { title: "asc" } }],
  ["name-dec", { title: "Name from Z to A", value: { title: "desc" } }],
  [
    "time-asc",
    { title: "Closest Event Time", value: { date_time_start: "asc" } },
  ],
  [
    "time-desc",
    { title: "Furthest Event Time", value: { date_time_start: "desc" } },
  ],
]);
