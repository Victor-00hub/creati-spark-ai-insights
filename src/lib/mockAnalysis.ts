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
  optimizedVersion?: string; // URL para a versão otimizada
}

export interface AnalysisHistory {
  id: string;
  date: Date;
  fileName: string;
  fileType: 'image' | 'video';
  thumbnail: string;
  score: number;
  analyzed: boolean;
  optimizedVersion?: string; // URL para a versão otimizada
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

// Improve creative with AI (mock function)
export const improveCreativeWithAI = (result: AnalysisResult): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    // Simulate AI processing time
    setTimeout(() => {
      // Create improved version
      const improvedResult = { ...result };
      
      // Improve score
      improvedResult.score = Math.min(100, result.score + result.improvementPotential);
      
      // Remove weaknesses that were addressed
      improvedResult.weaknesses = result.weaknesses.slice(0, 1);
      
      // Add new strengths
      improvedResult.strengths = [
        ...result.strengths,
        "Melhorado com IA para performance ideal",
        "Elementos visuais balanceados"
      ];
      
      // Reduce suggestions
      improvedResult.suggestions = result.suggestions.slice(0, 1);
      
      // Improve elements
      improvedResult.elements = {
        ...result.elements,
        hasCTA: true,
        colorBalance: "Ótimo",
        emotionalImpact: "Alto"
      };
      
      // Reduced improvement potential
      improvedResult.improvementPotential = Math.max(5, result.improvementPotential - 15);
      
      // Add optimized version URL (mock image)
      if (result.fileType === 'image') {
        improvedResult.optimizedVersion = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      } else {
        improvedResult.optimizedVersion = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      }
      
      resolve(improvedResult);
    }, 3000);
  });
};

// Download report as PDF (mock function)
export const downloadReportAsPDF = (result: AnalysisResult): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate download time
    setTimeout(() => {
      console.log("Downloading report for creative with score:", result.score);
      resolve(true);
    }, 1500);
  });
};

// Get optimized creative (mock function)
export const getOptimizedCreative = (result: AnalysisResult): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate download time
    setTimeout(() => {
      // Return the optimized version URL
      resolve(result.optimizedVersion || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3');
    }, 1000);
  });
};

// Download optimized creative (mock function)
export const downloadOptimizedCreative = (result: AnalysisResult): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate download time
    setTimeout(() => {
      console.log("Downloading optimized creative:", result.optimizedVersion);
      resolve(true);
    }, 1500);
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
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      score: 72,
      analyzed: true,
      optimizedVersion: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '2',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      fileName: 'anuncio-lancamento-mentoria.mp4',
      fileType: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      score: 64,
      analyzed: true,
      optimizedVersion: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '3',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      fileName: 'promocao-black-friday.jpg',
      fileType: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      score: 81,
      analyzed: true,
      optimizedVersion: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '4',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      fileName: 'depoimento-cliente-sucesso.jpg',
      fileType: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      score: 88,
      analyzed: true,
      optimizedVersion: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '5',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      fileName: 'video-explicativo-produto.mp4',
      fileType: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      score: 59,
      analyzed: false,
      optimizedVersion: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '6',
      date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
      fileName: 'campanha-leads-webinar.jpg',
      fileType: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      score: 76,
      analyzed: false,
      optimizedVersion: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
  ];
};

// Get optimized creatives (mock function)
export const getOptimizedCreatives = (): Promise<AnalysisHistory[]> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      const history = getMockHistoryItems();
      // Filter to only include items with optimized versions
      const optimized = history.filter(item => item.optimizedVersion);
      resolve(optimized);
    }, 1000);
  });
};
