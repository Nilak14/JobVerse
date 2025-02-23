"use client";
import { Camera, X } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import CropImageDialog from "./CropImageDialog";
import Resizer from "react-image-file-resizer";
interface UserProfileInputProps {
  src: string | StaticImageData | null;
  onImageCropped: (blob: Blob | null) => void;
  size?: string;
  username: string;
  isUploading?: boolean;
  uploadProgress?: number;
}
const UserProfileInput = ({
  onImageCropped,
  src,
  size = "size-32",
  username,
  isUploading,
  uploadProgress,
}: UserProfileInputProps) => {
  const [imageToCrop, setImageToCrop] = useState<File>();
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  const onImageSelected = (image: File | undefined) => {
    if (!image) return;
    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (uri) => setImageToCrop(uri as File),
      "file"
    );
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageSelected(e.target.files?.[0])}
        ref={avatarFileInputRef}
        className="hidden sr-only"
      />

      <button
        type="button"
        onClick={() => avatarFileInputRef.current?.click()}
        className="group relative block aspect-square"
      >
        {isUploading && !!uploadProgress && (
          <svg
            className="absolute inset-0 -m-3 rotate-[-90deg]"
            viewBox="0 0 100 100"
          >
            <circle
              className="stroke-blue-500"
              fill="none"
              strokeWidth="4"
              strokeDasharray={`${uploadProgress * 2.51}, 251`}
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
            />
          </svg>
        )}
        {src ? (
          <Image
            src={src}
            alt="Avatar Preview"
            width={150}
            height={150}
            className={`rounded-full object-cover flex-none ${size}`}
          />
        ) : (
          <div
            className={`rounded-full flex-none ${size} bg-primary text-white flex items-center justify-center text-2xl`}
          >
            <span className="text-4xl">{username[0]}</span>
          </div>
        )}
        <span className="absolute bottom-0 right-0 flex size-9 items-center justify-center bg-black bg-opacity-40 text-white transition-colors duration-200 group-hover:bg-opacity-25 rounded-full">
          <Camera size={24} />
        </span>
        {/* {src && src.toString().startsWith("blob:") && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onImageCropped(null);
            }}
            className="absolute top-0 right-2   rounded-full bg-destructive p-1 text-white"
          >
            <X size={15} />
          </span>
        )} */}
      </button>
      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRatio={1}
          onCropped={onImageCropped}
          onClose={() => {
            setImageToCrop(undefined);
            if (avatarFileInputRef.current) {
              avatarFileInputRef.current.value = "";
            }
          }}
        />
      )}
    </>
  );
};
export default UserProfileInput;
