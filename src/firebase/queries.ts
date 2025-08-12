import { db } from "@/firebase/config";
import { Circle } from "@/types/schema";
import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
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

  const userDocRef = doc(db, "users", ownerId);
  const userSnap = await getDoc(userDocRef);

  try {
    await addDoc(collection(db, "circles"), {
      id: "",
      name: circleName,
      ownerId: ownerId,
      photoUrl: photoUrl,
      members: [
        {
          uid: ownerId,
          name: userSnap.data()?.displayName,
          photoUrl: userSnap.data()?.photoUrl,
        },
      ],
      createdAt: new Date(),
    }).then((docRef) => {
      circleId = docRef.id;
    });

    await updateDoc(userDocRef, {
      circles: [...userSnap.data()?.circles, circleId],
    });

    await updateDoc(doc(db, "circles", circleId), { id: circleId });
  } catch (error) {
    console.log("Error creating circle: ", error);
  }
}

export async function fetchCircles(userId: string): Promise<Circle[]> {
  const userDocRef = doc(db, "users", userId);
  const userSnap = await getDoc(userDocRef);
  const circleIds = userSnap.data()?.circles;

  if (circleIds.length === 0) {
    return [];
  }
  const q = query(
    collection(db, "circles"),
    where(documentId(), "in", circleIds),
  );

  const circleSnap = await getDocs(q);

  return circleSnap.docs.map((doc) => doc.data()) as Circle[];
}
