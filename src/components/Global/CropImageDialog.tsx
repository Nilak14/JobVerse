import { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import "cropperjs/dist/cropper.css";
import { DialogDescription } from "@radix-ui/react-dialog";
interface CropImageDialogProps {
  src: string;
  cropAspectRatio: number;
  onCropped: (blob: Blob | null) => void;
  onClose: () => void;
}

const CropImageDialog = ({
  cropAspectRatio,
  onCropped,
  onClose,
  src,
}: CropImageDialogProps) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const crop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) {
      return;
    }
    cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
    onClose();
  };
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Image</DialogTitle>
          <DialogDescription className="sr-only">
            Crop Your Image
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[400px] overflow-x-hidden grid place-items-center">
          <Cropper
            src={src}
            aspectRatio={cropAspectRatio}
            guides={false}
            zoomable={false}
            ref={cropperRef}
            className="mx-auto size-fit"
          />
        </div>

        <DialogFooter>
          <div className="flex  justify-between w-full">
            <Button variant={"secondary"} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={crop}>Crop</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CropImageDialog;
