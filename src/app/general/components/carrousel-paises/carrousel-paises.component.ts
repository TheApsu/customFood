import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-carrousel-paises',
  templateUrl: './carrousel-paises.component.html',
  styleUrls: ['./carrousel-paises.component.scss'],
})
export class CarrouselPaisesComponent implements OnInit {
  @ViewChild('slide', { static: true }) slide: IonSlides
  @Input() startSlide: number;
  @Input() blockInitalSlide: number;
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
  private _slideSrc: Subscription = undefined
  public slideOpts = {
    speed: 350
  }

  constructor(
    private locationSv: LocationService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    if(this.startSlide){
      this.slide.slideTo(this.startSlide);
    }
    this.slide.lockSwipes(true);
    this._slideSrc = this.slide.ionSlideWillChange.subscribe(async () => {
      this.position = await this.slide.getActiveIndex();
    })
  }

  setState(location){
    this.location.state.name = location.name;
    // this.state = name;
    // this._country = name;
    this.doSwipe('next');
  }

  setCountry(location){
    this.location.country.name = location.name;
    // this.city = name;
    // this._state = name;
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
    const index = await this.slide.getActiveIndex()
    if(this.startSlide === 1 && index === 1){
      this.modalController.dismiss();
    }
    this.doSwipe('prev');
  }

  continue(location){
    this.location.city.name = location.name;
    this.location.city.id = location.id;
    console.log(this.location);
    const locationData = this.location;
    this._slideSrc.unsubscribe();
    this.locationSv.location = locationData;
    this.locationSv.saveLocation(this.startSlide);
    if(this.startSlide){
      this.modalController.dismiss(locationData);
    }
  }
}
