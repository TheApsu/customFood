import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.page.html',
  styleUrls: ['./carrousel.page.scss'],
})
export class CarrouselPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  continue(){
    this.navCtrl.navigateRoot('home');
  }
}
