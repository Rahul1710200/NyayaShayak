'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { Scale, MessageSquare, Info, FileText, User, LogOut, Menu, X, Plus } from 'lucide-react';
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-950/95 backdrop-blur-md shadow-lg shadow-gray-900/50' : 'bg-gray-950/80 backdrop-blur-lg'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white">
              <span className="text-primary-500">Nyaya</span>Sahayak
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`flex items-center space-x-1 ${
                pathname === "/" ? "text-primary-500" : "text-gray-300 hover:text-primary-400"
              } transition-colors duration-300`}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className={`flex items-center space-x-1 ${
                pathname === "/blogs" ? "text-primary-500" : "text-gray-300 hover:text-primary-400"
              } transition-colors duration-300`}
            >
              <FileText className="w-5 h-5" />
              <span>Blogs</span>
            </Link>
            {isSignedIn && (
              <Link
                href="/add-blog"
                className={`flex items-center space-x-1 ${
                  pathname === "/add-blog" ? "text-primary-500" : "text-gray-300 hover:text-primary-400"
                } transition-colors duration-300`}
              >
                <Plus className="w-5 h-5" />
                <span>Add Blog</span>
              </Link>
            )}
            <Link
              href="/chat"
              className={`flex items-center space-x-1 ${
                pathname === "/chat" ? "text-primary-500" : "text-gray-300 hover:text-primary-400"
              } transition-colors duration-300`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>AI Chat</span>
            </Link>
            <Link
              href="/about"
              className={`flex items-center space-x-1 ${
                pathname === "/about" ? "text-primary-500" : "text-gray-300 hover:text-primary-400"
              } transition-colors duration-300`}
            >
              <Info className="w-5 h-5" />
              <span>About</span>
            </Link>

            <SignedIn>
              <div className="flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-primary-600/30">
                  Sign Up
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300 focus:outline-none">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-md border-t border-gray-800">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  pathname === "/" ? "text-primary-500 bg-gray-900" : "text-gray-300 hover:bg-gray-900 hover:text-primary-400"
                } transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg font-medium">Home</span>
              </Link>
              <Link
                href="/blogs"
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  pathname === "/blogs" ? "text-primary-500 bg-gray-900" : "text-gray-300 hover:bg-gray-900 hover:text-primary-400"
                } transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="w-5 h-5" />
                <span className="text-lg font-medium">Blogs</span>
              </Link>
              {isSignedIn && (
                <Link
                  href="/add-blog"
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    pathname === "/add-blog" ? "text-primary-500 bg-gray-900" : "text-gray-300 hover:bg-gray-900 hover:text-primary-400"
                  } transition-colors duration-300`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-lg font-medium">Add Blog</span>
                </Link>
              )}
              <Link
                href="/chat"
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  pathname === "/chat" ? "text-primary-500 bg-gray-900" : "text-gray-300 hover:bg-gray-900 hover:text-primary-400"
                } transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-lg font-medium">AI Chat</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  pathname === "/about" ? "text-primary-500 bg-gray-900" : "text-gray-300 hover:bg-gray-900 hover:text-primary-400"
                } transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-5 h-5" />
                <span className="text-lg font-medium">About</span>
              </Link>

              <SignedIn>
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/userprofile"
                    className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-primary-400 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-lg font-medium">Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-primary-400 transition-colors duration-300 text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-lg font-medium">Logout</span>
                  </button>
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button 
                    className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-primary-400 transition-colors duration-300 text-left w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg font-medium">Sign In</span>
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button 
                    className="flex items-center space-x-2 p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-300 text-left w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg font-medium">Sign Up</span>
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;