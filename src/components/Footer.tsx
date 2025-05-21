
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import ModalInfo from '@/components/ui/modal-info';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "E-mail obrigatório",
        description: "Por favor, informe seu e-mail para se inscrever.",
        variant: "destructive"
      });
      return;
    }
    
    // Reset form and show success message
    setEmail('');
    toast({
      title: "Inscrição realizada!",
      description: "Você foi inscrito para receber nossas novidades.",
    });
  };

  return (
    <footer className="w-full bg-gray-900 text-white py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-purple rounded-md p-1.5">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="font-semibold text-xl">AdOptimizer</span>
            </div>
            
            <p className="text-gray-400 mb-6">
              Potencialize seus anúncios com a inteligência artificial.
              Análise e otimização automática para maximizar conversões e ROI.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Seu e-mail para novidades"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="bg-brand-purple hover:bg-brand-purple/90">
                Inscrever
              </Button>
            </form>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/#analisar" className="text-gray-400 hover:text-white transition-colors">
                  Analisar Criativo
                </Link>
              </li>
              <li>
                <Link to="/#precos" className="text-gray-400 hover:text-white transition-colors">
                  Preços
                </Link>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-400 hover:text-white p-0 h-auto" 
                  onClick={() => setIsContactOpen(true)}
                >
                  Contato
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-400 hover:text-white p-0 h-auto"
                  onClick={() => setIsPrivacyOpen(true)}
                >
                  Política de Privacidade
                </Button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Siga-nos</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row md:justify-between items-center gap-4">
          <p className="text-sm text-gray-500">&copy; 2024 AdOptimizer. Todos os direitos reservados.</p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="link" className="text-sm text-gray-500 hover:text-white">
              Termos de Serviço
            </Button>
            <Button 
              variant="link" 
              className="text-sm text-gray-500 hover:text-white"
              onClick={() => setIsPrivacyOpen(true)}
            >
              Política de Privacidade
            </Button>
            <Button 
              variant="link" 
              className="text-sm text-gray-500 hover:text-white"
              onClick={() => setIsContactOpen(true)}
            >
              Contato
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de Contato */}
      <ModalInfo
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Entre em Contato"
      >
        <div className="py-4 space-y-6">
          <p className="text-gray-600">
            Estamos à disposição para ajudar você a otimizar seus anúncios e impulsionar seus resultados.
            Entre em contato pelos canais abaixo:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand-purple/10 p-2 rounded-full">
                <Mail className="h-5 w-5 text-brand-purple" />
              </div>
              <div>
                <h4 className="font-medium">E-mail</h4>
                <p className="text-gray-600">contato@adoptimizer.com.br</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-brand-purple/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-purple">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Telefone</h4>
                <p className="text-gray-600">(11) 5555-5555</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-brand-purple/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-purple">
                  <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Endereço</h4>
                <p className="text-gray-600">Av. Paulista, 1000, São Paulo - SP</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-3">Horário de atendimento</h4>
            <p className="text-gray-600">
              Segunda a sexta: 9h às 18h<br />
              Sábado: 9h às 13h
            </p>
          </div>
        </div>
      </ModalInfo>
      
      {/* Modal de Política de Privacidade */}
      <ModalInfo
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Política de Privacidade"
      >
        <div className="py-4 space-y-4 max-h-[500px] overflow-y-auto text-sm">
          <p>
            A sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos, 
            usamos, processamos e protegemos suas informações quando você utiliza nossos serviços.
          </p>
          
          <h3 className="font-medium text-base">1. Informações que coletamos</h3>
          <p>
            Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail, 
            informações de conta e qualquer outra informação que você opte por fornecer.
          </p>
          <p>
            Também coletamos informações automaticamente quando você usa nossos serviços, incluindo:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Informações sobre o dispositivo e navegador que você usa</li>
            <li>Endereço IP e informações de localização aproximada</li>
            <li>Informações sobre como você usa nossos serviços</li>
            <li>Outras informações coletadas por cookies e tecnologias similares</li>
          </ul>
          
          <h3 className="font-medium text-base">2. Como usamos suas informações</h3>
          <p>
            Usamos suas informações para:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Processar e concluir transações</li>
            <li>Enviar informações técnicas, atualizações e mensagens administrativas</li>
            <li>Responder aos seus comentários e perguntas</li>
            <li>Comunicar-se com você sobre produtos, serviços, ofertas e eventos</li>
            <li>Monitorar e analisar tendências, uso e atividades</li>
            <li>Prevenir atividades fraudulentas, uso indevido e outras atividades proibidas</li>
          </ul>
          
          <h3 className="font-medium text-base">3. Compartilhamento de informações</h3>
          <p>
            Podemos compartilhar suas informações com:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fornecedores de serviços que prestam serviços em nosso nome</li>
            <li>Parceiros de negócios com os quais oferecemos produtos ou serviços em conjunto</li>
            <li>Quando exigido por lei ou para proteger direitos e segurança</li>
          </ul>
          
          <h3 className="font-medium text-base">4. Seus direitos e escolhas</h3>
          <p>
            Você tem direitos relacionados às suas informações pessoais, incluindo:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Acessar e corrigir suas informações pessoais</li>
            <li>Excluir suas informações pessoais</li>
            <li>Restringir ou opor-se ao processamento de suas informações</li>
            <li>Receber suas informações em formato portátil</li>
            <li>Optar por não receber e-mails promocionais</li>
          </ul>
          
          <h3 className="font-medium text-base">5. Segurança</h3>
          <p>
            Implementamos medidas de segurança para proteger suas informações contra acesso,
            alteração, divulgação ou destruição não autorizada.
          </p>
          
          <h3 className="font-medium text-base">6. Alterações nesta política</h3>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você 
            sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.
          </p>
          
          <h3 className="font-medium text-base">7. Contato</h3>
          <p>
            Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:
            contato@adoptimizer.com.br
          </p>
          
          <p className="pt-4 text-xs text-gray-500">
            Última atualização: 21 de Maio de 2024
          </p>
        </div>
      </ModalInfo>
    </footer>
  );
};

export default Footer;
