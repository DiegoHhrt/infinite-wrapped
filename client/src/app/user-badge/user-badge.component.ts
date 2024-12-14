import { Component, inject } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from '../shared/shared.module';
import { UserInfo } from '../intefaces/user-info.interface';
import { Artist, Track, UserProfile } from '@spotify/web-api-ts-sdk';

@Component({
    selector: 'user-badge',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './user-badge.component.html',
    styleUrl: './user-badge.component.scss',
})
export class UserBadgeComponent {
    private spotify: UserInfoService = inject(UserInfoService);
    private authService = inject(AuthService);

    public userInfo?: UserProfile;
    public profilePicUrl: string = '';

    public recentTopArtist?: Artist;
    public topArtistPicUrl: string = '';

    public recentTopTrack?: Track;
    public topTrackPicUrl: string = '';

    ngOnInit(): void {
        this.queryData();
    }

    queryData = () => {
        this.spotify.getProfileInfo().subscribe((data) => {
            this.userInfo = data;
            this.profilePicUrl = this.userInfo.images[0].url;
        });
        this.spotify.getUserTopArtists('medium_term', 1).subscribe((data) => {
            this.recentTopArtist = data.items[0];
            this.topArtistPicUrl = this.recentTopArtist.images[0].url;
        });
        this.spotify.getUserTopTracks('short_term', 1).subscribe((data) => {
            this.recentTopTrack = data.items[0];
            this.topTrackPicUrl = this.recentTopTrack.album.images[0].url;
        });
    };

    login = () => {
        this.authService.authLogin();
    };
}
