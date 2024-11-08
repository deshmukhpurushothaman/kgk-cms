'use client';
import { Button } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import parse from 'html-react-parser';

const IMAGES = [
  'https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/video-stills/season-01/game-of-thrones-season-1-episode-1-full-stitched-607175_PRO35_10-1920.jpg',
  'https://m.media-amazon.com/images/M/MV5BOTA1NzUxMDktNjAwNC00ZWIwLTgyMjktZjEwMDRmMjBmYmJlXkEyXkFqcGdeQWplZmZscA@@._V1_QL75_UX500_CR0,0,500,281_.jpg',
];

export default function PostDetails() {
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

  const fetchPost = async (postId: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/get?id=${postId}`
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

  const deletePost = async (postId: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/delete?id=${postId}`
      );
      if (res.status === 200) {
        router.replace('/posts');
      }
    } catch (error) {
      console.log('Error deleting post ', error);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col p-8">
      <div className="mb-8 flex justify-between">
        <div className="font-bold text-4xl">{post.title}</div>
        <div className="flex gap-x-8">
          <Button variant="contained">
            <Link href={`/posts/update/${post.id}`}>Update</Link>
          </Button>

          <Button variant="outlined" onClick={() => deletePost(post.id)}>
            Delete
          </Button>
        </div>
      </div>
      <div>
        <Carousel>
          {IMAGES.map((image: string, i: number) => (
            <div key={i}>
              <Image src={image} alt="image" width={1000} height={1000} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-bold mb-4">Description</div>
        <div
        // dangerouslySetInnerHTML={{ __html: post.content }}
        >
          {parse(post.content)}
        </div>
      </div>
    </div>
  );
}
