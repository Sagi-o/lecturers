import { Language, Lecturer } from '@lecturers/shared-models';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { RepoKeyType } from '../db/db.types';
import { getArrayFromQuery } from '../db/db.utils';
import { LanguagesService } from '../languages/languages.service';
import { LecturerDTO } from './lecturer.dto';
import { intersection, map } from 'lodash';

const REPO_KEY_TYPE: RepoKeyType = 'lecturers';

@Injectable()
export class LecturersService {
    constructor(
        private dbService: DatabaseService,
        private languagesService: LanguagesService,
    ) { }

    getAll(relations?: string, languageIdsFilter?: string) {
        const relationsArray = getArrayFromQuery(relations);
        const languageIdsFilterArray = getArrayFromQuery(languageIdsFilter);

        const lecturers = this.dbService.getAll(REPO_KEY_TYPE, relationsArray);

        // Filter by languageIds when provided
        if (languageIdsFilterArray) {
            return lecturers.filter((lecturer: Lecturer) => {
                const { languages } = lecturer;

                if (relations) {
                    const languageIds = map(languages, 'id');
                    return !!intersection(languageIds, languageIdsFilterArray).length;
                } else {
                    return !!intersection(languages, languageIdsFilterArray).length;
                }
            })
        }

        return lecturers;
    }

    get(id: string, relations?: string) {
        const relationsArray = getArrayFromQuery(relations);
        return this.dbService.get(REPO_KEY_TYPE, id, relationsArray);
    }

    create(lecturer: LecturerDTO) {
        const languages: Language[] = lecturer.languages?.map(name => this.languagesService.create({ name }));
        const languageIds = languages.map(({ id }) => id);
        return this.dbService.create(REPO_KEY_TYPE, { ...lecturer, languages: languageIds });
    }

    delete(id: string) {
        return this.dbService.delete(REPO_KEY_TYPE, id);
    }
}
