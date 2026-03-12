import { useState, useRef, useEffect } from 'react';

export default function CreatePost({ postId, onFinish, onError }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [username, setUsername] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const fileRef = useRef(null);

  const hasValidToken = (token) => {
    if (!token || token === 'null' || token === 'undefined') return false;
    if (token.split('.').length !== 3) return false;
    for (let i = 0; i < token.length; i++) {
      if (token.charCodeAt(i) > 127) return false;
    }
    return true;
  };

  //fetching username for the 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!hasValidToken(token)) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/profiles`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          throw new Error('Session expired. Please log in again.');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Profile data:', data);
        setUsername(data.username);
      })
      .catch((err) => {
        console.error('Profile fetch failed:', err.message);
      });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // If postId is provided, fetch the existing post data to edit

  const handleFile = (file) => {
    if (!file?.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !image) return;

    const token = localStorage.getItem('token');
    if (!hasValidToken(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onError?.('Your session is invalid or expired. Please log in again.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', content);

      if (image) {
        const blob = await fetch(image).then((res) => res.blob());

        formData.append('image', blob, 'image.jpg');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/forum`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('Status:', response.status);
      const text = await response.text();
      console.log('Raw:', text);

      let data = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (_parseError) {
          data = null;
        }
      }

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        const errorMessage = data?.error || `Request failed (${response.status})`;
        onError?.(errorMessage);
        return;
      }
      setContent('');
      setImage(null);
      if (onFinish) onFinish();
    } catch (err) {
      console.error('Failed to post:', err);
      if (err instanceof TypeError && err.message.includes('ByteString')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onError?.('Your session token is corrupted. Please log in again.');
      }
    }
  };

  const charLeft = 280 - content.length;
  const scale = Math.max(0.9, 1 - scrollY * 0.00025);

  //FRONTEND: CreatePost
  return (
    <div className="mt-7.5 flex items-center justify-center font-monserrat">
      <div
        className="w-92.5 sm:w-full sm:max-w-xl rounded-3xl p-5 sm:p-8 relative overflow-hidden shadow-2x bg-gradient-green transition-transform duration-300"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          willChange: 'transform',
        }}
      >
        <h2 className="text-lg sm:text-3xl font-extrabold text-white mb-4 sm:mb-5 tracking-tight font-['Poppins']">
          Post your eco thoughts!
        </h2>

        {username && (
          <p className="text-white/70 text-sm font-semibold mb-2">
            Posting as <span className="text-white">@{username}</span>
          </p>
        )}

        <textarea
          className="w-full bg-transparent border-0 border-b-2 border-white/30 focus:border-white/80 outline-none text-white placeholder-white/50 text-sm sm:text-base font-semibold py-1 resize-none caret-white transition-colors duration-200"
          placeholder="Tell us what do you think..."
          rows={1}
          maxLength={280}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <span className={`text-xs font-bold ${charLeft < 20 ? 'text-red-400' : 'text-white/50'}`}>
          {charLeft < 60 ? charLeft : ''}
        </span>

        {image ? (
          <div className="relative mt-4 rounded-2xl overflow-hidden">
            <img src={image} alt="preview" className="w-full max-h-48 sm:max-h-64 object-cover rounded-2xl block" />
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/85 text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files[0]);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            className={`mt-4 border-2 border-dashed rounded-2xl p-3 sm:p-5 text-center cursor-pointer transition-all duration-200
              ${dragOver ? 'border-white/80 bg-white/10' : 'border-white/40 bg-white/5 hover:border-white/70 hover:bg-white/10'}`}
          >
            <span className="text-xl sm:text-2xl">🖼️</span>
            <p className="mt-1 text-white/70 text-xs sm:text-sm font-semibold">
              Drop image or <span className="text-white">click to browse</span>
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        )}

        <div className="flex justify-end mt-4 sm:mt-5">
          <button
            onClick={handleSubmit}
            disabled={!content.trim() && !image}
            className="bg-navy hover:bg-[#4b7697] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-lg hover:-translate-y-px transition-all duration-200"
          >
            {postId ? 'Save' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
