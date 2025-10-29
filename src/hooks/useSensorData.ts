import { useState, useEffect } from 'react';

export interface SensorReading {
  timestamp: string;
  temperature: number;
  pH: number;
}

export interface AlertStatus {
  temperature: 'normal' | 'warning' | 'critical';
  pH: 'normal' | 'warning' | 'critical';
}

const generateRandomReading = (): SensorReading => {
  // Temperature range: 18°C to 34°C (sometimes outside safe range)
  const temperature = 20 + Math.random() * 14 + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 3 : -3) : 0);
  
  // pH range: 6.0 to 9.0 (sometimes outside safe range)
  const pH = 6.5 + Math.random() * 2 + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 0.8 : -0.8) : 0);
  
  return {
    timestamp: new Date().toISOString(),
    temperature: parseFloat(temperature.toFixed(1)),
    pH: parseFloat(pH.toFixed(1)),
  };
};

const getAlertStatus = (reading: SensorReading): AlertStatus => {
  const tempStatus = 
    reading.temperature < 20 || reading.temperature > 32 ? 'critical' :
    reading.temperature < 22 || reading.temperature > 30 ? 'warning' : 'normal';
  
  const pHStatus = 
    reading.pH < 6.5 || reading.pH > 8.5 ? 'critical' :
    reading.pH < 6.8 || reading.pH > 8.2 ? 'warning' : 'normal';
  
  return { temperature: tempStatus, pH: pHStatus };
};

export const useSensorData = () => {
  const [currentReading, setCurrentReading] = useState<SensorReading>(generateRandomReading());
  const [historicalData, setHistoricalData] = useState<SensorReading[]>([]);
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({ temperature: 'normal', pH: 'normal' });

  // Initialize with some historical data
  useEffect(() => {
    const initialData: SensorReading[] = [];
    const now = new Date();
    
    for (let i = 24; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
      initialData.push({
        timestamp: timestamp.toISOString(),
        temperature: 24 + Math.random() * 6,
        pH: 7.0 + Math.random() * 1.0,
      });
    }
    
    setHistoricalData(initialData);
  }, []);

  // Simulate real-time data updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newReading = generateRandomReading();
      setCurrentReading(newReading);
      setAlertStatus(getAlertStatus(newReading));
      
      setHistoricalData(prev => {
        const updated = [...prev, newReading];
        // Keep last 100 readings
        return updated.slice(-100);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    currentReading,
    historicalData,
    alertStatus,
    refreshData: () => setCurrentReading(generateRandomReading()),
  };
};
