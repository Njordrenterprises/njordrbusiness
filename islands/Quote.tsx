import { useState } from "preact/hooks";
import FormFields from "./FormFields.tsx";
import AddressInput from "./AddressInput.tsx";
import ServiceSelection from "./ServiceSelection.tsx";
import ImageUpload from "./ImageUpload.tsx";
import BudgetSlider from "./BudgetSlider.tsx";
import TimeframeSlider from "./TimeFrameSlider.tsx";
import { useFormState } from "../hooks/useFormState.ts";
import { handleSubmit } from "../utils/formUtils.ts";
import { JSX } from "preact";

export default function Quote() {
  const { formState, updateFormState, resetForm } = useFormState();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleImageUpload = (files: File[]) => {
    setSelectedFiles(files);
  };

  const onSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const result = await handleSubmit(e, formState, setStatus, selectedFiles);
      if (result === "success") {
        setMessage("Your request has been submitted successfully!");
        resetForm();
        setSelectedFiles([]);
      } else {
        setMessage("There was an issue submitting your request. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <section id="quote" class="container mx-auto px-4 py-16">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">Estimate Request</h2>
      <div class="max-w-2xl mx-auto">
        <form class="space-y-4" onSubmit={onSubmit}>
          <FormFields formState={formState} updateFormState={updateFormState} />
          <AddressInput formState={formState} updateFormState={updateFormState} />
          <ServiceSelection formState={formState} updateFormState={updateFormState} />
          <BudgetSlider updateFormState={updateFormState} />
          <TimeframeSlider updateFormState={updateFormState} />
          
          <div>
            <label for="message" class="block mb-2 font-semibold">Additional Details</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please provide any additional details about your project..."
              value={formState.message || ''}
              onInput={(e) => updateFormState('message', (e.target as HTMLTextAreaElement).value)}
            ></textarea>
          </div>
          
          <ImageUpload onImageUpload={handleImageUpload} />
          
          {message && (
            <div
              aria-live="polite"
              class={`p-4 rounded ${
                status === "success" ? "bg-green-100 text-green-800" :
                status === "error" ? "bg-red-100 text-red-800" :
                "bg-yellow-100 text-yellow-800"
              }`}
            >
              {message}
            </div>
          )}
          
          <div class="flex justify-center">
            <button
              type="submit"
              class={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
