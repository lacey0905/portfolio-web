export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1 className="hero-title">안녕하세요, 개발자입니다</h1>
        <p className="hero-description">
          창의적이고 혁신적인 웹 솔루션을 만드는 것을 좋아합니다. 사용자 경험을
          최우선으로 생각하며, 최신 기술을 활용한 프로젝트를 진행합니다.
        </p>
        <div className="hero-buttons">
          <a href="/archive" className="btn btn-primary">
            프로젝트 보기
          </a>
          <a href="#contact" className="btn btn-secondary">
            연락하기
          </a>
        </div>
      </section>

      <section className="skills">
        <h2 className="section-title">기술 스택</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>Frontend</h3>
            <ul>
              <li>React</li>
              <li>Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>Python</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3>Tools</h3>
            <ul>
              <li>Git</li>
              <li>Docker</li>
              <li>AWS</li>
              <li>Vercel</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2 className="section-title">연락처</h2>
        <div className="contact-info">
          <p>이메일: developer@example.com</p>
          <p>GitHub: github.com/username</p>
          <p>LinkedIn: linkedin.com/in/username</p>
        </div>
      </section>
    </div>
  );
}
