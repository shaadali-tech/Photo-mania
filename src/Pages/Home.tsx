import { useEffect, useState } from "react";

import { db } from "../firebase/firebase";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import MainLayout from "@/Layout/MainLayout";
import PostCard from "@/ProjectComponents/PostCard";
import CreatePost from "@/ProjectComponents/CreatePost";

type CommentType = {
  text: string;
  userEmail: string;
};

type PostType = {
  id: string;
  imageUrl: string;
  caption: string;
  userEmail: string;
  likes: string[];
  comments: CommentType[];
};

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  // Fetch posts
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData: PostType[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PostType, "id">),
      }));

      setPosts(postsData);
    });

    return () => unsubscribe();
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
              id={post.id}
              imageUrl={post.imageUrl}
              caption={post.caption}
              userEmail={post.userEmail}
              likes={post.likes}
              comments={post.comments}
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
