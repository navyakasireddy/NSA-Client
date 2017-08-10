import * as SDK from "../lib/saperion-sdk-min"

export class SDKService{

  private sdk: any;
  public currentServiceConnection: any;

  public CredentialAuthentication: any;
  public TokenAuthentication: any;
  public GoogleAuthentication: any;
  public ServiceConnection: any;
  public WorkflowManager: any;

  constructor() {
    this.sdk = SDK;
    this.CredentialAuthentication = this.sdk.CredentialAuthentication;
    this.TokenAuthentication = this.sdk.TokenAuthentication;
    this.GoogleAuthentication = this.sdk.GoogleAuthentication;
    this.ServiceConnection = this.sdk.ServiceConnection;
    //TODO: dePublicate internal serviceConnection
    this.currentServiceConnection = this.sdk.ServiceConnection;
    this.WorkflowManager = this.sdk.WorkflowManager;
    this.sdk.configuration.setLogLevel(this.sdk.configuration.logLevels.Verbose);
  }


  public getNewWorkflowManager() {
      return new this.sdk.WorkflowManager(this.currentServiceConnection);
  }

  public getNewServiceConnection(ecmsUrl: string, authProvider: any){
    this.currentServiceConnection = new this.sdk.ServiceConnection(ecmsUrl, authProvider);
    return this.currentServiceConnection;
  }

  public getNewCredentialAuthentication(authUrl: string, user: string, password: string, license: number, tenant: string){

    return new this.sdk.CredentialAuthentication(authUrl, user, password, license, tenant);
  }

  public getNewTokenAuthentication(authUrl: string, token: any){

    return new this.sdk.TokenAuthentication(authUrl, token);
  }

}
