import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor () { }

  public isAuthenticated () : Boolean {
    const userData = localStorage.getItem('')
    if (userData) {
      return true
    }
    return false
  }
}