
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image, Video } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
}

const FileUploader = ({ onFileSelected, isProcessing }: FileUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    
    if (files && files.length > 0) {
      handleFiles(files[0]);
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files[0]);
    }
  };
  
  const handleFiles = (file: File) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    
    if ([...validImageTypes, ...validVideoTypes].includes(file.type)) {
      setSelectedFile(file);
      onFileSelected(file);
    } else {
      toast({
        title: "Formato não suportado",
        description: "Por favor, envie uma imagem (JPEG, PNG, GIF, WEBP) ou vídeo (MP4, WEBM, MOV).",
        variant: "destructive"
      });
    }
  };
  
  const renderFilePreview = () => {
    if (!selectedFile) return null;
    
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (validImageTypes.includes(selectedFile.type)) {
      return (
        <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden relative">
          <img 
            src={URL.createObjectURL(selectedFile)} 
            alt="Uploaded preview" 
            className="w-full h-full object-contain"
          />
        </div>
      );
    } else {
      return (
        <div className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden relative flex items-center justify-center">
          <Video className="w-16 h-16 text-white opacity-50" />
          <p className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
            {selectedFile.name}
          </p>
        </div>
      );
    }
  };
  
  return (
    <div className="w-full">
      {selectedFile ? (
        <div className="space-y-4">
          {renderFilePreview()}
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedFile(null)}
              disabled={isProcessing}
            >
              Trocar arquivo
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`upload-zone w-full p-8 rounded-lg flex flex-col items-center justify-center text-center gap-4 min-h-[320px] transition-all ${
            dragActive ? "border-brand-purple scale-[1.01]" : ""
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-2">
            <Upload className="w-8 h-8 text-brand-purple" />
          </div>
          
          <h3 className="text-xl font-medium">Arraste e solte seu criativo aqui</h3>
          
          <p className="text-gray-500 max-w-md">
            Adicione uma imagem ou vídeo para análise. Formatos suportados: JPEG, PNG, GIF, WEBP, MP4, WEBM, MOV
          </p>
          
          <div className="flex items-center gap-3 mt-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Image className="w-4 h-4" /> Imagem
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Video className="w-4 h-4" /> Vídeo
            </Button>
          </div>
          
          <div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/jpeg, image/png, image/gif, image/webp, video/mp4, video/webm, video/quicktime"
                className="hidden"
                onChange={handleChange}
              />
              <p className="text-sm text-brand-purple hover:underline mt-2">
                ou selecione um arquivo do seu computador
              </p>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
