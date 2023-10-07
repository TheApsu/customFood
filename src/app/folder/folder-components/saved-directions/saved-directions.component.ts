import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from '../../../general/services/ui.service';
import { AddNewDirectionComponent } from '../add-new-direction/add-new-direction.component';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { Direcciones } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-saved-directions',
  templateUrl: './saved-directions.component.html',
  styleUrls: ['./saved-directions.component.scss'],
})
export class SavedDirectionsComponent implements OnInit {
  @Output() emitDirection = new EventEmitter();
  public directions: Direcciones[] = [];

  constructor(
    private uiSv: UiService,
    private loginSv: LoginService
  ) { }

  ngOnInit() {
    this.getDirections();
  }

  getDirections(){
    const directions = this.loginSv.user.direcciones;
    if(directions?.length){
      this.directions = directions.map(x => {
        const iso = x?.city?.iso2.toLocaleLowerCase() || '';
        x.flagImg = [
          this.returnFlag('16x12', iso),
          this.returnFlag('32x24', iso) + ' 2x, ' +
          this.returnFlag('48x36', iso) + ' 3x ',
        ];
        return x;
      })
      console.log(this.directions);
    }
  }

  trackByItems(index, item){
    return item?.city?.iso2 || ''
  }

  returnFlag(size, iso){
    return `https://flagcdn.com/${size}/${iso}.png`
  }

  async addOrEditNewDirection(direction?, index?){
    console.log(direction, index);
    
    const { data } = await this.uiSv.showModal(AddNewDirectionComponent, { direction }, 'edit-direction');
    if(data){
      if(direction) {
        this.loginSv.user.direcciones[index] = data;
      }else{
        this.loginSv.user.direcciones.push(data)
      }
      this.emitDirection.emit();
    }
    this.getDirections();
  }

}
