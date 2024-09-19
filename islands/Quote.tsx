import { useState } from "preact/hooks";
import FormFields from "./FormFields.tsx";
import AddressInput from "./AddressInput.tsx";
import ServiceSelection from "./ServiceSelection.tsx";
import ImageUpload from "./ImageUpload.tsx";
import BudgetSlider from "./BudgetSlider.tsx";
import TimeframeSlider from "./TimeFrameSlider.tsx";
import { useFormState } from "../hooks/useFormState.ts";
import { handleSubmit } from "../utils/formUtils.ts";
import { FormState } from "../utils/types.ts";

export default function Quote() {
  const { formState, updateFormState } = useFormState();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleImageUpload = (files: File[]) => {
    setSelectedFiles(files);
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();
    handleSubmit(e, formState, setStatus, selectedFiles);
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
          <div class="flex justify-center">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
