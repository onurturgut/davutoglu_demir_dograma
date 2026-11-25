"use client";
import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Heading2,
  Heading3,
  Pilcrow,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type RichNode, safeUrl } from "@/lib/cms/model";
import { MediaImage } from "./media-image";
export function RichTextEditor({
  value,
  onChange,
}: {
  value: RichNode;
  onChange: (node: RichNode) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false },
      }),
      Image,
    ],
    content: toEditorNode(value),
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  });
  if (!editor) return <div className="rich-loading">Editör hazırlanıyor…</div>;
  const tools = [
    {
      icon: Heading2,
      label: "H2 başlık",
      run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: Heading3,
      label: "H3 başlık",
      run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: Pilcrow,
      label: "Paragraf",
      run: () => editor.chain().focus().setParagraph().run(),
    },
    {
      icon: Bold,
      label: "Kalın",
      run: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      label: "İtalik",
      run: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: List,
      label: "Liste",
      run: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: ListOrdered,
      label: "Numaralı liste",
      run: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: Quote,
      label: "Alıntı",
      run: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      icon: LinkIcon,
      label: "Bağlantı veya iç bağlantı",
      run: () => {
        const url = window.prompt("Bağlantı (https://… veya /hizmetler/…)");
        if (url && safeUrl(url))
          editor.chain().focus().setLink({ href: url }).run();
      },
    },
    {
      icon: ImageIcon,
      label: "Görsel ekle",
      run: () => {
        const url = window.prompt("Görsel URL");
        if (url && safeUrl(url, true))
          editor
            .chain()
            .focus()
            .setImage({
              src: url,
              alt: window.prompt("Alternatif metin") || "",
            })
            .run();
      },
    },
    {
      icon: Undo,
      label: "Geri al",
      run: () => editor.chain().focus().undo().run(),
    },
    {
      icon: Redo,
      label: "Yinele",
      run: () => editor.chain().focus().redo().run(),
    },
  ];
  return (
    <div className="rich-editor">
      <div className="rich-toolbar">
        {tools.map((t) => (
          <Button
            key={t.label}
            variant="ghost"
            size="icon"
            type="button"
            title={t.label}
            aria-label={t.label}
            onClick={t.run}
          >
            <t.icon size={17} />
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
export function RichContent({ node }: { node: RichNode }) {
  const children = node.content?.map((child, i) => (
    <RichContent key={i} node={child} />
  ));
  if (node.type === "text") {
    let text: React.ReactNode = node.text || "";
    for (const mark of node.marks || []) {
      if (mark.type === "bold") text = <strong>{text}</strong>;
      if (mark.type === "italic") text = <em>{text}</em>;
      if (mark.type === "link") {
        const href = safeUrl(String(mark.attrs?.["href"] || ""));
        if (href)
          text = (
            <a href={href} rel="noopener noreferrer">
              {text}
            </a>
          );
      }
    }
    return <>{text}</>;
  }
  switch (node.type) {
    case "doc":
      return <>{children}</>;
    case "paragraph":
      return <p>{children}</p>;
    case "heading":
      return node.attrs?.["level"] === 3 ? (
        <h3>{children}</h3>
      ) : (
        <h2>{children}</h2>
      );
    case "bulletList":
      return <ul>{children}</ul>;
    case "orderedList":
      return <ol>{children}</ol>;
    case "listItem":
      return <li>{children}</li>;
    case "blockquote":
      return <blockquote>{children}</blockquote>;
    case "hardBreak":
      return <br />;
    case "image":
      return (
        <MediaImage
          src={String(node.attrs?.["src"] || "")}
          alt={String(node.attrs?.["alt"] || "")}
        />
      );
    default:
      return <>{children}</>;
  }
}

function toEditorNode(node: RichNode): JSONContent {
  return {
    type: node.type,
    ...(node.text !== undefined ? { text: node.text } : {}),
    ...(node.attrs ? { attrs: node.attrs } : {}),
    ...(node.content ? { content: node.content.map(toEditorNode) } : {}),
    ...(node.marks
      ? {
          marks: node.marks.map((m) => ({
            type: m.type,
            ...(m.attrs ? { attrs: m.attrs } : {}),
          })),
        }
      : {}),
  };
}
