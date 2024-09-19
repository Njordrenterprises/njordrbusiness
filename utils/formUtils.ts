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

  selectedFiles.forEach((file, index) => {
    formData.append(`images`, file);
  });

  try {
    console.log("Sending request to /contact");
    const response = await fetch("/contact", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Form submission successful");
      setStatus("success");
    } else {
      console.error("Form submission failed", await response.text());
      setStatus("error");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setStatus("error");
  }
}

export function validateForm(formState: FormState): boolean {
  // Add your form validation logic here
  return true; // Return true if the form is valid, false otherwise
}
