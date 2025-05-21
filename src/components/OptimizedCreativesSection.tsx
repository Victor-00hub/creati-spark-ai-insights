
import React, { useState, useEffect } from 'react';
import { getOptimizedCreatives, AnalysisHistory } from '@/lib/mockAnalysis';
import { toast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';
import CreativeCard from '@/components/optimized-creatives/CreativeCard';
import CreativePreviewDialog from '@/components/optimized-creatives/CreativePreviewDialog';

const OptimizedCreativesSection = () => {
  const [creatives, setCreatives] = useState<AnalysisHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCreative, setSelectedCreative] = useState<AnalysisHistory | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeDownloadId, setActiveDownloadId] = useState<string | null>(null);

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

  const handleDownload = async (creative: AnalysisHistory) => {
    setIsDownloading(true);
    setActiveDownloadId(creative.id);
    
    toast({
      title: "Baixando criativo",
      description: `Preparando o download de ${creative.fileName}...`,
    });
    
    try {
      // Simular tempo de processamento do download (2 segundos)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a simulated download by creating a temporary anchor element
      const link = document.createElement('a');
      link.href = creative.optimizedVersion || '';
      link.download = `optimized_${creative.fileName}`;
      
      // Append to the body, trigger click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success toast
      toast({
        title: "Download concluído",
        description: `O criativo ${creative.fileName} foi baixado com sucesso.`,
      });
    } catch (error) {
      console.error('Erro ao baixar criativo:', error);
      toast({
        title: "Erro ao baixar",
        description: "Não foi possível baixar o criativo. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
      setActiveDownloadId(null);
    }
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
            <CreativeCard
              key={creative.id}
              creative={creative}
              onPreview={handlePreview}
              onDownload={handleDownload}
              isDownloading={isDownloading}
              activeDownloadId={activeDownloadId}
            />
          ))}
        </div>
      </div>

      <CreativePreviewDialog
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        creative={selectedCreative}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        activeDownloadId={activeDownloadId}
      />
    </section>
  );
};

export default OptimizedCreativesSection;
