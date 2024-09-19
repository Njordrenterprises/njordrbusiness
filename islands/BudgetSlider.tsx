import { useState } from "preact/hooks";

interface BudgetSliderProps {
  updateFormState: (key: string, value: string) => void;
}

export default function BudgetSlider({ updateFormState }: BudgetSliderProps) {
  const [budget, setBudget] = useState(1000);

  const handleBudgetChange = (e: Event) => {
    const value = parseInt((e.target as HTMLInputElement).value);
    setBudget(value);
    updateFormState('budget', value.toString());
  };

  return (
    <div>
      <label for="budget" class="block mb-2 font-semibold">Budget</label>
      <input
        type="range"
        id="budget"
        name="budget"
        min="1000"
        max="100000"
        step="1000"
        class="w-full"
        value={budget}
        onInput={handleBudgetChange}
      />
      <span>${budget}</span>
    </div>
  );
}
