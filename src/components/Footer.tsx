
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Book, Layers, Download, Info } from 'lucide-react';

const Footer = () => {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue mb-4">
              CreatiBoost
            </div>
            <p className="text-gray-600 text-sm">
              Otimize seus criativos de infoprodutos e aumente conversões com análises de IA.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Produto</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <button 
                  onClick={() => setHowItWorksOpen(true)} 
                  className="hover:text-brand-purple"
                >
                  Como funciona
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setResourcesOpen(true)} 
                  className="hover:text-brand-purple"
                >
                  Recursos
                </button>
              </li>
              <li><a href="#precos" className="hover:text-brand-purple">Preços</a></li>
              <li><a href="#" className="hover:text-brand-purple">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Empresa</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-brand-purple">Sobre nós</a></li>
              <li><a href="#" className="hover:text-brand-purple">Blog</a></li>
              <li><a href="#" className="hover:text-brand-purple">Contato</a></li>
              <li><a href="#" className="hover:text-brand-purple">Parcerias</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-brand-purple">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-brand-purple">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-brand-purple">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} CreatiBoost. Todos os direitos reservados.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-brand-purple">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-brand-purple">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-brand-purple">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Como Funciona Dialog */}
      <Dialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Info className="text-brand-purple h-6 w-6" />
              Como Funciona o CreatiBoost
            </DialogTitle>
            <DialogDescription>
              Entenda o processo de análise e otimização de criativos
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3 p-4 border rounded-lg">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-2">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium">Faça upload do seu criativo</h3>
                <p className="text-gray-600 text-sm">
                  Envie suas imagens ou vídeos diretamente na plataforma. Suportamos 
                  formatos JPG, PNG, MP4 e MOV com até 50MB.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 p-4 border rounded-lg">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-2">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium">IA analisa seu criativo</h3>
                <p className="text-gray-600 text-sm">
                  Nossa IA avalia mais de 50 elementos do seu criativo, incluindo cores, 
                  contraste, chamadas para ação, texto e elementos visuais.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 p-4 border rounded-lg">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-2">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium">Receba recomendações</h3>
                <p className="text-gray-600 text-sm">
                  Visualize pontos fortes e fracos do seu criativo, com sugestões 
                  específicas para melhorar seu desempenho e taxa de conversão.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 p-4 border rounded-lg">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-2">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-medium">Optimize com IA</h3>
                <p className="text-gray-600 text-sm">
                  Com um clique, nossa IA aplica as melhorias recomendadas ao seu criativo, 
                  gerando uma nova versão otimizada pronta para uso.
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Benefícios</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  Aumento médio de 27% no CTR (Taxa de Cliques)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  Melhoria de 35% na taxa de conversão para infoprodutos
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  Economia de tempo com edição automática por IA
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  Histórico completo de análises para comparação de desempenho
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => {
                setHowItWorksOpen(false);
                const element = document.getElementById('analisar');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-brand-purple hover:bg-brand-purple/90"
            >
              Experimentar agora
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Recursos Dialog */}
      <Dialog open={resourcesOpen} onOpenChange={setResourcesOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Layers className="text-brand-purple h-6 w-6" />
              Recursos do CreatiBoost
            </DialogTitle>
            <DialogDescription>
              Conheça todas as ferramentas disponíveis para otimizar seus criativos
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-brand-purple/10 p-4">
                  <Book className="text-brand-purple h-10 w-10 mb-2" />
                  <h3 className="text-lg font-medium">Análise de Criativos</h3>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    Avaliação completa de imagens e vídeos com pontuação de 0-100 e recomendações.
                  </p>
                  <ul className="text-xs space-y-1 text-gray-500">
                    <li>• Análise de contraste e legibilidade</li>
                    <li>• Verificação de elementos de CTA</li>
                    <li>• Avaliação de proporção de texto/imagem</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-brand-orange/10 p-4">
                  <Layers className="text-brand-orange h-10 w-10 mb-2" />
                  <h3 className="text-lg font-medium">Otimização por IA</h3>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    Melhoria automática de criativos com base nas recomendações da análise.
                  </p>
                  <ul className="text-xs space-y-1 text-gray-500">
                    <li>• Ajuste automático de contrastes</li>
                    <li>• Reposicionamento de elementos</li>
                    <li>• Destaque de chamadas para ação</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-green-50 p-4">
                  <Download className="text-green-600 h-10 w-10 mb-2" />
                  <h3 className="text-lg font-medium">Relatórios Detalhados</h3>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    Relatórios completos em PDF com todas as análises e comparativos.
                  </p>
                  <ul className="text-xs space-y-1 text-gray-500">
                    <li>• Comparativo antes/depois</li>
                    <li>• Métricas detalhadas por elemento</li>
                    <li>• Sugestões de formatos para plataformas</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-blue-50 p-4">
                  <Layers className="text-blue-600 h-10 w-10 mb-2" />
                  <h3 className="text-lg font-medium">Histórico e Comparações</h3>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    Acesso a todo histórico de análises e otimizações realizadas.
                  </p>
                  <ul className="text-xs space-y-1 text-gray-500">
                    <li>• Biblioteca de criativos otimizados</li>
                    <li>• Comparativo de desempenho entre versões</li>
                    <li>• Organização por campanhas e projetos</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Formatos Suportados</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-1">Imagens:</h5>
                  <p className="text-xs text-gray-600">JPG, PNG, WEBP, GIF (até 50MB)</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-1">Vídeos:</h5>
                  <p className="text-xs text-gray-600">MP4, MOV, WEBM (até 500MB)</p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => {
                setResourcesOpen(false);
                const element = document.getElementById('precos');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              variant="outline"
              className="mr-2"
            >
              Ver planos
            </Button>
            <Button 
              onClick={() => {
                setResourcesOpen(false);
                const element = document.getElementById('analisar');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-brand-purple hover:bg-brand-purple/90"
            >
              Começar agora
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
