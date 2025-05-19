
import React from 'react';
import { AnalysisHistory } from '@/lib/mockAnalysis';
import { Card, CardContent } from '@/components/ui/card';
import { Image, Video, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HistorySectionProps {
  history: AnalysisHistory[];
}

const HistorySection = ({ history }: HistorySectionProps) => {
  if (!history.length) {
    return null;
  }

  const formatDate = (date: Date) => {
    return format(date, "d 'de' MMMM", { locale: ptBR });
  };

  return (
    <section className="w-full py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Suas análises recentes</h2>
          <button className="text-brand-purple text-sm font-medium hover:underline">
            Ver todas
          </button>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {history.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                    className={`font-bold text-sm ${
                      item.score < 60 ? 'text-red-500' : 
                      item.score < 75 ? 'text-orange-500' : 
                      'text-green-600'
                    }`}
                  >
                    {item.score}/100
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(item.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {format(item.date, "HH:mm")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
