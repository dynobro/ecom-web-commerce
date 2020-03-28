import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public authServicie: AngularFireAuth) { }

  ngOnInit(): void {
  }

  login() {

    //this.authServicie.auth.signInWithEmailAndPassword();
  }
  logout() {
    //this.auth.signOut();
  }

}
