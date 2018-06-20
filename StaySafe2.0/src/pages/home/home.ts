import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SigninPage } from '../signin/signin';
import { Geolocation } from '@ionic-native/geolocation';
import { mobiscroll } from '@mobiscroll/angular';

mobiscroll.settings = {
  theme: 'ios',
  lang: 'pt-BR',
};

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public timerNow: any;
  public timerPicker: any;
  public directionsService = new google.maps.DirectionsService();
  public directionsDisplay = new google.maps.DirectionsRenderer();
  public map: any;
  public startPosition: any;
  public originPosition: string;
  public destinationPosition: string;

 
  constructor(
    public navCtrl: NavController, 
    private authServiceProvider: AuthServiceProvider, 
    private alertCtrl: AlertController,
    public geolocation: Geolocation) { }


  signOut(){
    this.authServiceProvider.signOut()
      .then(() => {
      this.navCtrl.setRoot(SigninPage);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  ionViewDidLoad() {
    this.initializeMap();
  }

  initializeMap() {
    
    this.geolocation.getCurrentPosition()
    .then(res => {
      this.startPosition = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);

      const mapOptions = {
        zoom: 18,
        center: this.startPosition,
        disableDefaultUI: true
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.directionsDisplay.setMap(this.map);

      const marker = new google.maps.Marker({
        position: this.startPosition,
        map: this.map,
      });
      console.log(marker)
    })
  }

  calculateRoute() {
    let alert = this.alertCtrl.create({
      title: 'Destino',
      inputs: [
        {
          name: 'rota',
          placeholder: 'Para onde?'
        },
      ],
      buttons: [
        {
          text: 'DEFINIR ROTA',
          role: 'DEFINIR ROTA',
          handler: data => {
            if (data.rota) {
              const request = {
                // Pode ser uma coordenada (LatLng), uma string ou um lugar
                origin: this.startPosition,
                destination: data.rota,
                travelMode: 'DRIVING'
              };
        
              this.traceRoute(this.directionsService, this.directionsDisplay, request);
            }
          }
        }
      ]
    });
    alert.present();
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  } 
  timerCenter: number;
  timerCenterSettings: any = {
        display: 'center',
        targetTime: 10,
        maxWheel: 'minutes',
        minWidth: 100,
        onFinish: function () {
            mobiscroll.alert({
                title: "ATENÇÃO",
                message: "SMS foi enviado para seu contato de segurança."});
        }
    };
} 