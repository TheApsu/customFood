import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private _loading: HTMLIonLoadingElement = undefined;
  get loading(){
    return this._loading;
  }

  set loading(value){
    this.loading = value;
  }

  constructor(
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) { }

  async showModal(component, componentProps?, cssClass?){
    const modal = await this.modalController.create({
      component,
      componentProps,
      cssClass
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    return { data, role };
  }

  async showAlert(okText?, cancelText?, header?, subHeader?, message?, cssClass?, backdropDismiss?){
    try{
      let selectedValue = '';
      const buttons = [
      
        {
          text: okText,
          role: 'confirm',
          handler: () => {
            selectedValue = okText;
          }
        }
      ];
      if(cancelText){
        buttons.push(
          {
            text: cancelText,
            role: 'cancel',
            handler: () => {
              selectedValue = cancelText;
            }
          },
        )
      }
      const alert = await this.alertCtrl.create({
        header,
        subHeader,
        message,
        backdropDismiss,
        buttons,
        cssClass
      });
      await alert.present();
      const { data, role} = await alert.onDidDismiss();
      return { data, role };
    }catch(err){
      console.error(err);
      
    }
  }

  async showLoading(){
    if(this._loading){
      await this._loading.dismiss();
    }
    this._loading = await this.loadingController.create();
    await this._loading.present();
  }
}
