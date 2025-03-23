import { ResumeTemplateProps } from "@/lib/types";
import { formatDate } from "date-fns";

const CertificationSection = ({ resumeData }: ResumeTemplateProps) => {
  const { certification, colorHex } = resumeData;
  const certificationNotEmpty = certification?.filter(
    (cert) => Object.values(cert).filter(Boolean).length > 0
  );
  if (!certificationNotEmpty?.length) return null;
  return (
    <>
      <div>
        <p style={{ color: colorHex }} className="text-lg font-semibold">
          Certifications & Training
        </p>
        <hr style={{ borderColor: colorHex }} className="border mt-1 mb-3" />
        <div className="space-y-2">
          {certificationNotEmpty.map((cert, index) => (
            <div key={index} className="break-inside-avoid">
              <div className="flex items-center justify-between text-[13px] font-[500] ">
                <span>{cert.title}</span>
                {cert.completionDate && (
                  <span className="text-sm text-gray-500">
                    {formatDate(cert.completionDate, "yyyy")}
                  </span>
                )}
              </div>
              <p className="text-xs  text-gray-500">{cert.instituteName}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CertificationSection;
