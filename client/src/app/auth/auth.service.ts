import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly scope = 'user-read-private user-read-email user-top-read';
    private codeVerifier?: string;
    // private readonly hashed?: ArrayBuffer;
    // private readonly codeChallenge: string;
    private readonly clientId = environment.clientId;
    private readonly redirectUri = environment.redirectUri;
    private authUrl = environment.spotifyAuthUrl;
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);

    constructor() {}

    async authLogin() {
        this.codeVerifier = this.generateRandomString(64);
        const hashed = await this.sha256(this.codeVerifier);
        const codeChallenge = this.base64encode(hashed);

        window.localStorage.setItem('code_verifier', this.codeVerifier);

        const params = {
            response_type: 'code',
            client_id: this.clientId,
            scope: this.scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: this.redirectUri,
        };

        const searchParams = new URLSearchParams(params);
        window.location.href = `https://accounts.spotify.com/authorize?${searchParams.toString()}`;
    }

    handleAuthCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            this.exchangeToken(code);
        }
    }
    private exchangeToken(code: string) {
        const body = new HttpParams({
            fromObject: {
                client_id: this.clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: this.redirectUri,
                code_verifier:
                    this.codeVerifier ??
                    window.localStorage.getItem('code_verifier') ??
                    '',
            },
        });
        this.http
            .post('https://accounts.spotify.com/api/token', body.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .subscribe((response: any) => {
                localStorage.setItem(
                    'spotify_access_token',
                    response.access_token
                );
                this.router.navigate(['/']);
            });
    }

    private generateRandomString(length: number) {
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce(
            (acc, x) => acc + possible[x % possible.length],
            ''
        );
        // const array = new Uint32Array(56 / 2);
        // crypto.getRandomValues(array);
        // return Array.from(array, (dec) =>
        //     ('0' + dec.toString(16)).substr(-2)
        // ).join('');
    }

    private async sha256(plain: string) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }

    private base64encode(input: ArrayBuffer) {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    getToken = () => {
        return localStorage.getItem('spotify_access_token') ?? '';
    };
}
