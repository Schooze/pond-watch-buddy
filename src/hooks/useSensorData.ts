import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface SensorReading {
  timestamp: string;
  temperature: number;
  pH: number;
}

export interface AlertStatus {
  temperature: 'normal' | 'warning' | 'critical';
  pH: 'normal' | 'warning' | 'critical';
}

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
  const [currentReading, setCurrentReading] = useState<SensorReading | null>(null);
  const [historicalData, setHistoricalData] = useState<SensorReading[]>([]);
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({ temperature: 'normal', pH: 'normal' });

  // Fetch latest and historical sensor data from Supabase
  const fetchSensorData = async () => {
    // Fetch latest readings for each sensor type
    const { data: latestTemp, error: tempError } = await supabase
      .from('sensor_log')
      .select('*')
      .eq('sensor_type', 'temperature')
      .order('timestamp', { ascending: false })
      .limit(1);
    const { data: latestPh, error: phError } = await supabase
      .from('sensor_log')
      .select('*')
      .eq('sensor_type', 'pH')
      .order('timestamp', { ascending: false })
      .limit(1);
    
    if (latestTemp && latestPh && latestTemp[0] && latestPh[0]) {
      const reading: SensorReading = {
        timestamp: latestTemp[0].timestamp,
        temperature: Number(latestTemp[0].value),
        pH: Number(latestPh[0].value),
      };
      setCurrentReading(reading);
      setAlertStatus(getAlertStatus(reading));
    }

    // Fetch historical data (last 25 readings for each type)
    const { data: tempHistory } = await supabase
      .from('sensor_log')
      .select('*')
      .eq('sensor_type', 'temperature')
      .order('timestamp', { ascending: false })
      .limit(25);
    const { data: phHistory } = await supabase
      .from('sensor_log')
      .select('*')
      .eq('sensor_type', 'pH')
      .order('timestamp', { ascending: false })
      .limit(25);
    if (tempHistory && phHistory) {
      // Merge by timestamp (simple join)
      const merged: SensorReading[] = tempHistory.map((temp, i) => ({
        timestamp: temp.timestamp,
        temperature: Number(temp.value),
        pH: phHistory[i] ? Number(phHistory[i].value) : NaN,
      }));
      setHistoricalData(merged);
    }
  };

  useEffect(() => {
    fetchSensorData();
    // Optionally, poll every 5s for real-time updates
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  return {
    currentReading,
    historicalData,
    alertStatus,
    refreshData: fetchSensorData,
  };
};
