"use client";

import React, { useEffect, useState } from 'react';
import PostCard from './postCard';
import NavBar from './navBar';

interface Post {
  title: string;
  content: string;
  id: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showDivision, setShowDivision] = useState<string>('all'); // 初期値を 'all' に設定

  useEffect(() => {
    // Flaskからデータを取得する関数を定義
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        console.log(response.ok)
        if (response.ok==false) {
          throw new Error('APIエラー');
        }
        const data = await response.json();
        setPosts(data);
        console.log(data); // データの設定後にログを出力
      } catch (error) {
        console.error('エラー:', error);
      }
    }

    // データを取得
    fetchData();
  }, []);

  // データを取得する関数
  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:5000/api/posts?show_division=${showDivision}`);
      if (!response.ok) {
        throw new Error('APIエラー');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('エラー:', error);
    }
  }


  return (
    <main >
      <NavBar />
      <div className="flex">
      <div className="flex flex-cul min-h-screen bg-gray-200">
        {/* サイドバー */}
      <div className="w-1/4 p-4 bg-white shadow-md">
        <h2 className="text-lg font-semibold">Filter by Division</h2>
        <div>
          <label className="block">
            <input
              type="radio"
              name="division"
              value="all"
              checked={showDivision === 'all'}
              onChange={() => setShowDivision('all')}
            />
            All
          </label>
          <label className="block">
            <input
              type="radio"
              name="division"
              value="division1"
              checked={showDivision === 'division1'}
              onChange={() => setShowDivision('division1')}
            />
            Division 1
          </label>
          <label className="block">
            <input
              type="radio"
              name="division"
              value="division2"
              checked={showDivision === 'division2'}
              onChange={() => setShowDivision('division2')}
            />
            Division 2
          </label>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
          <h1 className="text-xl mb-4">質問一覧</h1>
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;