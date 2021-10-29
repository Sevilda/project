import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { TextComponent } from './text/text.component';

const routes: Routes = [
  {
    path: 'button',
    component: ButtonComponent
  },
  {
    path: 'text',
    component: TextComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
