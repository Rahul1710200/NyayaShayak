"use client";

import React from 'react';
import Link from 'next/link';
import { Scale, ArrowRight, FileText, Landmark, Shield, Users, ShoppingBag, Briefcase, HomeIcon, Globe, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-orange-700 text-transparent bg-clip-text">
                Legal Assistance
              </span>{' '}
              Simplified with AI
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              NyayaSahayak is your AI-powered legal assistant, making Indian law accessible and understandable for everyone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/chat" 
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
              >
                <MessageSquare className="w-5 h-5" />
                Start Legal Chat
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/about" 
                className="glass text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 border border-gray-800 hover:border-orange-500/30"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How NyayaSahayak Can <span className="text-orange-500">Help You</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass p-8 rounded-2xl border border-gray-800 hover:border-orange-500/30 transition-all group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-700/20 flex items-center justify-center mb-6 group-hover:from-orange-500/30 group-hover:to-orange-700/30 transition-all">
                <MessageSquare className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-400 transition-colors">Legal Information</h3>
              <p className="text-gray-400">
                Get clear, concise explanations about Indian laws, legal procedures, and your rights in simple language.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass p-8 rounded-2xl border border-gray-800 hover:border-orange-500/30 transition-all group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-700/20 flex items-center justify-center mb-6 group-hover:from-orange-500/30 group-hover:to-orange-700/30 transition-all">
                <Scale className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-400 transition-colors">Document Guidance</h3>
              <p className="text-gray-400">
                Understand legal documents, contracts, and forms with AI-powered explanations and summaries.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass p-8 rounded-2xl border border-gray-800 hover:border-orange-500/30 transition-all group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-700/20 flex items-center justify-center mb-6 group-hover:from-orange-500/30 group-hover:to-orange-700/30 transition-all">
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-400 transition-colors">Rights Awareness</h3>
              <p className="text-gray-400">
                Learn about your legal rights and protections under Indian law in various situations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-24 bg-black relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-black to-black"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Legal Topics We Cover</h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full mb-6 opacity-70"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              NyayaSahayak provides information on a wide range of legal topics relevant to Indian citizens.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Constitutional Law", desc: "Fundamental rights, directive principles, and constitutional remedies", icon: <Landmark className="w-6 h-6" /> },
              { title: "Criminal Law", desc: "IPC, CrPC, and criminal procedures in India", icon: <Shield className="w-6 h-6" /> },
              { title: "Civil Law", desc: "Property rights, contracts, and civil procedures", icon: <FileText className="w-6 h-6" /> },
              { title: "Family Law", desc: "Marriage, divorce, adoption, and succession laws", icon: <Users className="w-6 h-6" /> },
              { title: "Consumer Law", desc: "Consumer protection and dispute resolution", icon: <ShoppingBag className="w-6 h-6" /> },
              { title: "Labor Law", desc: "Employment rights and workplace regulations", icon: <Briefcase className="w-6 h-6" /> },
              { title: "Property Law", desc: "Real estate, property rights, and transactions", icon: <HomeIcon className="w-6 h-6" /> },
              { title: "Cyber Law", desc: "Digital rights, online transactions, and cyber crimes", icon: <Globe className="w-6 h-6" /> }
            ].map((topic, index) => (
              <div 
                key={index} 
                className="glass p-6 rounded-2xl border border-gray-800 hover:border-orange-500/20 transition-all duration-300 group hover:transform hover:translate-y-[-5px]"
              >
                <div className="flex items-center space-x-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border border-gray-800 group-hover:border-orange-500/30 transition-all duration-300 shadow-lg">
                    <div className="text-orange-500/70 group-hover:text-orange-500 transition-colors duration-300">
                      {topic.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-gray-400 pl-16">
                  {topic.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="glass rounded-3xl p-12 md:p-20 shadow-2xl border border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="md:w-2/3">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text inline-block">Ready to Get Legal Assistance?</h2>
                <p className="text-gray-300 mb-0 md:mb-6 max-w-xl text-lg">
                  Start a conversation with NyayaSahayak now and get the legal information you need.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link 
                  href="/chat" 
                  className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-full text-xl transition-all duration-300 flex items-center space-x-3 shadow-lg shadow-orange-600/20 whitespace-nowrap btn-hover-effect"
                >
                  <span>Chat Now</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
