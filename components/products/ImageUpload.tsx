"use client";

/**
 * ImageUpload.tsx
 * ----------------
 * A reusable image upload component using Cloudinary.
 *
 * Dependencies:
 * - `CldUploadWidget` from next-cloudinary for upload UI and functionality
 * - `Image` from next/image for optimized image rendering
 * - `TbPhotoPlus` from react-icons for the add image icon
 * - `getImagePath` utility for resolving existing image URLs
 *
 * Role:
 * Provides a UI for uploading a single product image, previewing it,
 * and integrating with forms via a hidden input.
 * Supports showing a current image if editing an existing product.
 */

import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload({ image }: { image: string | undefined }) {
  const [imageUrl, setImageUrl] = useState(""); // Local state for uploaded image URL

  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close(); // Close the widget after successful upload
          // @ts-ignore
          setImageUrl(result.info?.secure_url); // Save uploaded image URL in state
        }
      }}
      uploadPreset="foodnext" // Cloudinary preset for uploads
      options={{
        maxFiles: 1, // Only allow one file at a time
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800">Product Image</label>
            <div
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 "
              onClick={() => open()} // Open Cloudinary widget on click
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Add Image</p>

              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={imageUrl} // Preview uploaded image
                    alt="Product Image"
                  />
                </div>
              )}
            </div>
          </div>

          {image && !imageUrl && (
            <div className="space-y-2">
              <label>Current Image:</label>
              <div className="relative w-64 h-64">
                <Image
                  fill
                  src={getImagePath(image)} // Show existing image if provided
                  alt="Product Image"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          )}

          {/* Hidden input to include the image URL in the form submission */}
          <input
            type="hidden"
            name="image"
            defaultValue={imageUrl ? imageUrl : image}
          />
        </>
      )}
    </CldUploadWidget>
  );
}
