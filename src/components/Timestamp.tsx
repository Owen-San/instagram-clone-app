"use client";

import { cn } from "@/lib/utils";
import TimeAgo, { Formatter, Unit, Suffix } from "react-timeago";
import { useEffect, useState } from "react";

type Props = {
  createdAt: Date;
  className?: string;
};

const shortFormatter: Formatter = (
  value: number,
  unit: Unit,
  suffix: Suffix,
  epochMilliseconds: number,
  nextFormatter: Formatter,
  now: () => number
) => {
  const map: Record<Unit, string> = {
    second: "s",
    minute: "m",
    hour: "h",
    day: "d",
    week: "w",
    month: "mo",
    year: "y",
  };
  const abbr = map[unit];
  if (abbr) return `${value}${abbr}`;
  return nextFormatter
    ? nextFormatter(value, unit, suffix, epochMilliseconds, nextFormatter, now)
    : `${value} ${unit} ${suffix}`;
};

function Timestamp({ createdAt, className }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <span
      className={cn(
        "font-medium text-neutral-500 dark:text-neutral-400 text-xs",
        className
      )}
      suppressHydrationWarning
    >
      {mounted ? (
        <TimeAgo date={createdAt} formatter={shortFormatter} />
      ) : (
        <time dateTime={createdAt.toISOString()}>
          {createdAt.toISOString()}
        </time>
      )}
    </span>
  );
}

export default Timestamp;
