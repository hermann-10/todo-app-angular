import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  {path: '', title:'Home', component: HomeComponent},
  {path: 'about', title: 'About', component: AboutComponent},
  {path: 'contact', title: 'Contact', component: ContactComponent}
];
