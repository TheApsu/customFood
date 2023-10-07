import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-type-register',
  templateUrl: './type-register.component.html',
  styleUrls: ['./type-register.component.scss'],
})
export class TypeRegisterComponent implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  async setType(type){
    await this.popoverController.dismiss(type);
  }
}
