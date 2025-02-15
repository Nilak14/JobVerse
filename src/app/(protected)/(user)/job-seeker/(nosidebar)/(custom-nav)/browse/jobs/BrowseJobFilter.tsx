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
import { jobTypes, SalaryRate, workMode } from "@/lib/enums/CreateJobEnums";
import { Filter, X } from "lucide-react";
import { useState } from "react";
const BrowsePageFilter = () => {
  const [values, setValues] = useState([0, 100000]);
  return (
    // <Container className="bg-sidebar">

    <div className="px-4 pt-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between gap-2">
          <Filter size={24} />
          <h2>Job Filters</h2>
        </div>
        <Button variant={"outline"}>
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
                <Checkbox id={mode} />
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
                <Checkbox id={type} />
                <Label className="cursor-pointer" htmlFor={type}>
                  {type}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="salary range">
          <AccordionTrigger>Salary </AccordionTrigger>
          <AccordionContent>
            <RadioGroup className="grid grid-cols-2 gap-5">
              {SalaryRate.map((rate) => (
                <div key={rate} className="flex items-center space-x-2">
                  <RadioGroupItem value={rate} id={rate} />
                  <Label htmlFor={rate}>
                    {rate === "Day" ? "Daily" : rate + "ly"}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="px-4">
              <DualRangeSlider
                className="mt-10 "
                label={(value) => <span>{value}</span>}
                value={values}
                onValueChange={setValues}
                min={0}
                max={100000}
                step={1000}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="exp-level">
          <AccordionTrigger>Experience Level</AccordionTrigger>
          <AccordionContent className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id={`0`} />
              <Label className="cursor-pointer" htmlFor={`0`}>
                Fresher
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id={`1-3`} />
              <Label className="cursor-pointer" htmlFor={`1-3`}>
                1-3 years
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id={`3-5`} />
              <Label className="cursor-pointer" htmlFor={`3-5`}>
                3-5 years
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id={`5+`} />
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
