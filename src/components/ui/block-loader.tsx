import { Loader2 } from "lucide-react";

interface BlockLoaderProps {
  isLoading?: boolean;
  loaderSize?: number;
  loaderColor?: string;
}

const BlockLoader = ({
  isLoading = true,
  loaderSize = 50,
  loaderColor = "white",
}: BlockLoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-black/45 backdrop-blur-[1px]  rounded-lg`}
      />
      <Loader2
        size={loaderSize}
        className={`animate-spin text-${loaderColor} relative`}
      />
    </div>
  );
};

export default BlockLoader;
