import React from "react";

export default function NoteMeta({
  description,
  date,
}: {
  description: string;
  date?: string;
}) {
  return (
    <div className="mt-3 text-left space-y-1 px-1">
      {description && (
        <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 font-medium">
          {description}
        </p>
      )}
      {date && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
