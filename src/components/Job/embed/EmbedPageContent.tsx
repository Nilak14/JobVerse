"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { JobDataBrowse } from "@/lib/prisma-types/Job";
import WidgetPreview from "./WidgetPreview";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WidgetConfig } from "@/lib/types";
import { DEFAULT_EMBED_SETTINGS } from "@/lib/data";
import { useCompanySubscriptionLevel } from "@/context/CompanySubscriptionLevelProvider";
import useCompanyPremiumModal from "@/store/useCompanyPremiumModal";
import { canCustomizeEmbeddings } from "@/lib/permissions/company-permissions";
import { useRouter } from "next/navigation";

export default function WidgetConfigurator({
  jobs,
}: {
  jobs: JobDataBrowse[];
}) {
  const [selectedJob, setSelectedJob] = useState<JobDataBrowse>(jobs[0]);
  const [config, setConfig] = useState<WidgetConfig>(DEFAULT_EMBED_SETTINGS);
  const { setOpenCompanyPremiumModal } = useCompanyPremiumModal();
  const companySubscription = useCompanySubscriptionLevel();
  const router = useRouter();
  if (companySubscription === "FREE") {
    router.replace("/employer/billing");
  }
  const generateScriptTag = () => {
    const configParams = new URLSearchParams({
      jobId: selectedJob.id,
      primaryColor: config.primaryColor,
      secondaryColor: config.secondaryColor,
      accentColor: config.accentColor,
      borderRadius: config.borderRadius.toString(),
      showLogo: config.showLogo.toString(),
      showApplyButton: config.showApplyButton.toString(),
      note: config.note,
      showBranding: config.showBranding.toString(),
    }).toString();

    return `<!-- JobVerse Widget  -->
<div style="width: 600px;" id="${config.containerId}">
<!-- JobVerse Widget will be rendered here -->
<!-- You can put this div anywhere in your HTML code to render the widget. -->
</div>
<script src="${process.env.NEXT_PUBLIC_BASE_URL}/widget.js" 
  data-job-id="${selectedJob.id}"
  data-container-id="${config.containerId}"
  data-config="${configParams}">
</script>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateScriptTag());
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Configuration Panel */}
            <motion.div
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobId">Select Job To Embed</Label>
                      <Select
                        value={selectedJob.id}
                        onValueChange={(value) =>
                          setSelectedJob(
                            jobs.find((job) => job.id === value) || jobs[0]
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobs.map((job) => (
                            <SelectItem key={job.id} value={job.id}>
                              {job.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Label htmlFor="containerId">Container ID</Label>
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="size-4 text-muted-foreground shrink-0 mt-0.5 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-52">
                              The ID of the HTML element where the widget will
                              be rendered in your code.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="containerId"
                        value={config.containerId}
                        onChange={(e) =>
                          setConfig({ ...config, containerId: e.target.value })
                        }
                        placeholder="Enter container ID"
                      />
                    </div>
                    <section className="grid grid-cols-3 gap-10">
                      <div className="space-y-2">
                        <Label>Primary Color</Label>
                        <Input
                          onClick={(e) => {
                            if (!canCustomizeEmbeddings(companySubscription)) {
                              e.preventDefault();
                              setOpenCompanyPremiumModal(true);
                            }
                            return;
                          }}
                          type="color"
                          id="primaryColor"
                          value={config.primaryColor}
                          onChange={(e) => {
                            setConfig({
                              ...config,
                              primaryColor: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Secondary Color</Label>
                        <Input
                          onClick={(e) => {
                            if (!canCustomizeEmbeddings(companySubscription)) {
                              e.preventDefault();
                              setOpenCompanyPremiumModal(true);
                            }
                            return;
                          }}
                          type="color"
                          id="secondaryColor"
                          value={config.secondaryColor}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              secondaryColor: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Accent Color</Label>
                        <Input
                          onClick={(e) => {
                            if (!canCustomizeEmbeddings(companySubscription)) {
                              e.preventDefault();
                              setOpenCompanyPremiumModal(true);
                            }
                            return;
                          }}
                          type="color"
                          id="accentColor"
                          value={config.accentColor}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              accentColor: e.target.value,
                            })
                          }
                        />
                      </div>
                    </section>

                    <div className="space-y-2">
                      <Label>Border Radius</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[config.borderRadius]}
                          min={0}
                          max={20}
                          step={1}
                          onValueChange={(value) => {
                            if (!canCustomizeEmbeddings(companySubscription)) {
                              setOpenCompanyPremiumModal(true);
                              return;
                            }
                            setConfig({ ...config, borderRadius: value[0] });
                          }}
                          className="flex-1"
                        />
                        <span className="w-10 text-center">
                          {config.borderRadius}px
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="showLogo" className="cursor-pointer">
                        Show Company Logo
                      </Label>
                      <Switch
                        id="showLogo"
                        checked={config.showLogo}
                        onCheckedChange={(checked) => {
                          if (!canCustomizeEmbeddings(companySubscription)) {
                            setOpenCompanyPremiumModal(true);
                            return;
                          }
                          setConfig({ ...config, showLogo: checked });
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="showApplyButton"
                        className="cursor-pointer"
                      >
                        Show Apply Button
                      </Label>
                      <Switch
                        id="showApplyButton"
                        checked={config.showApplyButton}
                        onCheckedChange={(checked) => {
                          if (!canCustomizeEmbeddings(companySubscription)) {
                            setOpenCompanyPremiumModal(true);
                            return;
                          }
                          setConfig({ ...config, showApplyButton: checked });
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showBranding" className="cursor-pointer">
                        Show JobVerse Branding
                      </Label>
                      <Switch
                        id="showBranding"
                        checked={config.showBranding}
                        onCheckedChange={(checked) => {
                          if (!canCustomizeEmbeddings(companySubscription)) {
                            setOpenCompanyPremiumModal(true);
                            return;
                          }
                          setConfig({ ...config, showBranding: checked });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="note">Note</Label>
                      <Textarea
                        className="resize-none h-28"
                        id="note"
                        value={config.note}
                        onChange={(e) => {
                          if (!canCustomizeEmbeddings(companySubscription)) {
                            setOpenCompanyPremiumModal(true);
                            return;
                          }
                          setConfig({ ...config, note: e.target.value });
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        You can wrote some few lines that will render in your
                        embedding too
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Copy the code below and paste it into your website where
                      you want the job widget to appear.
                    </p>
                  </div>

                  <div className="relative">
                    <pre className="p-4 bg-muted rounded-md text-xs overflow-x-auto whitespace-pre-wrap">
                      {generateScriptTag()}
                    </pre>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preview Panel */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Live Preview</h2>
                <div
                  className={cn(
                    "border rounded-lg p-6 bg-background",
                    "transition-all duration-300 ease-in-out"
                  )}
                >
                  <WidgetPreview job={selectedJob} config={config} />
                </div>
              </div>

              <motion.div
                className="mt-8 p-6 bg-muted rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  How to Use the JobVerse Widget
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">1. Configure Your Widget</h3>
                    <p className="text-muted-foreground">
                      Use the controls on the left to customize how your job
                      listing will appear on your website.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">2. Copy the Code</h3>
                    <p className="text-muted-foreground">
                      Copy the generated code snippet from the box above.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">3. Paste on Your Website</h3>
                    <p className="text-muted-foreground">
                      Paste the code into your website's HTML where you want the
                      job listing to appear.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">4. That's it!</h3>
                    <p className="text-muted-foreground">
                      The widget will automatically load your job listing with
                      the customizations you've selected.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
