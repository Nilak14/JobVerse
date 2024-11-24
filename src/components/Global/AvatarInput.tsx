"use client";
import { Camera } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import CropImageDialog from "./CropImageDialog";
import Resizer from "react-image-file-resizer";
interface AvatarInputProps {
  src: string | StaticImageData;
  onImageCropped: (blob: Blob | null) => void;
}
const AvatarInput = ({ onImageCropped, src }: AvatarInputProps) => {
  const [imageToCrop, setImageToCrop] = useState<File>();
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  const onImageSelected = (image: File | undefined) => {
    if (!image) return;
    // show crop dialog
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
        className="group relative block"
      >
        <Image
          src={src}
          alt="Avatar Preview"
          width={150}
          height={150}
          className="rounded-full size-32 object-cover flex-none"
        />
        <span className="absolute inset-0 m-auto flex size-12 items-center justify-center bg-black bg-opacity-40 text-white transition-colors duration-200 group-hover:bg-opacity-25 rounded-full">
          <Camera size={24} />
        </span>
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
export default AvatarInput;
