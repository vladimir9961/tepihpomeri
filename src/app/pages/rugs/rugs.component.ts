import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Modules
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

// Components
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductsComponent } from '../../components/products/products.component';
import { toggleDropdownAnimation  } from '../../helper/animations/side-bar-dropdown.animation';
import { GetTagsService } from '../../services/get-tags.service';

@Component({
  selector: 'app-rugs',
  standalone: true,
  imports: [CommonModule, ProductsComponent, NavbarComponent, AngularSvgIconModule, RouterLink, RouterLinkActive],
  templateUrl: './rugs.component.html',
  styleUrl: './rugs.component.scss',
  animations: [toggleDropdownAnimation]
})
export class RugsComponent {
  private destroy$ = new Subject<void>();
  
  public router: Router = inject(Router)

  public isExpandedCathegory: boolean = false;
  public isExpandedTags: boolean = false;

  public tags: any = []

  constructor(private _getTags: GetTagsService) {}

  ngOnInit(): void {
    this.getTags()
  }

  public toggleDropdowns(toggle: string): void {
    switch(toggle) {
      case 'cathegory':
        this.isExpandedCathegory = !this.isExpandedCathegory;
      break;

      case 'tags':
        this.isExpandedTags = !this.isExpandedTags;
        break

        default: 
        
        break
    }
  }

  public getTags(): void {
    this._getTags.getTags()
    .pipe(takeUntil(this.destroy$))
    .subscribe(tags => {
      this.tags = tags
      console.log(tags)
    })
  }

}
