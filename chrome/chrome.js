

// Setup Firebase

   var config = {
    apiKey: "AIzaSyBbrbr0jtmRlhE--SalVRaC7LNMmeiMQTs",
    
    databaseURL: "https://daily-321.firebaseio.com",
    
    storageBucket: "daily-321.appspot.com",

  };
  firebase.initializeApp(config);


var usersRef = firebase.database().ref('users')

// create Vue app
var app = new Vue({
  // element to mount to
  el: '#app',
  // initial data
  data: {
    newUser: {
      gratitude: {
        gratitude1: '',
        gratitude2: '',
        gratitude3: ''},
      todo: {
         todo1: '',
      todo2: ''
      },
     affirm: {
      affirm1:''}
    },
    
  },
  // firebase binding
  // https://github.com/vuejs/vuefire
  firebase: {
    users: usersRef
  },
  // computed property for form validation state
  computed: {
    validation: function() {
      return {
        gratitude1: !!this.newUser.gratitude.gratitude1.trim(),
        gratitude2: !!this.newUser.gratitude.gratitude2.trim(),
        gratitude3: !!this.newUser.gratitude.gratitude2.trim(),
        todo1: !!this.newUser.todo.todo1.trim(),
        todo2: !!this.newUser.todo.todo2.trim(),
        affirm1: !!this.newUser.affirm.affirm1.trim(),
      }
    },
    isValid: function() {
      var validation = this.validation
      return Object.keys(validation).every(function(key) {
        return validation[key]
      })
    }
  },
  // methods
  methods: {
    addUser: function() {
      if (this.isValid) {
        usersRef.push(this.newUser)
        this.newUser.gratitude.gratitude1 = ''
        this.newUser.gratitude.gratitude2 = ''
        this.newUser.gratitude.gratitude3 = ''
        this.newUser.todo.todo1 = ''
        this.newUser.todo.todo2 = ''
        this.newUser.affirm.affirm1 = ''
      }
    },
    removeUser: function(user) {
      usersRef.child(user['.key']).remove()
    }
  }
}) 
 
 if (typeof(Firebase) == 'undefined') {
    console.log("Requesting Firebase script.");
    chrome.extension.sendMessage({type: "requestFirebaseScript"}, function(res) {
        console.log(res);
        intervalId = setInterval(function() {
            console.log("Checking if Firebase script is loaded.");
            if (typeof(Firebase) == 'function') {
                initFb();
                clearInterval(intervalId);
            }
        }, 500);
    });
}
 
 