// @ts-nocheck
import { writable } from 'svelte/store'

export default class GunStore {
  constructor() {
    this.gun = new Gun(['https://gunjs.herokuapp.com/gun'])
    this.user = this.gun.user()
    this.authentication = writable(null)
    this.contact = writable(null)
  }

  register(username, password) {
    console.log('register')
    this.user.create(username, password, (ack) => {
      console.log('ack', ack)

      if (ack.err) {
        // {
        //   err: // with one of 2 possible errors described below
        // }
        // If user is already being created: "User is already being created or authenticated!"
        // If user already exists: "User already created!"
        alert(ack.err)
      } else {
        // {
        //   ok: 0,
        //   pub: '"wFGe7hNFi6j0DYvngFc9TRIIhmAm3RpTaYTKKqu2P-k.p2ovroVP3Nwlt8I3k_1MtOVBV3dTY8qcwaSkU1qIB5Y"' //public key of the user that was just created
        // }
        // User is registered success
        this.user.auth(username, password, (ack) => {
          if (ack.err) {
            alert(ack.err)
          } else {
            console.log('success')
            this.user.recall({ sessionStorage: true })
            window.location.href = '/'
          }
        })
      }
    })
  }

  login(username, password) {
    console.log('login')
    this.user.auth(username, password, (ack) => {
      console.log('ack', ack)
      if (ack.err) {
        // on failure callback is called cb(ack) where ack is as below
        // {
        //     err: 'Wrong user or password.'
        // }
        alert(ack.err)
      } else {
        // on success calls callback with a reference to the gun user
        console.log('success')
        this.user.recall({ sessionStorage: true })
      }
    })
  }
}