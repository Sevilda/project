import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { CodeService } from 'src/app/service/code.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {

  constructor(private codeService: CodeService) { }

  image: File;
  error: string;

  @Output() imageChosen = new EventEmitter();


  ngOnInit(): void {
  }

  imageUploaded(event: any) {
    this.image = event.target.files[0];

    //enable the interaction only when the file extension is correct
    if (this.image.type == "image/bmp") {
      this.error = "";
      this.imageChosen.emit(this.image);
      this.codeService.saveFile(this.image);
    }
    else {
      this.error = "The uploaded file is not an image of BMP format, please try again.";
      this.imageChosen.emit(null)
    }
    
  }

}
