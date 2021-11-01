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
  @Output() exists: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  display(inputImg: File){
    this.image = inputImg
    this.imageToUrl()
    //console.log(inputImg);
    this.exists.emit(true)
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



