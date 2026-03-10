import { useState, useRef, useEffect } from "react";

export default function CreatePost({ postId, onFinish }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [userId, setUserId] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
  fetch("/api/forum")
    .then(res => res.json())
    .then(data => {
      if (data.authenticated) setUserId(data.id);
    });
}, []);

  const handleFile = (file) => {
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  {/*Connecting to the Backend*/}

const handleSubmit = async () => {
  if (!content.trim() && !image) return;

  try {
    const response = await fetch("http://localhost:3000/api/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        poster_id: userId,  
        userId: userId,     
        content: content, 
      }),
    });

    const data = await response.json();
    if (data.error) {
      alert("Error: " + data.error);
      return;
    }

    setContent("");
    setImage(null);
    if (onFinish) onFinish();

  } catch (err) {
    console.error("Failed to post:", err);
  }
};

  const charLeft = 280 - content.length;

  {/* Create Post Box */}
  return (
   <div className="mt-7.5 flex items-center justify-center font-monserrat">
  <div className="w-92.5 sm:w-full sm:max-w-xl rounded-3xl p-5 sm:p-8 relative overflow-hidden shadow-2x bg-gradient-green">

    <h2 className="text-lg sm:text-3xl font-extrabold text-white mb-4 sm:mb-5 tracking-tight font-['Poppins']">
      Post your eco thoughts!
    </h2>

    {/* Text input */}
    <textarea
      className="w-full bg-transparent border-0 border-b-2 border-white/30 focus:border-white/80 outline-none text-white placeholder-white/50 text-sm sm:text-base font-semibold py-1 resize-none caret-white transition-colors duration-200"
      placeholder="Tell us what do you think..."
      rows={1}
      maxLength={280}
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />

    {/* Image preview */}
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
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={`mt-4 border-2 border-dashed rounded-2xl p-3 sm:p-5 text-center cursor-pointer transition-all duration-200
          ${dragOver ? "border-white/80 bg-white/10" : "border-white/40 bg-white/5 hover:border-white/70 hover:bg-white/10"}`}
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
        {postId ? "Save" : "Post"}
      </button>
    </div>
  </div>
</div>
  );
}