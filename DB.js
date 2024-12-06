<script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-firestore.js"></script>

<!-- Add Configuration keys -->
const firebaseConfig = {
     apiKey: "AIzaSyBQeqlmWsQ1sw-tc0032QdXV37JpmCv5V4",

    authDomain: "treeshake-52e39.firebaseapp.com",

    projectId: "treeshake-52e39",

    storageBucket: "treeshake-52e39.firebasestorage.app",

    messagingSenderId: "660889604481",

    appId: "1:660889604481:web:c550a63fbfef8ca1d95880",

    measurementId: "G-53FC039D13"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
class User {
  usersRef = db.collection("users");

  async getUsers() {
    try {
      const snapshot = await this.usersRef.get(); // Получаем все документы из коллекции
      snapshot.forEach(doc => {
        alert.log(doc.id); // Выводим ID каждого документа
      });
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  }
}

const user = new User();
user.getUsers();


