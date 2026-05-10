import { FaHeart, FaRegHeart } from "react-icons/fa";

import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CommentType = {
  text: string;
  userEmail: string;
};

type PostCardProps = {
  id: string;
  imageUrl: string;
  caption: string;
  userEmail: string;
  likes: string[];
  comments: CommentType[];
};

const PostCard = ({
  id,
  imageUrl,
  caption,
  userEmail,
  likes,
  comments,
}: PostCardProps) => {
  const [comment, setComment] = useState("");
  const currentUserId = auth.currentUser?.uid;

  const isLiked = likes?.includes(currentUserId || "");

  // Toggle Like
  const handleLike = async () => {
    const postRef = doc(db, "posts", id);

    try {
      if (isLiked) {
        // Unlike
        await updateDoc(postRef, {
          likes: arrayRemove(currentUserId),
        });
      } else {
        // Like
        await updateDoc(postRef, {
          likes: arrayUnion(currentUserId),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add Comment
  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        comments: arrayUnion({
          text: comment,
          userEmail: auth.currentUser?.email,
        }),
      });

      // Clear input
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <p className="font-semibold">{userEmail}</p>
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt="post"
        className="w-full max-h-125 object-cover"
      />

      {/* Actions */}
      <div className="p-4 space-y-3">
        {/* Like Button */}
        <button onClick={handleLike} className="cursor-pointer">
          {isLiked ? (
            <FaHeart size={26} className="text-red-500" />
          ) : (
            <FaRegHeart size={26} />
          )}
        </button>

        {/* Like Count */}
        <p className="font-semibold">{likes?.length || 0} likes</p>

        {/* Caption */}
        <p className="text-zinc-300">{caption}</p>

        {/* Comments */}
        <div className="space-y-2">
          {comments?.map((comment, index) => (
            <div key={index} className="text-sm">
              <span className="font-semibold">{comment.userEmail}</span>

              {" : "}

              <span className="text-zinc-300">{comment.text}</span>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="flex gap-2 pt-2">
          <Input
            placeholder="Add comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button onClick={addComment} className="cursor-pointer">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
