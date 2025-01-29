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
