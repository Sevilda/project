import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CodeService } from '../service/code.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor(private codeService: CodeService) { }

  ngOnInit(): void {
  }

  error: string = ""
  @Output() blob: EventEmitter<any> = new EventEmitter();
  @Output() textOutput: EventEmitter<string> = new EventEmitter();
  @Output() displayOldValues: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() textInput: string = "";


  async encode() {
    console.log(this.textInput + ",  " + this.codeService.valid)
    if (this.codeService.valid && this.textInput) {
      this.blob.emit(await this.codeService.encode(this.textInput))
      this.displayOldValues.emit(true)
      this.error = ""
    }
    else if (!this.codeService.valid && this.textInput) {
      this.displayOldValues.emit(false)
      this.error = "No file found!"
    }
    else if (this.codeService.valid && !this.textInput) {
      this.displayOldValues.emit(false)
      this.error = "No input text found!"
    }
    else {
      this.displayOldValues.emit(false)
      this.error = "No file, nor input text found!"
    }
  }

  async decode() {
    this.displayOldValues.emit(false)
    if (this.codeService.valid) {
      var text= await this.codeService.decode();
      if (text) {
      this.textOutput.emit(text);
      this.error = ""
      }
      else {
        this.error="No coded text found!"
      }
    }
    else {
      this.error = "No file found!"
    }
  }

}
