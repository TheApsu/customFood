import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { LocationService } from '../../../../general/services/location.service';

@Component({
  selector: 'app-carrousel-paises',
  templateUrl: './carrousel-paises.component.html',
  styleUrls: ['./carrousel-paises.component.scss'],
})
export class CarrouselPaisesComponent implements OnInit {
  @ViewChild('slide', { static: true }) slide: IonSlides
  @Input() startSlide: number = undefined;
  @Input() noChange: boolean = false;
  @Input() blockInitalSlide: number = undefined;
  public state = undefined;
  public city = undefined;
  public searchValue = '';
  public location = {
    country: {
      id: undefined,
      name: '',
    },
    state: {
      id: undefined,
      name: '',
    },
    city: {
      id: undefined,
      name: '',
    }
  }
  public position;
  public slideOpts = {
    speed: 350
  }

  constructor(
    private locationSv: LocationService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.slide.lockSwipes(true);
  }

  setState(location){
    this.location.state.name = location.name;
    this.doSwipe('next');
  }

  setCountry(location){
    this.location.country.name = location.name;
    this.doSwipe('next');
  }

  async doSwipe(direction){
    this.searchValue = '';
    await this.slide.lockSwipes(false);
    if(direction !== 'next' && this.blockInitalSlide){
      const actualIndexSlide = await this.slide.getActiveIndex();
      if(actualIndexSlide === 1){
        return false;
      }
    }
    await direction === 'next' ? this.slide.slideNext(400) : this.slide.slidePrev(400);
    await this.slide.lockSwipes(true);
  }
  
  async backBtn(){
    const index = await this.slide.getActiveIndex();
    console.log('index :>> ', index);
    console.log('this.startSlide :>> ', this.startSlide);
    if(this.startSlide === 1 && index === 0){
      this.modalController.dismiss();
    }
    this.doSwipe('prev');
  }

  continue(location){
    this.location.city.name = location.name;
    this.location.city.id = location.id;
    const locationData = this.location;
    if(!this.noChange){
      this.locationSv.location = locationData;
      this.locationSv.saveLocation(this.startSlide);
    }
    if(this.startSlide){
      this.modalController.dismiss(locationData);
    }
  }
}
