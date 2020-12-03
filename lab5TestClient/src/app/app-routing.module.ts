import { Routes } from '@angular/router';
import { LoginContainerComponent } from './login-page/container/login-container/login-container.component';
import { HomePageComponent } from './home-page/container/home-page/home-page.component';

export const routes: Routes = [

  {
    path: 'login-page',
    component: LoginContainerComponent,
  },
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    component: HomePageComponent
  }

];
