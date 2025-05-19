
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
      resolve({
        score: Math.floor(Math.random() * 30) + 55, // Random score between 55-85
        strengths: [
          "Bom contraste entre texto e fundo",
          "Uso adequado de cores da marca",
          "Formato otimizado para feed"
        ],
        weaknesses: [
          "CTA pouco visível",
          "Texto muito pequeno para mobile",
          "Falta elementos de urgência ou escassez"
        ],
        suggestions: [
          "Aumente o tamanho do CTA em 20%",
          "Adicione um contador regressivo ou 'Oferta por tempo limitado'",
          "Teste uma versão com o rosto humano mais proeminente"
        ],
        fileType: isImage ? 'image' : 'video',
        elements: {
          hasFaces: Math.random() > 0.5,
          hasCTA: Math.random() > 0.3,
          hasText: true,
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

// Mock history data
export const getMockHistoryItems = (): AnalysisHistory[] => {
  return [
    {
      id: '1',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      fileName: 'banner-curso-maio.jpg',
      fileType: 'image',
      thumbnail: 'https://via.placeholder.com/100x100',
      score: 72
    },
    {
      id: '2',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      fileName: 'anuncio-lancamento.mp4',
      fileType: 'video',
      thumbnail: 'https://via.placeholder.com/100x100',
      score: 64
    },
    {
      id: '3',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      fileName: 'cta-inscricoes.jpg',
      fileType: 'image',
      thumbnail: 'https://via.placeholder.com/100x100',
      score: 81
    }
  ];
};
