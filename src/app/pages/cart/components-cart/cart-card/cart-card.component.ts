import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss'],
})
export class CartCardComponent implements OnInit {
  @Input() data: any = {};
  @Output() removeProductEmitter = new EventEmitter();
  public image = environment.testImg;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  trackByItems(index, item){
    return item.productId
  }

  async removeStore(){
    await this.navCtrl.navigateRoot('tabs/resume');
  }

  emitRemove(ev){
    if(ev){
      this.removeStore();
    }else{
      this.removeProductEmitter.emit();
    }
  }
}
