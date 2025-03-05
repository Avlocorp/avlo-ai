import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, ""); // Faqat raqamlarni olish
  if (cleaned.length !== 12) return phone; // Agar noto'g'ri uzunlik bo'lsa, o'zgarishsiz qaytarish

  return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(
    5,
    8
  )} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`;
}
