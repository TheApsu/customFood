import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamic-form',
  templateUrl: './dinamic-form.component.html',
  styleUrls: ['./dinamic-form.component.scss'],
})
export class DinamicFormComponent implements OnInit {
  @Input() form: any[] = undefined;
  @Output() sendForm = new EventEmitter();
  @Input() set savedForm(value){
    if(value){
      this.saved = value;
      if(this.dinamicForm) this.dinamicForm.patchValue(this.saved);
    }
  };
  public saved = undefined;
  public dinamicForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const obj = {};
    for (const item of this.form) {
      obj[item.control] = [{ value: '', disabled: item.disabled }];
      item.required && obj[item.control].push(Validators.required);
    }
    this.dinamicForm = this.fb.group(obj);
    if(this.saved) this.dinamicForm.patchValue(this.saved);
  }

  sendFormData(){
    
    this.sendForm.emit(this.dinamicForm.value);
  }

}
