import React, { useState } from 'react';

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
			
      <h1>Add a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
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
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;