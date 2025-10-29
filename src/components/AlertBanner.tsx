import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { AlertStatus } from '@/hooks/useSensorData';

interface AlertBannerProps {
  alertStatus: AlertStatus;
}

const AlertBanner = ({ alertStatus }: AlertBannerProps) => {
  const hasCritical = alertStatus.temperature === 'critical' || alertStatus.pH === 'critical';
  const hasWarning = alertStatus.temperature === 'warning' || alertStatus.pH === 'warning';

  if (!hasCritical && !hasWarning) {
    return null;
  }

  const alerts = [];
  if (alertStatus.temperature === 'critical') {
    alerts.push('Temperature is at critical levels');
  } else if (alertStatus.temperature === 'warning') {
    alerts.push('Temperature is outside optimal range');
  }

  if (alertStatus.pH === 'critical') {
    alerts.push('pH level is at critical levels');
  } else if (alertStatus.pH === 'warning') {
    alerts.push('pH level is outside optimal range');
  }

  return (
    <Alert 
      variant={hasCritical ? 'destructive' : 'default'}
      className="animate-fade-in border-2"
    >
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="font-bold">
        {hasCritical ? 'Critical Alert!' : 'Warning'}
      </AlertTitle>
      <AlertDescription>
        {alerts.join('. ')}. Immediate attention may be required.
      </AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
