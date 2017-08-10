import { Component, Injector } from '@angular/core';

@Component({
  selector: 'Message',
  templateUrl: 'nonModalMessage.html'
})
export class Message {

  public msg = '';
  private messageType = '';
  public messageClass = 'info';
  private iconName = 'alert';
  private iconColor = 'blue';

  constructor(private injector: Injector) {
    //TODO: remove depricated
    this.msg = this.injector.get('msg').message;
    this.messageType = this.injector.get('type');

    switch (this.messageType) {
      case 'error':
        this.messageClass = 'error';
        this.iconName = 'alert';
        this.iconColor = 'danger';
        break;
      case 'warning':
        this.messageClass = 'warning';
        this.iconName = 'warning';
        this.iconColor = 'vibrant';
        break;
      default:
        this.messageClass = 'info';
        this.iconName = 'information-circle';
        this.iconColor = 'primary';
        break;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
}
