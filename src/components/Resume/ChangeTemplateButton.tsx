import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { RESUME_TEMPLATE } from "@/lib/data";
import { Button } from "../ui/button";
import { Check, Newspaper } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
interface ChangeTemplateButtonProps {
  selectedTemplate?: string;
}
const ChangeTemplateButton = ({
  selectedTemplate,
}: ChangeTemplateButtonProps) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  return (
    <>
      <Button
        variant={"outline"}
        size={"icon"}
        title="Change Template"
        onClick={() => setOpen(true)}
      >
        <Newspaper size={"5"} />
      </Button>
      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalContent className="md:min-w-[760px] min-w-full">
          <motion.div
            key="templates"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ResponsiveModalHeader className="pb-2">
              <ResponsiveModalTitle className="text-xl font-semibold">
                Select Your Resume Template
              </ResponsiveModalTitle>
              <ResponsiveModalDescription className="text-muted-foreground">
                Choose a design that fits your professional style
              </ResponsiveModalDescription>
            </ResponsiveModalHeader>

            <div className="max-h-[60vh] overflow-y-auto p-4 pr-4 custom-scrollbar">
              <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                {RESUME_TEMPLATE.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => {
                      const newSearchParams = new URLSearchParams(searchParams);
                      newSearchParams.set("template", template.id);
                      setOpen(false);
                      window.history.replaceState(
                        null,
                        "",
                        `?${newSearchParams.toString()}`
                      );
                    }}
                    className={`relative flex flex-col cursor-pointer transition-all duration-200 ring-2 
                          ${
                            selectedTemplate === template.id
                              ? "ring-primary bg-primary/5 rounded-lg"
                              : "hover:bg-muted/30 rounded-lg ring-border"
                          }`}
                  >
                    <div className="pl-3 pt-3">
                      <h3 className="text-base font-medium">{template.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {template.id === "modern"
                          ? "Clean, contemporary design"
                          : template.id === "professional"
                            ? "Traditional structure"
                            : template.id === "creative"
                              ? "Distinctive appearance"
                              : "Minimal and focused"}
                      </p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 z-10">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                    <div className="relative p-3">
                      <div className="overflow-hidden rounded-md">
                        <Image
                          height={1000}
                          width={1005}
                          src={template.image}
                          alt={`${template.name} template preview`}
                          className="object-cover  w-full  bg-muted"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
};
export default ChangeTemplateButton;
