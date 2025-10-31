import { useEffect, useState } from 'react';
import { Users, Stethoscope, Calendar, CalendarCheck } from 'lucide-react';
import axios from 'axios';
import StatCard from '../../components/cards/StatCard';
import ChartCard from '../../components/cards/ChartCard';
import './index.css';

const API_BASE_URL = 'http://localhost:5000';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPacientes: 0,
    totalMedicos: 0,
    consultasHoje: 0,
    consultasPendentes: 0,
  });

  const [quickStats, setQuickStats] = useState({
    consultasPorEspecialidade: [],
    medicosAtivos: 0,
    consultasOcupadasMes: 0,
    consultasOcupadas7Dias: 0,
    totalConsultas: 0
  });

  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Buscar pacientes
        const pacientesResponse = await axios.get(`${API_BASE_URL}/pacientes`);
        const pacientes = pacientesResponse.data.pacientes || [];
        
        // Buscar médicos
        const medicosResponse = await axios.get(`${API_BASE_URL}/medicos`);
        const medicos = medicosResponse.data.medicos || [];
        
        // Calcular datas para comparação
        const hoje = new Date();
        const hojeStr = hoje.toISOString().split('T')[0];
        
        // Primeiro dia do mês atual
        const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        
        // 7 dias atrás
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
        
        let consultasHoje = 0;
        let consultasPendentes = 0;
        let consultasOcupadasMes = 0;
        let consultasOcupadas7Dias = 0;
        let totalConsultas = 0;
        const todasConsultas = [];
        const especialidadesCount = {};
        
        // Iterar pelos pacientes para contar consultas e coletar dados
        pacientes.forEach(paciente => {
          if (paciente.consultas) {
            Object.entries(paciente.consultas).forEach(([data, horarios]) => {
              Object.entries(horarios).forEach(([hora, consulta]) => {
                totalConsultas++;
                
                const dataConsulta = new Date(data);
                
                // Contar estatísticas
                if (data === hojeStr) {
                  consultasHoje++;
                }
                if (consulta.status === 'ocupado') {
                  consultasPendentes++;
                }
                
                // Contar consultas ocupadas no mês
                if (consulta.status === 'ocupado' && dataConsulta >= primeiroDiaDoMes && dataConsulta <= hoje) {
                  consultasOcupadasMes++;
                }
                
                // Contar consultas ocupadas nos últimos 7 dias
                if (consulta.status === 'ocupado' && dataConsulta >= seteDiasAtras && dataConsulta <= hoje) {
                  consultasOcupadas7Dias++;
                }
                
                // Contar por especialidade
                const especialidade = consulta.especialidade || 'Não definida';
                especialidadesCount[especialidade] = (especialidadesCount[especialidade] || 0) + 1;
                
                // Adicionar à lista de todas as consultas
                todasConsultas.push({
                  id: `${paciente._id}-${data}-${hora}`,
                  patient: paciente.nome,
                  doctor: consulta.medico || 'Não definido',
                  especialidade: consulta.especialidade || '',
                  date: data,
                  time: hora,
                  status: consulta.status || 'confirmado'
                });
              });
            });
          }
        });
        
        // Converter especialidades em array e ordenar
        const consultasPorEspecialidade = Object.entries(especialidadesCount)
          .map(([nome, count]) => ({ nome, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3); // Top 3 especialidades
        
        // Filtrar apenas consultas futuras
        const agora = new Date();
        const consultasFuturas = todasConsultas.filter(consulta => {
          const dataHoraConsulta = new Date(`${consulta.date}T${consulta.time}`);
          return dataHoraConsulta > agora;
        });
        
        // Ordenar consultas futuras por data e hora (mais próximas primeiro)
        consultasFuturas.sort((a, b) => {
          const dateTimeA = new Date(`${a.date}T${a.time}`);
          const dateTimeB = new Date(`${b.date}T${b.time}`);
          return dateTimeA - dateTimeB;
        });
        
        // Pegar apenas as 5 consultas mais próximas
        setRecentAppointments(consultasFuturas.slice(0, 5));
        
        setStats({
          totalPacientes: pacientes.length,
          totalMedicos: medicos.length,
          consultasHoje,
          consultasPendentes,
        });
        
        setQuickStats({
          consultasPorEspecialidade,
          medicosAtivos: medicos.length,
          consultasOcupadasMes,
          consultasOcupadas7Dias,
          totalConsultas
        });
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        // Mantém valores em 0 em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Bem-vindo ao sistema de gerenciamento da clínica</p>
      </div>

      {/* Statistics Cards Row */}
      <div className="stats-grid">
        <StatCard
          title="Total de Pacientes"
          value={loading ? '...' : stats.totalPacientes}
          icon={<Users size={28} />}
        />
        <StatCard
          title="Total de Médicos"
          value={loading ? '...' : stats.totalMedicos}
          icon={<Stethoscope size={28} />}
        />
        <StatCard
          title="Consultas Hoje"
          value={loading ? '...' : stats.consultasHoje}
          icon={<Calendar size={28} />}
        />
        <StatCard
          title="Consultas Pendentes"
          value={loading ? '...' : stats.consultasPendentes}
          icon={<CalendarCheck size={28} />}
          trend={stats.consultasPendentes > 0 ? 'up' : undefined}
          trendValue={stats.consultasPendentes > 0 ? 'Requer atenção' : undefined}
        />
      </div>

      {/* Charts and Tables Row */}
      <div className="dashboard-content">
        <div className="dashboard-row">
          {/* Recent Appointments */}
          <ChartCard title="Consultas mais Próximas" className="appointments-card">
            <div className="appointments-list">
              {loading ? (
                <div className="loading-message">Carregando consultas...</div>
              ) : recentAppointments.length === 0 ? (
                <div className="empty-message">Nenhuma consulta encontrada</div>
              ) : (
                recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="appointment-item">
                    <div className="appointment-info">
                      <div className="appointment-patient">{appointment.patient}</div>
                      <div className="appointment-doctor">
                        {appointment.doctor}
                        {appointment.especialidade && (
                          <span className="appointment-specialty"> • {appointment.especialidade}</span>
                        )}
                      </div>
                    </div>
                    <div className="appointment-details">
                      <div className="appointment-datetime">
                        <div className="appointment-date">
                          {new Date(appointment.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="appointment-time">{appointment.time}</div>
                      </div>
                      <span className={`appointment-status status-${appointment.status}`}>
                        {appointment.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ChartCard>

          {/* Quick Stats */}
          <ChartCard title="Estatísticas Rápidas" className="quick-stats-card">
            <div className="quick-stats-list">
              {quickStats.consultasPorEspecialidade.length > 0 && (
                <div className="quick-stat-item">
                  <div className="quick-stat-label">Top Especialidade</div>
                  <div className="quick-stat-value">
                    {loading ? '...' : quickStats.consultasPorEspecialidade[0]?.nome}
                  </div>
                  <div className="quick-stat-subtitle">
                    {loading ? '' : `${quickStats.consultasPorEspecialidade[0]?.count} consultas`}
                  </div>
                  <div className="quick-stat-bar">
                    <div 
                      className="quick-stat-progress" 
                      style={{ 
                        width: quickStats.totalConsultas > 0
                          ? `${(quickStats.consultasPorEspecialidade[0]?.count / quickStats.totalConsultas) * 100}%`
                          : '0%',
                        backgroundColor: '#f4c22b' 
                      }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="quick-stat-item">
                <div className="quick-stat-label">Consultas Ocupadas (Mês)</div>
                <div className="quick-stat-value">
                  {loading ? '...' : quickStats.consultasOcupadasMes}
                </div>
                <div className="quick-stat-subtitle">
                  {loading ? '' : `${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`}
                </div>
                <div className="quick-stat-bar">
                  <div 
                    className="quick-stat-progress" 
                    style={{ 
                      width: quickStats.totalConsultas > 0 
                        ? `${(quickStats.consultasOcupadasMes / quickStats.totalConsultas) * 100}%`
                        : '0%',
                      backgroundColor: '#1de9b6' 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="quick-stat-item">
                <div className="quick-stat-label">Consultas Ocupadas (7 dias)</div>
                <div className="quick-stat-value">{loading ? '...' : quickStats.consultasOcupadas7Dias}</div>
                <div className="quick-stat-subtitle">
                  {loading ? '' : 'Últimos 7 dias'}
                </div>
                <div className="quick-stat-bar">
                  <div 
                    className="quick-stat-progress" 
                    style={{ 
                      width: quickStats.totalConsultas > 0 
                        ? `${(quickStats.consultasOcupadas7Dias / quickStats.totalConsultas) * 100}%`
                        : '0%',
                      backgroundColor: '#4680FF' 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
