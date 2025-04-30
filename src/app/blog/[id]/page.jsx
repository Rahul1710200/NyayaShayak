'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { FileText, User, X } from 'lucide-react';
import ChatInterface from '../../components/ChatInterface'; // Import the ChatInterface component

export default function BlogPost() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isSignedIn, user } = useUser();

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://backedn-1-1by3.onrender.com/api/blogs/${id}`);
        const blogData = response.data;
        
        if (typeof blogData.createby === 'string') {
          blogData.createby = { name: 'Anonymous' };
        }
        
        setBlog({
          ...blogData,
          comments: blogData.comments || []
        });
      } catch (err) {
        console.error('Error fetching blog:', err);
        if (err.response?.status === 404) {
          setError('Blog not found');
        } else {
          setError('Failed to load blog');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
  
    if (!comment.trim()) {
      alert('Please enter a comment');
      return;
    }
  
    try {
      const response = await axios.post(
        `https://backedn-1-1by3.onrender.com/api/blogs/comments/${id}`,
        { body: comment }
      );
  
      setBlog(prev => ({
        ...prev,
        comments: [...prev.comments, {
          ...response.data,
          createby: {
            name: user.fullName || user.firstName || "User"
          }
        }]
      }));
      
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      alert(err.response?.data?.error || 'Failed to add comment');
    }
  };

  // Toggle chat widget
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white py-20 px-6">
        <div className="container mx-auto max-w-4xl animate-pulse">
          <div className="bg-gray-800 h-12 w-3/4 mb-4 rounded"></div>
          <div className="bg-gray-800 h-96 w-full mb-6 rounded"></div>
          <div className="bg-gray-800 h-24 w-full mb-4 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-primary-500 mb-4">{error}</h1>
          <p className="text-gray-300 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/blogs"
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            <FileText className="w-5 h-5 mr-2" />
            Explore All Blogs
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-20 px-6 relative">
      <div className="container mx-auto max-w-4xl">
        {/* Blog Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-400 mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <User className="w-5 h-5 mr-2" />
            <span>By {blog.createby?.name || 'Anonymous'}</span>
            <span className="mx-2">•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          {blog.imageUrl && (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-6 shadow-md"
            />
          )}
        </div>

        {/* Blog Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-gray-300 leading-relaxed">{blog.body}</p>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary-500 mb-6">Comments</h2>
          {blog.comments?.length > 0 ? (
            <div className="space-y-6">
              {blog.comments.map((comment, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <User className="w-4 h-4 mr-2" />
                    <span>{comment.createby?.name || 'Anonymous'}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-300">{comment.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-primary-500 mb-4">Add a Comment</h3>
          {isSignedIn ? (
            <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={4}
              />
              <button
                type="submit"
                className="self-end bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-primary-600/30"
              >
                <span>Submit</span>
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-gray-400 mb-4">Sign in to add a comment.</p>
              <Link
                href="/sign-in"
                className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* AI Chat CTA Section */}
        <div className="bg-gray-900 rounded-lg p-8 md:p-12 shadow-lg text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Instant <span className="text-primary-500">Tech Advice</span>?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Our AI-powered assistant is here to answer your questions and simplify concepts.
          </p>
          <button
            onClick={toggleChat}
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary-600/30 hover:-translate-y-1"
          >
            Chat Now
          </button>
        </div>
      </div>

      {/* AI Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-[450px] h-[600px] bg-gray-900 rounded-lg shadow-xl flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-primary-500">AI Assistant</h3>
            <button onClick={toggleChat} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <ChatInterface blogContext={blog} /> {/* Pass blog context if needed */}
        </div>
      )}
    </div>
  );
}