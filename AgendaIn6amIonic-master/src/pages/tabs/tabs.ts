import { Component } from '@angular/core';

import { ContactosPage } from '../contactos/contactos';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactosPage;

  constructor() {

  }
}
