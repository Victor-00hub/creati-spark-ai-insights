
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Menu, X, User, LogIn } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Validation check
    if (!email || !password) {
      toast({
        title: "Erro no login",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    // Mock login - in a real app this would connect to your backend
    toast({
      title: "Login bem-sucedido!",
      description: "Bem-vindo de volta à plataforma CreatiBoost.",
    });
    
    setIsLoginOpen(false);
    setEmail('');
    setPassword('');
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
                setIsLoginOpen(true);
                setIsMenuOpen(false);
              }}>
                <LogIn className="mr-2 h-4 w-4" />
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
          <Button 
            variant="outline" 
            className="hidden md:flex hover:bg-brand-purple/5"
            onClick={() => setIsLoginOpen(true)}
          >
            <User className="mr-2 h-4 w-4" />
            Login
          </Button>
          
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
      
      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Login</DialogTitle>
            <DialogDescription>
              Acesse sua conta para visualizar análises salvas e recursos premium.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Button type="button" variant="link" className="p-0 h-auto text-xs">
                  Esqueceu a senha?
                </Button>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsLoginOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Entrar</Button>
            </DialogFooter>
          </form>
          
          <div className="border-t pt-4 text-center">
            <p className="text-sm text-gray-500">Ainda não tem uma conta?</p>
            <Button 
              variant="link" 
              onClick={() => {
                setIsLoginOpen(false);
                handleTryFree();
              }}
              className="mt-1"
            >
              Criar conta grátis
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
