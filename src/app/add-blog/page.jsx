'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FileText } from 'lucide-react';

export default function AddBlog() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate file before sending
    if (!coverPhoto) {
      setError('Please select a cover photo');
      setLoading(false);
      return;
    }

    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedFormats.includes(coverPhoto.type)) {
      setError('Only JPG, PNG, and GIF files are allowed');
      setLoading(false);
      return;
    }
    if (coverPhoto.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('imageUrl', coverPhoto);

    try {
      const response = await axios.post(`https://backedn-1-1by3.onrender.com/api/blogs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push(`/blog/${response.data._id}`);
    } catch (err) {
      console.error('Upload error:', {
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          data: err.response.data,
        } : 'No response',
      });

      let errorMessage = 'Failed to create blog';
      if (err.response) {
        if (err.response.status === 401) {
          router.push('/signin');
          return;
        }
        errorMessage = err.response.data?.error || err.response.data?.message || JSON.stringify(err.response.data);
      } else if (err.request) {
        errorMessage = 'No response from server. Please check if the server is running.';
      } else {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-500 mb-8 text-center">
          Write a New Blog
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter blog title"
              required
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-lg font-semibold text-gray-300 mb-2">
              Content
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Write your blog content..."
              rows={10}
              required
            />
          </div>
          <div>
            <label htmlFor="coverphoto" className="block text-lg font-semibold text-gray-300 mb-2">
              Cover Photo
            </label>
            <input
              type="file"
              id="coverphoto"
              name="imageUrl"
              accept="image/*"
              onChange={(e) => setCoverPhoto(e.target.files[0])}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary-600 file:text-white file:hover:bg-primary-700"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary-600/30 disabled:opacity-50"
            >
              <FileText className="w-5 h-5 mr-2" />
              {loading ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}