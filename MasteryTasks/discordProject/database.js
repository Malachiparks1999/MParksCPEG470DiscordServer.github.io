// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";

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

let db = rtdb.getDatabase(app);
let chatRef = rtdb.ref(db,"/chats")

// get data from input box then append to list

function sendMessage(){
    let message = document.getElementById("messageBox").ariaValueMax; // pull input value
    let newListMessage = document.createElement("li"); // creating new list item to append
    newListMessage.innerHTML = message; // list items new text
    document.getElementById("chatLog").append(newListMessage); // append to list

    // pushing list to chats in DB
    rtdb.onValue(chatRef, (ss) => {
       db.child("chats").push();
      });
}

//binding sendMessage to submit button
document.getElementById("submitButton").addEventListener("click",sendMessage); 