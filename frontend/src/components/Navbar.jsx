import { useState } from "react";
import image from "../assets/image.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <ul className="flex w-[402px] h-[60px] px-[7px] py-[11px] pb-[12px] justify-center items-center aspect-[67/10]">
        <li className="w-[22.637px] h-[19.141px] fill-[#6FA9BB]">
          <button onClick={() => setIsOpen(!isOpen)} className="hamburger">
            ☰
          </button>
        </li>
        <li>
          <img src={image} alt="Logo" />
        </li>
        <li className="text-black font-[poppins] text-sm font-normal leading-[normal]">
          <a>Log in</a>
        </li>
        <li className="text-white font-poppins text-sm font-normal flex w-[69px] p-0.5 justify-center items-center gap-2.5 rounded-full bg-[#757575]">
          <button>Sign up</button>
        </li>
      </ul>
      {isOpen && (
        <ul>
          <button className="close-button">×</button>
          <li className="flex items-end gap-2.5 self-stretch">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path
                d="M1.21429 15.895H5.69743V10.2851C5.69743 10.0324 5.79174 9.82063 5.98036 9.64972C6.16817 9.47808 6.4009 9.39227 6.67857 9.39227H10.3214C10.5991 9.39227 10.8322 9.47808 11.0209 9.64972C11.2087 9.82063 11.3026 10.0324 11.3026 10.2851V15.895H15.7857V6.29061C15.7857 6.17716 15.7586 6.07403 15.7044 5.98122C15.6501 5.8884 15.576 5.80737 15.4821 5.73812L8.94443 1.25414C8.81976 1.15543 8.67162 1.10608 8.5 1.10608C8.32838 1.10608 8.18064 1.15543 8.05679 1.25414L1.51786 5.73812C1.42476 5.80884 1.35069 5.88987 1.29564 5.98122C1.2406 6.07256 1.21348 6.17569 1.21429 6.29061V15.895ZM0 15.895V6.29061C0 6.00773 0.069619 5.73996 0.208857 5.48729C0.348095 5.23462 0.539952 5.02652 0.784428 4.86298L7.32336 0.356907C7.66579 0.118969 8.05679 0 8.49636 0C8.93593 0 9.32936 0.118969 9.67664 0.356907L16.2156 4.86188C16.4609 5.02541 16.6527 5.23389 16.7911 5.48729C16.9304 5.73996 17 6.00773 17 6.29061V15.895C17 16.1912 16.879 16.4494 16.6369 16.6696C16.3949 16.8899 16.1111 17 15.7857 17H11.0694C10.791 17 10.5578 16.9145 10.37 16.7436C10.1822 16.572 10.0883 16.3599 10.0883 16.1072V10.4983H6.91172V16.1072C6.91172 16.3606 6.81781 16.5727 6.63 16.7436C6.44219 16.9145 6.20945 17 5.93179 17H1.21429C0.888857 17 0.605119 16.8899 0.363071 16.6696C0.121024 16.4494 0 16.1912 0 15.895Z"
                fill="#757575"
                className="flex w-[24px] h-[24px] px-0.5 py-0.75 justify-center items-center gap-2.5"
              />
            </svg>
            <a>Home</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1.25 10.4167L5.41667 5.83333L1.25 1.25" stroke="#555252" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </li>
          <li className="flex items-end gap-2.5 self-stretch">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" viewBox="0 0 17 21" fill="none">
              <path d="M9.09657 20.3C8.92434 20.4292 8.71486 20.499 8.49957 20.499C8.28429 20.499 8.0748 20.4292 7.90257 20.3C2.75257 16.476 -2.71543 8.609 2.80957 2.925C3.54717 2.16021 4.43094 1.55145 5.4084 1.13487C6.38585 0.718297 7.43705 0.502398 8.49957 0.5C10.6336 0.5 12.6796 1.372 14.1886 2.924C19.7146 8.608 14.2476 16.474 9.09657 20.301" stroke="#757575" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M8.49963 10.5C9.03007 10.5 9.53877 10.2893 9.91385 9.91421C10.2889 9.53914 10.4996 9.03043 10.4996 8.5C10.4996 7.96957 10.2889 7.46086 9.91385 7.08579C9.53877 6.71071 9.03007 6.5 8.49963 6.5C7.9692 6.5 7.46049 6.71071 7.08542 7.08579C6.71035 7.46086 6.49963 7.96957 6.49963 8.5C6.49963 9.03043 6.71035 9.53914 7.08542 9.91421C7.46049 10.2893 7.9692 10.5 8.49963 10.5Z"
                stroke="#757575"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="flex w-[24px] h-[24px] px-0.5 py-0.75 justify-center items-center gap-2.5"
              />
            </svg>
            <a>Map</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1.25 10.4167L5.41667 5.83333L1.25 1.25" stroke="#555252" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </li>
          <li className="flex items-end gap-2.5 self-stretch">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2.39995 20.7272V2.18176H1.19995V20.1818C1.28351 20.6053 1.51179 20.9866 1.84568 21.2603C2.17956 21.534 2.59824 21.683 3.02995 21.6818H23.7V20.7272H2.39995Z" fill="#757575" />
              <path d="M4.7251 12H6.0001V17.85H4.7251V12ZM9.6151 6.00004H10.8001V17.85H9.6151V6.00004ZM14.5201 9.00004H15.6001V17.85H14.5201V9.00004ZM19.4251 3.75004L20.4001 3.75V17.85H19.4251V3.75004Z" fill="#757575" className="flex w-[24px] h-[24px] px-0.5 py-0.75 justify-center items-center gap-2.5" />
            </svg>
            <a>Stats</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1.25 10.4167L5.41667 5.83333L1.25 1.25" stroke="#555252" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </li>
          <li className="text-black font-poppins text-sm font-normal">
            <a>Log in</a>
          </li>
          <li className="text-white font-poppins text-sm font-normal flex w-[65px] p-0.5 justify-center items-center gap-2.5 rounded-full bg-[#25B136]">
            <button>Sign up</button>
          </li>
          <li className="flex items-end gap-2.5 self-stretch">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2.39995 20.7272V2.18176H1.19995V20.1818C1.28351 20.6053 1.51179 20.9866 1.84568 21.2603C2.17956 21.534 2.59824 21.683 3.02995 21.6818H23.7V20.7272H2.39995Z" fill="#757575" />
              <path d="M4.7251 12H6.0001V17.85H4.7251V12ZM9.6151 6.00004H10.8001V17.85H9.6151V6.00004ZM14.5201 9.00004H15.6001V17.85H14.5201V9.00004ZM19.4251 3.75004L20.4001 3.75V17.85H19.4251V3.75004Z" fill="#757575" className="flex w-[24px] h-[24px] px-0.5 py-0.75 justify-center items-center gap-2.5" />
            </svg>
            <a>Stats</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1.25 10.4167L5.41667 5.83333L1.25 1.25" stroke="#555252" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </li>
          <li className="text-black font-poppins text-sm font-normal">
            <a>Log in</a>
          </li>
          <li className="text-white font-poppins text-sm font-normal flex w-[65px] p-0.5 justify-center items-center gap-2.5 rounded-full bg-[#25B136]">
            <button>Sign up</button>
          </li>
        </ul>
      )}
    </nav>
  );
}
