import { useState } from "preact/hooks";
import { FormState } from "../utils/types.ts";

export function useFormState() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    address: "",
    services: [],
    message: "",
    budget: "",
    timeframe: "",
    completionDate: "",
  });

  const updateFormState = (key: keyof FormState, value: string | string[] | boolean) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return { formState, updateFormState };
}
