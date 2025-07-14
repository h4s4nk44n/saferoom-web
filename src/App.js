import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import ScenariosSection from './components/ScenariosSection';
import TeamSection from './components/TeamSection';
import CoreTechnologiesSection from './components/CoreTechnologiesSection';
import VideoComparisonSection from './components/VideoComparisonSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <CoreTechnologiesSection />
      <ScenariosSection />
      <VideoComparisonSection />
      <TeamSection />
    </div>
  );
}

export default App;
