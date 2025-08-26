import { db, storage } from "@/firebase/config";
import { Circle, CircleMember, User } from "@/types/schema";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
      onboardingCompleted: false,
      createdAt: new Date(),
      circles: [],
    });
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
}

export async function completeUserOnboarding(
  userId: string,
  displayName: string,
  photo: File | undefined,
) {
  try {
    const storageRef = ref(
      storage,
      `users/${userId}/${photo?.name}-${Date.now()}`,
    );
    if (photo) {
      await uploadBytes(storageRef, photo);
    }
    const photoUrl = await getDownloadURL(storageRef);

    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, {
      displayName: displayName,
      photoUrl: photoUrl,
      onboardingCompleted: true,
    });
  } catch (error) {
    console.error("Error completing onboarding", error);
  }
}

export async function fetchUserData(userId: string) {
  if (!userId) {
    return;
  }
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnap = await getDoc(userDocRef);
    return userSnap.data() as User;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export async function createCircle(
  circleName: string,
  ownerId: string,
  photo: File | undefined,
) {
  // Create new circle
  let circleId = "";

  const userDocRef = doc(db, "users", ownerId);
  const userSnap = await getDoc(userDocRef);

  try {
    const storageRef = ref(
      storage,
      `users/${ownerId}/circles/${circleName}/${photo?.name}-${Date.now()}`,
    );
    if (photo) {
      await uploadBytes(storageRef, photo);
    }
    const photoUrl = await getDownloadURL(storageRef);

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
          weeklyVideoUrl: "",
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

export async function fetchCircleData(circleId: string) {
  try {
    const circleDocRef = doc(db, "circles", circleId);
    const circleSnap = await getDoc(circleDocRef);
    return circleSnap.data() as Circle;
  } catch (error) {
    console.error("Error fetching circle data:", error);
  }
}

export async function addUserVideo(
  userId: string,
  circleId: string,
  circleName: string,
  weeklyVideo: File,
) {
  try {
    // Upload video to Firebase Storage
    const storageRef = ref(
      storage,
      `users/${userId}/circles/${circleName}/videos/${weeklyVideo.name}-${Date.now()}`,
    );
    await uploadBytes(storageRef, weeklyVideo);

    // Get video URL from Firebase Storage
    const weeklyVideoUrl = await getDownloadURL(storageRef);

    // Update user video URL in Firestore
    const circleDocRef = doc(db, "circles", circleId);
    const circleSnap = await getDoc(circleDocRef);
    const members = circleSnap.data()?.members as CircleMember[];
    const updatedMembers = members.map((member) =>
      member.uid === userId
        ? { ...member, weeklyVideoUrl: weeklyVideoUrl }
        : member,
    );
    await updateDoc(circleDocRef, {
      members: updatedMembers,
    });
  } catch (error) {
    console.error("Error adding user video:", error);
  }
}
