import { useState } from "preact/hooks";

interface TimeframeSliderProps {
  updateFormState: (key: string, value: string) => void;
}

export default function TimeframeSlider({ updateFormState }: TimeframeSliderProps) {
  const [timeframe, setTimeframe] = useState(7);

  const handleTimeframeChange = (e: Event) => {
    const value = parseInt((e.target as HTMLInputElement).value);
    setTimeframe(value);
    updateFormState('timeframe', value.toString());
  };

  return (
    <div>
      <label for="timeframe" class="block mb-2 font-semibold">Timeframe (days)</label>
      <input
        type="range"
        id="timeframe"
        name="timeframe"
        min="7"
        max="90"
        step="1"
        class="w-full"
        value={timeframe}
        onInput={handleTimeframeChange}
      />
      <span>{timeframe} days</span>
    </div>
  );
}
