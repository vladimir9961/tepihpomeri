import { Component } from '@angular/core';
import { socialIcons } from '../../constants/social-icons.constants';
import { navigationIcons } from '../../model/navigation-icons.model';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public icons: navigationIcons[] = socialIcons.SOCIAL_ICONS;
}
