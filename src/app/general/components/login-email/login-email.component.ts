import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss'],
})
export class LoginEmailComponent implements OnInit {
  @Output() backBtn = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

}
