'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { Scale, ArrowRight, FileText, MessageSquare, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const { isSignedIn } = useUser();

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

  // Featured blog carousel navigation
  const featuredBlogs = blogs.slice(0, 3);
  const nextFeatured = () => setCurrentFeaturedIndex((prev) => (prev + 1) % Math.max(1, featuredBlogs.length));
  const prevFeatured = () => setCurrentFeaturedIndex((prev) => (prev - 1 + featuredBlogs.length) % Math.max(1, featuredBlogs.length));

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 text-transparent bg-clip-text">
              NyayaSahayak
            </span>
            <br />
            Your AI-Powered Blogs
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Simplifying Indian law with AI-driven insights and community-driven legal blogs.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-600/30 hover:-translate-y-1 group"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Legal Chat
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Featured Blog Section */}
      {featuredBlogs.length > 0 && (
        <section className="py-16 px-6 bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Featured <span className="text-orange-500">Law Blog</span>
            </h2>
            <div className="relative">
              {loading ? (
                <div className="animate-pulse bg-gray-800 h-96 rounded-lg"></div>
              ) : (
                <Link
                  href={`/blog/${featuredBlogs[currentFeaturedIndex]._id}`}
                  className="block bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
                >
                  <div className="md:flex">
                    {featuredBlogs[currentFeaturedIndex].coverphoto && (
                      <img
                        src={featuredBlogs[currentFeaturedIndex].coverphoto}
                        alt={featuredBlogs[currentFeaturedIndex].title}
                        className="w-full md:w-1/3 h-64 md:h-auto object-cover"
                      />
                    )}
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl font-semibold mb-4 text-orange-400">
                        {featuredBlogs[currentFeaturedIndex].title}
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {featuredBlogs[currentFeaturedIndex].body}
                      </p>
                      <p className="text-sm text-gray-500">
                        By {featuredBlogs[currentFeaturedIndex].createby?.name || 'Anonymous'} |{' '}
                        {new Date(featuredBlogs[currentFeaturedIndex].createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
              {featuredBlogs.length > 1 && (
                <>
                  <button
                    onClick={prevFeatured}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-orange-500 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextFeatured}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-orange-500 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Law Blogs Section */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Explore <span className="text-orange-500">Law Blogs</span>
            </h2>
            {isSignedIn ? (
              <Link
                href="/add-blog"
                className="text-orange-500 hover:underline font-semibold flex items-center"
              >
                <FileText className="w-5 h-5 mr-1" />
                Write a Blog
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="text-orange-500 hover:underline font-semibold"
              >
                Sign in to write
              </Link>
            )}
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-800 h-80 rounded-lg"></div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No blogs yet. Be the first to share your legal insights!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog._id}`}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {blog.imageUrl && (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-orange-400">
                      {blog.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
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
      </section>

      {/* AI Legal Assistant Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Your <span className="text-orange-500">AI Legal Assistant</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Get instant answers to your legal questions, understand complex laws, and explore your rights with NyayaSahayak's AI-powered chat.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-600/30 hover:-translate-y-1 group"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Chat Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-orange-500">NyayaSahayak</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-orange-500/20 transition-all duration-300">
              <Scale className="w-12 h-12 text-orange-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3 text-center">Simplified Legal Guidance</h3>
              <p className="text-gray-300 text-sm text-center">
                Understand Indian laws and procedures with clear, AI-driven explanations.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-orange-500/20 transition-all duration-300">
              <FileText className="w-12 h-12 text-orange-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3 text-center">Document Assistance</h3>
              <p className="text-gray-300 text-sm text-center">
                Decode contracts, forms, and legal documents with ease.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-orange-500/20 transition-all duration-300">
              <MessageSquare className="w-12 h-12 text-orange-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3 text-center">Community Insights</h3>
              <p className="text-gray-300 text-sm text-center">
                Learn from legal blogs shared by our community of users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our <span className="text-orange-500">Users Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "NyayaSahayak made understanding my legal rights so easy! The AI chat is a game-changer.",
                author: "Priya Sharma",
              },
              {
                quote: "I wrote a blog about consumer law, and the community feedback was amazing!",
                author: "Arjun Patel",
              },
              {
                quote: "The platform's explanations are clear and concise. Highly recommend for legal queries.",
                author: "Neha Gupta",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-md text-center"
              >
                <Star className="w-8 h-8 text-orange-500 mb-4 mx-auto" />
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <p className="text-sm text-gray-500 font-semibold">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore <span className="text-orange-500">Legal Solutions</span>?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Whether you need instant legal advice or want to share your insights, NyayaSahayak is here for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/chat"
              className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-600/30 hover:-translate-y-1 group"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Legal Chat
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            {isSignedIn ? (
              <Link
                href="/add-blog"
                className="inline-flex items-center bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
              >
                <FileText className="w-5 h-5 mr-2" />
                Write a Blog
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex items-center bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
              >
                <FileText className="w-5 h-5 mr-2" />
                Sign In to Write
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer Accent */}
      <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-700"></div>
    </div>
  );
}