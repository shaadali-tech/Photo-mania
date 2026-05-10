import { useEffect, useState } from "react";

import { useAuth } from "../Context/AuthContext";

import { db } from "../firebase/firebase";

import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import { Input } from "../components/ui/input";

import { Textarea } from "../components/ui/textarea";

import { Button } from "../components/ui/button";

import { FaTrash } from "react-icons/fa";
import MainLayout from "@/Layout/MainLayout";

type UserData = {
  username: string;
  email: string;
  bio: string;
  profileImage: string;
};

type PostType = {
  id: string;
  imageUrl: string;
  caption: string;
};

const Profile = () => {
  const { user } = useAuth();

  const [userData, setUserData] = useState<UserData | null>(null);

  const [username, setUsername] = useState("");

  const [bio, setBio] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState<PostType[]>([]);

  // Fetch User Data
  const fetchUser = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as UserData;

        setUserData(data);

        setUsername(data.username);

        setBio(data.bio);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch User Posts
  const fetchUserPosts = async () => {
    if (!user) return;

    try {
      const q = query(collection(db, "posts"), where("userId", "==", user.uid));

      const querySnapshot = await getDocs(q);

      const postsData: PostType[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PostType, "id">),
      }));

      setPosts(postsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();

    fetchUserPosts();
  }, [user]);

  // Update Profile
  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);

      let imageUrl = userData?.profileImage || "";

      // Upload Image To Cloudinary
      if (image) {
        const formData = new FormData();

        formData.append("file", image);

        formData.append("upload_preset", "photoholic");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpbooywvo/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await response.json();

        imageUrl = data.secure_url;
      }

      // Update Firestore (create document if missing)
      await setDoc(
        doc(db, "users", user.uid),
        {
          username,
          bio,
          profileImage: imageUrl,
        },
        { merge: true },
      );

      alert("Profile Updated");

      fetchUser();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Post
  const handleDeletePost = async (postId: string) => {
    const confirmDelete = window.confirm("Delete this post?");

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "posts", postId));

      // Refresh posts
      fetchUserPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 border-b border-zinc-800 pb-8">
          {/* Profile Image */}
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

            {/* Stats */}
            <div className="flex gap-6 pt-2">
              <p>
                <span className="font-bold">{posts.length}</span> posts
              </p>
            </div>
          </div>
        </div>

        {/* Edit Profile */}
        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">Edit Profile</h2>

          {/* Username */}
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Bio */}
          <Textarea
            placeholder="Write bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          {/* Profile Image */}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          {/* Save Button */}
          <Button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="cursor-pointer"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* User Posts */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-6">Your Posts</h2>

          {posts.length === 0 ? (
            <p className="text-zinc-400">No posts yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 relative"
                >
                  {/* Delete Button */}
                  <Button
                    onClick={() => handleDeletePost(post.id)}
                    className="absolute top-3 right-3 bg-black/70 p-2 rounded-full cursor-pointer hover:bg-red-500 transition"
                  >
                    <FaTrash size={14} />
                  </Button>

                  {/* Image */}
                  <img
                    src={post.imageUrl}
                    alt="post"
                    className="w-full h-72 object-cover"
                  />

                  {/* Caption */}
                  <div className="p-3">
                    <p className="text-sm text-zinc-300 line-clamp-2">
                      {post.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
