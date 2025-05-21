
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import FileUploader from '@/components/FileUploader';
import AnalysisResults from '@/components/AnalysisResults';
import HistorySection from '@/components/HistorySection';
import OptimizedCreativesSection from '@/components/OptimizedCreativesSection';
import { Button } from '@/components/ui/button';
import { analyzeMockCreative, getMockHistoryItems, AnalysisResult } from '@/lib/mockAnalysis';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const historyItems = getMockHistoryItems();
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | 'business'>('free');
  
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

  const openPricingDialog = (plan: 'free' | 'premium' | 'business') => {
    setSelectedPlan(plan);
    setIsPricingDialogOpen(true);
  };

  // Form schema for the pricing form
  const pricingFormSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    company: z.string().optional(),
  });

  const pricingForm = useForm<z.infer<typeof pricingFormSchema>>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
    },
  });

  const onPricingSubmit = (data: z.infer<typeof pricingFormSchema>) => {
    console.log("Form data:", data, "Selected plan:", selectedPlan);

    let toastMessage = "";
    
    if (selectedPlan === "free") {
      toastMessage = "Você se inscreveu no plano gratuito! Você pode utilizar até 3 análises por mês.";
    } else if (selectedPlan === "premium") {
      toastMessage = "Você se inscreveu no plano Premium! Você terá acesso à todas as ferramentas premium.";
    } else {
      toastMessage = "Obrigado pelo seu interesse! Nossa equipe de vendas entrará em contato em breve.";
    }

    toast({
      title: "Inscrição realizada com sucesso!",
      description: toastMessage,
    });

    setIsPricingDialogOpen(false);
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
      
      <OptimizedCreativesSection />
      
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
                
                <Button variant="outline" className="w-full" onClick={() => openPricingDialog('free')}>
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
                
                <Button className="w-full bg-brand-purple hover:bg-brand-purple/90" onClick={() => openPricingDialog('premium')}>
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
                
                <Button variant="outline" className="w-full" onClick={() => openPricingDialog('business')}>
                  Falar com Vendas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Dialog */}
      <Dialog open={isPricingDialogOpen} onOpenChange={setIsPricingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedPlan === 'free' 
                ? 'Começar com o plano gratuito' 
                : selectedPlan === 'premium'
                ? 'Assinar o plano Premium'
                : 'Falar com nossa equipe de vendas'}
            </DialogTitle>
            <DialogDescription>
              {selectedPlan === 'free' 
                ? 'Preencha seus dados para começar a usar o AdOptimizer gratuitamente.' 
                : selectedPlan === 'premium'
                ? 'Preencha seus dados para assinar o plano Premium e ter acesso a todas as funcionalidades.'
                : 'Nossa equipe de vendas entrará em contato para discutir sua necessidade.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...pricingForm}>
            <form onSubmit={pricingForm.handleSubmit(onPricingSubmit)} className="space-y-4 py-4">
              <FormField
                control={pricingForm.control}
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
                control={pricingForm.control}
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
                control={pricingForm.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button type="submit" className={selectedPlan === 'premium' ? "bg-brand-purple hover:bg-brand-purple/90" : ""}>
                  {selectedPlan === 'free' 
                    ? 'Ativar plano gratuito' 
                    : selectedPlan === 'premium'
                    ? 'Assinar plano Premium'
                    : 'Solicitar contato'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Index;
