import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HttpModule } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TabsPage} from './pages/tabs/tabs.page';
import { TooltipModule } from 'ngx-bootstrap/tooltip';





@NgModule({
  declarations: [AppComponent,TabsPage, ],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.FirebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule,
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, 
    TooltipModule.forRoot(),
    ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    UserService,
    HttpClientModule,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
