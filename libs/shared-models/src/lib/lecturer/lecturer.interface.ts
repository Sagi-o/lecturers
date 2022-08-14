import { BaseEntity } from "../base/base.interface";

export interface Lecturer extends BaseEntity {
    name: string;
    email: string;
    languages: string[];
}