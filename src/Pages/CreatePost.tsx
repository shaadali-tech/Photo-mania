import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { auth, db } from "@/firebase/firebase";

const CreatePostPage = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePostUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    if (!caption.trim()) {
      alert("Please add a caption");
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
      const imageUrl = data.secure_url;

      // Save Post to Firestore
      await addDoc(collection(db, "posts"), {
        caption,
        imageUrl,
        uid: auth.currentUser?.uid,
        userEmail: auth.currentUser?.email,
        likes: [],
        comments: [],
        createdAt: serverTimestamp(),
      });

      alert("Post uploaded successfully!");
      setCaption("");
      setImage(null);

      // Navigate back to home
      navigate("/");
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Error uploading post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-linear-to-br from-zinc-900 to-zinc-800/50 border border-pink-500/30 rounded-xl p-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-red-400 mb-8">
          Create a New Post
        </h1>

        <div className="space-y-6">
          {/* Caption Input */}
          <div>
            <label className="block text-sm font-semibold text-pink-300 mb-2">
              Caption
            </label>
            <Textarea
              placeholder="Write a caption for your post..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-zinc-900/50 border border-pink-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500 focus:ring-pink-500/20 rounded-lg p-3 resize-none h-24"
            />
            <p className="text-xs text-pink-300/50 mt-1">
              {caption.length} characters
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-pink-300 mb-2">
              Upload Image
            </label>
            <div className="border-2 border-dashed border-pink-500/30 rounded-lg p-8 text-center hover:border-pink-500/60 transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
                id="image-input"
              />
              <label htmlFor="image-input" className="cursor-pointer block">
                {image ? (
                  <div>
                    <p className="text-pink-300 font-semibold">{image.name}</p>
                    <p className="text-sm text-pink-300/70 mt-1">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-pink-300 font-semibold">
                      Click to upload image
                    </p>
                    <p className="text-sm text-pink-300/70 mt-1">
                      or drag and drop
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Preview */}
          {image && (
            <div>
              <label className="block text-sm font-semibold text-pink-300 mb-2">
                Preview
              </label>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border border-pink-500/30"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              onClick={() => navigate("/")}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePostUpload}
              disabled={loading || !image || !caption.trim()}
              className="flex-1 bg-linear-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading..." : "Upload Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
