import { useEffect, useState } from 'react';
import StatCard from '../../components/cards/StatCard';
import ChartCard from '../../components/cards/ChartCard';
import './index.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    todayAppointments: 0,
    weeklyAppointments: 0,
  });

  useEffect(() => {
    // TODO: Fetch real data from API
    // For now, using mock data
    setStats({
      totalPatients: 1248,
      totalDoctors: 24,
      todayAppointments: 42,
      weeklyAppointments: 287,
    });
  }, []);

  // Mock data for recent appointments
  const recentAppointments = [
    { id: 1, patient: 'Maria Silva', doctor: 'Dr. João Santos', time: '09:00', status: 'confirmed' },
    { id: 2, patient: 'Pedro Oliveira', doctor: 'Dra. Ana Costa', time: '10:30', status: 'confirmed' },
    { id: 3, patient: 'Ana Souza', doctor: 'Dr. Carlos Lima', time: '14:00', status: 'pending' },
    { id: 4, patient: 'Lucas Ferreira', doctor: 'Dra. Paula Mendes', time: '15:30', status: 'confirmed' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Bem-vindo ao sistema de gerenciamento da clínica</p>
      </div>

      {/* Statistics Cards Row */}
      <div className="stats-grid">
        {/* <StatCard
          title="Total de Pacientes"
          value={stats.totalPatients}
          icon="fas fa-users"
          iconColor="#4680FF"
          trend="up"
          trendValue="+12% este mês"
        /> */}
        <StatCard
          title="Médicos Ativos"
          value={stats.totalDoctors}
          icon="fas fa-user-md"
          iconColor="#1de9b6"
          trend="up"
          trendValue="+2 novos"
        />
        <StatCard
          title="Consultas Hoje"
          value={stats.todayAppointments}
          icon="fas fa-calendar-check"
          iconColor="#f4c22b"
        />
        <StatCard
          title="Consultas Semana"
          value={stats.weeklyAppointments}
          icon="fas fa-chart-line"
          iconColor="#f44336"
          trend="up"
          trendValue="+8% vs semana anterior"
        />
      </div>

      {/* Charts and Tables Row */}
      <div className="dashboard-content">
        <div className="dashboard-row">
          {/* Recent Appointments */}
          <ChartCard title="Consultas Recentes" className="appointments-card">
            <div className="appointments-list">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-info">
                    <div className="appointment-patient">{appointment.patient}</div>
                    <div className="appointment-doctor">{appointment.doctor}</div>
                  </div>
                  <div className="appointment-details">
                    <div className="appointment-time">{appointment.time}</div>
                    <span className={`appointment-status status-${appointment.status}`}>
                      {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Quick Stats */}
          <ChartCard title="Estatísticas Rápidas" className="quick-stats-card">
            <div className="quick-stats-list">
              <div className="quick-stat-item">
                <div className="quick-stat-label">Taxa de Comparecimento</div>
                <div className="quick-stat-value">94%</div>
                <div className="quick-stat-bar">
                  <div className="quick-stat-progress" style={{ width: '94%', backgroundColor: '#1de9b6' }}></div>
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="quick-stat-label">Satisfação Pacientes</div>
                <div className="quick-stat-value">4.8/5</div>
                <div className="quick-stat-bar">
                  <div className="quick-stat-progress" style={{ width: '96%', backgroundColor: '#4680FF' }}></div>
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="quick-stat-label">Tempo Médio Espera</div>
                <div className="quick-stat-value">12 min</div>
                <div className="quick-stat-bar">
                  <div className="quick-stat-progress" style={{ width: '75%', backgroundColor: '#f4c22b' }}></div>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
