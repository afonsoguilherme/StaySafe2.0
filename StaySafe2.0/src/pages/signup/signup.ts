import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth-service/user';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authServiceProvider: AuthServiceProvider) {
  }

  createAccount() {
    if (this.form.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      this.authServiceProvider.createUser(this.user)
        .then((user: any) => {
          

          toast.setMessage('Usuário criado com sucesso.');
          toast.present();

          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            toast.setMessage('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            toast.setMessage('Não está habilitado criar usuários.');
          } else if (error.code  == 'auth/weak-password') {
            toast.setMessage('A senha digitada é muito fraca.');
          }
          toast.present();
        });
    }
  }

}
