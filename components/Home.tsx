import React from 'react';
import { Hero } from './Hero';
import { Works } from './Works';
import { Philosophy } from './Philosophy';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Works />
      <Philosophy />
    </>
  );
};