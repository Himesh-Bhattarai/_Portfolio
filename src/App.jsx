import React from 'react';
import Dashboard from './components/Dashboard';
import { useReadmeData } from './hooks/useReadmeData';

export default function App() {
  const { data, status, error, refresh, isFallback } = useReadmeData();
  return <Dashboard content={data} status={status} error={error} onRefresh={refresh} isFallback={isFallback} />;
}
