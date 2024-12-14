import { Artist, Track } from '@spotify/web-api-ts-sdk';

export interface UserTopItemsResponse {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}

export interface UserTopArtistsResponse extends UserTopItemsResponse {
    items: Artist[];
}

export interface UserTopTracksResponse extends UserTopItemsResponse {
    items: Track[];
}
