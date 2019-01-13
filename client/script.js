function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    axios({
        method: 'POST',
        url: 'http://localhost:3000/api/signin/google',
        data: {
        id_token
        }
    })
    .then(({ data }) => {
        console.log(data)
        localStorage.setItem('token', data)
        isLogin()
    })
    .catch((err) => {
        console.log(err)
    })
    
}

function login(user) {
    axios({
        method: 'POST',
        url: 'http://localhost:3000/api/login',
        data: user
    })
    .then(({ data }) => {
        console.log(data)
        localStorage.setItem('token', data)
        isLogin()
    })
    .catch((err) => {
        console.log(err)
    })
}

function register(user) {
    axios({
        method: 'POST',
        url: 'http://localhost:3000/api/register',
        data: user
    })
    .then(({ data }) => {
        console.log(data)
        // localStorage.setItem('token', data)
        // isLogin()
    })
    .catch((err) => {
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear();
      isLogin();
    }); 
}


function isLogin() {
    let token = localStorage.getItem('token');
    if (token) {
      $('#loginpage').hide()
      $('#header').show()
      $('#g-signout').show()
      $('#content').show()
    } else {
      $('#loginpage').show()
      $('#header').hide()
      $('#g-signout').hide()
      $('#content').hide()
    }
}
