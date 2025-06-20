import { Routes } from '@angular/router';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { VideoAnalyticsComponent } from './video-analytics/video-analytics.component';

export const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: VideoUploadComponent },
  { path: 'manage', component: ContentManagementComponent },
  { path: 'analytics/:id', component: VideoAnalyticsComponent },
];
