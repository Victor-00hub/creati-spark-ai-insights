
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full py-4 px-4 md:px-8 border-b">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
            CreatiBoost
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#como-funciona" className="text-gray-600 hover:text-brand-purple transition-colors">
            Como funciona
          </a>
          <a href="#recursos" className="text-gray-600 hover:text-brand-purple transition-colors">
            Recursos
          </a>
          <a href="#precos" className="text-gray-600 hover:text-brand-purple transition-colors">
            Preços
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:flex">
            Login
          </Button>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            Experimente Grátis
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
