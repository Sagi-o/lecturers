import {
    Controller,
    Get,
    Post,
    UsePipes,
    Body,
    Delete,
    ValidationPipe,
    Param,
    Query,
} from '@nestjs/common';
import { LecturerDTO } from './lecturer.dto';
import { LecturersService } from './lecturers.service';

@Controller('lecturers')
export class LecturersController {
    constructor(private lecturersService: LecturersService) { }

    @Get()
    getAll(@Query('relations') relations?: string) {
        return this.lecturersService.getAll(relations);
    }

    @Get(':id')
    get(@Param('id') id: string, @Query('relations') relations?: string) {
        return this.lecturersService.get(id, relations);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() lecturer: LecturerDTO) {
        return this.lecturersService.create(lecturer);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.lecturersService.delete(id);
    }
}
