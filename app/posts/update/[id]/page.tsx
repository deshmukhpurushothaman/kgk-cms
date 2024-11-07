'use client';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import parse from 'html-react-parser';
import { Button, TextField } from '@mui/material';
import PostForm from '@/components/PostForm';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

export default function Create() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState({
    id: '',
    title: '',
    slug: '',
    content: '',
  });

  const postId = params.id as string;

  useEffect(() => {
    if (!postId) return;
    fetchPost(postId);
  }, [postId]);

  const fetchPost = async (id: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/get?id=${id}`
      );
      setPost({
        id: res.data[0].id,
        title: res.data[0].title,
        slug: res.data[0].slug,
        content: res.data[0].content,
      });
    } catch (error) {
      console.log('Error getting post ', error);
    }
  };

  const updatePost = async (data: any) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/update`,
        {
          id: postId,
          ...data,
        }
      );
      if (res.status === 200) {
        router.push(`/posts/${postId}`);
      }
    } catch (error) {
      console.log('Error updating post ', error);
    }
  };

  return (
    <div className="w-full p-4 mx-auto flex max-w-screen-xl flex-col">
      <div className="text-2xl font-bold mb-6">Update Post</div>
      <PostForm
        title={post.title}
        slug={post.slug}
        content={post.content}
        onSubmit={(data: any) => updatePost(data)}
      />
    </div>
  );
}
