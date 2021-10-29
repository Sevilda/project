import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  image: File;
  url;
  progress;
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

      var progress = document.querySelector('.percent');
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }

      // reader.onprogress = function(data) {
      //   if (data.lengthComputable) {                                            
      //       var prog = Math.round((data.loaded / data.total) * 100);
      //       console.log(prog);
      //   } }
      reader.readAsDataURL(this.image);
    }
  }



