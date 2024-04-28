import { Routes } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RugsComponent } from './pages/products-page/product-page.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    { path: 'pocetna', 'title': 'Pocetna', component: HomeComponent },
    { path: 'kontakt', 'title': 'Kontakt', component: ContactComponent},
    { path: 'tepisi' , 'title' : 'Tepisi', component: RugsComponent, data: {name: 'rugs'}},
    { path: 'cebad' , 'title' : 'Ćebad', component: RugsComponent, data: {name: 'blankets'}},
    { path: 'o-nama', 'title': 'O Nama', component: AboutUsComponent},
    { path: 'proizvod/:id', component: SingleProductComponent},
    { path: 'korpa', component: CartComponent},
    { path: '', redirectTo: 'pocetna' , pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
