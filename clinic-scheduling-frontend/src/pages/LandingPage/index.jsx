"use client"

import "./index.css"
import { useState } from "react"

function App() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  console.log("[v0] Modal states - showLogin:", showLogin, "showRegistration:", showRegistration)

  return (
    <div className="landing-page">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                  fill="currentColor"
                />
                <path
                  d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="logo-text">Dr. Bot</span>
          </div>
          <div className="header-actions">
            <a href="#comunidade" className="nav-link">
              Comunidade
            </a>
            <button
              className="btn-login"
              onClick={() => {
                console.log("[v0] Login button clicked")
                setShowLogin(true)
              }}
            >
              Login
            </button>
            <button
              className="cta-button-header"
              onClick={() => {
                console.log("[v0] Registration button clicked")
                setShowRegistration(true)
              }}
            >
              Criar Conta
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-left">
              <div className="badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                    fill="currentColor"
                  />
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                    fill="currentColor"
                  />
                </svg>
                O Futuro do Agendamento Médico
              </div>
              <h1 className="hero-title">
                Atender bem ao cliente
                <br />
                <span className="hero-title-accent">é o caminho para o sucesso</span>
              </h1>
              <p className="hero-description">
                Ajude seus pacientes a marcarem consultas rapidamente, sem terem que ficar longas horas no telefone ou
                falando com seu assistente chato. Automatize suas consultas com Dr. Bot: seu agente que não só marca as
                consultas automaticamente com seus pacientes por WhatsApp, mas também lhe oferece uma inovadora
                interface de gestão para sua clínica: pacientes, médicos e controle financeiro em um só lugar e de forma
                totalmente personalizada.
              </p>
              <a
                href="https://wa.me/5586999108327?text=Olá!%20Quero%20fazer%20um%20teste%20grátis%20do%20Dr.%20Bot"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button-large"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    fill="currentColor"
                  />
                </svg>
                Teste Grátis Agora
              </a>
            </div>
            <div className="hero-right">
              <div className="phone-mockup">
                <div className="phone-frame">
                  <div className="phone-notch"></div>
                  <div className="phone-screen">
                    <div className="whatsapp-header">
                      <div className="whatsapp-back">←</div>
                      <div className="whatsapp-avatar"></div>
                      <div className="whatsapp-info">
                        <div className="whatsapp-name">Dr. Bot</div>
                        <div className="whatsapp-status">online</div>
                      </div>
                    </div>
                    <div className="whatsapp-messages">
                      <div className="message-bot">
                        <div className="message-bubble bot">
                          Olá! Sou o Dr. Bot 👋
                          <br />
                          Como posso ajudar você hoje?
                        </div>
                      </div>
                      <div className="message-user">
                        <div className="message-bubble user audio-message">
                          <div className="audio-icon">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <div className="audio-wave">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <span className="audio-duration">0:23</span>
                        </div>
                      </div>
                      <div className="message-bot">
                        <div className="message-bubble bot">
                          Entendi perfeitamente! Você precisa de uma consulta com cardiologista. Deixa eu verificar os
                          melhores horários disponíveis para você 🔍
                        </div>
                      </div>
                      <div className="message-bot">
                        <div className="message-bubble bot audio-message">
                          <div className="audio-icon">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <div className="audio-wave">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <span className="audio-duration">0:35</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="floating-dots">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="benefits-container">
            <div className="section-header">
              <h2 className="section-title">
                O futuro do agendamento <span className="title-accent">já chegou</span>
              </h2>
              <p className="section-description">
                Transforme a experiência de agendamento da sua clínica com inteligência artificial
              </p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-image">
                  <img src="/pacientefeliz.png" alt="Paciente feliz digitando no WhatsApp" />
                </div>
                <div className="benefit-content">
                  <div className="benefit-icon patient">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <h3 className="benefit-title">Pacientes sem estresse</h3>
                  <p className="benefit-description">
                    Acabou a ansiedade de ligar e não conseguir atendimento. Seus pacientes agendam quando quiserem,
                    pelo WhatsApp, sem esperar em filas telefônicas intermináveis.
                  </p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-image">
                  <img src="/medicoconfiante.png" alt="Médico confiante" />
                </div>
                <div className="benefit-content">
                  <div className="benefit-icon clinic">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
                    </svg>
                  </div>
                  <h3 className="benefit-title">Controle total da clínica</h3>
                  <p className="benefit-description">
                    Gerencie todos os dados de pacientes e médicos em um só lugar. Tenha visibilidade completa da sua
                    agenda, otimize horários e reduza faltas com lembretes automáticos.
                  </p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-image">
                  <img
                    src="/dashboard.png"
                    alt="Sistema de gestão administrativo"
                  />
                </div>
                <div className="benefit-content">
                  <div className="benefit-icon management">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                    </svg>
                  </div>
                  <h3 className="benefit-title">Sistema de gestão completo</h3>
                  <p className="benefit-description">
                    Interface administrativa intuitiva para gerenciar pacientes, médicos, horários e controle
                    financeiro. Tudo integrado e personalizado para sua clínica, com relatórios em tempo real.
                  </p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-image">
                  <img src="/escudo.png" alt="Segurança de dados em saúde" />
                </div>
                <div className="benefit-content">
                  <div className="benefit-icon security">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                    </svg>
                  </div>
                  <h3 className="benefit-title">IA inteligente e segura</h3>
                  <p className="benefit-description">
                    Nossa inteligência artificial entende áudio e texto como um humano, mas com segurança de dados
                    médicos. Criptografia de ponta protege informações de pacientes e médicos 24/7.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="step-section">
          <div className="step-container">
            <div className="step-left">
              <div className="phone-mockup-small">
                <div className="phone-frame-small">
                  <div className="phone-screen-small">
                    <div className="chat-preview">
                      <div className="chat-message user-msg">Quero agendar para amanhã</div>
                      <div className="chat-message bot-msg">
                        Perfeito! Encontrei 3 horários disponíveis com Dr. Silva amanhã: 09:00, 14:30 e 16:00. Qual
                        prefere?
                      </div>
                      <div className="chat-message user-msg">14:30 está ótimo!</div>
                      <div className="chat-message bot-msg">
                        ✅ Consulta agendada para amanhã às 14:30 com Dr. Silva. Você receberá um lembrete 1 hora antes!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="step-right">
              <div className="step-badge">2</div>
              <h2 className="step-title">Simples como uma conversa</h2>
              <p className="step-description">
                Fale ou escreva naturalmente. Nossa IA entende áudio e texto, responde como um humano e encontra o
                melhor horário para você em segundos. Sem complicação, sem burocracia.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-left">
              <div className="contact-image">
                <img src="/medicos.png" alt="Equipe médica" />
              </div>
              <div className="contact-text">
                <h2 className="contact-title">
                  Transforme sua clínica
                  <br />
                  <span className="contact-title-accent">com tecnologia do futuro</span>
                </h2>
                <p className="contact-description">
                  Junte-se às clínicas que já revolucionaram seus agendamentos. O Dr. Bot usa IA de última geração para
                  entender pacientes, gerenciar horários e proteger dados com segurança hospitalar. Teste grátis e veja
                  a diferença!
                </p>
              </div>
            </div>
            <div className="contact-right">
              <div className="qr-card">
                <h3 className="qr-title">Pronto para testar?</h3>
                <p className="qr-subtitle">
                  Escaneie o QR Code ou clique no botão para começar seu teste grátis no WhatsApp!
                </p>
                <div className="qr-code">
                  <img src="/qrcodegrande.png" alt="QR Code Dr. Bot" />
                </div>
                <p className="qr-note">Aponte a câmera do seu celular para o QR Code</p>
                <a
                  href="https://wa.me/5586999108327?text=Olá!%20Quero%20fazer%20um%20teste%20grátis%20do%20Dr.%20Bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                      fill="currentColor"
                    />
                  </svg>
                  Falar com o Dr. Bot
                </a>
                <p className="qr-phone">📱 (86) 99910-8327</p>
                <p className="qr-response">Teste grátis • Agende sua primeira consulta agora</p>
              </div>
            </div>
          </div>
        </section>

        <section className="community-section" id="comunidade">
          <div className="community-container">
            <div className="section-header">
              <h2 className="section-title">
                Clínicas parceiras que <span className="title-accent">confiam no Dr. Bot</span>
              </h2>
              <p className="section-description">
                Junte-se à nossa comunidade de clínicas que revolucionaram seus agendamentos
              </p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="clinic-logo">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
                    </svg>
                  </div>
                  <div className="clinic-info">
                    <h3 className="clinic-name">Clínica FTSA Serviços médicos</h3>
                    <p className="clinic-location">Teresina, PI</p>
                  </div>
                </div>
                <p className="testimonial-text">
                  "Ganhamos clientes simplesmente por que tinha alguém para atender no nosso sistema e em outros não, isso abriu oportunidades para pessoas conhecerem meu trabalho e hoje ter meu trabalho valorizado."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src="/donadeclinica2.png" alt="Dra. Mariana Santos" />
                  </div>
                  <div className="author-info">
                    <p className="author-name">Dra. Mariana Santos</p>
                    <p className="author-role">Diretora Médica</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="clinic-logo">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
                    </svg>
                  </div>
                  <div className="clinic-info">
                    <h3 className="clinic-name">Centro Médico Esperança</h3>
                    <p className="clinic-location">Teresina, PI</p>
                  </div>
                </div>
                <p className="testimonial-text">
                  "Incrível como a IA entende até áudio! Nossos pacientes mais idosos conseguem agendar facilmente
                  falando pelo WhatsApp. A taxa de no-show caiu drasticamente com os lembretes automáticos."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src="/donodeclinica.png" alt="Dr. Roberto Lima" />
                  </div>
                  <div className="author-info">
                    <p className="author-name">Dr. Roberto Lima</p>
                    <p className="author-role">Proprietário</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="clinic-logo">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
                    </svg>
                  </div>
                  <div className="clinic-info">
                    <h3 className="clinic-name">Policlínica Saúde Total</h3>
                    <p className="clinic-location">Fortaleza, CE</p>
                  </div>
                </div>
                <p className="testimonial-text">
                  "A interface de gestão é fantástica! Conseguimos visualizar toda a agenda, controlar financeiro e
                  gerenciar dados de pacientes em um só lugar. Aumentamos nossa eficiência em 60%."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src="/pacientemulherfeliz.png" alt="Ana Paula Costa" />
                  </div>
                  <div className="author-info">
                    <p className="author-name">Ana Paula Costa</p>
                    <p className="author-role">Gerente Administrativa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="community-stats">
              <div className="stat-item">
                <div className="stat-number">1+</div>
                <div className="stat-label">Clínicas Parceiras (não chegue tarde demais, faça parte da família também!)</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Consultas Agendadas</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Satisfação</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Disponibilidade</div>
              </div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="team-container">
            <div className="section-header">
              <h2 className="section-title">
                Conheça a equipe <span className="title-accent">por trás do Dr. Bot</span>
              </h2>
              <p className="section-description">Desenvolvedores apaixonados por tecnologia e inovação em saúde</p>
            </div>

            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">
                  <img src="/oscar.png" alt="Oscar Rodrigues" />
                </div>
                <h3 className="member-name">Oscar Rodrigues</h3>
                <p className="member-role">Co-fundador e IA para automações</p>
              </div>

              <div className="team-member">
                <div className="member-avatar">
                  <img src="/djairo.png" alt="Djairo Dantas" />
                </div>
                <h3 className="member-name">Djairo Dantas</h3>
                <p className="member-role">Co-fundador & rei do deploy</p>
              </div>

              <div className="team-member">
                <div className="member-avatar">
                  <img src="/ruan.png" alt="Ruan Costa" />
                </div>
                <h3 className="member-name">Ruan César</h3>
                <p className="member-role">Co-fundador & especialista em frontend</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">
                  <img src="/marcus.png" alt="Marcus Vinícius" />
                </div>
                <h3 className="member-name">Marcus Vinícus</h3>
                <p className="member-role">Co-fundador & especialista em frontend</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">
                  <img src="/erick.png" alt="Erick Ferreira" />
                </div>
                <h3 className="member-name">Erick Oliveira</h3>
                <p className="member-role">Co-fundador & especialista em banco de dados</p>
              </div>

              <div className="team-member">
                <div className="member-avatar">
                  <img src="/leonardo.png" alt="Leonardo Moretti" />
                </div>
                <h3 className="member-name">Leonardo Morreti</h3>
                <p className="member-role">Co-fundador & especialista em segurança digital</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                  fill="currentColor"
                />
                <path
                  d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="logo-text">Dr. Bot</span>
          </div>
          <p className="footer-text">© 2025 Dr. Bot. Todos os direitos reservados.</p>
        </div>
      </footer>

      {showRegistration && (
        <>
          {console.log("[v0] Rendering RegistrationModal")}
          <RegistrationModal
            onClose={() => {
              console.log("[v0] Closing registration modal")
              setShowRegistration(false)
            }}
            onSwitchToLogin={() => {
              console.log("[v0] Switching to login modal")
              setShowRegistration(false)
              setShowLogin(true)
            }}
          />
        </>
      )}
      {showLogin && (
        <>
          {console.log("[v0] Rendering LoginModal")}
          <LoginModal
            onClose={() => {
              console.log("[v0] Closing login modal")
              setShowLogin(false)
            }}
            onSwitchToRegister={() => {
              console.log("[v0] Switching to registration modal")
              setShowLogin(false)
              setShowRegistration(true)
            }}
          />
        </>
      )}
    </div>
  )
}

function RegistrationModal({ onClose, onSwitchToLogin }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    clinicName: "",
    cnpj: "",
    specialties: "",
    legalName: "",
    description: "",
    logo: null,
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
    const file = e.target.files?.[0]
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
    alert("Registro enviado com sucesso! Em breve entraremos em contato.")
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
                <label className="form-label">Razão Social</label>
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
                  rows={4}
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
                    placeholder="Nome da rua"
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
                    placeholder="Nº"
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
                  placeholder="Apt, sala, andar, etc."
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
                  placeholder="Digite o bairro"
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
                    placeholder="Cidade"
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
                    maxLength={2}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">CEP</label>
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
                  placeholder="contato@clinica.com"
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
                  placeholder="https://www.seusite.com (opcional)"
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

<<<<<<< HEAD
function LoginModal({ onClose }) {
  const navigate = useNavigate()
=======
function LoginModal({ onClose, onSwitchToRegister }) {
>>>>>>> 279016a (melhorria da home)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpa erro quando o usuário começa a digitar
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
<<<<<<< HEAD
    setLoading(true)
    setError("")

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || "Erro ao fazer login")
      }

      // Salva o token no localStorage
      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("username", data.username)

      // Fecha o modal e redireciona para dashboard
      onClose()
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Erro ao fazer login. Verifique suas credenciais.")
    } finally {
      setLoading(false)
    }
=======
    console.log("[v0] Login data:", formData)
    alert("Login realizado com sucesso!")
    onClose()
>>>>>>> 279016a (melhorria da home)
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
            {error && (
              <div style={{
                padding: "0.75rem",
                marginBottom: "1rem",
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                borderRadius: "6px",
                fontSize: "0.875rem"
              }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label required">Usuário</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="admin"
                required
                disabled={loading}
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
                  disabled={loading}
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="form-checkbox" />
                <span>Lembrar minha senha</span>
              </label>
              <a href="#" className="forgot-password">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div className="form-actions">
<<<<<<< HEAD
            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Login"}
=======
            <button type="submit" className="btn btn-primary btn-full">
              Entrar
>>>>>>> 279016a (melhorria da home)
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
                  onSwitchToRegister()
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

export default App
