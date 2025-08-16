import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Footer from './footer';

const FadeInSection = ({ children }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const registerRef = useRef(null);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-gray-800">
      <div className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-24 px-6 text-center shadow-md rounded-b-3xl">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-yellow-300">Vhawker</span>
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl font-medium max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Bridging the gap between Hawkers, Semi-Wholesalers & Wholesalers
        </motion.p>
        <motion.button
          onClick={scrollToRegister}
          className="mt-10 px-6 py-3 cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          Register Now
        </motion.button>
      </div>

      <FadeInSection>
        <section className="py-16 px-6 text-center border-b border-gray-200">
          <h2 className="text-3xl font-bold mb-4">How Can You Use Vhawker?</h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-base sm:text-lg">
            Vhawker helps you <span className="font-semibold text-gray-800">buy and sell products</span> based on your role:
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            {[
              {
                title: 'Hawker',
                color: 'text-yellow-500',
                text: 'Buy products from Semi-Wholesalers or Wholesalers and sell to customers in your area.',
              },
              {
                title: 'Semi-Wholesaler',
                color: 'text-green-600',
                text: 'Purchase in bulk from Wholesalers and sell to Hawkers or directly to customers.',
              },
              {
                title: 'Wholesaler',
                color: 'text-indigo-600',
                text: 'Sell your stock to Semi-Wholesalers and Hawkers across the platform.',
              },
            ].map((role, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
                <h3 className={`text-xl font-semibold ${role.color}`}>{role.title}</h3>
                <p className="mt-2 text-gray-700 text-sm">{role.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-gray-600 text-sm">Scroll down to choose your role and get started!</p>
        </section>
      </FadeInSection>
      <FadeInSection>
        <section ref={registerRef} className="py-16 bg-gray-100 px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Choose Your Role</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Hawker',
                desc: 'Access Semi-Wholesaler or Wholesaler products. Place orders quickly and easily.',
                link: '/hawker',
                color: 'bg-yellow-400 hover:bg-yellow-500',
              },
              {
                title: 'Semi-Wholesaler',
                desc: 'Buy from Wholesalers and manage your own stock to sell to Hawkers.',
                link: '/semiwholesaler',
                color: 'bg-green-400 hover:bg-green-500',
              },
              {
                title: 'Wholesaler',
                desc: 'Upload and manage your catalog. Supply bulk products to Semi-Wholesalers and Hawkers.',
                link: '/wholesaler',
                color: 'bg-indigo-400 hover:bg-indigo-500',
              },
            ].map((role, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
                <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{role.desc}</p>
                <Link
                  to={role.link}
                  className={`block text-center py-2 px-4 rounded text-white font-semibold ${role.color}`}
                >
                  Explore
                </Link>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>
      <Footer/>
    </div>
  );
};

export default Home;