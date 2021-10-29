import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CodeService } from '../service/code.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  @Input() textOutput: string;
  @Output() textInput: EventEmitter<string> = new EventEmitter()

  value = ""
  @Input() exists;

  constructor(private codeService: CodeService) { }

  ngOnInit() {
  }

  space;
  maxSpace;

  async sendText() {
    var space = await this.codeService.getAvailableSpace()
    this.maxSpace = parseInt(space.toString())
    var text = document.getElementsByTagName("textarea")[0].value || "";
    this.space = parseInt(space.toString())-text.length
    this.textInput.emit(text);
  }

  async clear() {
    document.getElementsByTagName("textarea")[0].value = ""
    await this.sendText()
  }

}
