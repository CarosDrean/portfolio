import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/main.css', '../../../assets/css/util.css']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(public authService: AuthService, public afAuth: AngularFireAuth, private route: Router) {
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.route.navigate(['admin']);
      }
    });
  }

  ngOnInit() {
  }

  setMessage() {
    // sin usar
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  logins(form: NgForm) {
    // esta funcion no se esta usando
    console.log(form.value);
    if (form.value.email === 'carosdreandev@gmail.com') {
      localStorage.setItem('key', form.value.email);
      this.route.navigate(['/admin']);
    }
  }

  login(correo, pass) {
    this.afAuth.auth.signInWithEmailAndPassword(correo, pass).then(() => {
      // this.sesion();
      console.log('iniciando');
      // this.route.navigate(['/admin']);
    }).catch(() => {
      console.log('error');
      // this.route.navigate(['/home']);
    });
  }

  sesion() {
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        console.log('paso');
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
        this.route.navigate([redirect], navigationExtras);
      }
    });
  }

  ingresar(form: NgForm) {
    this.login(form.value.email, form.value.pass);
  }

}
