import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.scss'],
})
export class LoginSocialComponent implements OnInit {
  @Output() loginWith$ = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  loginWith(type: string){
    this.loginWith$.emit(type);
  }
}
