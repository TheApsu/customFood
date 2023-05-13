import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
})
export class BusinessCardComponent implements OnInit {
  @Input() id: any = undefined;
  @Input() business: any = {};

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  openBusiness(){
    this.navCtrl.navigateForward(`tabs/business/${this.id}`);
  }
}
