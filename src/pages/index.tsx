import Image from 'next/image'
// import AddTask from './components/AddTask'
// import TodoList from './components/TodoList'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1>Nextjs 13 Todo App</h1>
      <div>
        <div>
        </div>
      </div>
      <ul>
        <li>
          <Link href="/user">
            user
          </Link>
        </li>
        <li>
          <Link href="/login">
            login
          </Link>
        </li>
        <li>
          <Link href="/get_test">
            get_test
          </Link>
        </li>
        <li>
          <Link href="/blog">
            blog
          </Link>
        </li>
        <li>
          <Link href="/add-post">
            blogadd
          </Link>
        </li>
        <li>
          <Link href="/create_article">
            create
          </Link>
        </li>
      </ul>
    </main>
    
  )
}
