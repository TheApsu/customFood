import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/general/services/http.service';
import { LocationService } from 'src/app/general/services/location.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit {
  public image = 'assets/testImg/card.jpg';
  public products = [];
  public storeId = this.route.snapshot.paramMap.get('id');
  private _page = 0;
  public business = undefined;

  constructor(
    private route: ActivatedRoute,
    private httpSv: HttpService,
    private locationSv: LocationService
  ) { }

  ngOnInit() {
    this.getProducts();
  }
  
  async getProducts(){
    const businessProducts = await 
      this.httpSv.get(`getProductsFromBusiness/${this.storeId}/all/${this._page}`);
    this.products = businessProducts;
    const business = await this.httpSv.get(`getABusiness/${this.locationSv.location.country.name}/${this.locationSv.location.state.name}/${this.storeId}`);
    this.business = business;
  }

  back(){
    
  }
}
