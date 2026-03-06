import { useState } from "react";
import "components/navbar.scss";
import image from "../assets/image.png";

export function Navbar() {
  return (
    <nav>
      <ul className="flex w-[402px] h-[60px] px-[7px] py-[11px] pb-[12px] justify-center items-center aspect-[67/10]">
        <li className="w-[22.637px] h-[19.141px] fill-[#6FA9BB]">
          <button className="hamburger">☰</button>
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

      <ul
        clasName="flex w-[402px] h-[60px] px-[7px] py-[11px] pb-[12px] justify-center
      items-center aspect-[67/10]"
      >
        <li className="w-[22.637px] h-[19.141px] fill-[#6FA9BB]"></li>
        <li>
          <img src={image} alt="Logo" />
        </li>
        <li className="text-black font-[poppins] text-sm font-normal leading-[normal]">
          <a>Log in</a>
        </li>
        <li className="text-white font-poppins text-sm font-normal leding-normal flex w-[69px] p-0.5 justify-center items center gap-2.5 shrink-0 rounded-[38px] bg-[#003D60] "></li>
      </ul>

      <ul
        className="flex w-[402px] h-[60px] px-[7px] py-[11px] pb-[12px] justify-center items-center
      aspect-[67/10]"
      >
        <li className="w-[22.637px] h-[19.141px] fill-[#003D60]">
          <button className="hamburger">☰</button>
        </li>
        <li>
          <img src={image} alt="Logo" />
        </li>
        <li className="text-black font-[poppins] text-sm font-normal leading-[normal]">
          <a>Log in</a>
        </li>
        <li className="flex w-[69px] p-0.5 justify-center items-center gap-2.5 shrink-0 rounded-[38px] bg-[#003D60] text-white font-poppins text-sm font-normal leading-[normal] rounded-[38px]">
          <button>Sign up</button>
        </li>
      </ul>

      <ul className="flex w-[402px] h-[60px] px-[7px] py-[11px] pb-[12px] justify-center items-center aspect-[67/10]">
        <li className="w-[22.637px] h-[19.141px] shrink-0 fill-[#25B136]">
          <button className="hamburger">☰</button>
        </li>
        <li className="text-black font-[poppins] text-sm font-normal leading-[normal]">
          <button>Log in</button>
        </li>
        <li
          className="text-white font-poppins text-sm
        font-normal flex w-[65px] p-0.5 justify-center items-center gap-2.5 rounded-[38px] bg-[#25B136]"
        >
          <button>Sign Up</button>
        </li>
      </ul>

      <ul className="flex w-[402px] px-[9px] py-[11px] flex-col items-start gap-2.5 bg-white">
        <li className="w-[15.75 px] h-[12px] stroke-[2.25px] stroke-black">
          <button className="hamburger-button">☰</button>
        </li>
        <li className="flex items-center gap-[6px]">
          <img src={image} alt="logo" />
        </li>
      </ul>

      <ul
        className="flex w-[402px] px-[9px] py-[11px]
      flex-col items-start gap-2.5 bg-white"
      >
        <li
          className="w-[15.75px] h-[12px] stroke-[2.25px]
      stroke-[#003D60]"
        >
          <button className="hamburger-button">☰</button>
        </li>
        <li className="flex items-center gap-[6px]">
          <img src={image} alt="logo" />
        </li>
      </ul>
      <ul className="flex w-[402px] px-[9px] py-[11px] flex-col items-start gap-2.5 bg-white">
        <li className="w-[15.75px] h-[12px]stroke-[2.25px] stroke-[#1F11E]">
          <button className="hamburger-button">☰</button>
        </li>
        <li className="flex items-center gap-[6px]">
          <img src={image} alt="logo" />
        </li>
      </ul>
      <ul
        className="flex w-[402px] px-[9px] py-[11px]
       flex-col items-start gap-2.5 bg-white"
      >
        <li className="w-15.75px h-[12px] stroke-[2.25px]stroke [#000]">
          <button className="hamburger-button">☰</button>
        </li>
        <li className="flex items-center gap-[6px]">
          <img src={image} alt="logo" />
        </li>
      </ul>

      <ul>
        <li className="flex w-[362px] h-[46px] justify-between items-center">
          <img src={image} alt="Logo" />
        </li>

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
      </ul>

      <ul>
        <li className="flex w-[362px] h-[46px] justify-between items-center">
          <img src={image} alt="Logo" />
        </li>
        <li className="flex items-end gap-2.5 self-stretch">
          <button className="close-button">×</button>
        </li>
      </ul>

      <ul>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M1.21429 15.895H5.69743V10.2851C5.69743 10.0324 5.79174 9.82063 5.98036 9.64972C6.16817 9.47808 6.4009 9.39227 6.67857 9.39227H10.3214C10.5991 9.39227 10.8322 9.47808 11.0209 9.64972C11.2087 9.82063 11.3026 10.0324 11.3026 10.2851V15.895H15.7857V6.29061C15.7857 6.17716 15.7586 6.07403 15.7044 5.98122C15.6501 5.8884 15.576 5.80737 15.4821 5.73812L8.94443 1.25414C8.81976 1.15543 8.67162 1.10608 8.5 1.10608C8.32838 1.10608 8.18064 1.15543 8.05679 1.25414L1.51786 5.73812C1.42476 5.80884 1.35069 5.88987 1.29564 5.98122C1.2406 6.07256 1.21348 6.17569 1.21429 6.29061V15.895ZM0 15.895V6.29061C0 6.00773 0.069619 5.73996 0.208857 5.48729C0.348095 5.23462 0.539952 5.02652 0.784428 4.86298L7.32336 0.356907C7.66579 0.118969 8.05679 0 8.49636 0C8.93593 0 9.32936 0.118969 9.67664 0.356907L16.2156 4.86188C16.4609 5.02541 16.6527 5.23389 16.7911 5.48729C16.9304 5.73996 17 6.00773 17 6.29061V15.895C17 16.1912 16.879 16.4494 16.6369 16.6696C16.3949 16.8899 16.1111 17 15.7857 17H11.0694C10.791 17 10.5578 16.9145 10.37 16.7436C10.1822 16.572 10.0883 16.3599 10.0883 16.1072V10.4983H6.91172V16.1072C6.91172 16.3606 6.81781 16.5727 6.63 16.7436C6.44219 16.9145 6.20945 17 5.93179 17H1.21429C0.888857 17 0.605119 16.8899 0.363071 16.6696C0.121024 16.4494 0 16.1912 0 15.895Z"
              fill="#757575"
              className="flex w-[24px] h-[24px] px-0.5 py-0.75 justify-center items-center gap-2.5"
            />
          </svg>
        </li>
        <li>
          {" "}
          <a>Home</a>
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1.25 10.4167L5.41667 5.83333L1.25 1.25" stroke="#555252" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </li>
      </ul>
      <ul>
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
        </li>
        <li>
          <a>Map</a>
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1.25 10.4167L5.41667 5.83333L1.25 1.25" stroke="#555252" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </li>
      </ul>
      <ul>
        <li className="flex items-end gap-2.5 self-stretch">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M2.39995 20.7272V2.18176H1.19995V20.1818C1.28351 20.6053 1.51179 20.9866 1.84568 21.2603C2.17956 21.534 2.59824 21.683 3.02995 21.6818H23.7V20.7272H2.39995Z" fill="#757575" />
            <path d="M4.7251 12H6.0001V17.85H4.7251V12ZM9.6151 6.00004H10.8001V17.85H9.6151V6.00004ZM14.5201 9.00004H15.6001V17.85H14.5201V9.00004ZM19.4251 3.75004L20.4001 3.75V17.85H19.4251V3.75004Z" fill="#757575" className="flex w-[24px] h-[24px] px-0.5 py-0.75 justify-center items-center gap-2.5" />
          </svg>
        </li>
        <li>
          <a>Stats</a>
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1.25 10.4167L5.41667 5.83333L1.25 1.25" stroke="#555252" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </li>
      </ul>
      <ul>
        <li className="flex items-end gap-2.5 self-stretch">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.9969 1.26316C10.7916 1.26316 9.68486 1.65853 8.83094 2.32295C8.35312 2.69558 7.95544 3.15284 7.67029 3.66947C7.58932 3.81673 7.44258 3.93297 7.26024 3.99429C7.07791 4.05561 6.87383 4.05735 6.68998 3.99916C4.16676 3.84379 1.8547 5.48084 1.56955 7.82779C1.37688 9.432 2.19688 10.9099 3.54404 11.7789C3.69664 11.8775 3.79066 12.0126 3.82457 12.1566C3.89456 12.2857 3.90975 12.4302 3.86773 12.5672C3.724 13.034 3.67711 13.5174 3.72901 13.9971C3.9448 16.0232 6.30464 17.4417 8.43327 17.2648C9.25482 17.1966 9.82975 17.0855 10.2629 16.8796C10.6498 16.6952 10.9827 16.4072 11.2524 15.8817C11.2803 15.7948 11.3305 15.7138 11.3996 15.6441C11.4687 15.5744 11.5551 15.5175 11.6531 15.4774C11.7512 15.4372 11.8585 15.4146 11.968 15.4112C12.0776 15.4077 12.1867 15.4234 12.2882 15.4573C12.4003 15.4937 12.5004 15.5512 12.5805 15.6252C12.6605 15.6991 12.7183 15.7874 12.7491 15.8829C13.0188 16.4072 13.3502 16.6952 13.7387 16.8796C14.1702 17.0855 14.7467 17.1966 15.5667 17.2648C17.6954 17.4417 20.0552 16.0232 20.271 13.9971C20.3229 13.5174 20.276 13.034 20.1323 12.5672C20.0904 12.4297 20.1061 12.2846 20.177 12.1554C20.2118 12.0065 20.3109 11.8729 20.456 11.7789C21.8047 10.9099 22.6247 9.432 22.4305 7.82779C22.1468 5.47832 19.8271 3.84 17.3023 4.00042C17.1185 4.05816 16.9146 4.05604 16.7326 3.99449C16.5506 3.93295 16.4042 3.81666 16.3235 3.66947C16.0464 3.16342 15.6523 2.70615 15.1629 2.32295C14.3143 1.64778 13.1797 1.26798 11.9969 1.26316ZM17.4688 2.72842C17.1377 2.23921 16.7183 1.79377 16.2249 1.40716C15.0897 0.508898 13.5749 0.00475342 11.9969 0C10.4189 0.00475342 8.90415 0.508898 7.76894 1.40716C7.28032 1.78737 6.85953 2.23326 6.52505 2.72716C3.19569 2.64632 0.382692 4.83789 0.0358837 7.70526C-0.195322 9.61263 0.70638 11.4114 2.28937 12.5659C2.17075 13.0735 2.1391 13.5922 2.19534 14.1069C2.4882 16.8619 5.63876 18.768 8.58895 18.5229C9.47061 18.4497 10.3122 18.3171 11.0351 17.9735C11.404 17.7992 11.7256 17.576 12 17.304C12.2764 17.576 12.5981 17.7992 12.9649 17.9735C13.6893 18.3171 14.5309 18.4497 15.4126 18.5229C18.3628 18.768 21.5133 16.8619 21.8062 14.1082C21.8619 13.5934 21.8298 13.0747 21.7106 12.5672C23.2936 11.4114 24.1953 9.61263 23.9641 7.704C23.6173 4.83537 20.7997 2.64505 17.4688 2.72842Z"
              fill="#003D60"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.6657 9.14906C16.7178 9.22022 16.7522 9.29908 16.767 9.38114C16.7819 9.46321 16.7768 9.54686 16.7522 9.62733C16.7276 9.7078 16.6839 9.7835 16.6235 9.85012C16.5632 9.91674 16.4875 9.97296 16.4006 10.0156L12.9217 11.7259V23.3684C12.9217 23.5359 12.8405 23.6966 12.696 23.815C12.5515 23.9335 12.3554 24 12.151 24C11.9466 24 11.7506 23.9335 11.6061 23.815C11.4616 23.6966 11.3804 23.5359 11.3804 23.3684V14.8838L7.90149 13.1747C7.72611 13.0886 7.59966 12.949 7.54994 12.7865C7.50022 12.624 7.53131 12.4519 7.63637 12.3082C7.74143 12.1645 7.91186 12.0609 8.11016 12.0201C8.30845 11.9794 8.51838 12.0049 8.69375 12.091L11.3804 13.4122V6.94737C11.3804 6.77987 11.4616 6.61923 11.6061 6.50078C11.7506 6.38234 11.9466 6.3158 12.151 6.3158C12.3554 6.3158 12.5515 6.38234 12.696 6.50078C12.8405 6.61923 12.9217 6.77987 12.9217 6.94737V10.2531L15.6083 8.9318C15.6952 8.88915 15.7914 8.86094 15.8915 8.84878C15.9917 8.83662 16.0938 8.84074 16.192 8.86092C16.2901 8.88109 16.3825 8.91692 16.4638 8.96636C16.5451 9.0158 16.6137 9.07789 16.6657 9.14906Z"
              fill="#003D60"
              className="flex w-[24px] h-[24px] px-0.5 py-0.75 justify-center items-center gap-2.5"
            />
          </svg>
        </li>
        <li>
          <a>Forum</a>
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1.25 10.4167L5.41667 5.83333L1.25 1.25" stroke="#555252" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </li>
      </ul>
    </nav>
  );
}
