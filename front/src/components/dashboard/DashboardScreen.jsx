import React from 'react';
import TotalRevenue from './TotalRevenue';
import Sales from './Sales';
import Visitors from './Visitors';
import SalesMap from './SalesMap';
import VolumeService from './VolumeService';

const DashboardScreen = () => {
  return (
    <div className="flex flex-wrap mt-[10px]">
      <Sales />
      <TotalRevenue />
      <Visitors />
      <SalesMap />
      <VolumeService />
    </div>
  );
};

export default DashboardScreen;
