"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toggle } from "../ui/toggle";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import SanitizeHTML from "sanitize-html";
import { useFormContext } from "react-hook-form";
import { useTimeout } from "ahooks";

const CompanyDescriptionTiptap = ({ value }: { value: string }) => {
  const { setValue } = useFormContext();
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      let content = editor.getHTML();
      // content = SanitizeHTML(content, {
      //   allowedTags: [
      //     "b",
      //     "i",
      //     "em",
      //     "strong",
      //     "ul",
      //     "ol",
      //     "li",
      //     "p",
      //     "br",
      //     "span",
      //   ], // Add `ul`, `ol`, `li` for lists
      //   allowedAttributes: {
      //     "*": ["style", "class"],
      //   },
      //   allowedClasses: {
      //     ul: ["list-disc", "pl-4"],
      //     ol: ["list-decimal", "pl-4"],
      //     li: [],
      //   },
      // });
      setValue("description", content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    extensions: [
      Placeholder.configure({
        placeholder: "Say Something about Your Company",
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
    content: value,
  });
  useTimeout(() => {
    if (editor) {
      editor.commands.setContent(value);
    }
  }, 100);
  return (
    <div className="flex flex-col gap-2">
      {editor && (
        <div className="border border-input rounded-md">
          <Toggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            size={"sm"}
          >
            <Bold className="size-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            size={"sm"}
          >
            <Italic className="size-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            size={"sm"}
          >
            <Strikethrough className="size-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            size={"sm"}
          >
            <ListOrdered className="size-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            size={"sm"}
          >
            <List className="size-4" />
          </Toggle>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default CompanyDescriptionTiptap;
