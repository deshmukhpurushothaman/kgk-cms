import PostHeader from '@/components/PostHeader';
import PostLists from '@/components/PostLists';
import { Button } from '@mui/material';
import Link from 'next/link';

const posts = [
  {
    id: '1',
    title: 'Test',
    content: 'asdf asdf asdf asdf asdf asdf',
  },
  {
    id: '2',
    title: 'Test 2',
    content: 'asdf asdf asdf asdf asdf asdf',
  },
  {
    id: '3',
    title: 'Test 3',
    content: 'asdf asdf asdf asdf asdf asdf',
  },
];

export default function Posts() {
  return (
    <div className="w-full p-4 mx-auto flex max-w-screen-xl flex-col">
      <header className="mt-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex items-center space-x-2">
          <Button variant="contained">
            <Link href="/create">Create Post</Link>
          </Button>
        </div>
      </header>
      <PostHeader />

      <PostLists posts={posts} />
    </div>
  );
}
