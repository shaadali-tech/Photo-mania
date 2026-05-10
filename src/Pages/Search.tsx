import { useEffect, useState } from "react";

import { db, auth } from "../firebase/firebase";
import sendNotification from "../lib/sendNotification";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { Input } from "../components/ui/input";

import { Button } from "../components/ui/button";
import MainLayout from "@/Layout/MainLayout";

type UserType = {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  followers: string[];
  following: string[];
};

const Search = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  const [search, setSearch] = useState("");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      const usersData: UserType[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<UserType, "id">),
      }));

      setUsers(usersData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Follow / Unfollow
  const handleFollow = async (targetUserId: string, isFollowing: boolean) => {
    const currentUserId = auth.currentUser?.uid;

    if (!currentUserId) return;

    try {
      const currentUserRef = doc(db, "users", currentUserId);

      const targetUserRef = doc(db, "users", targetUserId);

      if (isFollowing) {
        // Unfollow
        await updateDoc(currentUserRef, {
          following: arrayRemove(targetUserId),
        });

        await updateDoc(targetUserRef, {
          followers: arrayRemove(currentUserId),
        });
      } else {
        // Follow
        await updateDoc(currentUserRef, {
          following: arrayUnion(targetUserId),
        });
        await sendNotification({
          senderId: currentUserId,
          senderEmail: auth.currentUser?.email || "",
          receiverId: targetUserId,
          type: "follow",
          message: "started following you",
        });

        await updateDoc(targetUserRef, {
          followers: arrayUnion(currentUserId),
        });
      }

      // Refresh Users
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Filter Users
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Search Users</h1>

          <p className="text-white mt-2">Discover creators</p>
        </div>

        {/* Search Input */}
        <Input
          placeholder="Search username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8"
        />

        {/* Users */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-xl"
            >
              {/* Avatar */}
              <img
                src={user.profileImage || "https://via.placeholder.com/100"}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover"
              />

              {/* User Info */}
              <div>
                <h2 className="font-bold text-lg text-white">
                  {user.username}
                </h2>

                <p className="text-white text-sm">{user.email}</p>

                {/* Followers */}
                <p className="text-sm text-white mt-1">
                  {user.followers?.length || 0} followers
                </p>
              </div>

              {/* Follow Button */}
              <Button
                className="ml-auto cursor-pointer"
                onClick={() =>
                  handleFollow(
                    user.id,
                    user.followers?.includes(auth.currentUser?.uid || ""),
                  )
                }
              >
                {user.followers?.includes(auth.currentUser?.uid || "")
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
