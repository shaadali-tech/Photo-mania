import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase/firebase";

type NotificationType = {
  senderId: string;
  senderEmail: string;
  receiverId: string;
  type: string;
  message: string;
};

const sendNotification = async ({
  senderId,
  senderEmail,
  receiverId,
  type,
  message,
}: NotificationType) => {
  try {
    await addDoc(collection(db, "notifications"), {
      senderId,
      senderEmail,
      receiverId,
      type,
      message,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendNotification;
