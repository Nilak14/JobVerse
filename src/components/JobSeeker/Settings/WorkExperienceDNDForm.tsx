import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import WorkExperienceFormItem from "./WorkExperienceFormItem";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ProfessionalDetailsSchemaType } from "@/schema/JobSeekerSettingSchema";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface WorkExperienceDNDFormProps {
  form: UseFormReturn<ProfessionalDetailsSchemaType>;
}

const WorkExperienceDNDForm = ({ form }: WorkExperienceDNDFormProps) => {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }
  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            Work Experience
          </h3>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            {...fields.map((field, i) => (
              <WorkExperienceFormItem
                index={i}
                form={form}
                id={field.id}
                remove={remove}
                key={field.id}
              />
            ))}
          </SortableContext>
        </DndContext>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              companyName: "",
              position: "",
              endDate: null,
              startDate: null,
              description: "",
            })
          }
          className="border-primary text-primary hover:bg-primary/5"
        >
          <Plus className="mr-1 h-4 w-4" /> Add Experience
        </Button>
      </div>
    </>
  );
};
export default WorkExperienceDNDForm;
