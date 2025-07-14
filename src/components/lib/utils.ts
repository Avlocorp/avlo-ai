import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatNumber(num?: number | string | null): string {
  if (num === null || num === undefined) return "-";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToFormData<T>(values: T) {
  const formData = new FormData();

  if (typeof values === "object") {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key) && values[key]) {
        if (
          values[key] instanceof Blob ||
          (values[key] as unknown) instanceof File ||
          typeof values[key] === "string"
        ) {
          // @ts-expect-error I have no idea what is wrong :(
          formData.append(key, values[key]);
        } else {
          if (values[key]) {
            formData.append(key, String(values[key]));
          }
        }
      }
    }
  }

  return formData;
}
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
}
export function formatPhoneNumber(phone?: string | null): string {
  if (!phone) return "-";
  try {
    return phone.replace(
      /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
      "$1 ($2) $3-$4-$5"
    );
  } catch {
    return phone;
  }
}
