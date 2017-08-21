import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'page-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer { }


@NgModule({
  exports: [Footer],
  declarations: [Footer],
})
export class FooterModule {}
