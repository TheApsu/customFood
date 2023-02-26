import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public userForm: FormGroup = undefined;
  public form: any[] = [];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = [
      {
        label: 'Nombre',
        control: 'name'
      },
      {
        label: 'Apellido',
        control: 'last_name'
      },
      {
        label: 'Correo',
        control: 'email'
      },
      {
        label: 'Telefono',
        control: 'phone_number'
      },
    ]

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      last_name: [''],
      email: [''],
      phone_number: ['']
    })
  }

  saveUser(){
    console.log(this.userForm.value);
  }

}
