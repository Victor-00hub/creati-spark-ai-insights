
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Brain, Check, ChevronDown, Lightbulb, Sparkles, TrendingUp, BarChart } from 'lucide-react';
import ModalInfo from '@/components/ui/modal-info';

const Header = () => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

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
          <Button variant="outline">Entrar</Button>
          <Button className="bg-brand-purple hover:bg-brand-purple/90">
            Começar Grátis
          </Button>
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
