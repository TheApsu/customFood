import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() business = undefined;
  public hiddeControl = {
    hiddeLocation: true,
    hiddeSocials: true
  };

  public socials = [];

  constructor( private iab: InAppBrowser ) { }

  ngOnInit() {
    const socials = [
      {
        name: this.business.email_contact,
        value: 'email_contact',
        icon: 'mail'
      },
      {
        name: this.business.instagram,
        value: 'instagram',
        icon: 'logo-instagram'
      },
      {
        name: this.business.whatsapp,
        value: 'whatsapp',
        icon: 'logo-whatsapp'
      },
      {
        name: this.business.facebook,
        value: 'facebook',
        icon: 'logo-facebook'
      },
    ]
    this.socials = socials;
  }

  openSocial(social){
    let url = '';
    if(social.value === 'email_contact'){
      url = `mailto:${social.name}`;
    }else if(social.value === 'instagram'){
      const normalizedName = social.name[0] === '@' ? social.name.slice(1) : social.name;
      url = `https://instagram.com/${normalizedName}`;
    }else if(social.value === 'whatsapp'){
      url = `https://wa.me/${social.name}`;
    }else if(social.value === 'facebook'){
      url = social.name;
    }

    this.iab.create(url);

  }
}
