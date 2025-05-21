
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Brain, Check, ChevronDown, Lightbulb, Sparkles, TrendingUp, BarChart, LogIn } from 'lucide-react';
import ModalInfo from '@/components/ui/modal-info';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

const Header = () => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    // Here you would typically connect to an authentication service
    console.log("Login data:", data);
    
    // Simulate login process
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo de volta ao AdOptimizer.",
    });
    
    setIsLoginOpen(false);
  };

  const onRegisterSubmit = (data: z.infer<typeof registerSchema>) => {
    // Here you would typically register a new user
    console.log("Register data:", data);
    
    // Simulate registration process
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Bem-vindo ao AdOptimizer. Seu período gratuito começou!",
    });
    
    setIsRegisterOpen(false);
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="container max-w-6xl mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-purple rounded-md p-1.5">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <span className="font-semibold text-xl">AdOptimizer</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" asChild>
            <Link to="/#analisar">Analisar Criativo</Link>
          </Button>
          
          <Button 
            variant="ghost"
            onClick={() => setIsHowItWorksOpen(true)}
          >
            Como Funciona
          </Button>
          
          <Button 
            variant="ghost"
            onClick={() => setIsResourcesOpen(true)}
          >
            Recursos
          </Button>
          
          <Button variant="ghost" asChild>
            <Link to="/#precos">Preços</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-4">
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Entrar na sua conta</DialogTitle>
                <DialogDescription>
                  Digite suas credenciais para acessar sua conta AdOptimizer.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between items-center mt-6">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setIsLoginOpen(false);
                        setIsRegisterOpen(true);
                      }}
                    >
                      Não tem conta? Cadastre-se
                    </Button>
                    <Button type="submit">Entrar</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-purple hover:bg-brand-purple/90">
                Começar Grátis
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crie sua conta grátis</DialogTitle>
                <DialogDescription>
                  Cadastre-se para acessar o AdOptimizer e começar a otimizar seus anúncios.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between items-center mt-6">
                    <Button 
                      type="button" 
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsRegisterOpen(false);
                        setIsLoginOpen(true);
                      }}
                    >
                      Já tem conta? Entre
                    </Button>
                    <Button type="submit" className="bg-brand-purple hover:bg-brand-purple/90">Criar conta</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Modal Como Funciona */}
      <ModalInfo 
        isOpen={isHowItWorksOpen} 
        onClose={() => setIsHowItWorksOpen(false)}
        title="Como o AdOptimizer Funciona"
      >
        <div className="space-y-6 py-4">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
            <div className="bg-brand-purple/20 rounded-full p-2">
              <Brain className="h-6 w-6 text-brand-purple" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Análise por Inteligência Artificial</h3>
              <p className="text-gray-600">
                Nossa IA avançada analisa todos os elementos do seu criativo, incluindo cores, contraste, 
                textos, posicionamento, call-to-action e muito mais, gerando uma pontuação baseada nas 
                melhores práticas do mercado.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
            <div className="bg-orange-100 rounded-full p-2">
              <Lightbulb className="h-6 w-6 text-brand-orange" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Recomendações Personalizadas</h3>
              <p className="text-gray-600">
                Receba sugestões específicas para melhorar cada aspecto do seu anúncio, 
                com base em dados de desempenho real e tendências atuais de marketing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
            <div className="bg-blue-100 rounded-full p-2">
              <Sparkles className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Otimização Automática</h3>
              <p className="text-gray-600">
                Com um clique, nossa IA otimiza seu criativo aplicando todas as melhorias 
                recomendadas de uma só vez, economizando horas de trabalho manual.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
            <div className="bg-green-100 rounded-full p-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Acompanhamento de Resultados</h3>
              <p className="text-gray-600">
                Compare o desempenho dos criativos originais e otimizados, visualizando métricas 
                de conversão, engajamento e ROI em um painel intuitivo.
              </p>
            </div>
          </div>
        </div>
      </ModalInfo>

      {/* Modal Recursos */}
      <ModalInfo 
        isOpen={isResourcesOpen} 
        onClose={() => setIsResourcesOpen(false)}
        title="Recursos do AdOptimizer"
      >
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-brand-purple" />
                </div>
                <h4 className="font-medium">Análise de Imagens</h4>
              </div>
              <p className="text-sm text-gray-600">
                Analise fotos, banners e gráficos para maximizar o impacto visual e a clareza da mensagem.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-brand-purple" />
                </div>
                <h4 className="font-medium">Análise de Vídeos</h4>
              </div>
              <p className="text-sm text-gray-600">
                Otimize vídeos para redes sociais e plataformas de anúncios com recomendações frame a frame.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-brand-purple" />
                </div>
                <h4 className="font-medium">Teste A/B Automático</h4>
              </div>
              <p className="text-sm text-gray-600">
                Gere automaticamente variações do seu criativo para testes A/B e maximize a conversão.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-brand-purple" />
                </div>
                <h4 className="font-medium">Análise de Textos</h4>
              </div>
              <p className="text-sm text-gray-600">
                Otimize os textos do seu anúncio para maior clareza, impacto emocional e conversão.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-brand-purple" />
                </div>
                <h4 className="font-medium">Relatórios Detalhados</h4>
              </div>
              <p className="text-sm text-gray-600">
                Receba relatórios completos com métricas e insights acionáveis para melhorar continuamente.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-brand-purple" />
                </div>
                <h4 className="font-medium">Integração com Plataformas</h4>
              </div>
              <p className="text-sm text-gray-600">
                Conecte-se com Facebook Ads, Google Ads, TikTok Ads e outras plataformas populares de anúncios.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-brand-purple" />
                </div>
                <h4 className="font-medium">Dashboard de Performance</h4>
              </div>
              <p className="text-sm text-gray-600">
                Visualize o desempenho de todos os seus criativos em um painel centralizado e intuitivo.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-brand-purple" />
                </div>
                <h4 className="font-medium">Otimização para Múltiplos Formatos</h4>
              </div>
              <p className="text-sm text-gray-600">
                Adapte seus criativos para diferentes formatos e plataformas com um único clique.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-brand-purple/10 rounded-lg border border-brand-purple/20">
            <div className="flex items-center gap-3 mb-2">
              <BarChart className="h-5 w-5 text-brand-purple" />
              <h3 className="font-medium">Métricas que Analisamos</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                <span>Contraste visual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                <span>Clareza da mensagem</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                <span>Call-to-action</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                <span>Elementos visuais</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                <span>Composição</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                <span>Impacto emocional</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                <span>Hierarquia visual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                <span>Legibilidade</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                <span>Conformidade com plataformas</span>
              </div>
            </div>
          </div>
        </div>
      </ModalInfo>
    </header>
  );
};

export default Header;
