/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { useEffect } from "react";
import CustomTipTapMenuBar from "./CustomTipTapMenuBar";
import HardBreak from "@tiptap/extension-hard-break";

interface TipTapEditorProps {
  field: any;
  height?: number;
  aiContent?: string;
}

export default function CustomTipTapEditor({
  field,
  height = 300,
  aiContent,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            "Shift-Enter": () => this.editor.commands.setHardBreak(),
          };
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
    ],
    editorProps: {
      attributes: {
        class: `prose  focus:outline-none min-h-[${height}px] p-4 max-w-none dark:prose-invert`,
      },
    },

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "",
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && field.value && editor.getHTML() !== field.value) {
      let { from, to } = editor.state.selection;
      editor.commands.setContent(JSON.parse(field.value));
      editor.commands.setTextSelection({ from, to });
    }
  }, [editor, field.value]);

  useEffect(() => {
    if (editor && aiContent) {
      editor.commands.setContent("");
      editor.commands.setContent(JSON.parse(aiContent));
      field.onChange(JSON.stringify(editor.getJSON()));
    }
  }, [editor, aiContent]);

  return (
    <div className="w-full">
      <div className="border rounded-lg overflow-hidden bg-card">
        <CustomTipTapMenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
