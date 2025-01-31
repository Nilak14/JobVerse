"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import JobDescriptionMenuBar from "./JobDescriptionMenuBar";
import { useFormContext } from "react-hook-form";
import { useTimeout } from "ahooks";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { form } from "framer-motion/client";
const JobDescriptionTipTap = ({ field }: { field: any }) => {
  // const { setValue } = useFormContext();
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[250px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none  p-4 max-w-none dark:prose-invert",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      let content = editor.getHTML();
      field.onChange(content);
    },
    extensions: [
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
      Placeholder.configure({
        placeholder:
          "Describe more about the jobs with roles and responsibilities",
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-3  before-pointer-events-none first:before:text-muted-foreground",
      }),
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
    ],
    content: field.value,
  });
  useTimeout(() => {
    if (editor) {
      editor.commands.setContent(field.value);
    }
  }, 100);
  return (
    <div className="flex  flex-col gap-2">
      <JobDescriptionMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default JobDescriptionTipTap;
