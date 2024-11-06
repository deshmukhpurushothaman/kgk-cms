'use client';
import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import parse from 'html-react-parser';
import { TextField } from '@mui/material';

export default function Create() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (value: string) => {
    console.log('title ', value);
    setTitle(value);
    // const formattedSlug = value.toLowerCase().replace(' ', '-');
    // setSlug(formattedSlug);
  };

  return (
    <div className="px-24 py-10">
      <div className="text-2xl font-bold">Create Post</div>
      <div>
        <TextField
          value={title}
          onChange={(e: any) => handleTitleChange(e.target.valuevalue)}
          variant="outlined"
          label="Title"
          className="bg-gray-200 rounded-lg"
        />
      </div>

      <div>
        Slug
        {/* <input
          type="text"
          value={slug}
          onChange={(e: any) => setSlug(e.target.value)}
        /> */}
        <ReactQuill
          theme="snow"
          value={slug}
          onChange={(e: string) => setSlug(e)}
          modules={{
            toolbar: false,
          }}
          className=""
        />
      </div>

      <div>
        Content
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(e: string) => setContent(e)}
        />
        {parse(content)}
      </div>
    </div>
  );
}
