<script type="module">

  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {

    apiKey: "AIzaSyBUPSkWopoWxow-JF1COYbDDkniq7XitOo",

    authDomain: "mparks-fbrtdbex.firebaseapp.com",

    databaseURL: "https://mparks-fbrtdbex-default-rtdb.firebaseio.com",

    projectId: "mparks-fbrtdbex",

    storageBucket: "mparks-fbrtdbex.appspot.com",

    messagingSenderId: "490911240079",

    appId: "1:490911240079:web:1c7eb6d5bfe6579c9c45fa",

    measurementId: "G-KBS26KCSXH"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);

</script>