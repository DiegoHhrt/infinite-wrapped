import { environment } from '../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../intefaces/user-info.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import {
    Artist,
    TopTracksResult,
    Track,
    UserProfile,
} from '@spotify/web-api-ts-sdk';
import {
    UserTopArtistsResponse,
    UserTopTracksResponse,
} from '../intefaces/user-top-items.interface';

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {
    private readonly spotifyApiUrl = environment.spotifyApiUrl;
    private readonly http: HttpClient = inject(HttpClient);
    private readonly authService = inject(AuthService);
    private readonly userUrl = `${this.spotifyApiUrl}/me`;

    private token?: string;

    constructor() {
        this.token = this.authService.getToken();
    }

    setHeaders = (): HttpHeaders => {
        return new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
        });
    };

    getProfileInfo = (): Observable<UserProfile> => {
        const headers = this.setHeaders();
        return this.http.get<UserProfile>(this.userUrl, {
            headers,
        });
    };

    getUserTopArtists = (
        timeRange: string,
        limit?: number,
        offset?: number
    ): Observable<UserTopArtistsResponse> => {
        const headers = this.setHeaders();
        return this.http.get<UserTopArtistsResponse>(
            `${this.userUrl}/top/artists`,
            {
                headers,
                params: {
                    time_range: timeRange,
                    limit: limit?.toString() ?? '10',
                    offset: offset?.toString() ?? '0',
                },
            }
        );
    };
    getUserTopTracks = (
        timeRange: string,
        limit?: number,
        offset?: number
    ): Observable<UserTopTracksResponse> => {
        const headers = this.setHeaders();
        return this.http.get<UserTopTracksResponse>(
            `${this.userUrl}/top/tracks`,
            {
                headers,
                params: {
                    time_range: timeRange,
                    limit: limit?.toString() ?? '10',
                    offset: offset?.toString() ?? '0',
                },
            }
        );
    };
}
