import React from 'react';
import { Scale, Brain, AlertTriangle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-orange-700 text-transparent bg-clip-text">
                About
              </span>{' '}
              NyayaSahayak
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Making legal information accessible to everyone in India
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="glass p-10 rounded-3xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              NyayaSahayak aims to democratize access to legal information in India by leveraging 
              artificial intelligence to provide accurate, easy-to-understand legal guidance. 
              We believe that understanding your rights and the legal system should not require 
              specialized knowledge or expensive consultations.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-orange-500">Technology</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by advanced AI to provide accurate legal information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="glass p-10 rounded-3xl border border-gray-800 hover:border-orange-500/30 transition-all group">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-700/20 flex items-center justify-center mb-6 group-hover:from-orange-500/30 group-hover:to-orange-700/30 transition-all">
                <Brain className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition-colors">AI-Powered Assistance</h3>
              <p className="text-gray-300 leading-relaxed">
                NyayaSahayak uses advanced large language models trained on Indian legal texts, 
                case law, and legal procedures. Our AI is designed to provide accurate information 
                while making complex legal concepts understandable to everyone.
              </p>
            </div>

            <div className="glass p-10 rounded-3xl border border-gray-800 hover:border-orange-500/30 transition-all group">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-700/20 flex items-center justify-center mb-6 group-hover:from-orange-500/30 group-hover:to-orange-700/30 transition-all">
                <Scale className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition-colors">Legal Knowledge Base</h3>
              <p className="text-gray-300 leading-relaxed">
                Our system is built on a comprehensive knowledge base of Indian laws, including 
                the Constitution, IPC, CrPC, and various civil and criminal procedures. This allows 
                us to provide context-specific information tailored to the Indian legal system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-4xl">
          <div className="glass p-10 rounded-3xl border border-gray-800 bg-red-950/10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Important Disclaimer</h3>
                <p className="text-gray-300 leading-relaxed">
                  NyayaSahayak provides general legal information for educational purposes only. 
                  The information provided should not be construed as legal advice, and no attorney-client 
                  relationship is created by using this service. For specific legal issues, please 
                  consult with a qualified legal professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
