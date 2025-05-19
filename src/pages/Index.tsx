
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import FileUploader from '@/components/FileUploader';
import AnalysisResults from '@/components/AnalysisResults';
import HistorySection from '@/components/HistorySection';
import { Button } from '@/components/ui/button';
import { analyzeMockCreative, getMockHistoryItems, AnalysisResult } from '@/lib/mockAnalysis';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const historyItems = getMockHistoryItems();
  
  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setAnalysisResult(null);
  };
  
  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, faça o upload de uma imagem ou vídeo para análise.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const result = await analyzeMockCreative(file);
      setAnalysisResult(result);
      toast({
        title: "Análise concluída!",
        description: `Seu criativo recebeu uma pontuação de ${result.score}/100.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro na análise",
        description: "Ocorreu um erro ao analisar seu criativo. Por favor, tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleNewAnalysis = () => {
    setFile(null);
    setAnalysisResult(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <Hero />
      
      <section className="w-full py-16 px-4 bg-gray-50" id="analisar">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Analise seu criativo agora</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Faça upload do seu anúncio e receba recomendações inteligentes para melhorar sua performance e aumentar suas conversões.
            </p>
          </div>
          
          {analysisResult ? (
            <AnalysisResults result={analysisResult} onNewAnalysis={handleNewAnalysis} />
          ) : (
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <FileUploader onFileSelected={handleFileSelected} isProcessing={isProcessing} />
              
              {file && (
                <div className="mt-6 text-center">
                  <Button
                    size="lg"
                    className="bg-brand-orange hover:bg-brand-orange/90 px-8"
                    onClick={handleAnalyze}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Analisando..." : "Analisar Criativo"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      <HistorySection history={historyItems} />
      
      <section className="w-full py-16 px-4" id="precos">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Planos e Preços</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades e comece a otimizar seus anúncios hoje mesmo.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Gratuito</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-bold">R$ 0</span>
                  <span className="text-gray-500 pb-1">/mês</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Até 3 análises por mês</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Análise básica de elementos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Recomendações básicas</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <span className="text-gray-400 mt-0.5">✗</span>
                    <span className="text-gray-400">Sem histórico de análises</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <span className="text-gray-400 mt-0.5">✗</span>
                    <span className="text-gray-400">Sem otimização por IA</span>
                  </li>
                </ul>
                
                <Button variant="outline" className="w-full">
                  Começar Grátis
                </Button>
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className="border-2 border-brand-purple rounded-xl overflow-hidden relative hover:shadow-lg transition-shadow">
              <div className="absolute top-0 right-0 bg-brand-purple text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                MAIS POPULAR
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Premium</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-bold">R$ 29</span>
                  <span className="text-gray-500 pb-1">/mês</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Análises ilimitadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Análise avançada de elementos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Recomendações personalizadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Histórico completo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Melhorar criativos com IA</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-brand-purple hover:bg-brand-purple/90">
                  Assinar Agora
                </Button>
              </div>
            </div>
            
            {/* Business Plan */}
            <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Business</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-bold">R$ 79</span>
                  <span className="text-gray-500 pb-1">/mês</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Tudo do plano Premium</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Até 3 usuários</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">API para integração</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Relatórios avançados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">Suporte prioritário</span>
                  </li>
                </ul>
                
                <Button variant="outline" className="w-full">
                  Falar com Vendas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
