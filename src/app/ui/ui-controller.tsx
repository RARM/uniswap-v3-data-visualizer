'use client';
import React from 'react';
import HorizontalBar from '@/app/ui/d3-components/horizontal-bar';

const UIController: React.FC = () => {
  let sample_values = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 30 },
    { label: 'D', value: 40 },
    { label: 'E', value: 50 },
    { label: 'F', value: 60 },
    { label: 'G', value: 70 },
    { label: 'H', value: 80 },
    { label: 'I', value: 90 },
    { label: 'J', value: 100 }
  ];
  
  return (
    <div>
      <h1>Data Visualizer</h1>
      <div className="bg-gray-100 rounded">
        <HorizontalBar
          values={sample_values}
          values_symbol="$"
          x_label="X Label"
          y_label="Y Label"
        />
      </div>
    </div>
  );
};

export default UIController;