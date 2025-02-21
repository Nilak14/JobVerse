import { cn } from "@/lib/utils";
import { ProfessionalDetailsSchemaType } from "@/schema/JobSeekerSettingSchema";
import { useSortable } from "@dnd-kit/sortable";
import { UseFormReturn } from "react-hook-form";
import { CSS } from "@dnd-kit/utilities";
import { CalendarIcon, GripHorizontal } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
interface AddCertificationFormItemProps {
  form: UseFormReturn<ProfessionalDetailsSchemaType>;
  index: number;
  remove: (index: number) => void;
  id: string;
}
const AddCertificationFormItem = ({
  form,
  id,
  index,
  remove,
}: AddCertificationFormItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "space-y-3 border rounded-md bg-background p-3",
        isDragging && "shadow-xl z-50 cursor-grab relative"
      )}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">
          Certification/Training {index + 1}
        </span>
        <GripHorizontal
          {...attributes}
          {...listeners}
          className="cursor-grab size-5 text-muted-foreground focus:outline-none"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-3 sm:grid-cols-1">
        <FormField
          control={form.control}
          name={`certifications.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Microsoft Certified: Azure Administrator"
                  {...field}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`certifications.${index}.institute`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input
                  placeholder="Microsoft Cooperation"
                  {...field}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name={`certifications.${index}.completionDate`}
        render={({ field }) => (
          <FormItem className="flex flex-col w-fit ">
            <FormLabel>Completion Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    field.value instanceof Date ? field.value : undefined
                  }
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`certifications.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea className="resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        variant={"destructive"}
        type="button"
        onClick={() => remove(index)}
      >
        Remove
      </Button>
    </div>
  );
};
export default AddCertificationFormItem;
