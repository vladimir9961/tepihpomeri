import { Routes } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RugsComponent } from './pages/rugs/rugs.component';
import { BlanketsComponent } from './pages/blankets/blankets.component';

export const routes: Routes = [
    { path: 'pocetna', 'title': 'Pocetna', component: HomeComponent },
    { path: 'kontakt', 'title': 'Kontakt', component: ContactComponent},
    { path: 'tepisi' , 'title' : 'Tepisi', component: RugsComponent},
    { path: 'cebad' , 'title' : 'Ćebad', component: BlanketsComponent},
    { path: 'o-nama', 'title': 'O Nama', component: AboutUsComponent},
    { path: '', redirectTo: 'pocetna' , pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
