"use client";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface ContentViewerProps {
  content: any;
}

const ContentViewer = ({ content }: ContentViewerProps) => {
  const editor = useEditor({
    extensions: [
      Link.configure({
        openOnClick: false,
      }),
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
    ],
    content: JSON.parse(content),
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(JSON.parse(content));
    }
  }, [content, editor]);
  if (!editor) return null;

  return (
    <div className="prose max-w-full prose-sm text-muted-foreground dark:prose-invert">
      <EditorContent editor={editor} />
    </div>
  );
};

export default ContentViewer;
