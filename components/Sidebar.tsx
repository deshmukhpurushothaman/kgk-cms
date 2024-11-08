import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div
        onClick={handleToggle}
        className={clsx('block cursor-pointer border px-3 py-2 lg:hidden')}
      >
        {isOpen ? 'Close' : 'Menu'}
      </div>
      <div
        className={clsx(
          'bg-white h-screen border-r-2 absolute w-screen p-3 shadow-lg transition-all duration-300 ease-in-out lg:relative lg:block lg:max-w-[15vw] lg:translate-x-0 border-gray-200',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav
          onClick={handleToggle}
          className={clsx('flex h-full flex-col px-3 py-6 text-white')}
        >
          <Link
            href={'/'}
            className="ease my-2 rounded border border-gray-200 p-2 text-center font-semibold text-gray-800 hover:text-sky-600 hover:shadow-sm"
          >
            Home
          </Link>
          <Link
            href={'/posts'}
            className="ease my-2 rounded border border-gray-200 p-2 text-center font-semibold text-gray-800 hover:text-sky-600 hover:shadow-sm"
          >
            Posts
          </Link>

          <Link
            href={'/plugins'}
            className="ease my-2 rounded border border-gray-200 p-2 text-center font-semibold text-gray-800 hover:text-sky-600 hover:shadow-sm"
          >
            Plugins
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
