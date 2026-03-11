import defaultAvatar from '../assets/profile-image.svg';

export default function ProfileImage({ username, avatarUrl, bio }) {
    return(
        <div>
            <section className="text-center mt-7.5 mb-5 flex flex-col items-center">
            <img src={avatarUrl || defaultAvatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            <h1 className="mt-7.5 text-center text-black text-[0.875rem] font-normal font-poppins">@{username || 'username'}</h1>
            <p className="text-center text-black text-[0.875rem] font-normal font-poppins">{bio || 'Nature lover, web development student'}</p>
        </section>
        </div>
    )
}