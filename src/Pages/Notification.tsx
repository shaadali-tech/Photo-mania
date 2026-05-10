import { useEffect, useState } from "react";

import { auth, db } from "../firebase/firebase";

import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import MainLayout from "@/Layout/MainLayout";

type NotificationType = {
  id: string;
  senderEmail: string;
  message: string;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // Fetch Notifications
  const fetchNotifications = async () => {
    const currentUserId = auth.currentUser?.uid;

    if (!currentUserId) return;

    try {
      const q = query(
        collection(db, "notifications"),
        where("receiverId", "==", currentUserId),
        orderBy("createdAt", "desc"),
      );

      const querySnapshot = await getDocs(q);

      const data: NotificationType[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<NotificationType, "id">),
      }));

      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Notifications</h1>

          <p className="text-zinc-400 mt-2">Your recent activity</p>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-zinc-400">No notifications yet</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl"
              >
                <p>
                  <span className="font-bold">{notification.senderEmail}</span>{" "}
                  {notification.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;
