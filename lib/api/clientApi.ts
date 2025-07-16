import { NewNoteData, Note } from "@/types/note";
import { User } from "@/types/user";
import { nextServer } from "./api";
import { FetchNotesProps, FetchNotesResponse } from "./serverApi";

export type AuthRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username: string;
};

export const fetchNotes = async ({ search, page, tag }: FetchNotesProps) => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search !== "" && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (newNote: NewNoteData) => {
  const response = await nextServer.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const login = async (data: AuthRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const register = async (data: AuthRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  await nextServer.get("/auth/session");
};

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get("/users/me");
  return res.data;
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const res = await nextServer.patch("/users/me", data);
  return res.data;
};
