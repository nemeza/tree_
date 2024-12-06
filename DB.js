


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

   async checkOrCreateUser(userId) {
  try {
    // Пошук користувача за властивістю "id"
    const querySnapshot = await this.usersRef.where("id", "==", userId).get();

    if (!querySnapshot.empty) {
      // Користувач існує, повертаємо його дані
      const userDoc = querySnapshot.docs[0]; // Беремо перший документ зі збірки
      console.log(`Користувач із ID ${userId} знайдений.`);
      return { id: userDoc.id, ...userDoc.data() }; // Повертаємо всі дані користувача
    } else {
      // Користувача немає, створюємо нового
      const newUser = { id: userId, createdAt: new Date(), balance: 0 }; // Мінімальні дані нового користувача
      const newDocRef = this.usersRef.doc(); // Генеруємо новий документ із випадковим ID
      await newDocRef.set(newUser); // Додаємо нового користувача в базу
      console.log(`Користувача із ID ${userId} створено.`);
      return { id: newDocRef.id, ...newUser }; // Повертаємо дані нового користувача
    }
  } catch (error) {
    console.error("Помилка при перевірці або створенні користувача:", error);
    throw error;
  }
}

    async updateUserBalance(userId, amountToAdd) {
        try {
            // Пошук користувача за властивістю "id"
            const querySnapshot = await this.usersRef.where("id", "==", userId).get();

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]; // Беремо перший документ зі збірки
                const currentBalance = userDoc.data().balance || 0; // Поточний баланс або 0, якщо його немає
                const newBalance = currentBalance + amountToAdd; // Збільшуємо баланс на зазначену суму

                const docRef = this.usersRef.doc(userDoc.id); // Отримуємо посилання на документ
                await docRef.update({balance: newBalance}); // Оновлюємо баланс

                console.log(`Баланс для користувача із ID ${userId} оновлено. Новий баланс: ${newBalance}.`);
                return {id: userDoc.data().id, balance: newBalance}; // Повертаємо оновлені дані
            } else {
                console.log(`Користувач із ID ${userId} не знайдений.`);
                throw new Error("Користувача з таким ID не існує.");
            }
        } catch (error) {
            console.error("Помилка при оновленні балансу користувача:", error);
            throw error;
        }

    }
}




