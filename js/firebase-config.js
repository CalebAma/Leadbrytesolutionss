// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmcJb5bSPGfBrcuexuPRiv37GIqpzHmLQ",
    authDomain: "leadbryte-solutions-website.firebaseapp.com",
    projectId: "leadbryte-solutions-website",
    storageBucket: "leadbryte-solutions-website.firebasestorage.app",
    messagingSenderId: "418567681709",
    appId: "1:418567681709:web:991fd66c8ef646e1d53824",
    measurementId: "G-KP9278VC0D"
  };

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Newsletter subscription function
export async function subscribeToNewsletter(email) {
  try {
    const docRef = await addDoc(collection(db, 'newsletter_subscribers'), {
      email: email,
      createdAt: new Date().toISOString()
    });
    return { success: true, message: 'Successfully subscribed to newsletter!' };
  } catch (error) {
    return { success: false, message: 'Error subscribing to newsletter: ' + error.message };
  }
}

// Contact form submission function
export async function submitContactForm(formData) {
  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      createdAt: new Date().toISOString()
    });
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    return { success: false, message: 'Error sending message: ' + error.message };
  }
}