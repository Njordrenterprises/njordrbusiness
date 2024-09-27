import { FormState } from "./types.ts";

export function calculateCompletionDate(timeframe: number): string {
  const today = new Date();
  const completionDate = new Date(today.setDate(today.getDate() + timeframe));
  return completionDate.toISOString().split('T')[0];
}

export async function handleSubmit(
  e: Event,
  formState: FormState,
  setStatus: (status: "idle" | "loading" | "success" | "error") => void,
  selectedFiles: File[]
) {
  e.preventDefault();
  console.log("Form submitted", formState);
  setStatus("loading");

  const formData = new FormData();
  Object.entries(formState).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => formData.append(key, item));
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  });

  selectedFiles.forEach((file) => {
    formData.append(`images`, file);
  });

  try {
    console.log("Sending request to /contact");
    const response = await fetch("/contact", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok && result.status === "success") {
      console.log("Form submission successful");
      setStatus("success");
      return "success";
    } else {
      console.error("Form submission failed", result.message);
      setStatus("error");
      return "error";
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setStatus("error");
    return "error";
  }
}

export function validateForm(formState: FormState): boolean {
  // Example validation logic
  return Object.values(formState).every(value => value !== '');
}
