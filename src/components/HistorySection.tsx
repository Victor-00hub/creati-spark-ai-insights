
import React from 'react';
import { AnalysisHistory } from '@/lib/mockAnalysis';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, Video, Calendar, Clock, ArrowRight, Star, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

  const realisticImages = [
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZWJvb2slMjBhZHxlbnwwfHwwfHx8MA%3D%3D", 
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5zdGFncmFtJTIwYWR8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFjZWJvb2slMjBhZHxlbnwwfHwwfHx8MA%3D%3D"
  ];

  return (
    <section className="w-full py-16 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">Suas análises recentes</h2>
            <p className="text-gray-500 text-sm">Veja o histórico completo de análises do seu criativo</p>
          </div>
          <Dialog>
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
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...history, ...history].map((item) => (
                      <TableRow key={`table-${item.id}`}>
                        <TableCell>{formatDate(item.date)}</TableCell>
                        <TableCell className="font-medium">{item.fileName}</TableCell>
                        <TableCell>{item.fileType === 'image' ? 'Imagem' : 'Vídeo'}</TableCell>
                        <TableCell className="text-right">
                          <span 
                            className={`font-bold ${
                              item.score < 60 ? 'text-red-500' : 
                              item.score < 75 ? 'text-orange-500' : 
                              'text-green-600'
                            }`}
                          >
                            {item.score}/100
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {history.map((item, index) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow group">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src={realisticImages[index % realisticImages.length]} 
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formatDate(item.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {format(item.date, "HH:mm")}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver detalhes
                  </Button>
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
