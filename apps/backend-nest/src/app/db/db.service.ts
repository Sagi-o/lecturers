import { Injectable } from '@nestjs/common';
import { db } from './db.mock';
import { DatabaseError, RepoKeyType, RepoDataType } from './db.types';
import { generateRandomID } from './db.utils';

@Injectable()
export class DatabaseService {
    getAll(repoKeyType: RepoKeyType, relations?: string[]) {
        const items = db[repoKeyType];
        if (!relations) return items;

        return items.map(item => this.get(repoKeyType, item.id, relations));
    }

    get(repoKeyType: RepoKeyType, id: string, relations?: string[]) {
        const item = this.getAll(repoKeyType).find(item => item.id === id);
        if (!item) throw DatabaseError.ITEM_NOT_FOUND;

        if (relations) {
            for (const relation of relations) {
                if (relation === repoKeyType || !item[relation]?.length) continue;

                const joinResult = item[relation].map((relationId: string) => this.get(relation as RepoKeyType, relationId));
                item[relation] = joinResult;
            }
        }

        return item;
    }

    create(repoKeyType: RepoKeyType, item: RepoDataType) {
        const itemWithId = { ...item, id: generateRandomID() };
        db[repoKeyType].push(itemWithId);
        return itemWithId;
    }

    delete(repoKeyType: RepoKeyType, id: string) {
        return db[repoKeyType] = db[repoKeyType].filter(item => item.id !== id);
    }
}
