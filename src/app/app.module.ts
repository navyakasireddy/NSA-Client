import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdButtonModule, MdDialog } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { MyApp } from './components/app.component';
import { LoginPage } from "./components/login/login";
import { HomePage } from './components/home/home';
import { Message } from './components/nonModalMessages/nonModalMessage';
import { AboutPage } from './components/about/about';
import { SettingsPage } from './components/settings/settings';
import { Documents } from './components/documents/documents';
import { Plugins } from './components/plugins/plugins';
import { ModalDialog } from './components/plugins/modalDialog';
import { LoginDialog } from "./components/login/loginDialog";
import { DeleteDialog } from './components/common/deleteDialog';
import { AppService } from "./services/app.service";
//import {EventService} from "./services/event.service"
import { LoginService } from "./services/login.service";
import { StorageService } from "./services/storage.service";
import { FeatureService } from "./services/feature.service";
import { AdminDataService } from "./services/adminData.service";
import { PluginDataService } from "./services/pluginData.service";

import DynamicComponent from "./components/dynamicComponent/dynamic-component";
import { RouterModule, Routes } from "@angular/router";
import { UserInfoPage } from "./components/userInfo/userInfo";

import { AuthGuard } from './auth.guard';

import { TreeModule } from 'angular-tree-component';
import { CdkTableModule } from '@angular/cdk';



const routes: Routes = [
    //{
    //    path: 'home',
    //    component: HomePage,
    //    canActivate: [AuthGuard]
    //},
    {
        path: '',
        component: LoginPage,
         pathMatch: 'full'
    
    },
    //{
    //    path: 'home',
    //    component: HomePage,
    //    canActivate: [AuthGuard]

    //},
    {
        path: 'default',
        component: Documents
    },    
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'Documents',
        component: HomePage,
        canActivate: [AuthGuard],
        children: [           
            { path: 'Plug-ins', component: Plugins, pathMatch: 'full' },
            { path: '**', component: Documents, pathMatch: 'full' },
            //{
            //    path: ':id',
            //    component: ComponentViewer,
            //    children: [
            //        { path: '', redirectTo: 'overview', pathMatch: 'full' },
            //        { path: 'overview', component: ComponentOverview, pathMatch: 'full' },
            //        { path: 'api', component: ComponentApi, pathMatch: 'full' },
            //        { path: 'examples', component: ComponentExamples, pathMatch: 'full' },
            //        { path: '**', redirectTo: 'overview' },
            //    ],
            //},
        ],
    }
    ,{
        path: '**',
        redirectTo:'Documents',
        //children: [
        //    { path: '', component: Documents, pathMatch: 'full' },
        //    { path: '**', component: Documents, pathMatch: 'full' },
        //]
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
        UserInfoPage,
        Documents,
        Plugins,
        ModalDialog,
        DeleteDialog,
        LoginDialog
        
    ],
    imports: [
        HttpModule,
        TreeModule,
        FormsModule,        
        BrowserModule,
        BrowserAnimationsModule,
        MdButtonModule, 
        RouterModule.forRoot(routes),
        MaterialModule,
        CdkTableModule
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
        LoginPage,
        ModalDialog,
        DeleteDialog,
        LoginDialog        
    ],
    providers: [
        AppService,
        LoginService,
        StorageService,
        FeatureService,
        AdminDataService,
        PluginDataService,
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
