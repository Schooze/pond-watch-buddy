import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  status: 'normal' | 'warning' | 'critical';
  safeRange: string;
}

const statusConfig = {
  normal: {
    bg: 'bg-gradient-to-br from-success/10 to-success/5',
    border: 'border-success',
    text: 'text-success',
    label: 'Normal',
  },
  warning: {
    bg: 'bg-gradient-to-br from-warning/10 to-warning/5',
    border: 'border-warning',
    text: 'text-warning',
    label: 'Warning',
  },
  critical: {
    bg: 'bg-gradient-to-br from-destructive/10 to-destructive/5',
    border: 'border-destructive',
    text: 'text-destructive',
    label: 'Critical',
  },
};

const MetricCard = ({ title, value, unit, icon: Icon, status, safeRange }: MetricCardProps) => {
  const config = statusConfig[status];

  return (
    <Card className={cn('shadow-card hover:shadow-elevated transition-all animate-fade-in', config.bg, `border-2 ${config.border}`)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={cn('h-5 w-5', config.text)} />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{value}</span>
            <span className="text-xl text-muted-foreground">{unit}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Safe: {safeRange}</span>
            <span className={cn('font-semibold px-2 py-1 rounded', config.bg, config.text)}>
              {config.label}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
