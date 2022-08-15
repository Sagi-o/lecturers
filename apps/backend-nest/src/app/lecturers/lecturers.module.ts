import { Module } from '@nestjs/common';
import { LecturersService } from './lecturers.service';
import { LecturersController } from './lecturers.controller';
import { DatabaseModule } from '../db/db.module';
import { LanguagesModule } from '../languages/languages.module';

@Module({
    imports: [DatabaseModule, LanguagesModule],
    providers: [LecturersService],
    controllers: [LecturersController],
})
export class LecturersModule { }
