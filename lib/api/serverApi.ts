import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { nextServer } from "./api";

export interface FetchNotesProps {
  search?: string;
  page?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type ServerBoolResponse = {
  success: boolean;
};

export const getServerMe = async (): Promise<User> => {
  const cookieData = await cookies();
  const { data } = await nextServer.get<User>(`/users/me`, {
    headers: { Cookie: cookieData.toString() },
  });
  return data;
};

export const fetchNotes = async ({ search, page, tag }: FetchNotesProps) => {
  const cookieStore = await cookies();

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search !== "" && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get<ServerBoolResponse>("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
