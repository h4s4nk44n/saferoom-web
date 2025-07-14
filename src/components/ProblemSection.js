import React from 'react';

const problems = [
  'Exposure to cyber threats and server-side attacks',
  'Regulatory risk from data leaks and centralized storage',
  'Latency and downtime due to relay server bottlenecks',
  'Rising cloud expenses and operational inefficiencies',
];

const ProblemSection = () => (
  <section className="problem" id="problem">
    <div className="section-inner-full">
      <h2>The Hidden Costs of Traditional Communication Infrastructure</h2>
      <ul className="problem-list">
        {problems.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default ProblemSection;