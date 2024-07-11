import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from "next/router";


export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);// ログイン状態を管理

		// 仮のダミーtokenを取得するコード
	const token = 'ここに実際のtokenを取得するコードを追加';

	// userオブジェクトを作成
	const user = { username, token };

	useEffect(() => {
    // コンポーネントがマウントされたときにLocalStorageからユーザー情報を取得
    const userString = localStorage.getItem('user');
		

		if (typeof userString === 'string') {
			const user = JSON.parse(userString);
			if (user && user.token) {
				// ローカルストレージにユーザー情報が存在する場合、ログイン済みと判定
				setIsLoggedIn(true);
			}
		}
  }, []); // 最初に一度だけ実行

	const router = useRouter()
  const handleLogin = async (e:any) => {
    e.preventDefault();

    // バックエンドに送信するデータを作成
    const data = {
      username,
      password,
    };

		console.log("送ってみるよー")
    try {
      // バックエンドのAPIにデータを送信し、認証を試行
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // ログイン成功
        // ここで適切な処理を行う（例: リダイレクト）
				const user = { username, token }; // ユーザー情報やトークンなどの必要な情報を保存
				localStorage.setItem('user', JSON.stringify(user)); // ローカルストレージに保存
				router.push('/')
      } else {
        // ログイン失敗
        // ここでエラーメッセージを表示などの処理を行う
				console.log(response.json())
      }
    } catch (error) {
      console.error('ログインエラー:', error);
    }
  };

  return (

	<div className="min-h-screen flex items-center justify-center bg-gray-100">
	<div className="bg-white p-8 rounded shadow-md w-80">
		<h2 className="text-2xl font-semibold mb-4">ログイン</h2>
		<form onSubmit={handleLogin}>
			<div className="mb-4">
				<label className="block text-gray-600 text-sm mb-2" htmlFor="username">
					ユーザー名
				</label>
				<input
					className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
					type="text"
					id="username"
					name="username"
					placeholder="ユーザー名を入力してください"
					required
					value={username} // value属性を設定
  				onChange={(e) => setUsername(e.target.value)} // 入力値を更新するためのonChangeハンドラを追加
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-600 text-sm mb-2" htmlFor="password">
					パスワード
				</label>
				<input
					className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
					type="password"
					id="password"
					name="password"
					placeholder="パスワードを入力してください"
					required
					value={password} // value属性を設定
  				onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<button
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
					type="submit"
				>
					ログイン
				</button>
			</div>
		</form>
	</div>
</div>
	)
}