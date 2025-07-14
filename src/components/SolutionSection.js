import React from 'react';

const solutions = [
  {
    title: 'SafeRoom Core',
    desc: 'A relay-free, end-to-end encrypted protocol powered by NATGhost and Phantom Datagram. Designed to eliminate infrastructure risk and ensure uncompromised privacy.',
    image: '/images/natghost2.png'
  },
  {
    title: 'SafeRoom Mesh',
    desc: 'Offline, Bluetooth- or Wi-Fi-Direct-based communication that keeps teams connected—even without internet.',
    image: '/images/mesh.png'
  }
];

const SolutionSection = () => (
  <section className="solution solution-full" id="solution">
    <div className="section-inner-full">
      <h2 className="section-title-full">A Modular, Future-Proof Platform</h2>
      <div className="section-intro-full">Explore SafeRoom’s foundational technologies—engineered for privacy, autonomy, and resilience.</div>
      <div className="solution-grid-full">
        {solutions.map((s, i) => (
          <div className="solution-card-full" key={i}>
            <div className="solution-image-container">
              <img src={s.image} alt={`${s.title} icon`} className="solution-image" />
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
      <a href="#comparison" className="cta-btn-full"><span>See SafeRoom in Action</span></a>
    </div>
  </section>
);

export default SolutionSection;