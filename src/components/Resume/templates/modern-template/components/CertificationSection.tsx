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
      <hr style={{ borderColor: colorHex }} className="border-2" />
      <div className="space-y-3">
        <p style={{ color: colorHex }} className="text-lg font-semibold">
          Certification & Training
        </p>
        {certificationNotEmpty.map((cert, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm  ">
              <span>{cert.title}</span>
              {cert.completionDate && (
                <span>{formatDate(cert.completionDate, "yyyy")}</span>
              )}
            </div>
            <p className="text-xs  text-gray-500">{cert.instituteName}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default CertificationSection;
