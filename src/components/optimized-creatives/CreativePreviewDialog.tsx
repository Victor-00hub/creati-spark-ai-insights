
import React, { useState } from 'react';
import { AnalysisHistory } from '@/lib/mockAnalysis';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Smartphone, Laptop, FileDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import { toast } from '@/hooks/use-toast';
import ModalInfo from '../ui/modal-info';

interface CreativePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  creative: AnalysisHistory | null;
  onDownload: (creative: AnalysisHistory) => void;
  isDownloading: boolean;
  activeDownloadId: string | null;
}

const CreativePreviewDialog = ({
  isOpen,
  onClose,
  creative,
  onDownload,
  isDownloading,
  activeDownloadId
}: CreativePreviewDialogProps) => {
  const [isDownloadOptionsOpen, setIsDownloadOptionsOpen] = useState(false);
  
  const formatDate = (date: Date) => {
    return format(date, "d 'de' MMMM", { locale: ptBR });
  };
  
  if (!creative) return null;

  const handleDownloadForDevice = (deviceType: 'mobile' | 'desktop') => {
    if (!creative) return;

    const targetDevice = deviceType === 'mobile' ? 'celular' : 'desktop';
    toast({
      title: `Download para ${targetDevice}`,
      description: `Preparando seu criativo otimizado para ${targetDevice}...`,
    });

    // Simulate download time
    setTimeout(() => {
      // Create a download link
      const link = document.createElement('a');
      link.href = creative.optimizedVersion || '';
      link.download = `${deviceType}_${creative.fileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download concluído",
        description: `O criativo foi baixado para o seu ${targetDevice} com sucesso.`,
      });

      setIsDownloadOptionsOpen(false);
    }, 1500);
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{creative.fileName} (Otimizado)</DialogTitle>
            <DialogDescription>
              Criativo otimizado em {formatDate(creative.date)}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="preview" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Visualização</TabsTrigger>
              <TabsTrigger value="performance">Desempenho</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="pt-4">
              <div className="rounded-lg overflow-hidden border">
                <img
                  src={creative.optimizedVersion || creative.thumbnail}
                  alt={creative.fileName}
                  className="w-full h-auto object-contain max-h-[400px]"
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
            </TabsContent>
            
            <TabsContent value="performance" className="py-4">
              <PerformanceMetrics creativeId={creative.id} />
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="gap-2 mt-4">
            <Button 
              variant="outline"
              onClick={onClose}
            >
              Fechar
            </Button>
            <Button 
              className="bg-brand-purple hover:bg-brand-purple/90"
              onClick={() => setIsDownloadOptionsOpen(true)}
              disabled={isDownloading && activeDownloadId === creative.id}
            >
              {isDownloading && activeDownloadId === creative.id ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Baixando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" /> Baixar criativo
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Download Options Modal */}
      <ModalInfo 
        isOpen={isDownloadOptionsOpen} 
        onClose={() => setIsDownloadOptionsOpen(false)}
        title="Baixar Criativo"
        description="Escolha o formato de download para seu dispositivo"
      >
        <div className="py-6 space-y-4">
          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center p-6 hover:bg-gray-50"
            onClick={() => handleDownloadForDevice('mobile')}
          >
            <div className="flex items-center">
              <Smartphone className="w-8 h-8 text-brand-purple mr-4" />
              <div className="text-left">
                <p className="font-medium">Versão para Mobile</p>
                <p className="text-sm text-gray-500">Otimizado para redes sociais em dispositivos móveis</p>
              </div>
            </div>
            <Download className="w-5 h-5 text-gray-400" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center p-6 hover:bg-gray-50"
            onClick={() => handleDownloadForDevice('desktop')}
          >
            <div className="flex items-center">
              <Laptop className="w-8 h-8 text-brand-purple mr-4" />
              <div className="text-left">
                <p className="font-medium">Versão para Desktop</p>
                <p className="text-sm text-gray-500">Alta resolução para uso em websites e apresentações</p>
              </div>
            </div>
            <Download className="w-5 h-5 text-gray-400" />
          </Button>

          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center p-6 hover:bg-gray-50"
            onClick={() => {
              onDownload(creative);
              setIsDownloadOptionsOpen(false);
            }}
          >
            <div className="flex items-center">
              <FileDown className="w-8 h-8 text-brand-purple mr-4" />
              <div className="text-left">
                <p className="font-medium">Arquivo Original</p>
                <p className="text-sm text-gray-500">Baixe o arquivo em seu formato original</p>
              </div>
            </div>
            <Download className="w-5 h-5 text-gray-400" />
          </Button>
        </div>
      </ModalInfo>
    </>
  );
};

export default CreativePreviewDialog;
