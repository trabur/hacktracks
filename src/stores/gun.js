// @ts-nocheck
import { writable } from 'svelte/store'

export default class GunStore {
  constructor(privateKey) {
    this.gun = new Gun(['https://gun-us.herokuapp.com/gun', 'https://gun-eu.herokuapp.com/gun'])
    this.user = this.gun.user()
    this.authentication = writable(null)
    this.contact = writable(null)
    this.privateKeySerialized = privateKey || null
    this.demoKeyID = 'Dh-X60XvlXhMZsFce-pzKUTQ_qHAuuSs3vQq8AOE0sk.KNANgABzsTFcHQnTAHzgkkRciAJIc9IU46QHx-JeB5U'
    this.demoKeypair = `{
      "pub": "Dh-X60XvlXhMZsFce-pzKUTQ_qHAuuSs3vQq8AOE0sk.KNANgABzsTFcHQnTAHzgkkRciAJIc9IU46QHx-JeB5U",
      "priv": "Q3uvtaxp8_G2kup295o6isrpaMblAGDAi-JMDrdQ92g",
      "epub": "HEoEUh415pPrq9_TBWJsiYZC84ibHDNj5PyO4rscE6o.Z3wpnqhAArE-70cYMcWQiac6pWq7xwVt69Q8lxGfE64",
      "epriv": "H27N8kjHFatcdoZSdl6sSIneEa-6mC9Mz3WRBEQmFSc"
    }`
  }

  register(username) {
    let user = {name: username}
    irisLib.Key.generate().then((key) => {
      let privateKey = key
      let privateKeySerialized = irisLib.Key.toString(privateKey)
      user.keyID = irisLib.Key.getId(privateKey)
      // console.log('register', user)
      this.loginWithKey(privateKeySerialized, user)
    })
  }

  loginWithKey(privateKeySerialized, self) {
    let privateKey
    if (privateKeySerialized) {
      privateKey = irisLib.Key.fromString(privateKeySerialized)
      localStorage.setItem('irisKey', privateKeySerialized)
      this.privateKeySerialized = privateKeySerialized
    } else {
      if (this.privateKeySerialized) {
        privateKey = irisLib.Key.fromString(this.privateKeySerialized)
      } else {
        privateKey = null // irisLib.Key.fromString(this.demoKeypair)
      }
    }
    let keyID = privateKey ? irisLib.Key.getId(privateKey) : null
    let authentication = {}
    authentication.user = {
      idType: 'keyID',
      idValue: keyID
    }
    let i = new irisLib.SocialNetwork({gun: this.gun, keypair: privateKey, self, debug: true})
    i.ready.then(() => {
      if (!keyID) { // only continue if this is logged in user
      } else {
        authentication.contact = i.get('keyID', keyID)
        authentication.contact.gun.get('attrs').open((val, key, msg, eve) => {
          let mostVerifiedAttributes = irisLib.Contact.getMostVerifiedAttributes(val)
          authentication.contact.mostVerifiedAttributes = mostVerifiedAttributes
          // console.log('authentication', authentication)
          this.authentication.set(authentication)
          if (mostVerifiedAttributes.profilePhoto) {eve.off()}
        })
      }
    })
  }

  contactById(keyID) {
    console.log('contactById', keyID)

    let privateKey = null
    if (this.privateKeySerialized) {
      privateKey = irisLib.Key.fromString(this.privateKeySerialized)
    } else {
      privateKey = irisLib.Key.fromString(this.demoKeypair)
    }

    let i = new irisLib.SocialNetwork({gun: this.gun, keypair: privateKey, debug: true})
    i.ready.then(() => {
      let contact = i.get('keyID', keyID)
      contact.gun.open((data) => {
        this.contact.set(data)
      })
    })
  }
  
  ordinalSuffixOf(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }
}