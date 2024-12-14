import { Component, inject, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { UserInfo } from '../intefaces/user-info.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    private spotify: UserInfoService = inject(UserInfoService);
    private authService = inject(AuthService);

    private token?: string;

    public userInfo?: UserInfo;
    ngOnInit(): void {
        this.token = this.authService.getToken();
    }

    queryData = () => {
        this.spotify
            .getProfileInfo()
            .subscribe((data) => (this.userInfo = data));
    };

    login = () => {
        this.authService.authLogin();
    };
}
