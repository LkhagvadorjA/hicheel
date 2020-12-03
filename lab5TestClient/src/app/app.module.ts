import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

import {StoreModule} from '@ngrx/store';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { ServiceService } from './service/service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginContainerComponent } from './login-page/container/login-container/login-container.component';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module/material.module';

import { BookTableComponent } from './home-page/common/book-table/book-table.component';
import { HomePageComponent } from './home-page/container/home-page/home-page.component';
import { simpleReducer } from './state management/reducer/simple.reducer';
import { AutheticationService } from './authentication/authetication.service';
import { userReducer } from './state management/reducer/user.reducer';
import { NotificationDialogComponent } from './home-page/common/notification-dialog/notification-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginContainerComponent,
    HomePageComponent,
    BookTableComponent,
    NotificationDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    StoreModule.forRoot(
      {
        user: userReducer,
        message: simpleReducer,
      }
      )
  ],
  providers: [ServiceService, AutheticationService],
  bootstrap: [AppComponent],
  entryComponents: [NotificationDialogComponent]
})
export class AppModule { }
