import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';

  textOutput: string;
  textInput:string;
  displayOldValues: boolean;
  blob:any;
  exists:boolean;


}
