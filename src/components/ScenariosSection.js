import React from 'react';

const scenarios = [
  {
    title: 'Military & Defense',
    desc: 'Encrypted field communication without reliance on base infrastructure. Zero server, zero interception.',
    imagePath: '/images/army.jpg'
  },
  {
    title: 'Disaster Resilience',
    desc: 'Operates independently of central infrastructure. Maintain connectivity when traditional systems collapse.',
    imagePath: '/images/earthquake.jpg'
  },
  {
    title: 'Global Enterprise',
    desc: 'Enable secure, serverless boardroom conversations across borders—with no cloud relay involved.',
    imagePath: '/images/enterprise.jpeg'
  }
];

const ScenariosSection = () => {
  return (
    <React.Fragment>
      <div className="scenario-intro-page" id="scenarios">
        <h2 className="section-title-full">Real-World Scenarios, Real Impact</h2>
        <div className="section-intro-full">SafeRoom is trusted where failure is not an option.</div>
      </div>

      {scenarios.map((s, i) => (
        <div 
          className="scenario-item" 
          key={i}
          style={{ '--bg-image': `url(${s.imagePath})` }}
        >
          <div className="scenario-content">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default ScenariosSection;