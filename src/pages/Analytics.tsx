import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSensorData } from '@/hooks/useSensorData';

type TimeRange = '1h' | '6h' | '24h';

const Analytics = () => {
  const { historicalData } = useSensorData();
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');

  const getFilteredData = () => {
    const now = new Date();
    const hoursAgo = timeRange === '1h' ? 1 : timeRange === '6h' ? 6 : 24;
    const cutoffTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    
    return historicalData
      .filter(reading => new Date(reading.timestamp) >= cutoffTime)
      .map(reading => ({
        ...reading,
        time: new Date(reading.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      }));
  };

  const filteredData = getFilteredData();

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Historical data trends</p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={timeRange === '1h' ? 'default' : 'outline'}
          onClick={() => setTimeRange('1h')}
        >
          Last Hour
        </Button>
        <Button
          variant={timeRange === '6h' ? 'default' : 'outline'}
          onClick={() => setTimeRange('6h')}
        >
          Last 6 Hours
        </Button>
        <Button
          variant={timeRange === '24h' ? 'default' : 'outline'}
          onClick={() => setTimeRange('24h')}
        >
          Last 24 Hours
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Temperature Over Time</CardTitle>
          <CardDescription>Water temperature readings in Celsius</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="time" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                domain={[15, 35]}
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
                name="Temperature (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>pH Level Over Time</CardTitle>
          <CardDescription>Water acidity/alkalinity measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="time" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                domain={[5, 10]}
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="pH" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--success))' }}
                name="pH Level"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
