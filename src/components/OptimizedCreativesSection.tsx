
import React, { useState, useEffect } from 'react';
import { getOptimizedCreatives, AnalysisHistory, downloadOptimizedCreative } from '@/lib/mockAnalysis';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, Image, Video, Calendar, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const OptimizedCreativesSection = () => {
  const [creatives, setCreatives] = useState<AnalysisHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCreative, setSelectedCreative] = useState<AnalysisHistory | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const loadCreatives = async () => {
      setIsLoading(true);
      try {
        const data = await getOptimizedCreatives();
        setCreatives(data);
      } catch (error) {
        console.error('Erro ao carregar criativos otimizados:', error);
        toast({
          title: "Erro ao carregar criativos",
          description: "Não foi possível carregar os criativos otimizados.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCreatives();
  }, []);

  const formatDate = (date: Date) => {
    return format(date, "d 'de' MMMM", { locale: ptBR });
  };

  const handleDownload = async (creative: AnalysisHistory) => {
    toast({
      title: "Baixando criativo",
      description: `Baixando ${creative.fileName}...`,
    });
    
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download concluído",
        description: `O criativo ${creative.fileName} foi baixado com sucesso.`,
      });
    }, 1500);
  };

  const handlePreview = (creative: AnalysisHistory) => {
    setSelectedCreative(creative);
    setPreviewOpen(true);
  };

  if (isLoading) {
    return (
      <section className="w-full py-16 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-purple" />
          <p className="mt-4 text-gray-500">Carregando criativos otimizados...</p>
        </div>
      </section>
    );
  }

  if (!creatives.length) {
    return null;
  }

  return (
    <section className="w-full py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Criativos Otimizados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Seus criativos otimizados com IA estão prontos para uso. Visualize e baixe para usar em suas campanhas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creatives.map((creative) => (
            <Card key={creative.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src={creative.optimizedVersion || creative.thumbnail} 
                  alt={creative.fileName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-2 py-1">
                  {creative.fileType === 'image' ? (
                    <span className="flex items-center gap-1">
                      <Image className="w-3 h-3" /> Imagem
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Video className="w-3 h-3" /> Vídeo
                    </span>
                  )}
                </div>
                <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs rounded px-2 py-1">
                  Otimizado
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-medium truncate" title={creative.fileName}>
                    {creative.fileName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Otimizado em {formatDate(creative.date)}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="default"
                    size="sm"
                    className="flex-1 bg-brand-purple hover:bg-brand-purple/90"
                    onClick={() => handlePreview(creative)}
                  >
                    <Eye className="w-4 h-4 mr-2" /> Visualizar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownload(creative)}
                  >
                    <Download className="w-4 h-4 mr-2" /> Baixar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        {selectedCreative && (
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedCreative.fileName} (Otimizado)</DialogTitle>
              <DialogDescription>
                Criativo otimizado em {formatDate(selectedCreative.date)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 rounded-lg overflow-hidden border">
              <img
                src={selectedCreative.optimizedVersion || selectedCreative.thumbnail}
                alt={selectedCreative.fileName}
                className="w-full h-auto object-contain max-h-[500px]"
              />
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Melhorias aplicadas:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  Contraste aprimorado entre elementos
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  Call-to-action otimizado
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  Composição visual rebalanceada
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  Elementos de destaque acentuados
                </li>
              </ul>
            </div>
            
            <DialogFooter className="gap-2 mt-4">
              <Button 
                variant="outline"
                onClick={() => setPreviewOpen(false)}
              >
                Fechar
              </Button>
              <Button 
                className="bg-brand-purple hover:bg-brand-purple/90"
                onClick={() => handleDownload(selectedCreative)}
              >
                <Download className="w-4 h-4 mr-2" /> Baixar criativo
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default OptimizedCreativesSection;
