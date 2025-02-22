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
interface AddEducationFormItemProps {
  form: UseFormReturn<ProfessionalDetailsSchemaType>;
  index: number;
  remove: (index: number) => void;
  id: string;
}
const AddEducationFormItem = ({
  form,
  id,
  index,
  remove,
}: AddEducationFormItemProps) => {
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
        <span className="font-semibold">Education {index + 1}</span>
        <GripHorizontal
          {...attributes}
          {...listeners}
          className="cursor-grab size-5 text-muted-foreground focus:outline-none"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-3 sm:grid-cols-1">
        <FormField
          control={form.control}
          name={`education.${index}.degreeTitle`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input
                  placeholder="Bachelors in Information Technology"
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
          name={`education.${index}.instituteName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute Name</FormLabel>
              <FormControl>
                <Input placeholder="Informatics Collage" {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
        <FormField
          control={form.control}
          name={`education.${index}.instituteLocation`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute Location</FormLabel>
              <FormControl>
                <Input placeholder="Pokhara, Nepal" {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between  flex-wrap">
          <FormField
            control={form.control}
            name={`education.${index}.startDate`}
            render={({ field }) => (
              <FormItem className="flex flex-col  w-[240px] mt-3">
                <FormLabel>Start Date</FormLabel>
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
            name={`education.${index}.endDate`}
            render={({ field }) => (
              <FormItem className="flex flex-col w-[240px] mt-3 ">
                <FormLabel>End Date</FormLabel>
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
        </div>
      </div>

      <FormDescription>
        Leave <span className="font-semibold">End Date</span> empty if you are
        currently studying here
      </FormDescription>
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
export default AddEducationFormItem;
