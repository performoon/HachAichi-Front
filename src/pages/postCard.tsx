import React from 'react';

interface PostCardProps {
  title: string;
  content: string;
  id: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, id }) => {
  return (
    <article className="bg-white p-4 mb-4 rounded-md shadow-md w-3/5 h-1/5 overflow-y-auto" >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
      <a href={`${id}`} className="text-blue-500 hover:underline">
        Read more
      </a>
    </article>
  );
};

export default PostCard;