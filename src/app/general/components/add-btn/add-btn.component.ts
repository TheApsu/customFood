import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.scss'],
})
export class AddBtnComponent implements OnInit {
  @Output() emitAdd = new EventEmitter();
  private _quantity = 0;
  private _timeAnim = undefined;

  set quantity(value){
    this._quantity = value;
  }

  get quantity(){
    return this._quantity;
  }

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {}

  setQuantity(action){
    if(action === 'sum'){
      this.quantity++;
    }else{
      this.quantity !== 0 && this.quantity--;
    }
  }

  addToCart(addBtn, checkmark, iconAdd, txtAdd){
    if(this._timeAnim){
      return true;
    }
    this.renderer.addClass(addBtn.el, 'addToCart');
    this.renderer.addClass(checkmark.el, 'appear');
    this.renderer.addClass(iconAdd.el, 'disappear');
    this.renderer.addClass(txtAdd, 'disappear');
    this._timeAnim = setTimeout(() => {
      this.renderer.removeClass(addBtn.el, 'addToCart');
      this.renderer.removeClass(checkmark.el, 'appear');
      this.renderer.removeClass(iconAdd.el, 'disappear');
      this.renderer.removeClass(txtAdd, 'disappear');
      this._timeAnim = undefined;
    }, 2000)
    this.emitAdd.emit(this.quantity);
    this.quantity = 0;
  }
}
