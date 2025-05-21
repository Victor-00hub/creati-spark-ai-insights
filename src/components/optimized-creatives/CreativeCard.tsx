
import React from 'react';
import { AnalysisHistory } from '@/lib/mockAnalysis';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, Image, Video, Calendar, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  
  const formatDate = (date: Date) => {
    return format(date, "d 'de' MMMM", { locale: ptBR });
  };
  
  return (
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
            onClick={() => onDownload(creative)}
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
  );
};

export default CreativeCard;
