import { FormState } from "../utils/types.ts";

interface ServiceSelectionProps {
  formState: FormState;
  updateFormState: (key: keyof FormState, value: string[]) => void;
}

export default function ServiceSelection({ formState, updateFormState }: ServiceSelectionProps) {
  const services = ['Soffit & Fascia', 'Siding', 'Board & Batten', 'Trim & Posts'];

  const handleServiceChange = (service: string, checked: boolean) => {
    const updatedServices = checked
      ? [...(formState.services || []), service]
      : (formState.services || []).filter(s => s !== service);
    updateFormState('services', updatedServices);
  };

  return (
    <div class="mb-6">
      <label class="block mb-2 font-semibold">Services Required</label>
      <div class="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <label class="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
            <input
              type="checkbox"
              name="services"
              value={service}
              class="form-checkbox h-5 w-5 text-blue-600 hidden"
              checked={formState.services?.includes(service) || false}
              onChange={(e) => handleServiceChange(service, (e.target as HTMLInputElement).checked)}
            />
            <div class="w-5 h-5 border-2 border-blue-600 rounded-sm mr-2 flex items-center justify-center">
              {formState.services?.includes(service) && (
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                </svg>
              )}
            </div>
            <span class="text-lg">{service}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
