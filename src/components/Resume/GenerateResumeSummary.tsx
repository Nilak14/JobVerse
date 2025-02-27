import { ResumeValues } from "@/schema/ResumeEditorSchema";
import { useState } from "react";
import { Loader2, WandSparklesIcon } from "lucide-react";
import { toast } from "sonner";
import { generateResumeSummary } from "@/actions/gemini/createResumeSummary";
import { ShinyButton } from "../ui/shiny-button";
import AIButton from "../Global/AIButton";

interface GenerateResumeSummaryProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}
const GenerateResumeSummary = ({
  onSummaryGenerated,
  resumeData,
}: GenerateResumeSummaryProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateSummary = async () => {
    try {
      setIsLoading(true);
      const aiResponse = await generateResumeSummary(resumeData);
      if (!aiResponse) {
        toast.error("Failed To Generate Summary");
      }
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.Please Try Again", {
        id: "generate-summary",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <AIButton loading={isLoading} onClick={generateSummary} />;
};

export default GenerateResumeSummary;
