import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdButtonModule, MdDialog } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CdkTableModule } from '@angular/cdk/table';
import { Logger, Options } from "angular2-logger/core";
import { Media } from "./components/media/media";
import { TreeModule } from 'angular-tree-component';
import { ChartsModule } from 'ng2-charts';

// forms
import { MyApp } from './components/app.component';
import { LoginPage } from "./components/login/login";
import { HomePage } from './components/home/home';
import { Message } from './components/nonModalMessages/nonModalMessage';
import { AboutPage } from './components/about/about';
import { SettingsPage } from './components/settings/settings';
import { Plugins } from './components/plugins/plugins';
import { UserInfoPage } from "./components/userInfo/userInfo";
import { GlobalPools } from './components/globalPools/globalPools';
import { ServerPools } from "./components/serverPools/serverPools";
import { ExternalMedia } from "./components/externalMedia/extMedia";

//Dialogs
import { MediaDialog } from "./components/media/MediaDialog";
import { InfoDialog } from "./components/media/InfoDialog";
import { ModalDialog } from './components/plugins/modalDialog';
import { DeleteDialog } from './components/common/deleteDialog';
import { GlobalPoolDialog } from './components/globalPools/gpDialog';
import { ServerPoolDialog } from "./components/serverPools/spDialog";
import { ExtMediaDialog } from "./components/externalMedia/extMediaDialog";

//Services
import { LoginService } from "./services/login.service";
import { StorageService } from "./services/storage.service";
import { FeatureService } from "./services/feature.service";
import { AdminDataService } from "./services/adminData.service";
import { PluginDataService } from "./services/pluginData.service";
import { DocMediaService } from "./services/documentMedia.service";
import { MediaPoolsService } from "./services/mediapools.service";

import { AuthGuard } from './auth.guard';


const routes: Routes = [
    {
        path: '',
        component: LoginPage,
        pathMatch: 'full'

    },

    {
        path: 'default',
        component: AboutPage
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
            { path: 'Media/Cloud media', component: ExternalMedia, pathMatch: 'full' },
            { path: 'Media/:type', component: Media, pathMatch: 'full' },
            { path: 'Server pools', component: ServerPools, pathMatch: 'full' },
            { path: 'Global pools', component: GlobalPools, pathMatch: 'full' },
            { path: '**', component: AboutPage, pathMatch: 'full' }

        ],
    }
    , {
        path: '**',
        redirectTo: 'Documents'
    }
];

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AboutPage,
        SettingsPage,
        LoginPage,
        Message
        , GlobalPools
        , ServerPools,
        UserInfoPage,
        Media,
        Plugins,
        ExternalMedia,
        ModalDialog,
        DeleteDialog,
        MediaDialog, InfoDialog
        , GlobalPoolDialog
        , ServerPoolDialog
        , ExtMediaDialog
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
        CdkTableModule,
        ChartsModule
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
        MediaDialog,
        InfoDialog,
        GlobalPoolDialog,
        ServerPoolDialog,
        ExtMediaDialog
    ],
    providers: [
        LoginService,
        StorageService,
        FeatureService,
        AdminDataService, MediaPoolsService,
        PluginDataService, DocMediaService,
        { provide: Options, useValue: { store: true } },
        Logger,
        AuthGuard]
})
export class AppModule {
    //public static availableApps: any = [];
}

export interface ModuleConfiguration {
    landingPage: any; //TODO: change to route
    nameOnCard: string;
    imageOnCard: string;
    routes: Routes;
}
