import { Language, Lecturer } from "@lecturers/shared-models";

export type RepoKeyType = 'lecturers' | 'languages';
export type RepoDataType = Lecturer | Language
export type Database = Record<RepoKeyType, Array<RepoDataType>>;

export enum DatabaseError {
    ITEM_NOT_FOUND = 'ITEM_NOT_FOUND',
}