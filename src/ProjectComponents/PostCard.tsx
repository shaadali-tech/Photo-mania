type PostCardProps = {
  imageUrl: string;
  caption: string;
  userEmail: string;
};

const PostCard = ({ imageUrl, caption, userEmail }: PostCardProps) => {
  return (
    <div className="bg-linear-to-br from-zinc-900/50 to-zinc-900/30 border border-pink-500/30 rounded-xl overflow-hidden hover:border-pink-500/60 transition">
      {/* Header */}
      <div className="p-4 border-b border-pink-500/20 bg-zinc-900/20">
        <p className="font-semibold text-pink-300">{userEmail}</p>
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt="post"
        className="w-full max-h-[500px] object-cover"
      />

      {/* Caption */}
      <div className="p-4 bg-zinc-900/20">
        <p className="text-pink-100/80">{caption}</p>
      </div>
    </div>
  );
};

export default PostCard;
