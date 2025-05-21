
import React, { useState } from 'react';
import { AnalysisHistory } from '@/lib/mockAnalysis';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, Image, Video, Calendar, RefreshCw, Smartphone, Laptop, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';
import ModalInfo from '@/components/ui/modal-info';

interface CreativeCardProps {
  creative: AnalysisHistory;
  onPreview: (creative: AnalysisHistory) => void;
  onDownload: (creative: AnalysisHistory) => void;
  isDownloading: boolean;
  activeDownloadId: string | null;
}

const CreativeCard = ({ 
  creative, 
  onPreview, 
  onDownload, 
  isDownloading, 
  activeDownloadId 
}: CreativeCardProps) => {
  const [isDownloadOptionsOpen, setIsDownloadOptionsOpen] = useState(false);
  
  const formatDate = (date: Date) => {
    return format(date, "d 'de' MMMM", { locale: ptBR });
  };

  const handleDownloadForDevice = (deviceType: 'mobile' | 'desktop') => {
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
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Otimizado em {formatDate(creative.date)}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="default"
              size="sm"
              className="flex-1 bg-brand-purple hover:bg-brand-purple/90"
              onClick={() => onPreview(creative)}
            >
              <Eye className="w-4 h-4 mr-2" /> Visualizar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1"
              onClick={() => setIsDownloadOptionsOpen(true)}
              disabled={isDownloading && activeDownloadId === creative.id}
            >
              {isDownloading && activeDownloadId === creative.id ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Baixando
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" /> Baixar
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

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

export default CreativeCard;
