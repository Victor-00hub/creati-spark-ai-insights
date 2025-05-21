
import React from 'react';
import { AnalysisHistory } from '@/lib/mockAnalysis';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PerformanceMetrics from '@/components/PerformanceMetrics';

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
  
  const formatDate = (date: Date) => {
    return format(date, "d 'de' MMMM", { locale: ptBR });
  };
  
  if (!creative) return null;
  
  return (
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
            onClick={() => onDownload(creative)}
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
  );
};

export default CreativePreviewDialog;
