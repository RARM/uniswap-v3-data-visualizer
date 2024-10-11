'use client';
import React from 'react';
import VerticalBar from '@/app/ui/d3-components/vertical-bar';

const UIController: React.FC = () => {
  return (
    <div>
      <h1>Data Visualizer</h1>
      <VerticalBar />
    </div>
  );
};

export default UIController;