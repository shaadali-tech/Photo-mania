const PostSkeleton = () => {
  return (
    <div
      className="
        bg-zinc-900
        rounded-2xl
        overflow-hidden
        animate-pulse
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div
          className="
            w-10
            h-10
            rounded-full
            bg-zinc-700
          "
        />

        <div
          className="
            h-4
            w-32
            rounded
            bg-zinc-700
          "
        />
      </div>

      {/* Image */}
      <div
        className="
          w-full
          h-[400px]
          bg-zinc-700
        "
      />

      {/* Caption */}
      <div className="p-4 space-y-3">
        <div
          className="
            h-4
            w-full
            rounded
            bg-zinc-700
          "
        />

        <div
          className="
            h-4
            w-2/3
            rounded
            bg-zinc-700
          "
        />
      </div>
    </div>
  );
};

export default PostSkeleton;
