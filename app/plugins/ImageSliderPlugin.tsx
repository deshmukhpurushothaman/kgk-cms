import { Plugin } from '../../types/plugins';
import { useState } from 'react';

const ImageSliderPlugin: Plugin = {
  name: 'Image Slider Plugin',
  componentName: 'ImageSliderPlugin',
  initialize() {
    console.log('Image Slider Plugin initialized!');
  },
  addFields(post) {
    // Instead of using hooks here, return a component that uses hooks.
    return <ImageSliderField key="image-slider" post={post} />;
  },
  modifyContent(content) {
    // No content modification needed for this plugin
    return content;
  },
};

// React functional component to manage image slider fields
function ImageSliderField({ post }: any) {
  const [images, setImages] = useState<string[]>(post.images || []);

  const handleAddImage = (url: string) => {
    const updatedImages = [...images, url];
    setImages(updatedImages);
    post.images = updatedImages; // Update post with new images
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    post.images = updatedImages; // Update post with new images
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div>
        <label className="text-2xl font-bold">Add Image URL:</label>
      </div>
      <div>
        <input
          id="imageInput"
          type="text"
          placeholder="Enter image URL"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              handleAddImage(e.currentTarget.value);
              e.currentTarget.value = ''; // Clear input field
            }
          }}
          className="bg-transparent border border-gray-300 rounded-md min-h-12 w-full"
        />
      </div>
      <div className="image-preview-container mt-4">
        {images.length > 0 && (
          <div>
            <h4>Image Preview:</h4>
            <ul>
              {images.map((url, index) => (
                <li key={index} className="flex gap-x-4 items-center mt-2">
                  <img src={url} alt={`Image ${index + 1}`} width="100" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageSliderPlugin;
