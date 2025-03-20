import { generateJobDescription } from "@/actions/gemini/generateJobDescription";
import { useCompanySubscriptionLevel } from "@/context/CompanySubscriptionLevelProvider";
import { canUseAITools } from "@/lib/permissions/company-permissions";
import { JobSchemaType } from "@/schema/CreateJobSchema";
import useCompanyPremiumModal from "@/store/useCompanyPremiumModal";
import { useState } from "react";
import { toast } from "sonner";
import AIButton from "../Global/AIButton";

interface GenerateJobDescriptionButtonProps {
  jobData: JobSchemaType;
  onDescriptionGenerated: (description: string) => void;
}
const GenerateJobDescriptionButton = ({
  jobData,
  onDescriptionGenerated,
}: GenerateJobDescriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const subscriptionLevel = useCompanySubscriptionLevel();
  const { setOpenCompanyPremiumModal } = useCompanyPremiumModal();
  const generateDescription = async () => {
    if (!canUseAITools(subscriptionLevel)) {
      setOpenCompanyPremiumModal(true);
      return;
    }
    try {
      setIsLoading(true);
      const aiResponse = await generateJobDescription(jobData);
      if (!aiResponse) {
        toast.error("Failed To Generate Description");
      }
      onDescriptionGenerated(aiResponse);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.Please Try Again", {
        id: "generate-description",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <AIButton loading={isLoading} onClick={generateDescription} />;
};
export default GenerateJobDescriptionButton;
