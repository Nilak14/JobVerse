import { ResumeValues } from "@/schema/ResumeEditorSchema";
import { useState } from "react";
import { toast } from "sonner";
import { generateResumeSummary } from "@/actions/gemini/createResumeSummary";
import AIButton from "../Global/AIButton";
import { useJobSeekerSubscriptionLevel } from "@/context/JobSeekerSubscriptionLevelProvider";
import usePremiumModal from "@/store/usePremiumModal";
import { canUseAITools } from "@/lib/permissions/jobSeeker-permissions";

interface GenerateResumeSummaryProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}
const GenerateResumeSummary = ({
  onSummaryGenerated,
  resumeData,
}: GenerateResumeSummaryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const subscriptionLevel = useJobSeekerSubscriptionLevel();
  const { setOpenPremiumModal } = usePremiumModal();
  const generateSummary = async () => {
    if (!canUseAITools(subscriptionLevel)) {
      setOpenPremiumModal(true);
      return;
    }
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
