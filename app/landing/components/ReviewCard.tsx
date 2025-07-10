// import Image from 'next/image';
// import { useState } from 'react';

// interface ReviewCardProps {
//   text: string;
//   name: string;
//   school: string;
// }

// export default function ReviewCard({ text, name, school }: ReviewCardProps) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className={`w-full max-w-[373px] min-h-[300px] px-6 py-8 text-left shadow-lg transition hover:scale-[1.02] rounded-[8px] border-none outline-1 outline-white/10 ${
//         isHovered ? 'bg-select-gradient' : 'bg-gray-900'
//       }`}
//     >
//       <p className="text-[16px] leading-relaxed mb-6">{text}</p>
//       <div className="flex items-center space-x-5">
//         <div className="flex items-center justify-center overflow-hidden">
//           <Image
//             src="/images/reviewUser.svg"
//             alt="user"
//             width={44}
//             height={44}
//           />
//         </div>
//         <div className="text-[16px]">
//           <div className="font-semibold">{name}</div>
//           <div className="text-gray-400 text-sm">{school}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ReviewCardProps {
  text: string;
  name: string;
  school: string;
}

export default function ReviewCard({ text, name, school }: ReviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full max-w-[373px] h-[350px] px-6 py-8 text-left shadow-lg transition hover:scale-[1.02] rounded-[8px] border-none outline-1 outline-white/10 ${
        isHovered ? 'bg-select-gradient' : 'bg-gray-900'
      }`}
    >
      <p className="text-[16px] leading-relaxed mb-6">{text}</p>

      <div className="flex items-center space-x-5 absolute bottom-[5%] left-6">
        <div className="flex items-center justify-center overflow-hidden">
          <Image
            src="/images/reviewUser.svg"
            alt="user"
            width={44}
            height={44}
          />
        </div>
        <div className="text-[16px]">
          <div className="font-semibold text-gray-400">{name}</div>
          <div className="text-gray-400 text-sm">{school}</div>
        </div>
      </div>
    </div>
  );
}
