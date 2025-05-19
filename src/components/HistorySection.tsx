
import React, { useState } from 'react';
import { AnalysisHistory, AnalysisResult, analyzeMockCreative } from '@/lib/mockAnalysis';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Image, Video, Calendar, Clock, ArrowRight, Star, 
  Trash2, Eye, RefreshCw, Download, AlertCircle 
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from '@/components/ui/dialog';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface HistorySectionProps {
  history: AnalysisHistory[];
}

const HistorySection = ({ history: initialHistory }: HistorySectionProps) => {
  const [history, setHistory] = useState<AnalysisHistory[]>(initialHistory);
  const [selectedItem, setSelectedItem] = useState<AnalysisHistory | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isFullHistoryOpen, setIsFullHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mockResult, setMockResult] = useState<AnalysisResult | null>(null);
  
  if (!history.length) {
    return null;
  }

  const formatDate = (date: Date) => {
    return format(date, "d 'de' MMMM", { locale: ptBR });
  };
  
  // Get score color
  const getScoreColor = (score: number) => {
    if (score < 60) return 'text-red-500';
    if (score < 75) return 'text-orange-500';
    return 'text-green-600';
  };

  // Get progress color
  const getProgressColor = (score: number) => {
    if (score < 60) return 'bg-red-500';
    if (score < 75) return 'bg-orange-500';
    return 'bg-green-600';
  };
  
  // View analysis details
  const handleViewAnalysis = async (item: AnalysisHistory) => {
    setSelectedItem(item);
    setIsLoading(true);
    setIsViewDialogOpen(true);
    
    try {
      // Create a mock file object for analysis
      const mockFile = new File([""], item.fileName, {
        type: item.fileType === 'image' ? 'image/jpeg' : 'video/mp4',
      });
      
      const result = await analyzeMockCreative(mockFile);
      setMockResult(result);
    } catch (error) {
      toast({
        title: "Erro ao carregar análise",
        description: "Não foi possível carregar os detalhes desta análise.",
        variant: "destructive"
      });
      setIsViewDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete analysis
  const handleDelete = (itemId: string) => {
    setHistory(history.filter(item => item.id !== itemId));
    toast({
      title: "Análise removida",
      description: "A análise foi removida do seu histórico."
    });
  };
  
  // Star/favorite analysis
  const handleStar = (itemId: string) => {
    toast({
      title: "Análise favoritada",
      description: "Esta análise foi adicionada aos seus favoritos."
    });
  };
  
  // Download report
  const handleDownload = (item: AnalysisHistory) => {
    toast({
      title: "Relatório baixado",
      description: `O relatório de "${item.fileName}" foi baixado com sucesso.`
    });
  };

  return (
    <section className="w-full py-16 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">Suas análises recentes</h2>
            <p className="text-gray-500 text-sm">Veja o histórico completo de análises do seu criativo</p>
          </div>
          <Dialog open={isFullHistoryOpen} onOpenChange={setIsFullHistoryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Histórico de Análises</DialogTitle>
                <DialogDescription>
                  Todas as análises realizadas nos últimos 30 dias.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Arquivo</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Pontuação</TableHead>
                      <TableHead className="w-[150px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...history, ...history].map((item) => (
                      <TableRow key={`table-${item.id}-${Math.random()}`}>
                        <TableCell>{formatDate(item.date)}</TableCell>
                        <TableCell className="font-medium">{item.fileName}</TableCell>
                        <TableCell>
                          {item.fileType === 'image' ? (
                            <span className="flex items-center gap-1">
                              <Image className="w-3 h-3" /> Imagem
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Video className="w-3 h-3" /> Vídeo
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <span 
                            className={`font-bold ${getScoreColor(item.score)}`}
                          >
                            {item.score}/100
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleViewAnalysis(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleStar(item.id)}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDownload(item)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Excluir análise</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja remover esta análise do seu histórico? Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600">
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsFullHistoryOpen(false)}>Fechar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {history.map((item, index) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow group">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src={item.thumbnail} 
                  alt={item.fileName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-2 py-1">
                  {item.fileType === 'image' ? (
                    <span className="flex items-center gap-1">
                      <Image className="w-3 h-3" /> Imagem
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Video className="w-3 h-3" /> Vídeo
                    </span>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium truncate" title={item.fileName}>
                    {item.fileName}
                  </h3>
                  <span 
                    className={`font-bold text-sm ${getScoreColor(item.score)}`}
                  >
                    {item.score}/100
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formatDate(item.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {format(item.date, "HH:mm")}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleViewAnalysis(item)}
                  >
                    Ver detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* View Analysis Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.fileName}</DialogTitle>
                <DialogDescription>
                  Análise realizada em {formatDate(selectedItem.date)} às {format(selectedItem.date, "HH:mm")}
                </DialogDescription>
              </DialogHeader>
              
              {isLoading ? (
                <div className="py-10 text-center">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-purple" />
                  <p className="mt-4 text-gray-500">Carregando análise...</p>
                </div>
              ) : mockResult ? (
                <div className="py-4">
                  <Tabs defaultValue="summary">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="summary">Resumo</TabsTrigger>
                      <TabsTrigger value="strengths">Pontos Fortes</TabsTrigger>
                      <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="summary" className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Pontuação:</h4>
                          <div className="mb-2">
                            <Progress 
                              value={mockResult.score} 
                              className="h-2 bg-gray-100"
                              style={{
                                '--progress-background': getProgressColor(mockResult.score)
                              } as React.CSSProperties}
                            />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">0</span>
                            <span className={getScoreColor(mockResult.score)}>{mockResult.score}/100</span>
                            <span className="text-gray-500">100</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Elementos detectados:</h4>
                            <ul className="space-y-1 text-sm">
                              <li className="flex items-center gap-2">
                                <span className={mockResult.elements.hasFaces ? "text-green-500" : "text-gray-400"}>
                                  {mockResult.elements.hasFaces ? "✓" : "✗"}
                                </span>
                                Rostos humanos
                              </li>
                              <li className="flex items-center gap-2">
                                <span className={mockResult.elements.hasCTA ? "text-green-500" : "text-gray-400"}>
                                  {mockResult.elements.hasCTA ? "✓" : "✗"}
                                </span>
                                Call-to-action
                              </li>
                              <li className="flex items-center gap-2">
                                <span className={mockResult.elements.hasText ? "text-green-500" : "text-gray-400"}>
                                  {mockResult.elements.hasText ? "✓" : "✗"}
                                </span>
                                Texto em destaque
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Formatos recomendados:</h4>
                            <div className="flex flex-wrap gap-2">
                              {mockResult.recommendedFormats.map((format, idx) => (
                                <span key={idx} className="px-2 py-1 bg-brand-purple/10 text-brand-purple rounded text-xs">
                                  {format}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <h4 className="text-sm font-medium mb-2">Potencial de melhoria:</h4>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="text-brand-purple w-4 h-4" />
                            <span className="text-brand-purple font-medium">+{mockResult.improvementPotential}%</span> 
                            <span className="text-sm text-gray-500">possível melhoria de performance com otimizações</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="strengths" className="pt-4">
                      <ul className="space-y-3">
                        {mockResult.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 p-2 bg-green-50 rounded-md">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="suggestions" className="pt-4">
                      <ul className="space-y-3">
                        {mockResult.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
                            <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                              <span className="text-xs font-medium text-brand-blue">{idx + 1}</span>
                            </div>
                            {suggestion}
                          </li>
                        ))}
                        {mockResult.weaknesses.map((weakness, idx) => (
                          <li key={`w-${idx}`} className="text-sm flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                              <X className="w-3 h-3 text-red-600" />
                            </div>
                            <span>Resolver: {weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="py-10 text-center">
                  <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
                  <p className="mt-4 text-gray-500">Não foi possível carregar os detalhes desta análise.</p>
                </div>
              )}
              
              <DialogFooter className="gap-2">
                {mockResult && (
                  <Button 
                    variant="outline"
                    onClick={() => handleDownload(selectedItem)}
                    className="mr-auto"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Baixar relatório
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Fechar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HistorySection;
