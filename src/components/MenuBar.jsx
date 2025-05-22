import React from 'react';
import { NavLink } from 'react-router-dom';

const randomColors = [
  '#FF5733', '#FF33A8', '#335BFF', '#FF8C33', '#8C33FF', '#33FFF6', '#FF3333', '#FF9933'
]; // no green

const getRandomColor = () => {
  return randomColors[Math.floor(Math.random() * randomColors.length)];
};

const MenuBar = () => {
  const links = [
    { to: '/sparepart', label: 'SparePart' },
    { to: '/stockin', label: 'StockIn' },
    { to: '/stockout', label: 'StockOut' },
    { to: '/reports', label: 'Reports' },
    { to: '/logout', label: 'Logout' },
  ];

  return (
    <nav className="bg-black text-white flex space-x-4 p-4">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `px-3 py-2 rounded font-semibold ${isActive ? 'underline' : ''}`
          }
          style={{ color: getRandomColor() }}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default MenuBar;
