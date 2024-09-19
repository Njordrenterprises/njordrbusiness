import { useState } from "preact/hooks";

interface ImageUploadProps {
  onImageUpload: (files: File[]) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const files = Array.from(target.files);
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
      onImageUpload([...selectedFiles, ...files]);

      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedFiles(prevFiles => {
      const newFiles = prevFiles.filter((_, i) => i !== index);
      onImageUpload(newFiles);
      return newFiles;
    });
    setPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <div class="mb-6">
      <label class="block mb-2 font-semibold">Upload Images (optional)</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        class="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        class="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded inline-block hover:bg-blue-600 transition duration-300"
      >
        Select Images
      </label>
      <div class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {previews.map((preview, index) => (
          <div key={index} class="relative">
            <img src={preview} alt={`Preview ${index + 1}`} class="w-full h-32 object-cover rounded" />
            <button
              onClick={() => removeImage(index)}
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
