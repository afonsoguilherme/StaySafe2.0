import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { SigninPage} from '../pages/signin/signin';


const firebaseConfig = {
  apiKey: "AIzaSyDD0ElfiCEHy_ZP33UpNOmazxgV3_owdkY",
    authDomain: "ionicfirebase-b25f1.firebaseapp.com",
    databaseURL: "https://ionicfirebase-b25f1.firebaseio.com",
    projectId: "ionicfirebase-b25f1",
    storageBucket: "ionicfirebase-b25f1.appspot.com",
    messagingSenderId: "182727981069"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage
  ],
  imports: [ 
    MbscModule, 
    FormsModule, 
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    AuthServiceProvider
  ]
})
export class AppModule {}
