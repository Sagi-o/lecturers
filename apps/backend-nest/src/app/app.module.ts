import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LecturersModule } from './lecturers/lecturers.module';
import { LanguagesService } from './languages/languages.service';
import { LanguagesModule } from './languages/languages.module';
import { DatabaseModule } from './db/db.module';

@Module({
  imports: [
    DatabaseModule,
    LecturersModule,
    LanguagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, LanguagesService],
})
export class AppModule {}
