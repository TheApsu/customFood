import { Component, OnInit, ViewChild } from '@angular/core';
import { NewUser } from 'src/app/interface/interfaces';
import { HttpService } from '../../../general/services/http.service';
import { StorageService } from '../../../general/services/storage.service';
import { LoginService } from 'src/app/pages/login/services/login.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @ViewChild('userForm') userForm;
  public form: any[] = undefined;
  public user = undefined;
  public directions = [];

  constructor(
    private storageSv: StorageService,
    private httpSv: HttpService,
    private loginSv: LoginService
  ) { }

  ngOnInit() {
    this.form = [
      {
        label: 'Nombre',
        control: 'nombres',
        type: 'text',
        required: true
      },
      {
        label: 'Apellido',
        control: 'apellidos',
        type: 'text',
        required: true
      },
      {
        label: 'Correo',
        control: 'email',
        type: 'text',
        required: true,
        disabled: true
      },
      {
        label: 'Binance email',
        control: 'binanceEmail',
        type: 'text',
        required: true
      },
      {
        label: 'Fecha de nacimiento',
        control: 'birthdayString',
        type: 'date',
        required: true
      }
    ]
    this.user = this.storageSv.getLocalStorage('user');
    this.directions = this.user.direcciones || [];
  }

  save(){
    this.userForm.sendFormData();
  }

  setDirection(){
    // this.directions.push(direction);
    this.save();
  }

  async saveUser(formValue){
    formValue.direcciones = this.loginSv.user.direcciones;
    const user: NewUser = 
      await this.httpSv.post(undefined, formValue, '', '/buyer/updateInfo');
    this.loginSv.updateUserInfo(user);
    console.log(user);
  }

}
