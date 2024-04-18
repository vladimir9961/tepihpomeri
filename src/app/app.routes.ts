import { Routes } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

export const routes: Routes = [
    { path: '', 'title': 'Pocetna', component: HomeComponent },
    { path: 'kontakt', 'title': 'Kontakt', component: ContactComponent},
    { path: 'proizvodi', 'title': 'Proizvodi', component: ProductsComponent},
    { path: 'o-nama', 'title': 'O Nama', component: AboutUsComponent}
];
