import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export async function addUserToFirestore(userId: string, email: string) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnap = await getDoc(userDocRef);

    // Return if user already exists
    if (userSnap.exists()) {
      return;
    }
    await setDoc(userDocRef, {
      email: email,
      photoUrl: "",
      displayName: "",
      phone: "",
      onboardingCompleted: false,
      createdAt: new Date(),
      circles: [],
    });
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
}

export async function createCircle(
  circleName: string,
  ownerId: string,
  photoUrl: string,
) {
  // Create new circle
  let circleId = "";

  try {
    await addDoc(collection(db, "circles"), {
      name: circleName,
      ownerId: ownerId,
      photoUrl: photoUrl,
      members: [ownerId],
      createdAt: new Date(),
    }).then((docRef) => {
      circleId = docRef.id;
    });
  } catch (error) {
    console.log(error);
  }

  // Add circle to user's circles
  try {
    const userDocRef = doc(db, "users", ownerId);
    const userSnap = await getDoc(userDocRef);
    await updateDoc(userDocRef, {
      circles: [...userSnap.data()?.circles, circleId],
    });
  } catch (error) {
    console.log(error);
  }
}
