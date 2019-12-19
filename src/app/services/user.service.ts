import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import {  Observable } from 'rxjs';

interface user {
	username: string,
	uid: string,
}


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class UserService implements OnInit {
	public user: user
	public userNow: any
	constructor(private afAuth: AngularFireAuth) {

	}

	ngOnInit(){

	}

	setUser(user: user) {
		this.user = user
	}

	getUser(){
		return this.user
	}


	reAuth(username: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + '@taller.com', password))
	}

	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword)
	}

	updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail + '@taller.com')
	}

	async isAuthenticated() {
		if(this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if(user) {
			this.setUser({
				username: user.email.split('@')[0],
				uid: user.uid
			})

			return true
		}
		return false
	}
	/*
	getUID(): Observable<string> {
		let enviar : any
		firebase.auth().onAuthStateChanged((user) => {		
				enviar = user.uid 
				//console.log("user", user.uid);	
		  })

		  console.log(enviar)
		  if(enviar != null){
			return  enviar
		  }
		  enviar = "No hay un Usuario Conectado";
		  return enviar;
		  ;
	}
	*/
}
