declare global {
  interface Window {
    google: typeof google;
  }
  var initAutocomplete: () => void;
}

export {};
