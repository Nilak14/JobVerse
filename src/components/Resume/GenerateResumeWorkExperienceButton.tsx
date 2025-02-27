import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/schema/ResumeEditorSchema";
import { useState } from "react";
import AIButton from "../Global/AIButton";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { generateWorkExperienceGemini } from "@/actions/gemini/createWorkExperience";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import LoadingButton from "../ui/loading-button";
import { Button } from "../ui/button";

interface GenerateResumeWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}
const GenerateResumeWorkExperienceButton = ({
  onWorkExperienceGenerated,
}: GenerateResumeWorkExperienceButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const form = useForm<GenerateWorkExperienceInput>({
    defaultValues: {
      description: "",
    },
    resolver: zodResolver(generateWorkExperienceSchema),
  });

  async function generateWorkExperience(input: GenerateWorkExperienceInput) {
    try {
      const response = await generateWorkExperienceGemini(input);
      onWorkExperienceGenerated(response);
      setShowDialog(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.Please Try Again", {
        id: "generate-workSummary",
      });
    }
  }

  return (
    <>
      <AIButton loading={showDialog} onClick={() => setShowDialog(true)} />
      <ResponsiveModal open={showDialog} onOpenChange={setShowDialog}>
        <ResponsiveModalContent
          isloading={form.formState.isSubmitting ? "true" : undefined}
        >
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>
              Generate Work Experience
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Describe this work experience and the AI will generate an
              Optimized AI for you
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <Form {...form}>
            <form
              className="mt-4 space-y-4"
              onSubmit={form.handleSubmit(generateWorkExperience)}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none h-36"
                        {...field}
                        placeholder={`E.g. "From Jan 1 to Dec 12 i work at Everest Technology. My tasks were .... `}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-1 flex-col md:flex-row md:gap-5 ">
                <Button
                  disabled={form.formState.isSubmitting}
                  onClick={() => setShowDialog(false)}
                  className="w-full mb-5 md:mb-0"
                  variant={"secondary"}
                >
                  Cancel
                </Button>

                <LoadingButton
                  className="w-full"
                  type="submit"
                  loading={form.formState.isSubmitting}
                >
                  Generate
                </LoadingButton>
              </div>
            </form>
          </Form>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
};
export default GenerateResumeWorkExperienceButton;
