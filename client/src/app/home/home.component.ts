import { Component, inject, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { UserInfo } from '../intefaces/user-info.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { UserBadgeComponent } from '../user-badge/user-badge.component';
import { SharedModule } from '../shared/shared.module';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [SharedModule, UserBadgeComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {}
