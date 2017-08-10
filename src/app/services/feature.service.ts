/**
 * feature service for providing information about availible/enabled features
 */
import {Injectable} from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class FeatureService {
    // 
    private jsonLoaded: boolean;
    private featureJson:any;

    // Features
    
    private _useGoogleSignIn : boolean = false;
    public get useGoogleSignIn() {
        return this._useGoogleSignIn;
    }
    
     private _approvalAppUseDummyData : boolean = false;
    public get approvalAppUseDummyData() {
        return this._approvalAppUseDummyData;
    }
    
  
    constructor(private http: Http ) {
        this.jsonLoaded = false;
    }
    
    public load(): Promise<any> {
    let self = this;
    return new Promise((resolve, reject) => {
      if (this.jsonLoaded) {
        resolve();
      } else {
        this.http.get('assets/config/features.json')
            .subscribe(res => {
                this.featureJson = res.json();
                console.log('Features loaded: '+ JSON.stringify(this.featureJson));

                // update Features 
                this._useGoogleSignIn = this.featureJson.features.useGoogleSignIn;
                this._approvalAppUseDummyData  = this.featureJson.features.approvalAppUseDummyData;
                this.jsonLoaded = true;
                resolve();
            })
        }
    });
  };  
}