import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  image: File;
  url;
  @Output() displayOldValues: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() exists: EventEmitter<number> = new EventEmitter<number>();
  existCounter = 0;

  constructor() { }

  ngOnInit(): void {
  }

  display(inputImg: File) {
    if (inputImg) {
      this.existCounter++;
      this.image = inputImg
      this.imageToUrl()
      this.exists.emit(this.existCounter)
    }
    else {
      this.url = null
      this.exists.emit(0)
    }
    this.displayOldValues.emit(false)
  }


  //read the file and set URL to display the image
  imageToUrl() {

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    }
    reader.readAsDataURL(this.image);
  }
}



