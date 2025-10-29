import { Thermometer, Droplet, RefreshCw } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import AlertBanner from '@/components/AlertBanner';
import { Button } from '@/components/ui/button';
import { useSensorData } from '@/hooks/useSensorData';
import { toast } from 'sonner';

const Dashboard = () => {
  const { currentReading, alertStatus, refreshData } = useSensorData();

  const handleRefresh = () => {
    refreshData();
    toast.success('Data refreshed');
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time pond monitoring</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <AlertBanner alertStatus={alertStatus} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          title="Water Temperature"
          value={currentReading.temperature}
          unit="°C"
          icon={Thermometer}
          status={alertStatus.temperature}
          safeRange="20-32°C"
        />
        <MetricCard
          title="pH Level"
          value={currentReading.pH}
          unit="pH"
          icon={Droplet}
          status={alertStatus.pH}
          safeRange="6.5-8.5"
        />
      </div>

      <div className="bg-card rounded-lg shadow-card p-6 border">
        <h2 className="text-xl font-semibold mb-4">Latest Reading</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Timestamp</span>
            <span className="font-medium">
              {new Date(currentReading.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Temperature</span>
            <span className="font-medium">{currentReading.temperature}°C</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">pH Level</span>
            <span className="font-medium">{currentReading.pH}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
