'use client';
import React from 'react';
import HorizontalBar from '@/app/ui/d3-components/horizontal-bar';

const UIController: React.FC = () => {
  return (
    <div>
      <h1>Data Visualizer</h1>
      <HorizontalBar />
    </div>
  );
};

export default UIController;