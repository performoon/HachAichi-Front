import React, { useEffect, useState } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { GetServerSidePropsContext } from 'next';
// import Layout from '../../components/Layout';
import NavBar from './navBar';

interface PostDetailProps {
  post: {
    title: string;
    content: string;
  };
}


const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const [reply, setReply] = useState<string>('');
  const [replies, setReplies] = useState<string[]>([]);

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/posts/${post.id}/add_reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reply }),
      });

      if (response.ok) {
        setReplies([...replies, reply]);
        setReply('');
      } else {
        throw new Error('APIエラー');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    
    <div>
    <NavBar />
    <main className="flex flex-col  items-center min-h-screen py-2 bg-gray-200">
    <article className="bg-white p-4 mb-10 rounded-md shadow-md h-1/5 overflow-y-auto" >
      <h1 className="text-2xl">{post.title}</h1>
      <p>{post.content}</p>
    </article>

      {/* 返信フォーム */}
      <div>
        <input
          type="text"
          value={reply}
          onChange={handleReplyChange}
          placeholder="返信を入力してください"
        />
        <button onClick={handleReplySubmit}>返信する</button>
      </div>

      {/* 返信一覧 */}
      <div>
        <h2>返信</h2>
        <ul>
          {replies.map((reply, index) => (
            <li key={index}>{reply}</li>
          ))}
        </ul>
      </div>
    </main>
    </div>
  );
};

export default PostDetail;



export async function getServerSideProps( context : GetServerSidePropsContext ) {
  if (!context.params) {
    return {
      notFound: true,
    };
  }
	
	const id = context.params.id;
  console.log(id);
	
  try {
    // Flaskから記事の詳細データを取得
    const response = await fetch(`http://127.0.0.1:5000/api/posts/${id}`)
    console.log("idのレスポンス"+response.ok)
    if (!response.ok) {
      //throw new Error(`APIエラー: ${response.statusText}`);
    }
    const post = await response.json();

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error('エラー:', error);
    return {
      notFound: true,
    };
  }
}


