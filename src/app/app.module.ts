import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { TextComponent } from './text/text.component';
import { ButtonComponent } from './button/button.component';
import { ImageFormComponent } from './image/image-form/image-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SaveComponent } from './save/save.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatDividerModule} from '@angular/material/divider'; 


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    TextComponent,
    ButtonComponent,
    ImageFormComponent,
    SaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule, 
    MatDividerModule,
    MatProgressBarModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
