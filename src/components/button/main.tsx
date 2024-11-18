// import React from 'react';
// import { BiPlus } from 'react-icons/bi';
// import styled from 'styled-components';
// interface props{
//     text:string
//     onClick:() =>void;
//     needIcon:boolean
// }
// const Button:React.FC<props> = ({text,needIcon,onClick}) => {
//   return (
//     <StyledWrapper>
//       <button onClick={onClick} className="button">
//         {text}
//         {needIcon?<BiPlus className='h-7 w-7'/>:null}
//       </button>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .button {
//     position: relative;
//     transition: all 0.3s ease-in-out;
//     box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
//     padding-block: 0.5rem;
//     padding-inline: 1.25rem;
//     background-color: rgb(0 107 179);
//     border-radius: 9999px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//     color: #ffff;
//     gap: 10px;
//     font-weight: bold;
//     border: 3px solid #ffffff4d;
//     outline: none;
//     overflow: hidden;
//     font-size: 15px;
//   }

//   .icon {
//     width: 24px;
//     height: 24px;
//     transition: all 0.3s ease-in-out;
//   }

//   .button:hover {
//     transform: scale(1.05);
//     border-color: #fff9;
//   }

//   .button:hover .icon {
//     transform: translate(4px);
//   }

//   .button:hover::before {
//     animation: shine 1.5s ease-out infinite;
//   }

//   .button::before {
//     content: "";
//     position: absolute;
//     width: 100px;
//     height: 100%;
//     background-image: linear-gradient(
//       120deg,
//       rgba(255, 255, 255, 0) 30%,
//       rgba(255, 255, 255, 0.8),
//       rgba(255, 255, 255, 0) 70%
//     );
//     top: 0;
//     left: -100px;
//     opacity: 0.6;
//   }

//   @keyframes shine {
//     0% {
//       left: -100px;
//     }

//     60% {
//       left: 100%;
//     }

//     to {
//       left: 100%;
//     }
//   }`;

// export default Button;
import React from "react";
import { BiPlus } from "react-icons/bi";

interface Props {
  text: string;
  onClick: () => void;
  needIcon: boolean;
  loading?: boolean;
  disabled?:boolean
  type?:"submit"|"button"
}

const Button: React.FC<Props> = ({ text, disabled ,type,needIcon, onClick, loading }) => {
  return (
    <div className="group relative">
      <button
      type={type}
        onClick={onClick}
        disabled={loading||disabled}
        className={`relative flex border items-center justify-center gap-2 px-5 py-2 bg-blueButton group-hover:bg-blueButton-hover text-white font-bold text-sm rounded-full border-3 border-white/30 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:border-white/60 overflow-hidden ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {/* Loading Spinner */}
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {text}
            {needIcon && <BiPlus className="h-7 w-7" />}
          </>
        )}

        {/* Shine effect only on hover */}
        {!loading && (
          <div className="absolute inset-0 w-24 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-60 -translate-x-24 group-hover:translate-x-full transition-transform duration-500"></div>
        )}
      </button>
    </div>
  );
};

export default Button;
