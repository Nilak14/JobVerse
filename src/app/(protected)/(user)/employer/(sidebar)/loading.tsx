import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex gap-10 flex-col justify-center items-center h-[80vh] ">
      <div className="relative">
        <Image
          priority
          height={120}
          width={120}
          src={"/logo/jobverse_bg_rounded.svg"}
          alt="Loader"
          className="animate-pulse"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-[200px] w-[200px] border-t-4 border-primary"></div>
        </div>
      </div>
    </div>
  );
}
