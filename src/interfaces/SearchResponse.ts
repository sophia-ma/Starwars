import { Character } from './Character';

export interface SearchResponse {
    count: number;
    next: string;
    previous: string;
    results:  Character[];
}
