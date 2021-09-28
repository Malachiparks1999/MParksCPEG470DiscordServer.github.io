// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";

import * as fbauth from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB2zBeQg2jEfb7qIM6JoW8I--6JPW3zrsA",

  authDomain: "mparks-discordserverlite.firebaseapp.com",

  databaseURL: "https://mparks-discordserverlite-default-rtdb.firebaseio.com",

  projectId: "mparks-discordserverlite",

  storageBucket: "mparks-discordserverlite.appspot.com",

  messagingSenderId: "426320090593",

  appId: "1:426320090593:web:9d02cbbc237c1258c62ea0",

  measurementId: "G-Q072GL6V60"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// set up database communication vars
const db = rtdb.getDatabase(app);
const chatRef = rtdb.ref(db, "/chats");

// set up database auth vars
const auth = fbauth.getAuth(app);

/* #######################    Send Messages Functions   ####################### */

// Used to send messages to the rtdb
function sendMessage() {
  // send message
  var message = $("#messageBox").val();
  rtdb.push(chatRef, message);
  $("#messageBox").val(""); //set element value to empty
}

/* #######################    Auth Functions   ####################### */

fbauth.onAuthStateChanged(auth, (user) => {
  if (!!user) {
    // check to see if there is a user
    $(".login-wrapper").hide(); // hide login and register button
    $(".logoutUser").show(); // show logout button
    $("#logoutButton").on("click", () => {
      fbauth.signOut(auth);
      $(".logoutUser").hide();
      $(".login-wrapper").show();
    });
  } else {
    $(".login-wrapper").show();
    $(".logoutUser").hide();
  }
});

/* #######################    Rendering Functions   ####################### */

//Chat Messages Appearing Rendering
rtdb.onValue(chatRef, (ss) => {
  let saved = ss.val();
  if (saved == null) {
    saved = "";
  }
  let keys = Object.keys(saved);
  $("#chatLog").html("");
  keys.map((pass) => {
    $("#chatLog").append(`<li>${saved[pass]}</li>`);
  });
});

/* #######################    Binding Functions   ####################### */
$("#submitButton").click(sendMessage); // bind listener to send message with click

$("#registerCredsButton").click(function () {
  // bind listener to register message with
  var email = $("#regEmail").val();
  var regPass = $("#regPass").val();
  var confPass = $("#confPass").val();
  var username = $("#usernameReg").val();
  if (regPass != confPass) {
    alert("Passwords do not match");
    //sanatize boxes so they look empty
    $("#regEmail").val("");
    $("#usernameReg").val("");
    $("#regPass").val("");
    $("#confPass").val("");
    return;
  }
  fbauth
    .createUserWithEmailAndPassword(auth, email, confPass)
    .then((somedata) => {
      var uid = somedata.user.uid;
      // refs section
      var userRoleRef = rtdb.ref(db, `/users/${uid}/roles/user`);
      var userEmailRef = rtdb.ref(db, `users/${uid}/email`);
      var usernameRef = rtdb.ref(db, `users/${uid}/username`);

      // setting infromation
      rtdb.set(userRoleRef, true); // user only accounts (not admin, mod or owner)
      rtdb.set(usernameRef, username); // set username up for user
      rtdb.set(userEmailRef, email); // set useraccount to email in case

      //sanatize boxes so they look empty
      $("#regEmail").val("");
      $("#usernameReg").val("");
      $("#regPass").val("");
      $("#confPass").val("");
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorMessage); //notify user
      console.log(errorCode);
      console.log(errorMessage);
    });
});

// used to sign into FB
$("#loginButton").click(function () {
  let email = $("#loginEmail").val();
  let pwd = $("#loginPass").val();
  fbauth
    .signInWithEmailAndPassword(auth, email, pwd)
    .then((somedata) => {
      console.log(somedata);
      $("#loginEmail").val("");
      $("#loginPass").val("");
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage); // notfiy user
      console.log(errorCode);
      console.log(errorMessage);
    });
});
