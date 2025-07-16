import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateForm.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Note",
  description:
    "Effortlessly create a new note in NoteHub — the smart app for capturing and organizing your thoughts.",
  openGraph: {
    title: "Create New Note",
    description:
      "Effortlessly create a new note in NoteHub — the smart app for capturing and organizing your thoughts.",
    url: "https://09-auth-orcin.vercel.app/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create New Note",
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <div>
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
          <NoteForm />
        </div>
      </main>
    </div>
  );
};
export default CreateNote;
