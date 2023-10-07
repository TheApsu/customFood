import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';

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
    private loadingController: LoadingController,
    private toastController: ToastController,
    private popoverController: PopoverController
  ) { }

  async showModal(component, componentProps?, cssClass?, backdropDismiss?){
    const modal = await this.modalController.create({
      component,
      componentProps,
      cssClass,
      backdropDismiss
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    return { data, role };
  }

  async showAlert(okText?, cancelText?, header?, subHeader?, message?, cssClass?, backdropDismiss?){
    try{
      const buttons = [
      
        {
          text: okText,
          role: 'confirm',
          handler: () => {}
        }
      ];
      if(cancelText){
        buttons.push(
          {
            text: cancelText,
            role: 'cancel',
            handler: () => { }
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
      const { data, role } = await alert.onDidDismiss();
      return { data, role };

    }catch(err){
      console.error(err);
      
    }
  }

  async showLoading(message = 'Cargando...'){
    if(this._loading){
      await this._loading.dismiss();
    }
    this._loading = await this.loadingController.create(
      {
        message
      }
    );
    await this._loading.present();
  }

  async showPopover(component, componentProps?, cssClass?, backdropDismiss?){
    const popover = await this.popoverController.create({
      component,
      componentProps,
      cssClass,
      backdropDismiss
    })

    await popover.present();
    const { data } = await popover.onDidDismiss();
    return data;
  }

  async showToast(message){
    const toast = await this.toastController.create({
      message,
      duration: 4000
    })
    
    await toast.present();
  }
}
