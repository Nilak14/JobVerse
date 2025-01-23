"use client";
import { Camera, X } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import CropImageDialog from "./CropImageDialog";
import Resizer from "react-image-file-resizer";
interface AvatarInputProps {
  src: string | StaticImageData;
  onImageCropped: (blob: Blob | null) => void;
  size?: string;
}
const AvatarInput = ({
  onImageCropped,
  src,
  size = "size-32",
}: AvatarInputProps) => {
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
        <Image
          src={src}
          alt="Avatar Preview"
          width={150}
          height={150}
          className={`rounded-full object-cover flex-none ${size}`}
        />
        <span className="absolute inset-0 m-auto flex size-12 items-center justify-center bg-black bg-opacity-40 text-white transition-colors duration-200 group-hover:bg-opacity-25 rounded-full">
          <Camera size={24} />
        </span>
        {src !== "/avatar-placeholder.png" ||
          (src.startsWith(`https://${process.env.UPLOADTHING_APP_ID}`) && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onImageCropped(null);
              }}
              className="absolute top-0 right-2   rounded-full bg-destructive p-1 text-white"
            >
              <X size={15} />
            </span>
          ))}
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
