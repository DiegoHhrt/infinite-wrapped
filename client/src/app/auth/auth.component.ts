import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
    ngOnInit(): void {
        this.authService.handleAuthCallback();
        console.log('login');
    }
    private readonly authService = inject(AuthService);
}
