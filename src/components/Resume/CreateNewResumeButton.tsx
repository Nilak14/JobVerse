"use client";
import Link from "next/link";
import {
  PlusCircle,
  FileText,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePremiumModal from "@/store/usePremiumModal";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import Image from "next/image";
import { RESUME_TEMPLATE } from "@/lib/data";

interface CreateNewResumeButtonProps {
  canCreate: boolean;
}

const CreateNewResumeButton = ({ canCreate }: CreateNewResumeButtonProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"templates" | "creation">("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { setOpenPremiumModal } = usePremiumModal();

  const resetModal = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("templates");
      setSelectedTemplate(null);
    }, 300);
  };

  if (!canCreate) {
    return (
      <Button
        onClick={() => setOpenPremiumModal(true)}
        className="flex items-center gap-2"
      >
        <PlusCircle className="h-4 w-4" />
        Create New Resume
      </Button>
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Create New Resume
      </Button>

      <ResponsiveModal open={open} onOpenChange={resetModal}>
        <ResponsiveModalContent className="md:min-w-[760px] min-w-full">
          <AnimatePresence mode="wait">
            {step === "templates" ? (
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
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`relative flex flex-col cursor-pointer transition-all duration-200 ring-2 
                          ${
                            selectedTemplate === template.id
                              ? "ring-primary bg-primary/5 rounded-lg"
                              : "hover:bg-muted/30 rounded-lg ring-border"
                          }`}
                      >
                        <div className="pl-3 pt-3">
                          <h3 className="text-base font-medium">
                            {template.name}
                          </h3>
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
                              width={1000}
                              height={2000}
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

                <ResponsiveModalFooter className="flex justify-between pt-4 border-t">
                  <Button variant="outline" onClick={resetModal}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setStep("creation")}
                    disabled={!selectedTemplate}
                  >
                    Continue
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </ResponsiveModalFooter>
              </motion.div>
            ) : (
              <motion.div
                key="creation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <ResponsiveModalHeader className="pb-2">
                  <ResponsiveModalTitle className="text-xl font-semibold">
                    Create Your Resume
                  </ResponsiveModalTitle>
                  <ResponsiveModalDescription className="text-muted-foreground">
                    Choose your preferred starting point
                  </ResponsiveModalDescription>
                </ResponsiveModalHeader>

                <div className="max-h-[60vh] overflow-y-auto p-4 pr-4 custom-scrollbar">
                  <div className="grid grid-cols-1 gap-6 py-2 md:grid-cols-2">
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      className="h-full"
                    >
                      <Card className="h-full  shadow-sm hover:shadow transition-all duration-200">
                        <CardHeader>
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">Start Fresh</CardTitle>
                          <CardDescription>
                            Create a brand new resume from scratch
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Begin with a blank template and build your resume
                            step by step with our intuitive editor
                          </p>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button asChild className="w-full">
                            <Link
                              href={`/job-seeker/resume-editor?template=${selectedTemplate}`}
                            >
                              Create New Resume
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      className="h-full"
                    >
                      <Card className="h-full  shadow-sm hover:shadow transition-all duration-200">
                        <CardHeader>
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <UserCircle className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">
                            Use Profile Data
                          </CardTitle>
                          <CardDescription>
                            Import data from your existing profile
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Save time by importing your profile information
                            automatically into your new resume
                          </p>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button className="w-full" asChild>
                            <Link
                              href={`/job-seeker/resume-editor?profileData=true&template=${selectedTemplate}`}
                            >
                              Import Profile Data
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </div>
                </div>

                <ResponsiveModalFooter className="flex justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setStep("templates")}
                    className="flex items-center"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back
                  </Button>
                  <Button variant="outline" onClick={resetModal}>
                    Cancel
                  </Button>
                </ResponsiveModalFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
};

export default CreateNewResumeButton;
