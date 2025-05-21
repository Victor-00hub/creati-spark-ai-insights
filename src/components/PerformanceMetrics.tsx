
import React from 'react';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PerformanceData {
  name: string;
  original: number;
  optimized: number;
}

const mockPerformanceData: PerformanceData[] = [
  { name: 'Cliques', original: 245, optimized: 387 },
  { name: 'Conversões', original: 32, optimized: 58 },
  { name: 'Engajamento', original: 523, optimized: 748 },
  { name: 'Compartilhamentos', original: 67, optimized: 124 },
  { name: 'Comentários', original: 89, optimized: 156 },
];

const mockTimeData = [
  { dia: '01/05', original: 120, optimized: 120 },
  { dia: '02/05', original: 132, optimized: 145 },
  { dia: '03/05', original: 125, optimized: 167 },
  { dia: '04/05', original: 150, optimized: 190 },
  { dia: '05/05', original: 142, optimized: 210 },
  { dia: '06/05', original: 160, optimized: 245 },
  { dia: '07/05', original: 175, optimized: 267 },
];

const calculateImprovement = (original: number, optimized: number) => {
  const improvement = ((optimized - original) / original) * 100;
  return `+${improvement.toFixed(1)}%`;
};

interface PerformanceMetricsProps {
  creativeId: string;
}

const PerformanceMetrics = ({ creativeId }: PerformanceMetricsProps) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="comparison">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comparison">Comparação</TabsTrigger>
          <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="comparison" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Métricas de Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => {
                        return [value, name === 'original' ? 'Original' : 'Otimizado'];
                      }}
                      labelFormatter={(value) => `Métrica: ${value}`}
                    />
                    <Legend formatter={(value) => value === 'original' ? 'Original' : 'Otimizado'} />
                    <Bar dataKey="original" fill="#8884d8" name="Original" />
                    <Bar dataKey="optimized" fill="#82ca9d" name="Otimizado" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {mockPerformanceData.map((item) => (
                  <div key={item.name} className="p-3 border rounded-lg">
                    <p className="text-sm text-gray-500">{item.name}</p>
                    <div className="flex justify-between items-end mt-1">
                      <div className="text-lg font-semibold">{item.optimized}</div>
                      <div className="text-sm text-green-600 font-medium">
                        {calculateImprovement(item.original, item.optimized)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Evolução de Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockTimeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="original"
                      name="Original"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="optimized"
                      name="Otimizado"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Insights</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    A versão otimizada mostrou um ganho consistente de desempenho ao longo do tempo
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    Os cliques aumentaram em média 58% após a otimização
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    A taxa de conversão melhorou significativamente após o dia 03/05
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMetrics;
