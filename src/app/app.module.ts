import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdButtonModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MyApp} from './components/app.component';
import {LoginPage} from "./components/login/login";
import {HomePage} from './components/home/home';
import {Message} from './components/nonModalMessages/nonModalMessage';
import {AboutPage} from './components/about/about';
import {SettingsPage} from './components/settings/settings';



import {AppService} from "./services/app.service";
//import {EventService} from "./services/event.service"
import {LoginService} from "./services/login.service";
import {StorageService} from "./services/storage.service";
import {FeatureService} from "./services/feature.service";

import DynamicComponent from "./components/dynamicComponent/dynamic-component";
import {RouterModule, Routes} from "@angular/router";
import {UserInfoPage} from "./components/userInfo/userInfo";

import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [AuthGuard] 
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  { path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    SettingsPage,
    LoginPage,
    Message,
    DynamicComponent,
    UserInfoPage
  ],
  imports: [
    HttpModule,
    
   
    FormsModule,
    
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    RouterModule.forRoot(routes),
    MaterialModule
  ],
  exports: [
    MaterialModule,
    MdButtonModule
  ],
  bootstrap: [MyApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage
  ],
  providers: [
    AppService, 
    LoginService, 
    StorageService, 
    FeatureService, 
    AuthGuard]
})
export class AppModule {
  public static availableApps: any = [];
}

export interface ModuleConfiguration {
  landingPage: any; //TODO: change to route
  nameOnCard: string;
  imageOnCard: string;
  routes: Routes;
}
