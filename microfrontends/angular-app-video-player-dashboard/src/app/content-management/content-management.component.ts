import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss'],
  standalone: true,
})
export class ContentManagementComponent {
  constructor(private router: Router) {}

  navigateToAnalytics(videoId: string): void {
    this.router.navigate(['/analytics', videoId]);
  }
}
