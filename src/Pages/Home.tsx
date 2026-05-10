import { useEffect, useState } from "react";

import { db } from "../firebase/firebase";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import MainLayout from "@/Layout/MainLayout";
import PostCard from "@/ProjectComponents/PostCard";
import CreatePost from "@/ProjectComponents/CreatePost";

type PostType = {
  id: string;
  imageUrl: string;
  caption: string;
  userEmail: string;
};

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

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
    fetchPosts();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-red-400">
            Home Feed
          </h1>

          <CreatePost />
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              imageUrl={post.imageUrl}
              caption={post.caption}
              userEmail={post.userEmail}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-pink-300/70">
              No posts yet. Be the first to create one!
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Home;
