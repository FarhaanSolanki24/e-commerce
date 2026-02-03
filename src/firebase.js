import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBEjPjI32un-fLkHnTQh0EDopSBE6aLuzk",
  authDomain: "e-comm-d3819.firebaseapp.com",
  projectId: "e-comm-d3819",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
