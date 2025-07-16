"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { NewNoteData, Tag } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const onClose = () => router.back();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      onClose();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const newNoteData: NewNoteData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as Tag,
    };

    mutate(newNoteData);
  };

  return (
    <>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            required
            defaultValue={draft.title}
            onChange={handleChange}
            id="title"
            name="title"
            type="text"
            className={css.input}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            defaultValue={draft.content}
            className={css.textarea}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            onChange={handleChange}
            value={draft.tag}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button
            disabled={isPending}
            type="submit"
            className={css.submitButton}
          >
            {isPending ? "Creating... " : "Create note"}
          </button>
        </div>
      </form>
    </>
  );
}
