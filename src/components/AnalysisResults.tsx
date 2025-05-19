
import React from 'react';
import { AnalysisResult } from '@/lib/mockAnalysis';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, X, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

const AnalysisResults = ({ result, onNewAnalysis }: AnalysisResultsProps) => {
  // Determine score color
  const getScoreColor = (score: number) => {
    if (score < 60) return 'text-red-500';
    if (score < 75) return 'text-orange-500';
    return 'text-green-600';
  };

  // Determine progress color
  const getProgressColor = (score: number) => {
    if (score < 60) return 'bg-red-500';
    if (score < 75) return 'bg-orange-500';
    return 'bg-green-600';
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Score section */}
          <div className="lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Pontuação do Criativo</h3>
            
            <div className="relative p-6 rounded-xl card-gradient">
              <div className="mb-6">
                <Progress 
                  value={result.score} 
                  className="h-3 bg-gray-100"
                  indicatorClassName={getProgressColor(result.score)}
                />
              </div>
              
              <div className="text-center">
                <span className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}
                </span>
                <span className="text-2xl text-gray-400">/100</span>
              </div>
              
              <p className="text-center text-sm mt-4 text-gray-500">
                {result.score < 60 && "Precisa de melhorias significativas"}
                {result.score >= 60 && result.score < 75 && "Bom, mas pode melhorar"}
                {result.score >= 75 && "Excelente! Alta probabilidade de sucesso"}
              </p>
              
              <p className="text-center text-sm font-medium mt-4 text-brand-purple">
                Potencial de melhoria: +{result.improvementPotential}%
              </p>
            </div>
            
            <div className="mt-6">
              <Button 
                className="w-full mb-3 bg-brand-orange hover:bg-brand-orange/90"
                onClick={() => alert("Esta funcionalidade estará disponível em breve!")}
              >
                Melhorar com IA
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onNewAnalysis}
              >
                Nova análise
              </Button>
            </div>
          </div>
          
          {/* Analysis details */}
          <div className="lg:w-2/3 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-green-600 flex items-center mb-3">
                    <Check className="w-5 h-5 mr-2" /> Pontos fortes
                  </h4>
                  <ul className="space-y-2">
                    {result.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-red-500 flex items-center mb-3">
                    <X className="w-5 h-5 mr-2" /> Pontos fracos
                  </h4>
                  <ul className="space-y-2">
                    {result.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        </div>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-brand-blue flex items-center mb-3">
                  <AlertCircle className="w-5 h-5 mr-2" /> Sugestões de Melhorias
                </h4>
                <ul className="space-y-3">
                  {result.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
                      <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs font-medium text-brand-blue">{idx + 1}</span>
                      </div>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Elementos detectados:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <span className={result.elements.hasFaces ? "text-green-500" : "text-gray-400"}>
                      {result.elements.hasFaces ? "✓" : "✗"}
                    </span>
                    Rostos humanos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={result.elements.hasCTA ? "text-green-500" : "text-gray-400"}>
                      {result.elements.hasCTA ? "✓" : "✗"}
                    </span>
                    Call-to-action
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={result.elements.hasText ? "text-green-500" : "text-gray-400"}>
                      {result.elements.hasText ? "✓" : "✗"}
                    </span>
                    Texto em destaque
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Formatos recomendados:</h4>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedFormats.map((format, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <Button variant="link" className="p-0 h-auto text-brand-purple flex items-center gap-1">
                Ver relatório completo <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
