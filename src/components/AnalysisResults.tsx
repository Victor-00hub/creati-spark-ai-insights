
import React, { useState } from 'react';
import { AnalysisResult, improveCreativeWithAI, downloadReportAsPDF, getOptimizedCreative, downloadOptimizedCreative } from '@/lib/mockAnalysis';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, X, AlertCircle, Download, Wand2, RefreshCw, Upload, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogFooter 
} from '@/components/ui/dialog';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

const AnalysisResults = ({ result: initialResult, onNewAnalysis }: AnalysisResultsProps) => {
  const [result, setResult] = useState<AnalysisResult>(initialResult);
  const [isImproving, setIsImproving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isViewingOptimized, setIsViewingOptimized] = useState(false);
  const [isLoadingOptimized, setIsLoadingOptimized] = useState(false);
  
  // Determine score color
  const getScoreColor = (score: number) => {
    if (score < 60) return 'text-red-500';
    if (score < 75) return 'text-orange-500';
    return 'text-green-600';
  };

  // Determine progress color
  const getProgressColor = (score: number) => {
    if (score < 60) return 'bg-red-500';
    if (score < 75) return 'bg-orange-500';
    return 'bg-green-600';
  };
  
  // Handle AI improvement
  const handleImprove = async () => {
    setIsImproving(true);
    toast({
      title: "Otimizando criativo",
      description: "Nossa IA está analisando e melhorando seu criativo...",
    });
    
    try {
      const improvedResult = await improveCreativeWithAI(result);
      setResult(improvedResult);
      toast({
        title: "Criativo otimizado!",
        description: `A pontuação foi melhorada para ${improvedResult.score}/100`,
      });
    } catch (error) {
      toast({
        title: "Erro na otimização",
        description: "Ocorreu um erro ao otimizar seu criativo.",
        variant: "destructive"
      });
    } finally {
      setIsImproving(false);
    }
  };
  
  // Handle report download
  const handleDownload = async () => {
    setIsDownloading(true);
    toast({
      title: "Preparando relatório",
      description: "Gerando PDF com análise detalhada...",
    });
    
    try {
      await downloadReportAsPDF(result);
      toast({
        title: "Download concluído!",
        description: "Seu relatório de análise foi baixado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar o relatório.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Handle view optimized creative
  const handleViewOptimized = async () => {
    if (!result.optimizedVersion) {
      toast({
        title: "Criativo não otimizado",
        description: "Por favor, otimize o criativo primeiro clicando em 'Melhorar com IA'.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoadingOptimized(true);
    setIsViewingOptimized(true);
    
    try {
      await getOptimizedCreative(result);
    } catch (error) {
      toast({
        title: "Erro ao carregar criativo",
        description: "Não foi possível carregar o criativo otimizado.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingOptimized(false);
    }
  };
  
  // Handle download optimized creative
  const handleDownloadOptimized = async () => {
    if (!result.optimizedVersion) {
      toast({
        title: "Criativo não otimizado",
        description: "Por favor, otimize o criativo primeiro clicando em 'Melhorar com IA'.",
        variant: "destructive"
      });
      return;
    }
    
    setIsDownloading(true);
    toast({
      title: "Baixando criativo otimizado",
      description: "Preparando seu criativo para download...",
    });
    
    try {
      await downloadOptimizedCreative(result);
      toast({
        title: "Download concluído!",
        description: "Seu criativo otimizado foi baixado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar o criativo otimizado.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Score section */}
          <div className="lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Pontuação do Criativo</h3>
            
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border">
              <div className="mb-6">
                <Progress 
                  value={result.score} 
                  className="h-3 bg-gray-100"
                  style={{
                    '--progress-background': getProgressColor(result.score)
                  } as React.CSSProperties}
                />
              </div>
              
              <div className="text-center">
                <span className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}
                </span>
                <span className="text-2xl text-gray-400">/100</span>
              </div>
              
              <p className="text-center text-sm mt-4 text-gray-500">
                {result.score < 60 && "Precisa de melhorias significativas"}
                {result.score >= 60 && result.score < 75 && "Bom, mas pode melhorar"}
                {result.score >= 75 && "Excelente! Alta probabilidade de sucesso"}
              </p>
              
              <p className="text-center text-sm font-medium mt-4 text-brand-purple">
                Potencial de melhoria: +{result.improvementPotential}%
              </p>
            </div>
            
            <div className="mt-6 space-y-3">
              <Button 
                className="w-full bg-brand-orange hover:bg-brand-orange/90 transition-all"
                onClick={handleImprove}
                disabled={isImproving}
              >
                {isImproving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Aprimorando...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Melhorar com IA
                  </>
                )}
              </Button>
              
              {result.optimizedVersion && (
                <Button 
                  variant="default" 
                  className="w-full bg-brand-purple hover:bg-brand-purple/90"
                  onClick={handleViewOptimized}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver criativo otimizado
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="w-full border-brand-purple text-brand-purple hover:bg-brand-purple/5"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Baixando...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Baixar relatório PDF
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onNewAnalysis}
              >
                <Upload className="mr-2 h-4 w-4" />
                Nova análise
              </Button>
            </div>
          </div>
          
          {/* Analysis details */}
          <div className="lg:w-2/3 space-y-6">
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="analysis">Análise Detalhada</TabsTrigger>
                <TabsTrigger value="elements">Elementos Detectados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-green-600 flex items-center mb-3">
                        <Check className="w-5 h-5 mr-2" /> Pontos fortes
                      </h4>
                      <ul className="space-y-2">
                        {result.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                            </div>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-red-500 flex items-center mb-3">
                        <X className="w-5 h-5 mr-2" /> Pontos fracos
                      </h4>
                      <ul className="space-y-2">
                        {result.weaknesses.length > 0 ? (
                          result.weaknesses.map((weakness, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                              </div>
                              {weakness}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-gray-500 italic">
                            Nenhum ponto fraco significativo detectado
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-brand-blue flex items-center mb-3">
                      <AlertCircle className="w-5 h-5 mr-2" /> Sugestões de Melhorias
                    </h4>
                    <ul className="space-y-3">
                      {result.suggestions.length > 0 ? (
                        result.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
                            <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                              <span className="text-xs font-medium text-brand-blue">{idx + 1}</span>
                            </div>
                            {suggestion}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-gray-500 italic">
                          Sem sugestões adicionais de melhoria
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="elements" className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-4">Elementos do Criativo</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-2">Presença de Elementos:</h5>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span>Rostos humanos</span>
                            <span className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              result.elements.hasFaces ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            )}>
                              {result.elements.hasFaces ? "Sim" : "Não"}
                            </span>
                          </li>
                          <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span>Call-to-action</span>
                            <span className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              result.elements.hasCTA ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            )}>
                              {result.elements.hasCTA ? "Presente" : "Ausente"}
                            </span>
                          </li>
                          <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span>Texto em destaque</span>
                            <span className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              result.elements.hasText ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            )}>
                              {result.elements.hasText ? "Sim" : "Não"}
                            </span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-2">Qualidade Visual:</h5>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span>Equilíbrio de cores</span>
                            <span className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              result.elements.colorBalance === "Ótimo" ? "bg-green-100 text-green-700" : 
                              result.elements.colorBalance === "Bom" ? "bg-blue-100 text-blue-700" :
                              "bg-orange-100 text-orange-700"
                            )}>
                              {result.elements.colorBalance}
                            </span>
                          </li>
                          <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span>Impacto emocional</span>
                            <span className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              result.elements.emotionalImpact === "Alto" ? "bg-green-100 text-green-700" : 
                              result.elements.emotionalImpact === "Médio" ? "bg-blue-100 text-blue-700" :
                              "bg-orange-100 text-orange-700"
                            )}>
                              {result.elements.emotionalImpact}
                            </span>
                          </li>
                          <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span>Clareza da mensagem</span>
                            <span className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              result.elements.clarity === "Excelente" ? "bg-green-100 text-green-700" : 
                              result.elements.clarity === "Bom" ? "bg-blue-100 text-blue-700" :
                              "bg-orange-100 text-orange-700"
                            )}>
                              {result.elements.clarity}
                            </span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-2">Formatos recomendados:</h5>
                        <div className="flex flex-wrap gap-2">
                          {result.recommendedFormats.map((format, idx) => (
                            <span key={idx} className="px-2 py-1 bg-brand-purple/10 text-brand-purple rounded text-xs">
                              {format}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-4 border-t flex justify-between items-center">
              <Button variant="link" className="p-0 h-auto text-brand-purple flex items-center gap-1" onClick={handleDownload}>
                Ver relatório completo <ArrowRight className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500"
                onClick={() => {
                  toast({
                    title: "Análise salva",
                    description: "Esta análise foi salva em seu histórico.",
                  });
                }}
              >
                Salvar análise
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Optimized Creative Preview Dialog */}
      <Dialog open={isViewingOptimized} onOpenChange={setIsViewingOptimized}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Criativo Otimizado com IA</DialogTitle>
            <DialogDescription>
              Versão aprimorada do seu criativo pronta para uso
            </DialogDescription>
          </DialogHeader>
          
          {isLoadingOptimized ? (
            <div className="py-10 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-purple" />
              <p className="mt-4 text-gray-500">Carregando criativo otimizado...</p>
            </div>
          ) : (
            <>
              <div className="mt-4 rounded-lg overflow-hidden border">
                <img
                  src={result.optimizedVersion}
                  alt="Criativo otimizado"
                  className="w-full h-auto object-contain max-h-[500px]"
                />
              </div>
              
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Pontuação original</h4>
                    <p className={`text-xl font-bold ${getScoreColor(initialResult.score)}`}>
                      {initialResult.score}/100
                    </p>
                  </div>
                  <div className="text-center">
                    <ArrowRight className="w-10 h-10 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-medium">Pontuação otimizada</h4>
                    <p className={`text-xl font-bold ${getScoreColor(result.score)}`}>
                      {result.score}/100
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-700">Melhorias aplicadas:</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      Contraste e legibilidade aprimorados
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      Elementos visuais rebalanceados para maior impacto
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      CTA otimizado para maior conversão
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      Paleta de cores ajustada para maior engajamento
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          
          <DialogFooter className="gap-2 mt-4">
            <Button 
              variant="outline"
              onClick={() => setIsViewingOptimized(false)}
            >
              Fechar
            </Button>
            <Button 
              className="bg-brand-purple hover:bg-brand-purple/90"
              onClick={handleDownloadOptimized}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Baixando...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Baixar criativo
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnalysisResults;
