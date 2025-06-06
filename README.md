# Loopin - Discussion Forum

A modern, full-featured discussion forum built with Next.js 15, Supabase, TypeScript, and Tailwind CSS. Features real-time discussions, anonymous posting, image uploads, and smooth animations.

## Features

### ✅ **Complete MVP Implementation**

- **🔐 Authentication System**

  - Email/password registration and login
  - OAuth login (GitHub & Google)
  - Session management with middleware protection
  - User profiles with usernames and bios

- **💬 Discussion Threads**

  - Create and browse discussion threads
  - Rich text content with image attachments
  - Thread moderation (pin, lock, delete)
  - Real-time view counts and statistics

- **📝 Comments & Replies**

  - Threaded comment system
  - Image attachments in comments
  - Anonymous vs verified posting toggle
  - Real-time comment updates

- **🎭 Anonymous Mode**

  - Global anonymous toggle switch
  - Per-post anonymous/verified control
  - Privacy-first design

- **📤 Microblog Export**

  - One-click export comments to clipboard
  - Formatted for external sharing
  - Toast notifications for user feedback

- **🎨 Modern UI/UX**

  - Responsive design with Tailwind CSS
  - Smooth animations with Framer Motion
  - Glass morphism and gradient effects
  - Dark mode optimized color schemes

- **📁 File Upload System**
  - Secure Supabase Storage integration
  - Image compression and optimization
  - Drag-and-drop upload interface
  - File preview and management

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **Animations**: Framer Motion
- **State Management**: React Context + SWR
- **Styling**: Tailwind CSS with custom design tokens
```

## 🏗️ Database Schema

### **Core Tables**

- **`profiles`** - User profiles, usernames, bios, and statistics
- **`threads`** - Discussion threads with image support and anonymity options
- **`posts`** - Comments/replies with image attachments and anonymous posting
- **`uploads`** - Secure file storage bucket for image attachments

## 🔒 Security Features

- Row-Level Security (RLS) policies on all database tables
- Secure file upload validation and type checking
- Input sanitization and validation throughout
- Protected API routes with authentication
- Session-based authentication with middleware protection

## ✨ Key Features Highlights

### **User Experience**

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Real-time Updates**: Live comment updates and statistics
- **Intuitive Navigation**: Clean, modern interface with clear information hierarchy

### **Privacy & Anonymity**

- **Anonymous Mode**: Global toggle for anonymous posting
- **Per-post Control**: Choose verified or anonymous for each post
- **Privacy Preserving**: No tracking of anonymous posts to users

### **Content Management**

- **Rich Media Support**: Image uploads in threads and comments
- **Secure Storage**: All files stored securely with proper validation
- **Export Functionality**: Export comments for sharing on other platforms
- **Moderation Tools**: Pin, lock, and manage discussion threads

### **Technical Excellence**

- **Type Safety**: Full TypeScript implementation
- **Performance Optimized**: Efficient queries and optimized bundle sizes
- **Security First**: Comprehensive security measures throughout
- **Production Ready**: Battle-tested and deployment ready