


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
        alert(doc.get("d")); // Выводим ID каждого документа
      });
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  }
  async checkUserExists(userId) {
  try {
      const querySnapshot = await this.usersRef.where("id", "==", userId).get(); // Фільтруємо за полем name
      if (!querySnapshot.empty) {
        console.log(`Користувач із ім'ям ${name} існує.`);
        return true;
      } else {
        console.log(`Користувача із ім'ям ${name} не знайдено.`);
        return false;
      }
    } catch (error) {
      console.error("Помилка при перевірці користувача за ім'ям:", error);
      return false;
    }
  }
  async checkOrCreateUser(userId, userData) {
    try {
      // Пошук користувача за ID
      const userDoc = await this.usersRef.doc(userId).get();

      if (userDoc.exists) {
        // Користувач існує, повертаємо його дані
        console.log(`Користувач із ID ${userId} знайдений.`);
        return { id: userDoc.id, ...userDoc.data() };
      } else {
        // Користувача немає, створюємо новий
        await this.usersRef.doc(userId).set(userData);
        console.log(`Користувача із ID ${userId} створено.`);
        return { id: userId, ...userData };
      }
    } catch (error) {
      console.error("Помилка при перевірці або створенні користувача:", error);
      throw error;
    }
  }
}



user.checkUserExists(121);


