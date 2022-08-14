import {
    Controller,
    Get,
    Post,
    UsePipes,
    Body,
    Delete,
    ValidationPipe,
    Param,
} from '@nestjs/common';
import { LanguageDTO } from './language.dto';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
    constructor(private languagesService: LanguagesService) { }

    @Get()
    getAll() {
        return this.languagesService.getAll();
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.languagesService.get(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() language: LanguageDTO) {
        return this.languagesService.create(language);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.languagesService.delete(id);
    }
}
