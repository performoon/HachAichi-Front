"use client";
import React, { useEffect, useState } from 'react';

interface ApiResponse {
  message: string;
}

export default function GetTest() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/data'); // バックエンドのURLに合わせる
        if (response.ok) {
          const responseData: ApiResponse = await response.json();
          setData(responseData);
        } else {
          console.error('APIエラー:', response.status);
        }
      } catch (error) {
        console.error('エラー:', error);
      }
    }

    fetchData();
  }, []);

  return (
		<main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
		<div className="relative"></div>
    <div>
      <h1>Flaskからのデータ:</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
		</main>
  );
}