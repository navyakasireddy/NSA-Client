export class MessageService{

  //TODO: addd user info/output, define loglevels as enum, (implement logging framework)
  public log(message: string, logLevel:number=1, toUser: boolean=false): void {
    console.log(message);
  }

}
