'use client';
import 'react-quill-new/dist/quill.snow.css';
import PostForm from '@/components/PostForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Create() {
  const router = useRouter();
  const handleSubmit = async (data: {
    title: any;
    content: any;
    slug: any;
    customField?: { images: any };
  }) => {
    try {
      let postPayload = {
        title: data.title,
        content: data.content,
        slug: data.slug,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/create`,
        postPayload
      );

      if (data?.customField?.images) {
        const image = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/images/create`,
          data.customField
        );
      }
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
