import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'

import { AboutPage } from '../cita/about';
import { ContactPage } from '../contacto/contact';
import { HomePage } from '../tarea/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navCtrl:NavController) {

  }

}
