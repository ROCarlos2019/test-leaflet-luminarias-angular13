import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';

const routes: Routes = [
  { path: 'información-elemento', component: AppComponent },
  { path: 'análisis-grafico', component: ToolBarComponent },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
