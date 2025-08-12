import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg mt-[3%]">
        <h1 className="text-4xl font-bold text-center text-[#00ADB5] mb-6">About Vhawker</h1>

        <p className="text-lg text-center text-gray-600 mb-10">
          Empowering local hawkers, semi-wholesalers, and wholesalers through seamless digital connectivity.
        </p>

        <div className="space-y-6 text-justify">
          <p>
            <strong>Vhawker</strong> was born from a simple idea: to bridge the gap between traditional
            local sellers and the rapidly evolving digital economy. Founded in 2025 by a group of
            passionate developers and commerce enthusiasts, our mission is to provide a platform where
            hawkers, semi-wholesalers, and wholesalers can connect, grow, and thrive together.
          </p>

          <p>
            We realized that many small-scale sellers were left behind in the digital wave. With Vhawker,
            we aim to change that narrative. Our platform empowers hawkers to showcase their offerings
            online, allows semi-wholesalers to manage and update their catalogs effortlessly, and gives
            wholesalers the reach they deserve — all on a single integrated platform.
          </p>

          <p>
            Over time, Vhawker has evolved into more than just a marketplace. It is a growing community
            of sellers and buyers who trust each other. We've introduced features like live order tracking,
            GST-enabled billing, dynamic catalog management, and even stock alerts — all designed to make
            day-to-day operations smoother and smarter.
          </p>

          <p>
            Our journey has just begun, and the road ahead is full of innovation and possibilities.
            Together, with the support of our users and partners, we're transforming how local trade
            operates in India and beyond.
          </p>

          <p className="text-center text-xl font-semibold text-[#00ADB5] mt-10">
            Join the revolution. Support local. Grow together. 💼📈
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;