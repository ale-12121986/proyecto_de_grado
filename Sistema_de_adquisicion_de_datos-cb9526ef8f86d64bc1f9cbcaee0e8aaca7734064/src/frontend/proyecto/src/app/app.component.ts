import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'registrar', url: 'registrar', icon: 'train' },
    { title: 'trabajo', url: 'trabajo', icon: 'analytics' },
    { title: 'medicion', url: 'medicion', icon: 'speedometer' },
    { title: 'ubicacion', url: 'ubicacion', icon: 'map' },
    
    
    
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
