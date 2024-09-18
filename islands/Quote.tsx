/// <reference path="../global.d.ts" />
/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/google.maps/index.d.ts" />
import type { } from "npm:@types/google.maps@3.54.10";
import { useEffect, useRef, useState } from "preact/hooks";

declare global {
  interface Window {
    google: typeof google;
    initAutocomplete: () => void;
  }
}

export default function Quote() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isManualAddress, setIsManualAddress] = useState(false);
  const [budget, setBudget] = useState(500);
  const [timeframe, setTimeframe] = useState(7);
  const [completionDate, setCompletionDate] = useState<string>('');

  const calculateCompletionDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).replace(/(\d+)(?=(st|nd|rd|th))/, '$1$2');
  };

  useEffect(() => {
    setCompletionDate(calculateCompletionDate(timeframe));
  }, []);

  useEffect(() => {
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
      } catch (error) {
        console.error("Error loading Google Maps script:", error);
      }
    };

    loadGoogleMapsScript();

    const checkbox = document.getElementById('isThisYou') as HTMLInputElement;
    if (checkbox) {
      checkbox.addEventListener('change', handleLocationCheckbox);
    }

    return () => {
      const script = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
      if (script) {
        document.head.removeChild(script);
      }
      if (checkbox) {
        checkbox.removeEventListener('change', handleLocationCheckbox);
      }
    };
  }, []);

  const initAutocomplete = () => {
    if (isManualAddress) {
      if (addressInputRef.current) {
        addressInputRef.current.disabled = true;
      }
      return;
    }

    if (addressInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        {
          types: ['address'],
          componentRestrictions: { country: "CA" },
          fields: ['formatted_address', 'geometry', 'types'],
        }
      );

      const mapDiv = document.getElementById('map-view');
      if (mapDiv) {
        const map = new window.google.maps.Map(mapDiv, {
          center: { lat: 49.8951, lng: -97.1384 }, // Winnipeg coordinates
          zoom: 13,
        });

        const getZoomLevel = (types: string[]): number => {
          if (types.includes('street_address')) return 21;
          if (types.includes('route')) return 19;
          if (types.includes('neighborhood')) return 17;
          if (types.includes('locality')) return 15;
          return 13;
        };

        let marker: google.maps.Marker | null = null;

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (addressInputRef.current && place.formatted_address) {
            addressInputRef.current.value = place.formatted_address;
            setIsValidAddress(true);
          } else {
            setIsValidAddress(false);
          }
          if (place.geometry && place.geometry.location) {
            const zoomLevel = getZoomLevel(place.types || []);
            map.setCenter(place.geometry.location);
            map.setZoom(zoomLevel);

            if (marker) {
              marker.setMap(null);
            }

            marker = new google.maps.Marker({
              position: place.geometry.location,
              map: map,
            });
          }
        });
      }
    }
  };

  globalThis.initAutocomplete = initAutocomplete;

  const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      const validFiles = files.filter(file => file.type.startsWith('image/'));
      setSelectedFiles(validFiles.slice(0, 4));
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    formData.append('budget', budget.toString());
    formData.append('timeframe', timeframe.toString());
    formData.append('completionDate', completionDate);

    if (!validateName(name)) {
      setStatus("error");
      alert("Please enter a valid name (at least 2 characters).");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      alert("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(phone)) {
      setStatus("error");
      alert("Please enter a valid phone number.");
      return;
    }

    if (!isValidAddress) {
      if (isManualAddress) {
        const manualAddressField = document.getElementById('manualAddressField') as HTMLInputElement;
        if (manualAddressField && manualAddressField.value.length >= 5) {
          formData.set('address', manualAddressField.value);
        } else {
          setStatus("error");
          alert("Please enter a valid address (at least 5 characters).");
          return;
        }
      } else {
        setStatus("error");
        alert("Please select a valid address from the suggestions or enter it manually.");
        return;
      }
    }

    if (!validateMessage(message)) {
      setStatus("error");
      alert("Please provide more details in your message (at least 10 words).");
      return;
    }

    // Append selected files to formData
    selectedFiles.forEach((file, index) => {
      formData.append(`image${index + 1}`, file);
    });

    try {
      const response = await fetch("/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setSelectedFiles([]);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  const handleLocationCheckbox = (e: Event) => {
    const checkbox = e.target as HTMLInputElement;
    const locationMessage = document.getElementById('locationMessage');
    if (locationMessage) {
      locationMessage.classList.toggle('hidden', !checkbox.checked);
    }
  };

  const handleManualAddressCheckbox = (e: Event) => {
    const checkbox = e.target as HTMLInputElement;
    setIsManualAddress(checkbox.checked);
    const manualAddressInput = document.getElementById('manualAddressInput');
    if (manualAddressInput) {
      manualAddressInput.classList.toggle('hidden', !checkbox.checked);
    }
    if (checkbox.checked) {
      setIsValidAddress(false);
    }
  };

  const handleManualAddressInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const sanitizedValue = sanitizeAddress(input.value);
    input.value = sanitizedValue;
    setIsValidAddress(sanitizedValue.length >= 5);
  };

  const sanitizeAddress = (address: string): string => {
    return address.replace(/[^a-zA-Z0-9\s,.-]/g, '');
  };

  return (
    <section id="quote" class="container mx-auto px-4 py-16">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">Estimate Request</h2>
      <div class="max-w-2xl mx-auto">
        <form class="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label for="name" class="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-2 font-semibold">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              ref={addressInputRef}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123 Main St, Winnipeg, MB"
              required
              onChange={() => setIsValidAddress(false)}
            />
          </div>
          <div id="map-view" style={{ width: '100%', height: '160px', marginTop: '20px' }}></div>
          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="manualAddress"
                name="manualAddress"
                className="form-checkbox h-5 w-5 text-blue-600"
                onChange={handleManualAddressCheckbox}
              />
              <span className="font-semibold">Can't find your location?</span>
            </label>
          </div>
          <div id="manualAddressInput" className="mt-2 hidden">
            <label htmlFor="manualAddressField" className="block mb-2 font-semibold">Enter your address manually</label>
            <input
              type="text"
              id="manualAddressField"
              name="manualAddressField"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address manually"
              onInput={handleManualAddressInput}
            />
          </div>
          <div id="locationMessage" className="mt-2 text-sm text-gray-600 hidden">
            We'll contact you to find your location.
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
            />
          </div>
          <div>
            <label class="block mb-2 font-semibold">Services Needed</label>
            <div class="grid grid-cols-2 gap-4">
              {["Soffit & Fascia", "Siding", "Board & Batten", "Trim Work", "Roof Repair", "Other"].map((service) => (
                <label key={service} class="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    class="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label for="images" class="block mb-2 font-semibold">Upload Images (1-4 images)</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              capture="environment"
              onChange={handleFileChange}
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p class="text-sm text-gray-600 mt-1">Please upload at least 1 image (maximum 4) of the area you want to renovate.</p>
          </div>
          <div>
            <label htmlFor="budget" className="block mb-2 font-semibold">Budget</label>
            <input
              type="range"
              id="budget"
              name="budget"
              min="500"
              max="100000"
              step="500"
              value={budget}
              onChange={(e) => setBudget(parseInt((e.target as HTMLInputElement).value))}
              onInput={(e) => setBudget(parseInt((e.target as HTMLInputElement).value))}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span>$500</span>
              <span>${budget.toLocaleString()}{budget === 100000 ? '+' : ''}</span>
              <span>$100,000+</span>
            </div>
          </div>
          <div>
            <label htmlFor="timeframe" className="block mb-2 font-semibold">Completion Date</label>
            <input
              type="range"
              id="timeframe"
              name="timeframe"
              min="7"
              max="120"
              step="1"
              value={timeframe}
              onChange={(e) => {
                const newTimeframe = parseInt((e.target as HTMLInputElement).value);
                setTimeframe(newTimeframe);
                setCompletionDate(calculateCompletionDate(newTimeframe));
              }}
              onInput={(e) => {
                const newTimeframe = parseInt((e.target as HTMLInputElement).value);
                setTimeframe(newTimeframe);
                setCompletionDate(calculateCompletionDate(newTimeframe));
              }}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span>7 days</span>
              <span>{timeframe} days ({completionDate})</span>
              <span>120 days</span>
            </div>
          </div>
          <div>
            <label for="message" class="block mb-2 font-semibold">Additional Details</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Please provide any additional information about your project..."
              defaultValue="Please describe the current condition of the area, any specific concerns, and your vision for the renovation. The more details you provide, the better we can assist you."
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting..." : "Get Quote"}
          </button>
        </form>
        {status === "success" && (
          <p class="mt-4 text-green-600 font-semibold">Quote request submitted successfully!</p>
        )}
        {status === "error" && (
          <p class="mt-4 text-red-600 font-semibold">An error occurred. Please try again.</p>
        )}
      </div>
    </section>
  );
}

const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const validatePhone = (phone: string): boolean => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(phone);
};



const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};



const validateMessage = (message: string): boolean => {
  const words = message.trim().split(/\s+/);
  return words.length >= 10;
};
