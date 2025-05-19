
// Types
export interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  fileType: 'image' | 'video';
  elements: {
    hasFaces: boolean;
    hasCTA: boolean;
    hasText: boolean;
    colorBalance: string;
    emotionalImpact: string;
    clarity: string;
  };
  recommendedFormats: string[];
  improvementPotential: number;
}

export interface AnalysisHistory {
  id: string;
  date: Date;
  fileName: string;
  fileType: 'image' | 'video';
  thumbnail: string;
  score: number;
}

// Mock analysis function
export const analyzeMockCreative = (file: File): Promise<AnalysisResult> => {
  // This is a mock function that simulates an API call
  return new Promise((resolve) => {
    const isImage = file.type.startsWith('image/');
    
    // Simulate processing time
    setTimeout(() => {
      // Generate more realistic analysis data
      const hasFaces = Math.random() > 0.3;
      const hasCTA = Math.random() > 0.4;
      const hasText = Math.random() > 0.2;
      
      // Adjustments based on file type and content
      let strengths = [];
      let weaknesses = [];
      let suggestions = [];
      let score = 0;
      
      // Calculate a more realistic score based on detected elements
      if (hasFaces) score += 15;
      if (hasCTA) score += 20;
      if (hasText) score += 10;
      
      // Add random variance
      score += Math.floor(Math.random() * 25) + 30;
      if (score > 100) score = 100;
      
      // Determine strengths based on score components
      if (hasFaces) {
        strengths.push("Presença de rosto humano aumenta engajamento");
      }
      
      if (hasCTA) {
        strengths.push("CTA claro e bem posicionado");
      } else {
        weaknesses.push("Falta CTA visível ou é pouco destacado");
        suggestions.push("Adicione um botão de CTA em destaque");
      }
      
      if (hasText) {
        if (Math.random() > 0.5) {
          strengths.push("Quantidade de texto adequada");
        } else {
          weaknesses.push("Texto excessivo pode reduzir engajamento");
          suggestions.push("Reduza a quantidade de texto em 30%");
        }
      } else {
        weaknesses.push("Falta de texto explicativo");
        suggestions.push("Adicione uma chamada principal clara");
      }
      
      // Add more specific items
      if (score < 70) {
        weaknesses.push("Contraste entre texto e fundo não é ideal");
        weaknesses.push("Falta elementos de urgência ou escassez");
        suggestions.push("Aumente o contraste entre o texto e o fundo");
        suggestions.push("Adicione um contador regressivo ou 'Oferta por tempo limitado'");
      } else {
        strengths.push("Bom contraste entre elementos visuais");
        strengths.push("Uso adequado de cores da marca");
      }
      
      if (isImage) {
        strengths.push("Imagem de qualidade adequada para anúncios");
        if (score > 75) {
          strengths.push("Formato otimizado para feed");
        } else {
          weaknesses.push("Formato não ideal para a plataforma");
          suggestions.push("Teste o formato 1:1 para melhor desempenho em feed");
        }
      } else {
        strengths.push("Vídeos têm 20% mais engajamento que imagens");
        if (Math.random() > 0.5) {
          weaknesses.push("Duração do vídeo pode ser muito longa");
          suggestions.push("Reduza o vídeo para 15-30 segundos para melhores resultados");
        }
      }
      
      resolve({
        score,
        strengths,
        weaknesses,
        suggestions,
        fileType: isImage ? 'image' : 'video',
        elements: {
          hasFaces,
          hasCTA,
          hasText,
          colorBalance: ["Bom", "Ótimo", "Regular"][Math.floor(Math.random() * 3)],
          emotionalImpact: ["Baixo", "Médio", "Alto"][Math.floor(Math.random() * 3)],
          clarity: ["Regular", "Bom", "Excelente"][Math.floor(Math.random() * 3)]
        },
        recommendedFormats: ["1:1 para Feed", "9:16 para Stories", "4:5 para Reels"],
        improvementPotential: Math.floor(Math.random() * 20) + 10 // 10-30%
      });
    }, 2000);
  });
};

// Mock history data with more realistic entries
export const getMockHistoryItems = (): AnalysisHistory[] => {
  return [
    {
      id: '1',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      fileName: 'banner-curso-maio-2024.jpg',
      fileType: 'image',
      thumbnail: 'https://via.placeholder.com/100x100',
      score: 72
    },
    {
      id: '2',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      fileName: 'anuncio-lancamento-mentoria.mp4',
      fileType: 'video',
      thumbnail: 'https://via.placeholder.com/100x100',
      score: 64
    },
    {
      id: '3',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      fileName: 'promocao-black-friday.jpg',
      fileType: 'image',
      thumbnail: 'https://via.placeholder.com/100x100',
      score: 81
    },
    {
      id: '4',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      fileName: 'depoimento-cliente-sucesso.jpg',
      fileType: 'image',
      thumbnail: 'https://via.placeholder.com/100x100',
      score: 88
    },
    {
      id: '5',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      fileName: 'video-explicativo-produto.mp4',
      fileType: 'video',
      thumbnail: 'https://via.placeholder.com/100x100',
      score: 59
    },
    {
      id: '6',
      date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
      fileName: 'campanha-leads-webinar.jpg',
      fileType: 'image',
      thumbnail: 'https://via.placeholder.com/100x100',
      score: 76
    }
  ];
};
