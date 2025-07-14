import React from 'react';

const technologies = [
  {
    title: 'NATGhost',
    tagline: 'A proprietary NAT traversal engine designed for complex network topologies.',
    description: 'NATGhost bypasses symmetric and carrier-grade NATs using multi-vector port flooding and pseudo-random collision techniques. It establishes direct, peer-to-peer data channels where other systems fail, ensuring maximum connectivity and minimal latency.'
  },
  {
    title: 'Phantom Datagram Protocol (PDP)',
    tagline: 'A firewall-aware tunneling layer for covert data delivery.',
    description: 'PDP encapsulates encrypted payloads within traffic structures that mimic legitimate protocols. This allows SafeRoom to traverse restrictive corporate firewalls and deep packet inspection systems by utilizing whitelisted ports like 80/443, rendering dataflows invisible to network sentinels.'
  },
  {
    title: 'GhostCompression Protocol (GCP)',
    tagline: 'A real-time compression algorithm optimized for low-bandwidth environments.',
    description: 'GCP applies a specialized, bit-level compression model built for the burst-mode characteristics of UDP traffic. Under low-MTU or congested network conditions, it can increase effective data throughput by up to 65%, ensuring call clarity and data integrity.'
  },
  {
    title: 'QuantumGuard Encryption Engine',
    tagline: 'A post-quantum cryptographic framework for long-term data security.',
    description: 'QuantumGuard utilizes lattice-based cryptographic primitives and a hybrid forward secrecy model. This architecture ensures communications are resilient against decryption by both current supercomputers and future-state quantum adversaries.'
  }
];

const CoreTechnologiesSection = () => (
  <section className="tech-section" id="technologies">
    <div className="section-inner-full">
      <h2 className="section-title-full">Core Technologies</h2>
      <div className="tech-grid">
        {technologies.map((tech, i) => (
          <div className="tech-module" key={i}>
            <h3>{tech.title}</h3>
            <p className="tech-tagline">{tech.tagline}</p>
            <p className="tech-description">{tech.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CoreTechnologiesSection; 