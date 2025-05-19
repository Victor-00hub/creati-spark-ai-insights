
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Hero = () => {
  // Handle the "Analyze my creative" button click
  const handleAnalyzeClick = () => {
    // Scroll to the analysis section
    const element = document.getElementById('analisar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast({
      title: "Área de análise",
      description: "Faça o upload da sua imagem ou vídeo para analisar.",
    });
  };
  
  // Handle the "See demo" button click
  const handleDemoClick = () => {
    // Scroll to the analysis section
    const element = document.getElementById('analisar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Show a toast with a demo message
    toast({
      title: "Demonstração",
      description: "Carregue qualquer imagem ou vídeo para ver a análise em ação.",
    });
  };
  
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-r from-brand-purple/90 to-brand-blue/90 text-white">
      <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Otimize seus anúncios com Inteligência Artificial
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Aumente seu CTR e conversões com análises automáticas e recomendações 
            baseadas em dados para seus criativos de infoprodutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button 
              size="lg" 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 shadow-lg hover:shadow-xl transition-all"
              onClick={handleAnalyzeClick}
            >
              Analisar meu criativo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/50 text-lg shadow hover:shadow-md transition-all"
              onClick={handleDemoClick}
            >
              Ver demonstração <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden"
                >
                  <img
                    src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=60&bg=white&crop=entropy&auto=format`}
                    alt={`User ${i}`}
                    className="w-full h-full object-cover"
                    style={{filter: `brightness(${0.7 + (i * 0.1)})`, transform: `scale(${0.8 + (i * 0.1)})`}}
                  />
                </div>
              ))}
            </div>
            <p className="text-sm opacity-90">
              +2.500 profissionais de marketing já utilizam
            </p>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-gray-100 p-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-xs text-gray-500">CreatiBoost - Análise de Criativos</div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 rounded-md p-4 h-32 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Creative sample"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                </div>
              </div>
              <div className="h-8 bg-brand-purple/20 rounded-full w-full mb-2 overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue w-[75%] rounded-full animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-end pr-3">
                  <span className="text-sm font-medium text-brand-purple">75%</span>
                </div>
              </div>
              <div className="text-end text-sm text-brand-purple font-medium">
                Score: 75/100
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-600">Alto contraste entre texto e fundo</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  </div>
                  <div className="text-sm text-gray-600">CTA pouco visível e sem destaque</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                  </div>
                  <div className="text-sm text-gray-600">Adicione elementos de escassez ou urgência</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-gradient-to-br from-brand-purple to-brand-blue rounded-lg opacity-30 blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
