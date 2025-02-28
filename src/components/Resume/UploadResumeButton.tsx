"use client";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "../ui/loading-button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { uploadResume } from "@/actions/resume/uploadResume";
const MAX_FILE_SIZE = 1 * 1024 * 1024;
export const UploadResumeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Minimum 3 letter is required for title" })
    .max(50, { message: "Maximum 50 letter is required for title" }),
  description: z.string().optional(),
  resume: z
    .instanceof(File, { message: "Please select a file" })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be 1MB or less",
    }),
});
export type UploadResumeSchemaType = z.infer<typeof UploadResumeSchema>;
const UploadResumeButton = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<UploadResumeSchemaType>({
    resolver: zodResolver(UploadResumeSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: UploadResumeSchemaType) => {
    startTransition(async () => {
      try {
        const res = await uploadResume(data);
        if (res.success) {
          toast.success(res.message, { id: "resume-upload" });
        } else {
          toast.error(res.message, { id: "resume-upload" });
        }
        setOpenModal(false);
      } catch (error) {
        toast.error("Failed to upload resume", { id: "resume-upload" });
      }
    });
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Upload className="size-4" />
        Upload Resume
      </Button>

      <ResponsiveModal open={openModal} onOpenChange={setOpenModal}>
        <ResponsiveModalContent isloading={isPending ? "true" : undefined}>
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>
              Enter the details for the resume
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Entering this details will help you to track the resume easily
              while applying for the job
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Resume Description{" "}
                      <span className="text-xs text-muted-foreground">
                        (Optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none h-20"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resume"
                render={({ field: { value, ...fieldValue } }) => (
                  <FormItem>
                    <FormLabel>Select Resume</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          fieldValue.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ResponsiveModalFooter>
                <Button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    form.reset();
                    setOpenModal(false);
                  }}
                  className="w-full mb-5 md:mb-0"
                  variant={"secondary"}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  showIconOnly
                  loading={isPending}
                  className="w-full mb-5 md:mb-0"
                >
                  Upload
                </LoadingButton>
              </ResponsiveModalFooter>
            </form>
          </Form>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
};
export default UploadResumeButton;
