'use client';
import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import parse from 'html-react-parser';
import { Button, TextField } from '@mui/material';

export default function Create() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [previewPlaceholder, setPreviewPlaceholder] = useState(
    'Your content looks like this...'
  );

  const handleTitleChange = (value: string) => {
    setTitle(value);
    slugify(value);
  };

  const slugify = (value: string) => {
    const newslug = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(newslug);
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
    <div className="w-full p-4 mx-auto flex max-w-screen-xl flex-col">
      <div className="text-2xl font-bold mb-6">Create Post</div>
      <div className="flex flex-col gap-y-6">
        <div>
          <span className="text-2xl font-bold">Title</span>
          <div className="mt-2">
            <TextField
              value={title}
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
              value={slug}
              onChange={(e: any) => slugify(e.target.value)}
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
                value={content}
                onChange={(e: string) => {
                  console.log(e);
                  setContent(e);
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
              {parse(cleanQuillHtml(content))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="contained" className="w-48">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
