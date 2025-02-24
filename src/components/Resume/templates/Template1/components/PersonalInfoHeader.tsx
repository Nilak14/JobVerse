import { BorderStyles } from "@/components/Resume/BorderStyleButton";
import { ResumeTemplateProps } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const PersonalInfoHeader = ({ resumeData }: ResumeTemplateProps) => {
  const {
    photo,
    fullName,
    jobTitle,
    city,
    country,
    borderStyle,
    phone,
    email,
    colorHex,
  } = resumeData;
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);
  useEffect(() => {
    const objectURL = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectURL) setPhotoSrc(objectURL);

    if (photo === null) setPhotoSrc("");

    return () => URL.revokeObjectURL(objectURL);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "99999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p style={{ color: colorHex }} className="text-3xl font-bold">
            {fullName}
          </p>
          <p style={{ color: colorHex }} className="font-medium">
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
};
export default PersonalInfoHeader;
