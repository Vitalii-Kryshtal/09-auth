import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const selectedTag = slug[0] === "All" ? undefined : slug[0];
  return {
    title: `Notes${selectedTag ? ` - ${selectedTag}` : "All Notes"}`,
    description: `Notes filtered by ${selectedTag || "All Notes"}`,
    openGraph: {
      title: `Notes${selectedTag ? ` - ${selectedTag}` : "All Notes"}`,
      description: `Notes filtered by ${selectedTag || "All Notes"}`,
      url: `https://09-auth-orcin.vercel.app/notes/filter/${slug.join("/")}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes${selectedTag ? ` - ${selectedTag}` : "All Notes"}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes${selectedTag ? ` - ${selectedTag}` : "All Notes"}`,
      description: `Notes filtered by ${selectedTag || "All Notes"}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const selectedTag = slug[0] === "All" ? undefined : slug[0];

  return <NotesClient tag={selectedTag} />;
}
