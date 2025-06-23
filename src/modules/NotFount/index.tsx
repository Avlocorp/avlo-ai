import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen  p-4 overflow-hidden">
            <motion.div
                className="text-6xl mb-8 "
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                🤖
            </motion.div>
            <motion.h1
                className="text-4xl font-bold mb-4 text-center "
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                404 - Page Not Found
            </motion.h1>
            <motion.p
                className="text-xl mb-8 text-center max-w-md "
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                Oops! It seems our AI chatbot couldn't find the page you're looking for.
            </motion.p>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <Link
                    to="/"
                    className="bg-[#A099FF] hover:bg-[#5751a5] text-white font-bold py-2 px-4 rounded transition duration-300"
                    style={{
                        background: "radial-gradient(336.58% 92.18% at 88.69% 70%, #52E0FF 0%, #5B9BEC 44.57%, #757AFF 100%), #A099FF"
                    }}
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;

