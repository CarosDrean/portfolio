import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/main.css', '../../../assets/css/util.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log(form.value);
    if (form.value.email === 'carosdreandev@gmail.com') {
      localStorage.setItem('key', form.value.email);
      this.route.navigate(['/admin']);
    }
  }

}
