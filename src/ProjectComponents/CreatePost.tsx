import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { auth, db } from "@/firebase/firebase.ts";

const CreatePost = () => {
  const [caption, setCaption] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handlePostUpload = async () => {
    if (!image) {
      alert("Please select image");
      return;
    }

    try {
      setLoading(true);

      // Cloudinary Upload
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

      // Image URL from Cloudinary
      const imageUrl = data.secure_url;

      // Save Post to Firestore
      await addDoc(collection(db, "posts"), {
        caption,
        imageUrl,
        userId: auth.currentUser?.uid,
        userEmail: auth.currentUser?.email,
        Likes: [],
        comments: [],
        createdAt: serverTimestamp(),
      });

      alert("Post Uploaded");

      setCaption("");
      setImage(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold">
          Create Post
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-linear-to-br from-zinc-950 via-red-950/20 to-pink-950/20 text-white border-pink-500/30">
        <DialogHeader>
          <DialogTitle className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-red-400">
            Create New Post
          </DialogTitle>
          <DialogDescription className="text-pink-300/80">
            Upload a photo and add a caption
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="bg-zinc-900/50 border-pink-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500 focus:ring-pink-500/20"
          />

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="bg-zinc-900/50 border-pink-500/30 text-white file:bg-linear-to-r file:from-pink-500 file:to-red-500 file:text-white file:border-0 file:rounded cursor-pointer hover:border-pink-400/50"
          />

          <Button
            className="w-full bg-linear-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold"
            onClick={handlePostUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
