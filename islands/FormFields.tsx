import { FormState } from "../utils/types.ts";

interface FormFieldsProps {
  formState: FormState;
  updateFormState: (key: keyof FormState, value: string) => void;
}

export default function FormFields({ formState, updateFormState }: FormFieldsProps) {
  return (
    <>
      <div>
        <label for="name" class="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Your full name"
          value={formState.name ?? ''}
          onInput={(e) => updateFormState('name', (e.target as HTMLInputElement).value)}
        />
      </div>
      <div>
        <label for="email" class="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="youremail@example.com"
          value={formState.email || ''}
          onInput={(e) => updateFormState('email', (e.target as HTMLInputElement).value)}
        />
      </div>
      <div>
        <label for="phone" class="block mb-2 font-semibold">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="(204) 123-4567"
          value={formState.phone || ''}
          onInput={(e) => updateFormState('phone', (e.target as HTMLInputElement).value)}
        />
      </div>
    </>
  );
}
