import { Routes } from "@angular/router";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { GroupComponent } from "./group/group.component";
import { ContactComponent } from "./contact/contact.component";

export const routes: Routes = [
    { path: 'signin', component: SignInComponent },
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'signup', component: SignUpComponent },
    { path: 'home', component: HomeComponent },
    { path: 'new-contact', component: ContactComponent },
    { path: 'new-group', component: GroupComponent },
];    
