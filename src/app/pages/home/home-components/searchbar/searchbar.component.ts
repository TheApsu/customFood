import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  @Input() search: string = '';
  @Output() emitValue = new EventEmitter<string>(); 
  private timerSearch;
  constructor() { }

  ngOnInit() {}

  prepareSearch(){
    this.timerSearch && clearTimeout(this.timerSearch);
    this.timerSearch = setTimeout(() => {
      this.emitValue.emit(this.search)
    }, 250)
  }
}
