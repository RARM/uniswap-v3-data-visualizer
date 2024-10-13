'use client';
import React from 'react';
import HorizontalBar from '@/app/ui/d3-components/horizontal-bar';

const UIController: React.FC = () => {
  let sample_values = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 30 },
    { label: 'D', value: 40 },
    { label: 'E', value: 50 }
  ];
  
  return (
    <div>
      <h1>Data Visualizer</h1>
      <HorizontalBar
        values={sample_values}
      />
    </div>
  );
};

export default UIController;