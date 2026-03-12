# 🌿 Team-3-Powerpuff — Eco Forum

A social forum for eco-minded people. Think mini Twitter, but for the planet.

Users can sign up, share their environmental thoughts with images, pin their post to a real location on the map, and browse what the community is saying — all wrapped in a nature-forward UI.

---

## ✨ Features

- 📝 Create posts with text & images (drag & drop supported)
- 🗺️ Drop a pin on a map to show where your post is from
- 📰 Browse the community forum feed
- 👤 Register & log in with your own profile
- 🔔 Toast notifications for errors and success feedback

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend & Auth | Supabase, Node.js |
| Image Storage | Supabase Storage |
| Deployment | Vercel |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-org/team-3-powerpuff.git
cd team-3-powerpuff
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run locally

```bash
npm run dev
```

---

## 🗄️ Database Setup

Run the following in your Supabase SQL editor to set up the required foreign key:

```sql
ALTER TABLE forum
ADD CONSTRAINT forum_poster_id_fkey
FOREIGN KEY (poster_id) REFERENCES profiles(id);
```

Also make sure you have a **public `images` bucket** created in Supabase Storage for image uploads.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── CreatePost.jsx      # Post creation form with image upload
│   ├── ForumPost.jsx       # Individual post display
│   ├── ErrorToast.jsx      # Reusable toast notification component
│   └── ...
├── pages/
│   ├── Forum.jsx           # Main forum feed
│   ├── Register.jsx        # User registration
│   └── ...
└── App.jsx
```

## 📄 License

This project was built for educational purposes.
