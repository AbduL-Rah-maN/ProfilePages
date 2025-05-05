import React from "react";

const PostCard = ({ name, title, message, image, reactions, comments }) => {
  return (
    <div className="w-full max-w-sm border rounded-md shadow-md overflow-hidden bg-white">
      <div className="flex items-center p-4 space-x-3">
        <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-500">1d • 🌍</p>
        </div>
      </div>
      <div className="px-4 text-sm text-gray-800">{message}</div>
      <img src={title} alt="Post Content" className="w-full mt-2" />
      <div className="px-4 py-2 text-xs text-gray-500 flex justify-between border-t">
        <span>👍 {reactions}</span>
        <span>💬 {comments}</span>
      </div>
    </div>
  );
};

const TrendingPosts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      <PostCard
        name="Ashish Wadekar"
        image="/images/ashish.png"
        message="Today marks 9 incredible years with Sagitec Solutions!"
        title="/images/ashish-post.png"
        reactions={17}
        comments={4}
      />
      <PostCard
        name="Umesh Gaikwad"
        image="/images/umesh.png"
        message="I'm thrilled to share that I have been recognized as a #StarAwardRecipient at Sagitec Solutions. I am honored and humbled to receive this."
        title="/images/umesh-post.png"
        reactions={67}
        comments={14}
      />
    </div>
  );
};

export default TrendingPosts;
