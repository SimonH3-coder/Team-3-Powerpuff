import { useState } from "react";
import searchIcon from "../assets/search-icon.svg";

export default function SearchBarForum({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };

    return (
        <section className="flex flex-col items-center gap-4">
            <h1 className="text-center text-black text-[2.5rem] font-normal font-montserrat">
                For<span className="text-dark-green">um</span>
            </h1>

            <div className="flex justify-center items-center md:w-120 w-47.75 px-4 py-2.25 gap-2.5 rounded-[1.75rem] border border-black bg-[#003D60]">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                    setQuery(e.target.value);
                    if (onSearch) onSearch(e.target.value); 
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                    placeholder="Find anything"
                    className="bg-transparent  text-white text-[1rem] font-bold font-pop outline-none w-full placeholder-white/60"
                />
                <button onClick={handleSubmit}>
                    <svg src={searchIcon} className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                </button>
            </div>
        </section>
    );
}