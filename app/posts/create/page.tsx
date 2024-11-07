'use client';
import 'react-quill-new/dist/quill.snow.css';
import PostForm from '@/components/PostForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Create() {
  const router = useRouter();
  const handleSubmit = async (data: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/create`,
        data
      );
      if (res.status === 200) {
        router.push('/posts');
      }
    } catch (error) {
      console.log('Error creating post');
    }
  };

  return (
    <div className="w-full p-4 mx-auto flex max-w-screen-xl flex-col">
      <div className="text-2xl font-bold mb-6">Create Post</div>
      <PostForm onSubmit={(data) => handleSubmit(data)} />
    </div>
  );
}
