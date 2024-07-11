import React from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/blog" legacyBehavior>
          <a className="text-white text-2xl font-bold">質問掲示板</a>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/blog" legacyBehavior>
              <a className="text-white hover:underline">ホーム</a>
            </Link>
          </li>
          <li>
          <Link href="/add-post" legacyBehavior>
              <a className="text-white hover:underline">質問する</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;