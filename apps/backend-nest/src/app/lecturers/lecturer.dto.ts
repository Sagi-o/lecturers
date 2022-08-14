import { Lecturer } from '@lecturers/shared-models';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class LecturerDTO implements Lecturer {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsArray()
    languages: string[];
}