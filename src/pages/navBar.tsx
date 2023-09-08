import React from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-white text-2xl font-bold">My Blog</a>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" legacyBehavior>
              <a className="text-white hover:underline">ホーム</a>
            </Link>
          </li>
          <li>
            <Link href="/posts" legacyBehavior>
              <a className="text-white hover:underline">記事一覧</a>
            </Link>
          </li>
          <li>
            <Link href="/categories" legacyBehavior>
              <a className="text-white hover:underline">カテゴリ</a>
            </Link>
          </li>
          <li>
            <Link href="/contact" legacyBehavior>
              <a className="text-white hover:underline">お問い合わせ</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;