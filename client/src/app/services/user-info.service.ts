import { environment } from '../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../intefaces/user-info.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {
    private readonly spotifyApiUrl = environment.spotifyApiUrl;
    private readonly http: HttpClient = inject(HttpClient);
    private readonly authService = inject(AuthService);

    private token?: string;

    constructor() {
        this.token = this.authService.getToken();
    }

    setHeaders = (): HttpHeaders => {
        return new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
        });
    };

    getProfileInfo = (): Observable<UserInfo> => {
        const headers = this.setHeaders();
        return this.http.get<UserInfo>(`${this.spotifyApiUrl}/me`, { headers });
    };
}
