import "./index.css"
import { useState } from "react";

export default function LandingPage() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="logo">
          <div className="logo-icon">🏥</div>
          <span>Dr. Bot</span>
        </div>
        <div className="header-buttons">
          <button className="btn btn-secondary" onClick={() => setShowLogin(true)}>Login</button>
          <button className="btn btn-primary" onClick={() => setShowRegistration(true)}>Criar Conta</button>
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
          <button className="btn btn-primary btn-large" onClick={() => setShowRegistration(true)}>Começar</button>
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

  {showRegistration && <RegistrationModal onClose={() => setShowRegistration(false)} />}
  {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}

function RegistrationModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic clinic information
    clinicName: "",
    cnpj: "",
    specialties: "",
    legalName: "",
    description: "",
    logo: null,
    // Step 2: Location & contact
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({ ...prev, logo: file }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("[v0] Registration data:", formData)
    // Handle registration submission here
    alert("Registration submitted successfully!")
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Criar conta da clínica</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="step-indicator">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            <div className="step-number">1</div>
            <div className="step-label">Informações iniciais</div>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <div className="step-label">Localização & Contato</div>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNext} className="registration-form">
            <div className="form-section">
              <h3 className="section-title">Informações iniciais da clínica</h3>

              <div className="form-group">
                <label className="form-label required">Nome da Clínica</label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Nome da clínica"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">CNPJ</label>
                <input
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="00.000.000/0000-00"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Especialidades Oferecidas</label>
                <input
                  type="text"
                  name="specialties"
                  value={formData.specialties}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Cardiologia, Pediatria, Dermatologia"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Corpo/Legal Name (Razão Social)</label>
                <input
                  type="text"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Digite o nome legal (opcional)"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descrição/Sobre a Clínica</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Fale sobre sua clínica (opcional)"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Logo/Imagem</label>
                <input type="file" onChange={handleFileChange} className="form-file" accept="image/*" />
                <p className="form-hint">Insira o logo da clínica (opcional)</p>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Próximo Passo →
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-section">
              <h3 className="section-title">Localização & Contato</h3>

              <div className="form-row">
                <div className="form-group flex-3">
                  <label className="form-label required">Endereço</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Street name"
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label required">Número</label>
                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="No."
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Complemento</label>
                <input
                  type="text"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Apt, suite, floor, etc."
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Bairro</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter neighborhood"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-2">
                  <label className="form-label required">Cidade</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label required">Estado (UF)</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="UF"
                    maxLength="2"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">ZIP/CEP</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="00000-000"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Email da Clínica</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="contact@clinic.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Link do site ou das redes sociais</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://www.yourwebsite.com (optional)"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                ← Voltar
              </button>
              <button type="submit" className="btn btn-primary">
                Completar Registro
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function LoginModal({ onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("[v0] Login data:", formData)
    // Handle login submission here
    alert("Login successful!")
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Faça seu login</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-section">
            <div className="form-group">
              <label className="form-label required">Email da clínica</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="contato@clinica.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label required">Senha</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Digite sua senha"
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="form-checkbox" />
                <span>Lembrar minha senha </span>
              </label>
              <a href="#" className="forgot-password">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-full">
              Login
            </button>
          </div>

          <div className="form-footer">
            <p className="footer-text">
              Não tem uma conta?{" "}
              <a
                href="#"
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault()
                  onClose()
                }}
              >
                Criar Conta
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
