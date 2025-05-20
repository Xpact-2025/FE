'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function HeaderToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="lg:hidden text-gray-50"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle Menu"
    >
      {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  );
}
