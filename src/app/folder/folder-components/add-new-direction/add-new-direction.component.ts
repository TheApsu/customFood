import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { LocationService } from '../../../general/services/location.service';
import { UiService } from '../../../general/services/ui.service';
import { Direcciones } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-add-new-direction',
  templateUrl: './add-new-direction.component.html',
  styleUrls: ['./add-new-direction.component.scss'],
})
export class AddNewDirectionComponent implements OnInit {
  @ViewChild('directionForm') directionForm: any;
  @ViewChild('content') content: IonContent;
  @Input() direction: Direcciones;
  public form = undefined;
  public selectedCity = undefined;

  constructor(
    public locationSv: LocationService,
    private modalController: ModalController,
    private uiSv: UiService
  ) { }

  ngOnInit() {
    this.form = [
      {
        label: 'Dirección',
        control: 'direccionText',
        type: 'text',
        required: true
      },
      {
        label: 'Telefono',
        control: 'telefono',
        type: 'number',
        required: true
      },
      {
        label: 'Codigo postal',
        control: 'codigoPostal',
        type: 'number',
        required: true
      },
      {
        label: 'Nombre de la persona que recibe',
        control: 'nombrePersonaRecibe',
        type: 'text',
        required: true
      },
      {
        label: 'Nombre de la dirección',
        control: 'nombreDireccion',
        type: 'text',
        required: true
      },
    ]
  }

  async close(data?){
    await this.modalController.dismiss(data);
  }

  scrollContent(selectedCity){
    this.selectedCity = selectedCity;
    this.content.scrollToBottom(400);
  }

  async save(){
    try{
      if(this.directionForm.dinamicForm.invalid){
        this.directionForm.dinamicForm.markAllAsTouched();
        await this.uiSv.showToast('Debes rellenar el formulario antes de continuar');
        return 
      }else{
        const data = this.directionForm.dinamicForm.value;
        data.city = this.selectedCity;
        data.editing = !!this.direction;
        this.close(data)
      }
    }catch(err){
      console.error(err);
    }
  }

  
}
