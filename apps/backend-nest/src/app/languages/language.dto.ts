import { Language } from '@lecturers/shared-models';
import { IsString } from 'class-validator';

export class LanguageDTO implements Language {
    @IsString()
    name: string;
}