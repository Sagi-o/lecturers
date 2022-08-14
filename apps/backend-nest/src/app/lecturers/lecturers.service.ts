import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { RepoKeyType } from '../db/db.types';
import { getRelationsArray } from '../db/db.utils';
import { LecturerDTO } from './lecturer.dto';

const REPO_KEY_TYPE: RepoKeyType = 'lecturers';

@Injectable()
export class LecturersService {
    constructor(private dbService: DatabaseService) { }

    getAll(relations?: string) {
        const relationsArray = getRelationsArray(relations);
        return this.dbService.getAll(REPO_KEY_TYPE, relationsArray);
    }

    get(id: string, relations?: string) {
        const relationsArray = getRelationsArray(relations);
        return this.dbService.get(REPO_KEY_TYPE, id, relationsArray);
    }

    create(lecturer: LecturerDTO) {
        return this.dbService.create(REPO_KEY_TYPE, lecturer);
    }

    delete(id: string) {
        return this.dbService.delete(REPO_KEY_TYPE, id);
    }
}
