// utils/cn.ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function to conditionally join Tailwind CSS class names.
 * It merges conflicting Tailwind classes safely.
 *
 * Example:
 *   cn("p-2", condition && "bg-red-500", "p-4") // => "bg-red-500 p-4"
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
