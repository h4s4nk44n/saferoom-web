import React from 'react';

const team = [
  { name: 'Abdurahman Karadağ', role: 'Founder & CEO', email: 'abdurrahmankaradag19@gmail.com', image: '/images/karadag_pp.jpeg' },
  { name: 'Sırdaş Özdemir', role: 'Network Systems Analyst & Protocol Engineer', email: 'srdas_2604@outlook.com', image: '/images/sirdas_pp2.jpeg' },
  { name: 'Hasan Kaan Doygun', role: 'Chief AI SuperResolution Engineer', email: 'hasankaan5151@gmail.com', image: '/images/hasan_pp.jpeg' },
  { name: 'Hayri Talha Özkan', role: 'Lead UI/UX Architect', email: 'ozkantalha895@gmail.com', image: '/images/hayri_pp.jpeg' },
];

const TeamSection = () => (
  <section className="team" id="team">
    <div className="section-inner-full">
      <h2>Meet the Team</h2>
      <p className="section-intro-full">The innovators behind SafeRoom's groundbreaking technology.</p>
      <div className="team-list">
        {team.map((member, i) => (
          <div className="team-member" key={i}>
            <img src={member.image} alt={member.name} className="team-member-photo" />
            <h3 className="team-member-name">{member.name}</h3>
            <p className="team-member-role">{member.role}</p>
            <a href={`mailto:${member.email}`} className="team-member-email">{member.email}</a>
          </div>
        ))}
      </div>
      <p className="contact-email">For general inquiries, contact us at: <a href="mailto:info@saferoom.com">saferoom.bussiness@gmail.com</a></p>
    </div>
  </section>
);

export default TeamSection;