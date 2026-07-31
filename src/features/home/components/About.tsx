"use client";

import React from "react";
import Image from "next/image";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";

interface AboutProps {
  storyData?: SettingSection;
  valuesData?: SettingSection;
}

export function About({ storyData, valuesData }: AboutProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "book":
        return (
          <svg
            width="26"
            height="26"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6161_1573)">
              <path
                d="M4.89491 3.77612C4.89405 3.77612 4.89308 3.77612 4.89222 3.77612C4.58957 3.77612 4.3049 3.8941 4.08995 4.10851C3.87263 4.3253 3.75293 4.61394 3.75293 4.92123V22.0919C3.75293 22.7216 4.26719 23.2351 4.89944 23.2367C7.56482 23.2431 12.0304 23.7986 15.111 27.0224V9.0528C15.111 8.83936 15.0565 8.63885 14.9536 8.47292C12.4252 4.40104 7.56633 3.78237 4.89491 3.77612Z"
                fill="#955127"
              />
              <path
                d="M28.2467 22.092V4.92123C28.2467 4.61394 28.127 4.3253 27.9096 4.10851C27.6947 3.8941 27.4098 3.77612 27.1075 3.77612C27.1065 3.77612 27.1055 3.77612 27.1047 3.77612C24.4334 3.78248 19.5745 4.40115 17.046 8.47303C16.9431 8.63895 16.8887 8.83947 16.8887 9.05291V27.0224C19.9693 23.7986 24.4349 23.2431 27.1003 23.2367C27.7324 23.2351 28.2467 22.7216 28.2467 22.092Z"
                fill="#955127"
              />
              <path
                d="M30.8554 7.73608H30.0252V22.0921C30.0252 23.6997 28.7153 25.0106 27.1052 25.0146C24.8444 25.02 21.1166 25.4621 18.4766 27.9608C23.0426 26.8428 27.8559 27.5696 30.5991 28.1947C30.9416 28.2727 31.2956 28.1921 31.57 27.9734C31.8435 27.7552 32.0003 27.4291 32.0003 27.079V8.88098C32.0004 8.2497 31.4867 7.73608 30.8554 7.73608Z"
                fill="#955127"
              />
              <path
                d="M1.97517 22.0921V7.73608H1.14489C0.513726 7.73608 0 8.2497 0 8.88098V27.0787C0 27.4289 0.156876 27.7549 0.430331 27.9731C0.704541 28.1917 1.05816 28.2726 1.40122 28.1944C4.14439 27.5691 8.95788 26.8425 13.5237 27.9605C10.8837 25.4619 7.15596 25.0199 4.89515 25.0145C3.28513 25.0106 1.97517 23.6997 1.97517 22.0921Z"
                fill="#955127"
              />
            </g>
            <defs>
              <clipPath id="clip0_6161_1573">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      case "clock":
        return (
          <svg
            width="26"
            height="26"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.9998 29.3334C8.63984 29.3334 2.6665 23.3734 2.6665 16.0001C2.6665 8.64008 8.63984 2.66675 15.9998 2.66675C23.3732 2.66675 29.3332 8.64008 29.3332 16.0001C29.3332 23.3734 23.3732 29.3334 15.9998 29.3334ZM20.2532 20.9467C20.4132 21.0401 20.5865 21.0934 20.7732 21.0934C21.1065 21.0934 21.4398 20.9201 21.6265 20.6001C21.9065 20.1334 21.7598 19.5201 21.2798 19.2267L16.5332 16.4001V10.2401C16.5332 9.68008 16.0798 9.24008 15.5332 9.24008C14.9865 9.24008 14.5332 9.68008 14.5332 10.2401V16.9734C14.5332 17.3201 14.7198 17.6401 15.0265 17.8267L20.2532 20.9467Z"
              fill="#955127"
            />
          </svg>
        );
      case "hand-point-up":
        return (
          <svg
            width="26"
            height="26"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6161_1420)">
              <path
                d="M27.3226 27.9412L23.3725 30.2226C22.0451 30.9894 20.6194 31.3729 19.1944 31.373C17.7689 31.3731 16.344 30.9896 15.0162 30.2226L6.03081 25.0361C5.63225 24.8059 5.34694 24.4327 5.22725 23.9855C5.1075 23.5382 5.16838 23.0725 5.39856 22.6741C5.92413 21.7629 6.74994 21.1049 7.72375 20.8214C8.71631 20.5324 9.76563 20.6637 10.6783 21.1913L13.22 22.6584L5.3715 9.06393C5.02438 8.46199 4.93294 7.7588 5.11375 7.08368C5.29481 6.4078 5.72631 5.84468 6.32863 5.49787C6.92925 5.15043 7.63275 5.05849 8.30856 5.23949C8.98406 5.42037 9.54763 5.85124 9.89556 6.45274L13.5254 12.7418C13.7264 12.1296 14.1384 11.6209 14.6978 11.2989C15.6443 10.7524 16.7954 10.8683 17.61 11.5019C17.7627 10.8103 18.1934 10.1825 18.853 9.80168C19.9105 9.19293 21.2209 9.4083 22.0341 10.2462C22.2187 9.6613 22.6084 9.17468 23.1406 8.86799C23.7021 8.54274 24.3596 8.45618 24.9912 8.62499C25.6238 8.79399 26.1516 9.19774 26.4772 9.7618L30.3825 16.5252C32.6861 20.5174 31.3133 25.6385 27.3226 27.9412V27.9412ZM5.00431 3.20549C7.51775 1.75487 10.7429 2.6188 12.1941 5.13168C12.4864 5.6373 12.6913 6.18374 12.8029 6.7558C12.902 7.26399 13.3941 7.59568 13.9026 7.49649C14.4108 7.39737 14.7424 6.90505 14.6433 6.3968C14.4918 5.62037 14.2139 4.87893 13.8176 4.19355C11.8498 0.785928 7.47563 -0.385822 4.06681 1.58162C0.65925 3.54949 -0.512562 7.92362 1.45413 11.331C1.85 12.0192 2.35325 12.6307 2.94981 13.1485C3.12725 13.3025 3.34606 13.378 3.56394 13.378C3.82613 13.378 4.087 13.2686 4.27238 13.055C4.61175 12.6639 4.56988 12.0718 4.17881 11.7324C3.74069 11.3522 3.37075 10.9026 3.07875 10.395C1.62813 7.88162 2.49206 4.65643 5.00431 3.20555V3.20549Z"
                fill="#955127"
              />
            </g>
            <defs>
              <clipPath id="clip0_6161_1420">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      case "leaf":
        return (
          <svg
            width="26"
            height="26"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.4453 5.89006C28.4144 5.78201 28.3475 5.68781 28.2556 5.6232C28.1637 5.55859 28.0524 5.52747 27.9403 5.53506C15.877 5.88819 7.5719 13.7642 6.38034 24.1952C6.37621 24.288 6.39765 24.3802 6.44232 24.4616C6.48698 24.5431 6.55316 24.6107 6.63363 24.6571C6.7141 24.7035 6.80577 24.7269 6.89864 24.7248C6.99151 24.7227 7.08202 24.6951 7.16027 24.645L18.3603 17.1201C15.8891 20.9109 12.6174 24.1144 8.77526 26.5051C7.0656 27.5495 5.24208 28.395 3.34026 29.0251C3.21626 29.0684 3.11427 29.1587 3.05629 29.2766C2.9983 29.3945 2.98898 29.5304 3.03032 29.6551C3.07167 29.7797 3.16037 29.8832 3.27728 29.943C3.3942 30.0029 3.52997 30.0144 3.65529 29.9751C5.54323 29.3471 7.35723 28.5155 9.06526 27.4951C13.7803 29.9901 18.8803 27.9651 19.1003 27.8751C33.0803 22.0951 28.4953 6.05006 28.4453 5.89006Z"
              fill="#955127"
            />
            <path
              d="M6.09527 20.5251C7.31913 16.165 9.87492 12.2964 13.4053 9.46009C12.8538 6.34559 10.6982 2.91109 7.77524 2.02509C7.69345 1.99856 7.60616 1.99383 7.52199 2.01136C7.43781 2.0289 7.35967 2.0681 7.29529 2.12509C3.84317 5.12696 -0.223769 13.4995 6.09527 20.5251Z"
              fill="#955127"
            />
          </svg>
        );
      default:
        return (
          <svg
            width="26"
            height="26"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6161_1573)">
              <path
                d="M4.89491 3.77612C4.89405 3.77612 4.89308 3.77612 4.89222 3.77612C4.58957 3.77612 4.3049 3.8941 4.08995 4.10851C3.87263 4.3253 3.75293 4.61394 3.75293 4.92123V22.0919C3.75293 22.7216 4.26719 23.2351 4.89944 23.2367C7.56482 23.2431 12.0304 23.7986 15.111 27.0224V9.0528C15.111 8.83936 15.0565 8.63885 14.9536 8.47292C12.4252 4.40104 7.56633 3.78237 4.89491 3.77612Z"
                fill="#955127"
              />
              <path
                d="M28.2467 22.092V4.92123C28.2467 4.61394 28.127 4.3253 27.9096 4.10851C27.6947 3.8941 27.4098 3.77612 27.1075 3.77612C27.1065 3.77612 27.1055 3.77612 27.1047 3.77612C24.4334 3.78248 19.5745 4.40115 17.046 8.47303C16.9431 8.63895 16.8887 8.83947 16.8887 9.05291V27.0224C19.9693 23.7986 24.4349 23.2431 27.1003 23.2367C27.7324 23.2351 28.2467 22.7216 28.2467 22.092Z"
                fill="#955127"
              />
              <path
                d="M30.8554 7.73608H30.0252V22.0921C30.0252 23.6997 28.7153 25.0106 27.1052 25.0146C24.8444 25.02 21.1166 25.4621 18.4766 27.9608C23.0426 26.8428 27.8559 27.5696 30.5991 28.1947C30.9416 28.2727 31.2956 28.1921 31.57 27.9734C31.8435 27.7552 32.0003 27.4291 32.0003 27.079V8.88098C32.0004 8.2497 31.4867 7.73608 30.8554 7.73608Z"
                fill="#955127"
              />
              <path
                d="M1.97517 22.0921V7.73608H1.14489C0.513726 7.73608 0 8.2497 0 8.88098V27.0787C0 27.4289 0.156876 27.7549 0.430331 27.9731C0.704541 28.1917 1.05816 28.2726 1.40122 28.1944C4.14439 27.5691 8.95788 26.8425 13.5237 27.9605C10.8837 25.4619 7.15596 25.0199 4.89515 25.0145C3.28513 25.0106 1.97517 23.6997 1.97517 22.0921Z"
                fill="#955127"
              />
            </g>
          </svg>
        );
    }
  };

  const defaultValues = [
    {
      title: "Ẩm thực là câu chuyện",
      desc: "Mỗi món ăn đều mang trong mình một câu chuyện về con người, về đất đai và niềm vui sum vầy.",
      icon: getIcon("book"),
    },
    {
      title: "Giữ trọn hương vị xưa",
      desc: "Chúng tôi tôn trọng và truyền tải hương vị truyền thống Hội An một cách trọn vẹn và tỉ mỉ nhất.",
      icon: getIcon("clock"),
    },
    {
      title: "Trải nghiệm chạm cảm xúc",
      desc: "Không chỉ mang lại món ăn ngon, chúng tôi hướng tới sự chân thành và hiếu khách chạm đến trái tim.",
      icon: getIcon("hand-point-up"),
    },
    {
      title: "Khởi nguồn tươi nguyên",
      desc: "Toàn bộ nguyên liệu đều được tuyển chọn kỹ lưỡng, đảm bảo độ tươi ngon, sạch sẽ và an toàn mỗi ngày.",
      icon: getIcon("leaf"),
    },
  ];

  const coreValues = valuesData?.gridItems
    ? [...valuesData.gridItems]
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((item) => ({
          title: item.title || "",
          desc: item.content || "",
          icon: getIcon(item.icon || ""),
        }))
    : defaultValues;

  const storyTitle = storyData?.title || "Câu chuyện Bếp nhà Thu";
  const storySubtitle =
    storyData?.subtitle ||
    "Không chỉ là một căn bếp, Bếp Nhà Thu là nơi lưu giữ những ký ức Hội An xưa – nơi mỗi món ăn được nấu bằng sự chân thành, kể lại câu chuyện về con người, văn hoá và những điều giản dị nhưng đầy sâu sắc.";

  const contentParts = storyData?.content ? storyData.content.split(/\n\n+/) : [];
  let meaningTitle = "Ý nghĩa Bếp Nhà Thu";
  let meaningParagraphs = [
    "Bếp Nhà Thu không chỉ là tên của một quán ăn, mà còn là lời hứa giữ gìn và phát huy những giá trị văn hóa ẩm thực đặc sắc của vùng đất Quảng Nam - Đà Nẵng. Chúng tôi mong muốn mang đến một không gian ấm cúng, gợi nhớ lại những kỷ niệm gia đình đầm ấm xung quanh bếp lửa quê.",
    "Giữa nhịp sống vội vã của hiện đại, Bếp Nhà Thu như một khoảng lặng bình yên, nơi thực khách có thể cảm nhận rõ nét từng nguyên liệu tươi ngon được chế biến theo công thức cổ truyền tỉ mỉ. Không chỉ đơn thuần là việc phục vụ bữa ăn, Bếp Nhà Thu còn truyền tải sự hiếu khách, chân chất của con người miền Trung đến từng thực khách ghé chân.",
    "Từ đĩa cơm gà thơm dẻo, sợi mì Cao Lầu vàng óng dai mềm cho đến những chiếc bánh lọc, nem lụi nướng thơm nức mũi, tất cả đều được chế biến bằng cả tấm lòng của đội ngũ đầu bếp giàu tâm huyết tại Bếp Nhà Thu.",
  ];

  if (contentParts.length > 0) {
    const firstLine = contentParts[0].trim();
    if (firstLine.length < 50 && !firstLine.includes(".")) {
      meaningTitle = firstLine;
      meaningParagraphs = contentParts.slice(1);
    } else {
      meaningParagraphs = contentParts;
    }
  }

  const storyImages = storyData?.gridItems
    ? [...storyData.gridItems].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    : [];

  const img1 = (storyImages[0]?.image ? getImageUrl(storyImages[0].image) : "") || "/imageAbout1.png";
  const img2 = (storyImages[1]?.image ? getImageUrl(storyImages[1].image) : "") || "/imageAbout2.png";
  const img3 = (storyImages[2]?.image ? getImageUrl(storyImages[2].image) : "") || "/imageAbout3.png";

  return (
    <section id="ve-chung-toi" className="py-10 bg-stone-50 text-stone-850">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-brand-brown mb-4">
            {storyTitle}
          </h2>
          <p className="text-stone-600 leading-relaxed">{storySubtitle}</p>
        </div>

        {/* Brand Meaning & Image Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 items-center mb-20">
          {/* Left Text */}
          <div className="space-y-6 py-11 px-4 border rounded-2xl border-stone-100 shadow-xs">
            <h3 className="text-xl font-bold font-serif text-stone-900 tracking-tight">
              {meaningTitle}
            </h3>
            {meaningParagraphs.map((para, idx) => (
              <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>

          {/* Right Collage */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            {/* Top row - large spanning image */}
            <div className="col-span-2 relative h-80 rounded-2xl overflow-hidden shadow-lg border border-stone-200/50 hover:scale-[1.01] transition-transform duration-300">
              <Image
                src={img1}
                alt={`${storyTitle} 1`}
                fill
                className="object-cover"
              />
            </div>
            {/* Bottom row - 2 small images */}
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-md border border-stone-200/50 hover:scale-[1.02] transition-transform duration-300">
              <Image
                src={img2}
                alt={`${storyTitle} 2`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-md border border-stone-200/50 hover:scale-[1.02] transition-transform duration-300">
              <Image
                src={img3}
                alt={`${storyTitle} 3`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="bg-white hover:border-[#955127] hover:shadow-[0px_0px_4px_0px_#00000014] hover:bg-[#FFF6F1] rounded-2xl p-6 border border-stone-100 shadow-xs hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="shadow-[0px_0px_4px_0px_#00000014] rounded-lg mb-5 border-gray-200 border-2 p-1 w-fit transition-colors">
                {value.icon}
              </div>
              <h4 className="text-lg font-bold font-serif text-stone-900 mb-3 tracking-tight group-hover:text-brand-brown transition-colors">
                {value.title}
              </h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
