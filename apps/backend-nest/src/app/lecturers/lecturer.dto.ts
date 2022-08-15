import { Lecturer } from '@lecturers/shared-models';
import { IsArray, IsString } from 'class-validator';

export class LecturerDTO implements Lecturer {
    @IsString()
    name: string;

    // Should be: @IsEmail(), for simplicity on the frontend made it only IsString
    @IsString()
    email: string;

    @IsArray()
    languages: string[];
}