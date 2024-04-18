import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
