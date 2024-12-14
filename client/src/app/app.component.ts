import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserBadgeComponent } from './user-badge/user-badge.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HttpClientModule, UserBadgeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'client';
}
