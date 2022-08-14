import { Module } from '@nestjs/common';
import { LecturersService } from './lecturers.service';
import { LecturersController } from './lecturers.controller';
import { DatabaseModule } from '../db/db.module';

@Module({
    imports: [DatabaseModule],
    providers: [LecturersService],
    controllers: [LecturersController],
})
export class LecturersModule { }
