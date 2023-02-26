import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InifiniteService {
  public emitScroll = new EventEmitter();

  constructor() { }
}
