import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { RepoKeyType } from '../db/db.types';
import { LanguageDTO } from './language.dto';

const REPO_KEY_TYPE: RepoKeyType = 'languages';

@Injectable()
export class LanguagesService {
    constructor(private dbService: DatabaseService) { }

    getAll() {
        return this.dbService.getAll(REPO_KEY_TYPE);
    }

    get(id: string) {
        return this.dbService.get(REPO_KEY_TYPE, id);
    }

    create(language: LanguageDTO) {
        return this.dbService.create(REPO_KEY_TYPE, language);
    }

    delete(id: string) {
        return this.dbService.delete(REPO_KEY_TYPE, id);
    }
}
