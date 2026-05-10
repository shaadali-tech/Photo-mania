import { useEffect, useState } from "react";

import { db } from "../firebase/firebase";

import { collection, getDocs } from "firebase/firestore";
import MainLayout from "@/Layout/MainLayout";

type PostType = {
  id: string;
  imageUrl: string;
  caption: string;
};

const Explore = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  // Fetch All Posts
  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));

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
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Explore</h1>

          <p className="text-zinc-400 mt-2">Discover amazing photos</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:scale-[1.02] transition"
            >
              <img
                src={post.imageUrl}
                alt="post"
                className="w-full h-72 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Explore;
