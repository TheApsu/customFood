import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit {
  public image = 'assets/testImg/card.jpg';
  public products = new Array(10);
  public storeId = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
