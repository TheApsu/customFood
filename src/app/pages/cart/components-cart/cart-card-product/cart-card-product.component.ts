import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/general/services/ui.service';
import { CartService } from 'src/app/services/general/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-card-product',
  templateUrl: './cart-card-product.component.html',
  styleUrls: ['./cart-card-product.component.scss'],
})
export class CartCardProductComponent implements OnInit {
  @Output() removeProductEmitter = new EventEmitter();
  @Input() product = undefined;
  @Input() store = undefined;

  public image = environment.testImg;
  public contador = 1;
  public removeIcon = 'trash-outline'

  constructor(
    private uiSv: UiService,
    private cartSv: CartService
  ) { }

  ngOnInit() {
    this.contador = this.product.amount;
    this.checkIcon();
  }

  async removeProduct(){
    const { role } = await this.uiSv.showAlert('Remover', 'Cancelar', 'Alerta', '', `¿Desea remover ${this.product.nombre} de su carrito de compra?`);
    if(role === 'confirm'){
      const data = await this.cartSv.removeProduct(this.product._id, this.store.businessId);
      this.removeProductEmitter.emit(data);
    }
  }

  async add(sum){
    const products = {
      productId: this.product._id,
      amount: sum ? 1 : -1
    }
    if(this.contador <= 1 && !sum){
      await this.removeProduct();
    }else{
      await this.uiSv.showLoading();
      await this.cartSv.addProduct(
        { 
          products: [ products ], 
          business: this.store,
        }, 
        products
      );
      await this.uiSv.loading.dismiss();
      this.contador += products.amount;
      this.checkIcon();
    }
  }

  checkIcon(){
    if(this.contador <= 1){
      this.removeIcon = 'trash-outline';
    }else{
      this.removeIcon = 'remove-outline';
    }
  }
}
