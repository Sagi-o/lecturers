import { Lecturer } from '@lecturers/shared-models';
import { api } from "../api-config"

export const lecturersApiService = {
    getAll: async (relations?: string[], languageIds?: string[]) => {        
        const { data } = await api.get<Lecturer[]>(`/lecturers?relations=${relations ?? ''}&languageIds=${languageIds ?? ''}`);
        return data;
    },
    get: async (id: string, relations?: string[]) => {
        const { data } = await api.get<Lecturer>(`/lecturers/${id}/?relations=${relations ?? ''}`);
        return data;
    },
    create: async (lecturer: Lecturer) => {
        const { data } = await api.post<Lecturer>(`/lecturers`, lecturer);
        return data;
    },
    delete: async (id: string) => {
        const { data } = await api.delete<Lecturer[]>(`/lecturers/${id}`);
        return data;
    },
}