import { BaseEntity } from "../base/base.interface";
import { Language } from "../language/language.interface";

export interface Lecturer extends BaseEntity {
    name: string;
    email: string;
    languages: string[] | Language[];
}