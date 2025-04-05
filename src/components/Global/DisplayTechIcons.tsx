import Image from "next/image";

import { cn, getTechLogos } from "@/lib/utils";
interface TechIconProps {
  techStack: string[];
}
const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-secondary rounded-full p-2 flex flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md">
            {tech}
          </span>
          {url === "null" ? (
            <div className="flex bg-primary text-white rounded-full aspect-square size-5 mx-1">
              {tech.charAt(0).toUpperCase()}
            </div>
          ) : (
            <Image
              src={url}
              alt={tech}
              width={100}
              height={100}
              className="size-5"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
