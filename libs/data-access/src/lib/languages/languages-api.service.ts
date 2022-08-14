import { Language } from "@lecturers/shared-models";
import { api } from "../api-config"

export const languagesApiService = {
    getAll: async () => {
        const { data } = await api.get<Language[]>(`/languages`);
        return data;
    },
    get: async (id: string) => {
        const { data } = await api.get<Language>(`/languages/${id}`);
        return data;
    },
    create: async (language: Language) => {
        const { data } = await api.post<Language>(`/languages`, language);
        return data;
    },
    delete: async (id: string) => {
        const { data } = await api.post<Language[]>(`/languages/${id}`);
        return data;
    },
}