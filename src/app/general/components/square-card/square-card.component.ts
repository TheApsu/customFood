import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { DetailProductComponent } from '../detail-product/detail-product.component';

@Component({
  selector: 'app-square-card',
  templateUrl: './square-card.component.html',
  styleUrls: ['./square-card.component.scss'],
})
export class SquareCardComponent implements OnInit {
  @Input() id: number = undefined
  private storeId = this.route.snapshot.paramMap.get('id');

  public image = 'assets/testImg/card.jpg';
  constructor(
    private uiSv: UiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {}

  async openProduct(){
    await this.uiSv.showModal(DetailProductComponent, 
      {
        id: this.id,
        storeId: this.storeId
      }, 
      'detailProduct'
    );
  }
}
