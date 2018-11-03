import { Routes } from "@angular/router";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";

export const routes: Routes = [
    { path: 'signin', component: SignInComponent },
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'signup', component: SignUpComponent },
];    
