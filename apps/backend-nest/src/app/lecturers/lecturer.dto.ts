import { Lecturer } from '@lecturers/shared-models';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class LecturerDTO implements Lecturer {
    @IsString()
    name: string;

    // SHould be: @IsEmail(), for simplicity on the frontend made it only IsString
    @IsString()
    email: string;

    @IsArray()
    languages: string[];
}