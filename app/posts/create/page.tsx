'use client';
import 'react-quill-new/dist/quill.snow.css';
import PostForm from '@/components/PostForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Alert } from '@mui/material'; // Import Alert component
import { useState } from 'react';

export default function Create() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); // Error state

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
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/images/create`,
          data.customField
        );
      }

      if (res.status === 200) {
        router.push('/posts');
      }
    } catch (error: any) {
      console.log('Error creating post', error);
      setError(
        error.response?.data?.error ||
          'An error occurred while creating the post.'
      );
    }
  };

  return (
    <div className="w-full p-4 mx-auto flex max-w-screen-xl flex-col">
      <div className="text-2xl font-bold mb-6">Create Post</div>

      {/* Display alert if there's an error */}
      {error && (
        <Alert variant="filled" severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Pass the handleSubmit function to the PostForm component */}
      <PostForm onSubmit={(data) => handleSubmit(data)} />
    </div>
  );
}
