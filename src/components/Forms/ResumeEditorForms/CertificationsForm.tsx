import { ResumeEditorFormProps } from "@/lib/types";
import {
  certificationsSchema,
  CertificationValues,
} from "@/schema/ResumeEditorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import ResumeEditorFormShell from "./ResumeEditorFormShell";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
const CertificationForm = ({
  resumeData,
  setResumeData,
}: ResumeEditorFormProps) => {
  const form = useForm<CertificationValues>({
    defaultValues: {
      certification: resumeData.certification || [],
    },
    resolver: zodResolver(certificationsSchema),
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        certification: values.certification?.filter(
          (cert) => cert !== undefined
        ),
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "certification",
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
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }
  return (
    <ResumeEditorFormShell
      title="Certifications & Training"
      description="Elevate your resume with noteworthy credentials that prove you are an expert in your field."
    >
      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            sensors={sensors}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <CertificationsItem
                  id={field.id}
                  form={form}
                  index={index}
                  remove={remove}
                  key={field.id}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => {
                append({
                  title: "",
                  completionDate: "",
                  instituteName: "",
                });
              }}
            >
              Add More Certifications & Training
            </Button>
          </div>
        </form>
      </Form>
    </ResumeEditorFormShell>
  );
};

export default CertificationForm;

interface CertificationsItemProps {
  form: UseFormReturn<CertificationValues>;
  index: number;
  remove: (index: number) => void;
  id: string;
}
function CertificationsItem({
  id,
  form,
  index,
  remove,
}: CertificationsItemProps) {
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
        isDragging && "shadow-xl z-50 cursor-grabbing relative "
      )}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">
          Certification & Training {index + 1}
        </span>
        <GripHorizontal
          {...attributes}
          {...listeners}
          className="cursor-grab size-5 text-muted-foreground focus:outline-none"
        />
      </div>
      <FormField
        control={form.control}
        name={`certification.${index}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`certification.${index}.instituteName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Institute Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`certification.${index}.completionDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Achieved Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <Button
        variant={"destructive"}
        type="button"
        onClick={() => remove(index)}
      >
        Remove
      </Button>
    </div>
  );
}
