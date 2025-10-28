import "./index.css"

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="logo">
          <div className="logo-icon">🏥</div>
          <span>Dr. Bot</span>
        </div>
        <div className="header-buttons">
          <button className="btn btn-secondary">Login</button>
          <button className="btn btn-primary">Criar Conta</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-label">Plataforma de Agendamento Médico</div>
        <h1 className="hero-title">Otimize o sistema da sua clínica</h1>
        <p className="hero-description">
          Potencialize seu negocio com um sistema de agendamento inteligente.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary btn-large">Começar</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3 className="feature-title">Bot inteligente</h3>
            <p className="feature-description">
              O nosso bot utiliza IA para otimizar o agendamento de consultas, reduzindo faltas e maximizando a eficiência.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3 className="feature-title">Doctor management</h3>
            <p className="feature-description">
              Com poucos clique administre os dados dos seus médicos de forma simples e eficiente.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
