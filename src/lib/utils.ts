
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Helper function to force React to re-render a component
 * Useful when content changes need to be immediately reflected
 */
export function forceRerender() {
  // Force a re-render by triggering a small UI update
  const event = new Event('contentChange');
  window.dispatchEvent(event);
  return true;
}

/**
 * Helper to update content and ensure it's immediately reflected
 * @param updateFunction The function that updates the content
 * @param onSuccess Optional callback after successful update
 */
export function updateAndReflect(updateFunction: Function, onSuccess?: () => void) {
  // Execute the update
  updateFunction();
  
  // Force re-render
  forceRerender();
  
  // Run any additional callback
  if (onSuccess) {
    onSuccess();
  }
}
