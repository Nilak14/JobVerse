import { Button } from "@/components/ui/button";
import { ProfessionalDetailsSchemaType } from "@/schema/JobSeekerSettingSchema";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Award, Plus } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import AddCertificationFormItem from "./AddCertificationFormItem";

interface AddCertificationDNDFormProps {
  form: UseFormReturn<ProfessionalDetailsSchemaType>;
}
const AddCertificationDNDForm = ({ form }: AddCertificationDNDFormProps) => {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "certifications",
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Award className="mr-2 h-5 w-5 text-primary" />
          Certifications
        </h3>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {...fields.map((field, index) => (
            <AddCertificationFormItem
              index={index}
              key={field.id}
              form={form}
              id={field.id}
              remove={() => remove(index)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Button
        onClick={() =>
          append({
            title: "",
            institute: "",
            completionDate: null,
            description: "",
          })
        }
        type="button"
        variant="outline"
        size="sm"
        className="border-primary text-primary hover:bg-primary/5"
      >
        <Plus className="mr-1 h-4 w-4" /> Add Certifications
      </Button>
    </div>
  );
};
export default AddCertificationDNDForm;
