import { useEffect, useRef } from "preact/hooks";
import { FormState } from "../utils/types.ts";

interface AddressInputProps {
  formState: FormState;
  updateFormState: (key: keyof FormState, value: string | boolean) => void;
}

export default function AddressInput({ formState, updateFormState }: AddressInputProps) {
  const addressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof globalThis !== 'undefined') {
      const loadGoogleMapsScript = async () => {
        try {
          const response = await fetch('/api/google-maps-key');
          const { apiKey } = await response.json();
          
          if (!apiKey) {
            console.error("Google Maps API key is not available");
            return;
          }

          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;
          script.async = true;
          script.defer = true;
          script.setAttribute('loading', 'async');
          document.head.appendChild(script);

          globalThis.initAutocomplete = () => {
            if (addressInputRef.current) {
              const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current);
              autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                updateFormState('address', place.formatted_address || '');
              });
            }
          };
        } catch (error) {
          console.error("Error loading Google Maps script:", error);
        }
      };

      loadGoogleMapsScript();

      return () => {
        const script = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
        if (script) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <div>
      <label htmlFor="address" className="block mb-2 font-semibold">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        ref={addressInputRef}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="123 Main St, Winnipeg, MB"
        value={formState.address || ''}
        onInput={(e) => updateFormState('address', (e.target as HTMLInputElement).value)}
        required
      />
    </div>
  );
}
