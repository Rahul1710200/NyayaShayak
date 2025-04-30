'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { FileText, MessageSquare, ArrowRight } from 'lucide-react';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, user } = useUser();

  // Fetch blogs data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsResponse = await axios.get(`https://backedn-1-1by3.onrender.com/api/blogs`);
        setBlogs(blogsResponse.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Law <span className="text-primary-500">Blogs</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Discover legal insights shared by our community or contribute your own expertise to NyayaSahayak.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isSignedIn ? (
              <Link
                href="/add-blog"
                className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary-600/30 hover:-translate-y-1"
              >
                <FileText className="w-5 h-5 mr-2" />
                Write a Blog
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex items-center bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
              >
                Sign In to Write
              </Link>
            )}
            <Link
              href="/chat"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary-600/30 hover:-translate-y-1 group"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Legal Chat
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="mb-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-800 h-80 rounded-lg"></div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-400 mb-4">No blogs available yet.</p>
              <Link
                href={isSignedIn ? '/add-blog' : '/sign-in'}
                className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
              >
                <FileText className="w-5 h-5 mr-2" />
                {isSignedIn ? 'Write the First Blog' : 'Sign In to Write'}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog._id}`}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-primary-500/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {blog.imageUrl && (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-primary-400 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {blog.body}
                    </p>
                    <p className="text-xs text-gray-500">
                      By {blog.createby?.name || 'Anonymous'} |{' '}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* AI Chat CTA Section */}
        <div className="bg-gray-900 rounded-lg p-8 md:p-12 shadow-lg text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Instant <span className="text-primary-500">Legal Advice</span>?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Our AI-powered legal assistant is here to answer your questions and simplify Indian law.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary-600/30 hover:-translate-y-1 group"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Chat Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}