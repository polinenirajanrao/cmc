import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
//Components
import { AppComponent } from "./app.component";
import { SignInComponent } from "./signin/signin.component"
import { SignUpComponent } from "./signup/signup.component"
import { HomeComponent } from "./home/home.component"
import { GroupComponent } from "./group/group.component"
import { ContactComponent } from "./contact/contact.component"
//Services
import { UserService } from "./user.service";
import { ApiService } from "./api.service";
import { CookieModule } from 'ngx-cookie';
//Route
import { routes } from "./routes";
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    GroupComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule, RouterModule.forRoot(routes), CookieModule.forRoot(),
  ],
  providers: [UserService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
