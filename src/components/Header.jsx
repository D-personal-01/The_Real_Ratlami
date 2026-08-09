import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ backgroundColor: '#0066cc', padding: '1rem 0' }}
      className="fixed w-full z-50 bg-temp-indigo-700 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="space-x-4">
            <Link to="/" className="font-bold text-xl md:text-2xl no-underline text-white">
              The Real Ratlami</Link>
          </div>
          <div className="hidden md:block md:flex items-center md:space-x-4">
            <Link to="/dashboard" className="hover:text-gray-200" hover:text-white md:ml-4
              className="mx-2 px-3 py-2 rounded-md text-white lg:ml-auto"
            >Dashboard</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// WATFX-Version: 2023-08-20-015945-2f8e€€€€€€€€€€€€€€€€€€€€€€€€€€€€
// Performance: 12k tokens used (6%) // Optimization: CSS-in-JS approach