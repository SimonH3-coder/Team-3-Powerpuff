import profileImage from '../assets/profile-image.svg';

export default function ProfileImage() {
    return(
        <div>
            <section className="text-center mt-7.5 mb-5 flex flex-col items-center">
            <img src={profileImage} alt="Profile" />
            <h1 className="mt-7.5 text-center text-black text-[0.875rem] font-normal font-poppins">@username</h1>
            <p className="text-center text-black text-[0.875rem] font-normal font-poppins">Nature lover, web development student </p>
        </section>
        </div>
    )
}