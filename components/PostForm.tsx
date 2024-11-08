'use client';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import parse from 'html-react-parser';
import { Button, TextField } from '@mui/material';
import { pluginManager } from '@/app/plugins/PluginManager';

type Props = {
  title?: string;
  slug?: string;
  content?: string;
  onSubmit: (postData: any) => void;
};

export default function PostForm(props: Props) {
  const [customFields, setCustomFields] = useState<JSX.Element[]>([]);
  const [post, setPost] = useState({
    title: '',
    content: '',
    slug: '',
  });

  useEffect(() => {
    if (props.title || props.slug || props.content) {
      setPost({
        title: props.title || '',
        slug: props.slug || '',
        content: props.content || '',
      });
    }
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
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  function cleanQuillHtml(html: string) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.querySelectorAll('.ql-ui').forEach((node) => node.remove());
    tempDiv
      .querySelectorAll('[data-list]')
      .forEach((node) => node.removeAttribute('data-list'));
    return tempDiv.innerHTML;
  }

  // Handle dynamic fields from plugins
  const handleCustomFieldChange = (key: string, value: any) => {
    setPost((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Retrieve enabled plugins' custom fields
  // const customFields = pluginManager
  //   .getCustomFields(post)
  //   .then((fieldComponents) => {
  //     console.log('fieldComponents ', fieldComponents);
  //     fieldComponents.map((fieldComponent, index: number) => (
  //       <div key={`custom-field-${index}`}>{fieldComponent}</div>
  //     ));
  //   });

  useEffect(() => {
    // Fetch custom fields asynchronously
    pluginManager.getCustomFields(post).then((fieldComponents) => {
      // Update state with the resolved components
      setCustomFields(fieldComponents);
    });
  }, []); // Dependencies - ensure this updates when `post` changes

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
          <div className="mt-3 min-h-20 border border-gray-300 text-black rounded-lg p-3">
            {parse(cleanQuillHtml(post.content))}
          </div>
        </div>
      </div>

      {/* Render custom fields added by enabled plugins */}
      <div className="w-1/2">
        {customFields.map((fieldComponent, index) => (
          <div key={`custom-field-${index}`}>{fieldComponent}</div>
        ))}
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
