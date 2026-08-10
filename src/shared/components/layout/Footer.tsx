"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3333 0C5.96933 0 0 5.96933 0 13.3333C0 20.0173 4.924 25.5373 11.34 26.5013V16.8667H8.04133V13.3613H11.34V11.0293C11.34 7.168 13.2213 5.47333 16.4307 5.47333C17.968 5.47333 18.78 5.58667 19.1653 5.63867V8.69733H16.976C15.6133 8.69733 15.1373 9.98933 15.1373 11.4453V13.3613H19.1307L18.5893 16.8667H15.1387V26.5293C21.6467 25.648 26.6667 20.0827 26.6667 13.3333C26.6667 5.96933 20.6973 0 13.3333 0Z"
            fill="#955127"
          />
        </svg>
      ),
      href: "https://www.facebook.com/quangthong211101",
    },
    {
      name: "Instagram",
      icon: (
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.0021 0C0.943533 0 0 0.944189 0 13.0021V13.2379C0 25.2958 0.943534 26.24 13.0021 26.24H13.2379C25.2965 26.24 26.24 25.2958 26.24 13.2379V13.12C26.24 0.952512 25.2875 0 13.12 0H13.0021ZM20.9882 3.936C21.713 3.93403 22.302 4.51928 22.304 5.24416C22.306 5.96904 21.7207 6.55803 20.9958 6.56C20.271 6.56197 19.682 5.97672 19.68 5.25184C19.678 4.52696 20.2633 3.93797 20.9882 3.936ZM13.1046 6.56C16.7271 6.55147 19.6715 9.48219 19.68 13.1046C19.6885 16.7271 16.7578 19.6715 13.1354 19.68C9.51294 19.6885 6.56853 16.7578 6.56 13.1354C6.55147 9.51294 9.48219 6.56853 13.1046 6.56ZM13.111 9.184C10.937 9.18925 9.17875 10.9563 9.184 13.1302C9.18925 15.3036 10.9556 17.0612 13.129 17.056C15.303 17.0508 17.0612 15.2844 17.056 13.111C17.0508 10.937 15.2844 9.17875 13.111 9.184Z"
            fill="#955127"
          />
        </svg>
      ),
      href: "https://instagram.com",
    },
    {
      name: "Google",
      icon: (
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.12 0C20.3545 0 26.24 5.88551 26.24 13.12C26.24 20.3545 20.3545 26.24 13.12 26.24C5.88551 26.24 0 20.3545 0 13.12C0 5.88551 5.88551 0 13.12 0ZM9.84 18.7354C12.9638 18.7354 15.5055 16.2163 15.5055 13.12C15.5055 12.4616 14.9711 11.9273 14.3127 11.9273H10.2312C9.57283 11.9273 9.03849 12.4616 9.03849 13.12C9.03849 13.7784 9.57283 14.3127 10.2312 14.3127H12.888C12.405 15.5049 11.2206 16.3499 9.84 16.3499C8.03183 16.3499 6.56 14.9013 6.56 13.12C6.56 11.3387 8.03183 9.89009 9.84 9.89009C10.5401 9.89009 11.2075 10.1042 11.771 10.5097C12.3066 10.8956 13.0514 10.7721 13.4355 10.2378C13.8207 9.70343 13.6985 8.95798 13.1641 8.57273C12.1921 7.87379 11.0429 7.50404 9.84 7.50404C6.71625 7.50404 4.17455 10.0231 4.17455 13.1194C4.17455 16.2157 6.71625 18.7354 9.84 18.7354ZM21.1709 14.3127C21.8293 14.3127 22.3636 13.7784 22.3636 13.12C22.3636 12.4616 21.8293 11.9273 21.1709 11.9273H20.605V11.0625C20.605 10.4042 20.0706 9.86982 19.4122 9.86982C18.7538 9.86982 18.2195 10.4042 18.2195 11.0625V11.9273H17.5927C16.9343 11.9273 16.4 12.4616 16.4 13.12C16.4 13.7784 16.9343 14.3127 17.5927 14.3127H18.2195V15.1775C18.2195 15.8358 18.7538 16.3702 19.4122 16.3702C20.0706 16.3702 20.605 15.8358 20.605 15.1775V14.3127H21.1709Z"
            fill="#955127"
          />
        </svg>
      ),
      href: "https://google.com",
    },
    // {
    //   name: "Yelp",
    //   icon: (
    //     <svg
    //       width="27"
    //       height="27"
    //       viewBox="0 0 27 27"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M4.37333 0C1.958 0 0 1.958 0 4.37333V21.8667C0 24.282 1.958 26.24 4.37333 26.24H21.8667C24.282 26.24 26.24 24.282 26.24 21.8667V4.37333C26.24 1.958 24.282 0 21.8667 0H4.37333ZM5.67655 5.62286H10.6356L14.1572 10.6271L18.4305 5.62286H19.9924L14.8625 11.6289L21.1882 20.6171H16.2304L12.1438 14.8112L7.18476 20.6171H5.62286L11.4385 13.8094L5.67655 5.62286ZM8.06821 6.87238L16.882 19.3676H18.7965L9.98277 6.87238H8.06821Z"
    //         fill="#955127"
    //       />
    //     </svg>
    //   ),
    //   href: "https://yelp.com",
    // },
    {
      name: "LinkedIn",
      icon: (
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.1162 0H3.12381C1.39947 0 0 1.39947 0 3.12381V23.1162C0 24.8405 1.39947 26.24 3.12381 26.24H23.1162C24.8405 26.24 26.24 24.8405 26.24 23.1162V3.12381C26.24 1.39947 24.8405 0 23.1162 0ZM8.1219 9.99619V21.8667H4.37333V9.99619H8.1219ZM4.37333 6.54126C4.37333 5.66659 5.12305 4.9981 6.24762 4.9981C7.37219 4.9981 8.07817 5.66659 8.1219 6.54126C8.1219 7.41592 7.42217 8.1219 6.24762 8.1219C5.12305 8.1219 4.37333 7.41592 4.37333 6.54126ZM21.8667 21.8667H18.1181C18.1181 21.8667 18.1181 16.0814 18.1181 15.619C18.1181 14.3695 17.4933 13.12 15.9314 13.095H15.8814C14.3695 13.095 13.7448 14.382 13.7448 15.619C13.7448 16.1876 13.7448 21.8667 13.7448 21.8667H9.99619V9.99619H13.7448V11.5956C13.7448 11.5956 14.9506 9.99619 17.3746 9.99619C19.8549 9.99619 21.8667 11.7018 21.8667 15.1567V21.8667Z"
            fill="#955127"
          />
        </svg>
      ),
      href: "https://www.linkedin.com/in/quang-thong-tran-4885b3238/",
    },
  ];

  return (
    <footer className="bg-white py-5 border-t border-stone-200">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-stone-100">
          {/* Column 1: Info & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="A Hiền Coffee Logo"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#71717A] leading-relaxed max-w-md">
              <strong className="text-brand-brown">A Hiền Coffee</strong> là nơi hương cà phê phin lan tỏa trong ánh nắng dịu và những câu chuyện đời thường. Chỉ cần bước vào, bạn sẽ cảm nhận được sự bình yên rất riêng giữa nhịp sống thành phố.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full text-white transition-colors duration-250 shadow-sm text-xs font-bold"
                  title={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-6 md:pl-12">
            <h3 className="text-lg font-serif font-bold text-brand-brown tracking-wide">
              Danh mục
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link
                  href="#thuc-don"
                  className="text-[#71717A] transition-colors"
                >
                  Cà phê
                </Link>
              </li>
              <li>
                <Link
                  href="#thuc-don"
                  className="text-[#71717A] transition-colors"
                >
                  Nước giải khát
                </Link>
              </li>
              <li>
                <Link
                  href="#thuc-don"
                  className="text-[#71717A] transition-colors"
                >
                  Siro
                </Link>
              </li>
              <li>
                <Link
                  href="#thuc-don"
                  className="text-[#71717A] transition-colors"
                >
                  Trà
                </Link>
              </li>
              <li>
                <Link
                  href="#thuc-don"
                  className="text-[#71717A] transition-colors"
                >
                  Sinh tố
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-bold text-brand-brown tracking-wide">
              Liên hệ
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-2">
                <span className="text-[#71717A]">Hotline/Zalo:</span>
                <span className="text-[#71717A]">0367262415</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#71717A]">Email:</span>
                <Link
                  href="mailto:quangthong211101@gmail.com"
                  className="text-[#71717A] transition-colors break-all"
                >
                  quangthong211101@gmail.com
                </Link>
              </li>
              <li className="flex gap-2">
                <span className="text-[#71717A]">Facebook:</span>
                <span className="text-[#71717A]">Trần Quang Thông</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-[#71717A] shrink-0">Địa chỉ:</span>
                <span className="text-[#71717A]">
                  K514/5 Hoàng Diệu, Hòa Cường, TP Đà Nẵng
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright info */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-5 text-xs text-stone-400 gap-4">
          <p>© {currentYear} A Hiền Coffee. Tất cả các quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <span className="hover:text-brand-brown transition-colors cursor-pointer">
              Chính sách bảo mật
            </span>
            <span className="hover:text-brand-brown transition-colors cursor-pointer">
              Điều khoản dịch vụ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
