'use client';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import parse from 'html-react-parser';
import { Button, TextField } from '@mui/material';

type Props = {
  title?: string;
  slug?: string;
  content?: string;
  onSubmit: (postData: any) => void;
};

export default function PostForm(props: Props) {
  const [post, setPost] = useState({
    title: '',
    content: '',
    slug: '',
  });
  const [previewPlaceholder, setPreviewPlaceholder] = useState(
    'Your content looks like this...'
  );

  useEffect(() => {
    if (!props.title || !props.slug || !props.content) return;
    setPost({
      title: props.title,
      slug: props.slug,
      content: props.content,
    });
  }, [props]);

  const handleTitleChange = (value: string) => {
    const newSlug = slugify(value);
    setPost({
      ...post,
      title: value,
      slug: newSlug,
    });
  };

  const slugify = (value: string) => {
    const newslug = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    // setPost({
    //   ...post,
    //   slug: newslug,
    // });
    return newslug;
  };

  function cleanQuillHtml(html: string) {
    // Create a DOM element to work with the HTML string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Remove `ql-ui` spans
    tempDiv.querySelectorAll('.ql-ui').forEach((node) => node.remove());

    // Remove `data-list` attributes
    tempDiv
      .querySelectorAll('[data-list]')
      .forEach((node) => node.removeAttribute('data-list'));

    return tempDiv.innerHTML;
  }

  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <span className="text-2xl font-bold">Title</span>
        <div className="mt-2">
          <TextField
            value={post.title}
            onChange={(e: any) => handleTitleChange(e.target.value)}
            variant="outlined"
            label="Title"
            className="rounded-lg w-1/2 mr-4 border border-gray-400"
          />
        </div>
        <div></div>
      </div>

      <div>
        <span className="text-2xl font-bold">Slug</span>
        <div className="mt-2">
          <TextField
            value={post.slug}
            onChange={(e: any) => {
              const newslug = slugify(e.target.value);
              setPost({
                ...post,
                slug: newslug,
              });
            }}
            variant="outlined"
            label="Slug"
            className="rounded-lg w-1/2 border border-gray-400"
          />
        </div>
      </div>

      <div className="flex gap-x-10">
        <div className="w-full">
          <span className="text-2xl font-bold">Content</span>
          <div className="mt-3">
            <ReactQuill
              theme="snow"
              value={post.content}
              onChange={(e: string) => {
                setPost({
                  ...post,
                  content: e,
                });
              }}
              className="rounded-lg outline-none border-none text-black"
            />
          </div>
        </div>
        <div className="w-full">
          <span className="text-2xl font-bold">Preview</span>
          <div
            className="mt-3 min-h-20 border border-gray-300 text-black rounded-lg p-3"
            // dangerouslySetInnerHTML={{ __html: cleanQuillHtml(content) }}
          >
            {parse(cleanQuillHtml(post.content))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          variant="contained"
          className="w-48"
          onClick={() => props.onSubmit(post)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
