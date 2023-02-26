import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() position: boolean = true;
  @Input() search: string = '';
  @Output() emitValue = new EventEmitter<string>();
  @Output() backBtn = new EventEmitter();

  constructor(
    private ionMenu: MenuController
  ) { }

  ngOnInit() {}

  changeLocation(){

  }

  async openMenu(){
    await this.ionMenu.toggle('menu-app');
  }

}
