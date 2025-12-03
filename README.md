# 📸 Instagram Clone — Social Feed Web App

A modern Instagram-style social app built with **Next.js, TypeScript, Tailwind CSS, and Prisma**. It recreates the familiar Instagram experience with a responsive feed, profile pages, and clean UI focused on photos, captions, and social interaction.

🔗 **Live Demo:** https://instagram-clone-app-xi.vercel.app/  
📦 **GitHub Repo:** https://github.com/Owen-San/instagram-clone-app

---

## ✨ Features

- **Responsive Instagram-style feed** with photo-first layout  
- **User authentication** (email / credentials, with room for social login)  
- **Create posts** with captions and timestamps  
- **Like and unlike posts**  
- **Comment on posts** to interact with other users  
- **User profiles** with avatar, bio, and post grid  
- **Modern, minimal UI** closely inspired by Instagram’s design  
- **Fully responsive** across desktop, tablet, and mobile

---

## 🛠️ Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Prisma ORM**
- **SQL database** (via Prisma `DATABASE_URL`)
- **NextAuth (Auth.js)** for authentication
- **Deployed on Vercel**

---

## 🧭 User Flow

1. **Sign Up / Sign In**  
   Create an account and authenticate with secure session handling.
2. **Browse the Feed**  
   Scroll a clean, image-focused feed of posts.
3. **Create a Post**  
   Add a new post with an image and caption.
4. **Engage with Content**  
   Like posts, leave comments, and explore other users’ profiles.
5. **View Profiles**  
   See a user’s avatar, bio, and grid of posts.

---

## 🎨 UI & UX

- Clean, Instagram-inspired layout  
- Focus on **readability and visual hierarchy**  
- Tailwind utility classes for consistent spacing and responsive behavior  
- Smooth interactions with loading states and hover effects where appropriate

---

## 🚀 Getting Started

```bash
git clone https://github.com/Owen-San/instagram-clone-app.git
cd instagram-clone-app
npm install
npm run dev

Open http://localhost:3000
 in your browser.
```

## 🔐 Environment Variables

Create a .env.local file in the project root and configure values like:

DATABASE_URL="your-database-connection-string"
NEXTAUTH_SECRET="your-strong-random-string"
NEXTAUTH_URL="http://localhost:3000"

# If using a social provider (e.g. Google), also add:
# GOOGLE_CLIENT_ID="your-google-client-id"
# GOOGLE_CLIENT_SECRET="your-google-client-secret"


Run migrations with Prisma if needed:

npx prisma migrate dev

## 📁 Project Structure (High-Level)
/app
  /(routes)
  /api
  layout.tsx
  globals.css

/prisma
  schema.prisma

/src
  /components
  /hooks
  /lib
  /types

/public

## 📌 Notes

-Built to practice real-world fullstack patterns with Next.js, Prisma, and Auth.

-Focused on recreating core Instagram behavior with a clean, modern frontend.

-Great reference for fullstack TypeScript + Next.js architecture and UI work.

## ⭐ Support

If you like this project, feel free to star the repo!
