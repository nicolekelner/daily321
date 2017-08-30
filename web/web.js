// Setup Firebase
var config = {
  apiKey: "AIzaSyBbrbr0jtmRlhE--SalVRaC7LNMmeiMQTs",
  authDomain: "daily-321.firebaseapp.com",
  databaseURL: "https://daily-321.firebaseio.com",
  projectId: "daily-321",
  storageBucket: "daily-321.appspot.com",
  messagingSenderId: "1070712118809"
};
firebase.initializeApp(config)

var usersRef = firebase.database().ref('users')
var affirmsRef= firebase.database().ref('affirms')
var todosRef= firebase.database().ref('todos')
var gratitudesRef= firebase.database().ref('gratitudes')
var entriesRef= firebase.database().ref('entries')

//if user logs in or logs out 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  }
  else {
    // No user is signed in.
  }
});

var user = firebase.auth().currentUser;
var name, email, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  emailVerified = user.emailVerified;
  uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
}

// create Vue app
var app = new Vue({
  // element to mount to
  el: '#app',
  // initial 321 data
  data: {
    gratitudes1: {
      text: '',
      number: '',
      date:'',
      entryID: '',
      userID:'',
    },
    gratitudes2: {
      text: '',
      number: '',
      date:'',
      entryID: '',
      userID:'',
    },
    gratitudes3: {
      text: '',
      number: '',
      date:'',
      entryID: '',
      userID:'',
    },
    todos1: {
      text: '',
      number: '',
      date:'',
      entryID: '',
      userID:'',
    },
    todos2: {
      text: '',
      number: '',
      date:'',
      entryID: '',
      userID:'',
    },
    affirms1: {
      text: '',
      number: '',
      date:'',
      entryID: '',
      userID:'',
    },
    newEmail: '',
    emails: [{
      text: 'new pw'
    }],
    newPassword: '',
    passwords: [{
      text: 'new pw'
    }],
    createLogin: true,
    showDaily: false
  },
 
  firebase: {
    users: usersRef,
    gratitudes: gratitudesRef,
    todos: todosRef,
    affirms: affirmsRef,
    entries: entriesRef
  },
  // computed property for form validation state
  computed: {
    validation: function() {
      return {
        //cuts down any extra characters 
        gratitudes1: !!this.gratitudes1.text.trim(),
        gratitudes2: !!this.gratitudes2.text.trim(),
        gratitudes3: !!this.gratitudes3.text.trim(),
        todos1: !!this.todos1.text.trim(),
        todos2: !!this.todos2.text.trim(),
        affirms1: !!this.affirms1.text.trim(),
      }
    },
    isValid: function() {
      var validation = this.validation
      return Object.keys(validation).every(function(key) {
        return validation[key]
      })
    },
  },
  methods: {
    addDaily: function() {
      if (this.isValid) {
        //sends new gratitude data to user node in Firebase 
        gratitudesRef.push(this.gratitudes1)
        this.gratitudes1.text = ''
        gratitudesRef.push(this.gratitudes2)
        this.gratitudes2.text = ''
        gratitudesRef.push(this.gratitudes3)
        this.gratitudes3.text = ''
        todosRef.push(this.todos1)
        this.todos1.text = ''
        todosRef.push(this.todos2)
        this.todos2.text = ''
        affirmsRef.push(this.affirms1)
        this.affirms1.text = ''
      }
    },

    userLogin: function() {
      //cuts down excess characters in email
      var mail = this.newEmail.trim()
      var pass = this.newPassword.trim()

      if (mail && pass) {
        this.emails.push({
          mail: mail
        })
        this.newEmail = ''

        this.passwords.push({
          pass: pass
        })
        this.newPassword = ''
      }
      //sends user email and password to firebase to create a user 
      firebase.auth().createUserWithEmailAndPassword(mail, pass).then(() => {
        //hides email prompt and shows daily321
        this.createLogin = false;
        this.showDaily = true;
        usersRef.push(this.mail)
        
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
      });
    },
  },
  
  //this does nothing currently 
  removeUser: function(user) {
    usersRef.child(user['.key']).remove()
  }
  
})
