import { useEffect, useState, lazy, Suspense } from "react";

import { db } from "../firebase/firebase";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import MainLayout from "@/Layout/MainLayout";
import CreatePost from "@/ProjectComponents/CreatePost";
import PostSkeleton from "@/ProjectComponents/PostSkeleton";

// Lazy load PostCard
const PostCard = lazy(() => import("@/ProjectComponents/PostCard"));

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
  const [loading, setLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData: PostType[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PostType, "id">),
      }));

      setPosts(postsData);
      setLoading(false);
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
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <PostSkeleton key={item} />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <Suspense
            fallback={
              <div className="text-center py-10">
                <div className="space-y-6">
                  {[1, 2, 3].map((item) => (
                    <PostSkeleton key={item} />
                  ))}
                </div>
              </div>
            }
          >
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                imageUrl={post.imageUrl}
                caption={post.caption}
                userEmail={post.userEmail}
                likes={post.likes}
                comments={post.comments}
              />
            ))}
          </Suspense>
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
