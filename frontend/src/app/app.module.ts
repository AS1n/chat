import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from 'ngx-spinner';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ModalModule } from "ngx-bootstrap/modal";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from "./app.component";
import { UserComponent } from "./user/user.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "./service/auth/auth.service";
import { TokenStorage } from "./service/auth/token.storage";
import { Interceptor } from "./app.interceptor";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpModule } from "@angular/http";
import { ButtonsModule } from "ngx-bootstrap";

import {CUSTOM_ERROR_MESSAGES, NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import { AlertModule } from 'ngx-bootstrap/alert';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { MyRoomsComponent } from './my-rooms/my-rooms.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent},
  { path: 'rooms/id/:id', component: RoomComponent },
  { path: 'rooms/own/:id', component: RoomsComponent },
  // { path: 'my-rooms', component: MyRoomsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    RoomsComponent,
    RoomComponent,
    MyRoomsComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgBootstrapFormValidationModule,
    NgBootstrapFormValidationModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    AuthService,
    TokenStorage,
    Interceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
