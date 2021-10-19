// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";

import * as fbauth from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional user

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

// GLOBAL VARS
let adminStatus = false; // var for checking if user is admin upon authLogin
let currentChatRoom = "-MmPN7iSI47U5gNrrzKB"; //general chat

// set up database communication vars
const db = rtdb.getDatabase(app);
const chatRef = rtdb.ref(db, `channels/${currentChatRoom}/chats`);

// set up database auth vars
let auth = fbauth.getAuth(app);

/* #######################    Send Messages Functions   ####################### */

// Used to send messages to the rtdb
function sendMessage() {
  // used to push message to DB
  var messageTxt = $("#messageBox").val();
  var currDate = new Date();
  let msgToBeSent = {
    author: auth.currentUser.uid,
    message: messageTxt,
    timestamp: parseInt(currDate.getTime()),
    edited: "false"
  };
  rtdb.push(chatRef, msgToBeSent);

  $("#messageBox").val(""); //set element value to empty
}

/* #######################    Auth Functions   ####################### */

fbauth.onAuthStateChanged(auth, (user) => {
  if (!!user) {
    // change admin status here
    var adminRef = rtdb.ref(db, `users/${auth.currentUser.uid}/roles/admin`);
    rtdb.onValue(adminRef, (ss) => {
      adminStatus = ss.val();
      if(adminStatus){
        $(".admin-controls").show() // hide admin area)
      }
    });
    
    // display list of users here to promote if admin
    var allUsersRef = rtdb.ref(db,'/users/');
    
    // creates element in dom to render
    rtdb.onChildAdded(allUsersRef, (ss) => {
      displayPromoteUser(ss.val(),ss.key);
    });
    
    // check to see if there is a user
    $(".login-wrapper").hide(); // hide login and register button
    $(".logoutUser").show(); // show logout button
    $(".chatSection").show(); // show chat area
    $("#loggedIn").html("Logged in as: " + user.displayName); // show who is logged in

    $("#logoutButton").on("click", () => {
      fbauth.signOut(auth);
      $(".logoutUser").hide();
      $(".chatSection").hide(); // show chat area
      $(".admin-controls").hide() // hide admin area
      $(".login-wrapper").show();
      adminStatus = false;
    });
  } else {
    $(".login-wrapper").show();
    $(".logoutUser").hide();
    $(".chatSection").hide();
    $(".admin-controls").hide() // hide admin area
    adminStatus = false;
  }
});

/* #######################    Rendering Functions   ####################### */

// renders when chat is added to DB
rtdb.onChildAdded(chatRef, (ss) => {
  displayMessage(ss.val(), ss.key); // passes obj and uuid to function to display
});

// renders when edit made to message in DB
rtdb.onChildChanged(chatRef, (ss) => {
  var messageKey = "#" + ss.key + "_msgContents";
  $(messageKey).text(ss.val().message); // sets new text to this
});

// renders when edit made to message in DB
rtdb.onChildRemoved(chatRef, (ss) => {
  if($('#' + ss.key + '_liItem') != null){
    $('#' + ss.key + '_liItem').remove();
  }
});

// used when rendering chats
function displayMessage(obj, messageID) {
  // Id creation on the fly (idea came from working with Justin Henike)
  var liID = messageID + "_liItem";
  var divID = messageID + "_messageWrapper";
  var dateID = messageID + "_dateOfMessage";
  var msgID = messageID + "_msgContents";
  var editWrapperID = messageID + "_editOrDeleteWrapper";
  var editBtnID = messageID + "_editBtn";
  var editInputTextID = messageID + "_editInput";
  var delBtnID = messageID + "_delBtn"
  
  // appending each element, basic contents 
  var msgListWrapper = document.createElement('li'); // list item (main unit)
  msgListWrapper.id = liID;
  
  var msgDivWrapper = document.createElement('div'); // div item holds all message contents
  msgDivWrapper.id = divID;
  
  var nameElement = document.createElement('h3'); // holds name element
  var username = rtdb.ref(db, `users/${obj.author}/username`);
  rtdb.onValue(username, (ss) => {
    nameElement.innerText = ss.val(); // whatever value is there, add it to element
    msgDivWrapper.prepend(nameElement);
  });
  
  // shows message date of when sent
  var msgDate = document.createElement('h6');
  msgDate.id = dateID;
  msgDate.innerText = new Date(obj.timestamp);
  msgDivWrapper.append(msgDate);
  
  // shows the content of the message
  var msgContent = document.createElement('p');
  msgContent.id = msgID;
  msgContent.innerText = obj.message;
  msgDivWrapper.append(msgContent);
  
  // if author add edit button
  if(obj.author == auth.currentUser.uid){
    let editWrapper = document.createElement('p');
    editWrapper.id = editWrapperID;
    
    // button that allows editing
    var editButton = document.createElement('input');
    editButton.id = editBtnID;
    editButton.type = "button";
    editButton.value = "Edit Message";
    editWrapper.append(editButton);
    
    // input box that shows up to take text for new message
    var editInputText = document.createElement('input');
    editInputText.id = editInputTextID;
    editInputText.type = "text";
    editButton.placeholder = "New Message";
    editWrapper.append(editInputText);
    
    // appending to divWrapper
    msgDivWrapper.append(editWrapper);
  }
  
  // adding delete message if admin to all messages, or current users messages
  if(adminStatus == true || obj.author == auth.currentUser.uid){
    var msgDelBtn = document.createElement('input');
    msgDelBtn.id = delBtnID;
    msgDelBtn.type = "button";
    msgDelBtn.value = "Delete Message";
    msgDivWrapper.append(msgDelBtn);
  }
  
  // adding internal HTML to list items
  msgListWrapper.append(msgDivWrapper);
  
  
  // appending item to render on page
  $("#chatLog").append(msgListWrapper);
  
  // edit button listeners (pulled from https://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements)
  $(document).on("click", "#"+editBtnID, function(){
    
    //EDITNG FLAG THAT MESSAGE HAS BEEN EDITED
    var editMessageRef = rtdb.ref(db, `/chats/${messageID}/edited/`);
    rtdb.set(editMessageRef, "true");
    
    // EDITS MESSAGE HELL YEAH
    var newVal = $(document).find('#'+editInputTextID).val();
    var currMessageRef = rtdb.ref(db, `channels/${currentChatRoom}/chats/${messageID}/message/`);
    rtdb.set(currMessageRef, newVal + " (edited)");
  });
  
  // delete button listeners (pulled from https://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements)
  $(document).on("click", "#"+delBtnID, function(){
    var messageToDel = rtdb.ref(db, `channels/${currentChatRoom}/chats/${messageID}/`);
    rtdb.remove(messageToDel);
  });
}

function displayPromoteUser(obj,userID){
        // adding users to list to be seen
      var newUserLI = document.createElement('li');
      newUserLI.innerText = obj.username + " ";
      
      // creating button for admin promo
      var promoteBtn = document.createElement('input');
      var promoteBtnID = obj.email + "_BtnID";
      promoteBtn.id = promoteBtnID;
      promoteBtn.type = "button";
      promoteBtn.value = "Promote To Admin";
      newUserLI.append(promoteBtn);//append to element
  
      // creating button to demote from admin
      var demoteBtn = document.createElement('input');
      var demoteBtnID = obj.email + "_demBtnID";
      demoteBtn.id = demoteBtnID;
      demoteBtn.type = "button";
      demoteBtn.value = "Demote from Admin";
      
      newUserLI.append(demoteBtn);
      
      // Append to list on DOM
      $("#userList").append(newUserLI);
      
      // binding promote buttons to function event-binding-on-dynamically-created-elements
      document.getElementById(promoteBtnID).addEventListener("click", function (){
        var adminRef = rtdb.ref(db, `users/${userID}/roles/admin`)
        rtdb.set(adminRef,true);
        alert(obj.username+" was promoted to admin!")
      });
  
        // binding promote buttons to function event-binding-on-dynamically-created-elements
      document.getElementById(demoteBtnID).addEventListener("click", function (){
        var adminRef = rtdb.ref(db, `users/${userID}/roles/admin`)
        rtdb.set(adminRef,false);
        alert(obj.username+" was demoted from admin!")
      });
}

/* #######################    Binding Functions   ####################### */
$("#submitButton").click(sendMessage); // bind listener to send message with click

$("#createChannelBtn").click(function (){
  var channelNameRef = rtdb.ref(db,"channels/");
  
  // creating channel object in DB
  var channelName = {
    name: $("#channelNameBox").val(),
  };
  rtdb.push(channelNameRef,channelName)
  $("#channelNameBox").val(""); // clear out box
});

$("#registerCredsButton").click(function () {
  // bind listener to register message with
  var email = $("#regEmail").val();
  var regPass = $("#regPass").val();
  var confPass = $("#confPass").val();
  var username = $("#usernameReg").val();
  if (regPass != confPass) {
    alert("Passwords do not match");
    //sanatize boxes so they look empty
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
      var adminRoleRef = rtdb.ref(db, `/users/${uid}/roles/admin`);
      var userEmailRef = rtdb.ref(db, `users/${uid}/email`);
      var usernameRef = rtdb.ref(db, `users/${uid}/username`);

      // setting infromation
      rtdb.set(userRoleRef, true); // user only accounts (not admin, mod or owner)
      rtdb.set(adminRoleRef,false); //
      rtdb.set(usernameRef, username); // set username up for user
      rtdb.set(userEmailRef, email); // set useraccount to email in case

      // Editing display name for user to call later
      fbauth.updateProfile(somedata.user, {
        displayName: username,
        photoURL: null
      });
      $("#loggedIn").html("Logged in as: " + username); // show who is logged in

      //sanatize boxes so they look empty
      $("#regEmail").val("");
      $("#usernameReg").val("");
      $("#regPass").val("");
      $("#confPass").val("");

      alert("Registration Successful!");
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

// used to sign reset email password
$("#forgotButton").click(function () {
  let email = $("#forgotEmail").val();
  fbauth
    .sendPasswordResetEmail(auth, email)
    .then((somedata) => {
      console.log(somedata);
      // clean up input
      $("#forgotEmailEmail").val("");
      alert("Password Reset Email Sent");
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
