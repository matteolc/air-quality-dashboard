import { useMatches, useRevalidator } from "@remix-run/react";
import { useEffect, useMemo } from "react";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string,
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data;
}

export function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}

export function dateTimeFormat(options?: any) {
  return new Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  });
}

export function relativeTimeFormat(options?: any) {
  return new Intl.RelativeTimeFormat("en-US", {
    numeric: "auto",
    ...options,
  });
}

export function formatRelativeTime(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  options?: Intl.RelativeTimeFormatOptions,
) {
  return relativeTimeFormat(options).format(value, unit);
}

export function timeAgo(date: Date, unit: Intl.RelativeTimeFormatUnitSingular) {
  const getMillis = (unit: Intl.RelativeTimeFormatUnitSingular) => {
    let millis = 1000; // 1 second
    if (unit === "minute") {
      return millis * 60;
    }
    if (unit === "hour") {
      return millis * 60 * 60;
    }
    if (unit === "day") {
      return millis * 60 * 60 * 24;
    }
    return millis;
  };

  return Math.round(
    (new Date(date).getTime() - new Date().getTime()) / getMillis(unit),
  );
}

export function isDefined(value: number | string | boolean | undefined) {
  return value !== undefined;
}

export function inRange(min: number, max: number, value?: number) {
  return value !== undefined && value >= min && value <= max;
}

export function useRevalidateOnFocus({
  enabled = false,
}: {
  enabled?: boolean;
}) {
  let revalidator = useRevalidator();

  useEffect(
    function revalidateOnFocus() {
      if (!enabled) return;
      function onFocus() {
        if (revalidator.state === "idle") revalidator.revalidate();
      }
      window.addEventListener("focus", onFocus);
      return () => window.removeEventListener("focus", onFocus);
    },
    [revalidator, enabled],
  );

  useEffect(
    function revalidateOnVisibilityChange() {
      if (!enabled) return;
      function onVisibilityChange() {
        if (revalidator.state === "idle") revalidator.revalidate();
      }
      window.addEventListener("visibilitychange", onVisibilityChange);
      return () =>
        window.removeEventListener("visibilitychange", onVisibilityChange);
    },
    [revalidator, enabled],
  );
}
