import { Component, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',

})
export class NavbarComponent {
  http = inject(HttpClient)
  data: any
  constructor(){
    this.http.get<any>('https://tepihpomeri.rs/api/wp-json/wp/v2/posts').subscribe(res => {
      console.log(res)
      this.data = res
    })
  }
}
