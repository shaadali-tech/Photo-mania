import { useEffect, useState } from "react";

import { useAuth } from "../Context/AuthContext";

import { db } from "../firebase/firebase";

import { doc, getDoc } from "firebase/firestore";
import MainLayout from "@/Layout/MainLayout";

type UserData = {
  username: string;
  email: string;
  bio: string;
  profileImage: string;
};

const Profile = () => {
  const { user } = useAuth();

  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data
  const fetchUser = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data() as UserData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center gap-8 border-b border-zinc-800 pb-8">
          {/* Avatar */}
          <div>
            <img
              src={userData?.profileImage || "https://via.placeholder.com/150"}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">{userData?.username}</h1>

            <p className="text-zinc-400">{userData?.email}</p>

            <p>{userData?.bio || "No bio yet"}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
