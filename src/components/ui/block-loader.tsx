import { Loader2 } from "lucide-react";
import { TextShimmerWave } from "./wave-text";

interface BlockLoaderProps {
  isLoading?: boolean;
  loaderSize?: number;
  textSize?: "xs" | "sm" | "md" | "xl" | "2xl";
  textContent?: string;
}

const BlockLoader = ({
  textContent = "Loading",
  isLoading = true,
  textSize = "xl",
}: BlockLoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-gray-400/45 dark:bg-black/50 backdrop-blur-[1px]  rounded-lg`}
      />
      <TextShimmerWave className={`text-${textSize}`} duration={1}>
        {`${textContent}...`}
      </TextShimmerWave>
    </div>
  );
};

export default BlockLoader;
