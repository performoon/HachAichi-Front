import React, { useState } from 'react';
import NavBar from './navBar';

const AddPost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('APIエラー');
      }

      const data = await response.json();
      console.log('Post created successfully', data);

      // ブログ記事が追加された後の処理をここに追加

      // フォームをリセット
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div>
    <NavBar />
    <main className="flex flex-col items-center min-h-screen py-2 bg-gray-200">
    <div>
			
      <h1>新しい質問</h1>
      <form onSubmit={handleSubmit}>
      <article className="bg-white p-4 mb-4 rounded-md shadow-md w-5000 h-3/5 overflow-y-auto bg-orange-300" >
        <div>
          <label className = "w-3/5" htmlFor="title">Title: 　</label>
          <input
          className=""
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        </article>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Add Post</button>
        
        
      </form>
    </div>
  </main>
  </div>
  );
};

export default AddPost;