import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
//Components
import { AppComponent } from "./app.component";
import { SignInComponent } from "./signin/signin.component"
//Services
import { UserService } from "./user.service";
//Route
import { routes } from "./routes";
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule, RouterModule.forRoot(routes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
