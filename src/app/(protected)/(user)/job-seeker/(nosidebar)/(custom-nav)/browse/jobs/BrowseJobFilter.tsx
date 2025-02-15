import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Separator } from "@/components/ui/separator";
import {
  JobType,
  jobTypes,
  SalaryRate,
  WorkMode,
  workMode,
} from "@/lib/enums/CreateJobEnums";
import { Filter, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
const BrowsePageFilter = () => {
  const searchParams = useSearchParams();

  const getInitial = (key: string, validValues: string[]): string[] => {
    const params = searchParams.get(key);
    if (!params) return [];
    return params.split(",").filter((val) => validValues.includes(val));
  };

  const [selectedWorkMode, setSelectedWorkMode] = useState<WorkMode[]>(
    () => getInitial("workMode", workMode) as WorkMode[]
  );
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>(
    () => getInitial("jobTypes", jobTypes) as JobType[]
  );
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(() =>
    getInitial("experienceLevel", ["0", "1-3", "3-5", "5+"])
  );

  const updateUrl = (paramsToUpdate: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.delete("cursor");
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const toggleSelection = (
    value: string,
    selected: string[],
    setter: (arr: any[]) => void,
    paraName: string
  ) => {
    const updated = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    setter(updated);
    updateUrl({ [paraName]: updated.length ? updated.join(",") : undefined });
  };

  const handleReset = () => {
    setSelectedExperienceLevel([]);
    setSelectedJobTypes([]);
    setSelectedWorkMode([]);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("experienceLevel");
    params.delete("jobTypes");
    params.delete("workMode");
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return (
    <div className="px-4 pt-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between gap-2">
          <Filter size={24} />
          <h2>Job Filters</h2>
        </div>
        <Button onClick={handleReset} variant={"outline"}>
          <X />
          Reset
        </Button>
      </div>
      <Separator />
      <Accordion type="multiple" className="w-full pt-5">
        <AccordionItem value="work mode">
          <AccordionTrigger>Work Mode</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-5">
            {workMode.map((mode) => (
              <div key={mode} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedWorkMode.includes(mode)}
                  onCheckedChange={() => {
                    toggleSelection(
                      mode,
                      selectedWorkMode,
                      setSelectedWorkMode,
                      "workMode"
                    );
                  }}
                  id={mode}
                />
                <Label className="cursor-pointer" htmlFor={mode}>
                  {mode}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="job-types">
          <AccordionTrigger>Job Types</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-5">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={() => {
                    toggleSelection(
                      type,
                      selectedJobTypes,
                      setSelectedJobTypes,
                      "jobTypes"
                    );
                  }}
                  checked={selectedJobTypes.includes(type)}
                  id={type}
                />
                <Label className="cursor-pointer" htmlFor={type}>
                  {type}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="exp-level">
          <AccordionTrigger>Experience Level</AccordionTrigger>
          <AccordionContent className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedExperienceLevel.includes("0")}
                onCheckedChange={() => {
                  toggleSelection(
                    "0",
                    selectedExperienceLevel,
                    setSelectedExperienceLevel,
                    "experienceLevel"
                  );
                }}
                id={`0`}
              />
              <Label className="cursor-pointer" htmlFor={`0`}>
                Fresher
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedExperienceLevel.includes("1-3")}
                onCheckedChange={() => {
                  toggleSelection(
                    "1-3",
                    selectedExperienceLevel,
                    setSelectedExperienceLevel,
                    "experienceLevel"
                  );
                }}
                id={`1-3`}
              />
              <Label className="cursor-pointer" htmlFor={`1-3`}>
                1-3 years
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedExperienceLevel.includes("3-5")}
                onCheckedChange={() => {
                  toggleSelection(
                    "3-5",
                    selectedExperienceLevel,
                    setSelectedExperienceLevel,
                    "experienceLevel"
                  );
                }}
                id={`3-5`}
              />
              <Label className="cursor-pointer" htmlFor={`3-5`}>
                3-5 years
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedExperienceLevel.includes("5+")}
                onCheckedChange={() => {
                  toggleSelection(
                    "5+",
                    selectedExperienceLevel,
                    setSelectedExperienceLevel,
                    "experienceLevel"
                  );
                }}
                id={`5+`}
              />
              <Label className="cursor-pointer" htmlFor={`5+`}>
                5+ years
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    // </Container>
  );
};
export default BrowsePageFilter;
