
import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Animations
import { toggleDropdownAnimation, expandSideBar } from '../../helper/animations/side-bar-dropdown.animation';

// Services
import { GetTagsService } from '../../services/get-tags.service';

// Modules
import { AngularSvgIconModule } from 'angular-svg-icon';

// Enums
import { aside_enums } from '../../utils/enums/aside.enums';

@Component({
  selector: 'app-aside-nav',
  standalone: true,
  imports: [  
    CommonModule, 
    RouterLink, 
    RouterLinkActive,
    AngularSvgIconModule, 
  
  ],
  templateUrl: './aside-nav.component.html',
  styleUrl: './aside-nav.component.scss',
  animations: [toggleDropdownAnimation, expandSideBar]
})
export class AsideNavComponent {
  @Input() productPage: number = 0;

  public tagSelected: any = output()

  private destroy$ = new Subject<void>();

  public isExpandedCathegory: boolean = false;
  public isExpandedTags: boolean = true;
  public isSideBarOpen: boolean = false;

  public parentCategory: number = 17

  public subcategories: any = []

  public allTags: any[] = []

  constructor(private _getTags: GetTagsService) {}

  ngOnInit(): void {
    this.getTags()
  }

  public toggleDropdowns(toggle: string): void {
    switch(toggle) {
      case aside_enums.CATHEGORY:
        this.isExpandedCathegory = !this.isExpandedCathegory;
      break;

      case aside_enums.SUBCATHEGORIES:
        this.isExpandedTags = !this.isExpandedTags;
        break

        default: 
        
        break
    }
  }

  public subCathegorySelcted(event: MouseEvent, tag: any): void {
    const checkbox = (event.target as HTMLElement).closest('input[type="checkbox"]') as HTMLInputElement;
    if (checkbox) {
      const isChecked = checkbox.checked;
      if(isChecked) {
        this.allTags = [
          ...this.allTags,
          tag
        ]

        this.tagSelected.emit(this.allTags) 

      } else {
        const index = this.allTags.findIndex(item => item.id === tag.id);

        if (index !== -1) {
          this.allTags.splice(index, 1);

          this.tagSelected.emit(this.allTags) 
        }
      }
    }
  }

  public getTags(): void {
    this._getTags.getTags(this.productPage)
    .pipe(takeUntil(this.destroy$))
    .subscribe((subcategories: any) => {
      this.subcategories = subcategories
    })
  }

  public expandSideBar(): void {
    this.isSideBarOpen = !this.isSideBarOpen
  }

}
