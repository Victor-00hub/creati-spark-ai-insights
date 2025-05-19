
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Menu, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    toast({
      title: "Login",
      description: "Sistema de login será implementado em breve.",
    });
  };

  const handleTryFree = () => {
    const element = document.getElementById('analisar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "Bem-vindo!",
      description: "Vamos começar a otimizar seus criativos.",
    });
  };

  return (
    <header className="w-full py-4 px-4 md:px-8 border-b shadow-sm sticky top-0 bg-white/95 backdrop-blur-sm z-50">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
            CreatiBoost
          </div>
        </div>
        
        <nav className={`${isMenuOpen 
          ? "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 text-lg" 
          : "hidden md:flex items-center gap-6"}`}
        >
          <a href="#como-funciona" className="text-gray-600 hover:text-brand-purple transition-colors" onClick={() => setIsMenuOpen(false)}>
            Como funciona
          </a>
          <a href="#recursos" className="text-gray-600 hover:text-brand-purple transition-colors" onClick={() => setIsMenuOpen(false)}>
            Recursos
          </a>
          <a href="#precos" className="text-gray-600 hover:text-brand-purple transition-colors" onClick={() => setIsMenuOpen(false)}>
            Preços
          </a>
          
          {isMenuOpen && (
            <>
              <Button variant="outline" className="mt-6" onClick={() => {
                handleLogin();
                setIsMenuOpen(false);
              }}>
                Login
              </Button>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => {
                handleTryFree();
                setIsMenuOpen(false);
              }}>
                Experimente Grátis
              </Button>
              <Button variant="ghost" className="absolute top-4 right-4" onClick={toggleMenu}>
                <X className="h-6 w-6" />
              </Button>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="hidden md:flex hover:bg-brand-purple/5">
                Login
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Portal de Login</AlertDialogTitle>
                <AlertDialogDescription>
                  O sistema de login estará disponível em breve. Entre em contato com suporte@creatiboost.com para obter acesso antecipado.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogin}>Entendi</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button 
            className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all"
            onClick={handleTryFree}
          >
            Experimente Grátis
          </Button>
          
          <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
