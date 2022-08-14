import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

@Module({
  imports: [DatabaseModule],
  providers: [LanguagesService],
  exports: [LanguagesService],
  controllers: [LanguagesController],
})
export class LanguagesModule {}
