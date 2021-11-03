import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CodeService } from '../service/code.service';


@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  textForm: FormGroup
  @Input() textOutput: string;
  @Output() textInput: EventEmitter<string> = new EventEmitter()

  value = ""
  @Input() exists: number = 0;
  //0 if not exists, otherwise counting only to observe the change,

  constructor(private codeService: CodeService, private formbuilder: FormBuilder) {
    this.textForm = this.formbuilder.group({
      inputText: new FormControl('', [
        Validators.required,
        //allow only ascii characters
        Validators.pattern("[\x00-\x7F]+")])
    })

    this.textForm.disable();
  }

  async ngOnChanges(changes) {
    console.log(changes)
    if (changes.exists.currentValue == 0 || changes.exists.firstChange == true) {
      this.textForm.disable()
      await this.clear()
    }
    else if (changes.exists.currentValue > 0){
      this.textForm.enable()
      await this.clear()
    }
  }

  ngOnInit() {
  }

  space: number;
  maxSpace: number;

  async sendText() {
    var space = await this.codeService.getAvailableSpace()
    this.maxSpace = parseInt(space.toString())
    if (this.textForm.valid) {
      var text = document.getElementsByTagName("textarea")[0].value || "";
      this.space = parseInt(space.toString()) - text.length
      this.textInput.emit(text)
    }
    else {
      this.textInput.emit("")
    };
  }

  async clear() {
    document.getElementsByTagName("textarea")[0].value = ""
    await this.sendText()
  }

}
