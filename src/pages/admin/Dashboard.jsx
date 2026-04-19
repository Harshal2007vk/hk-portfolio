import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js'
import { getProjects, getMedia, getActivity } from '@/services/firebase'
import { Link } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const StatCard = ({ label, value, icon, color = 'cyan', sub }) => (
  <div className="glass corner-br relative p-5">
    <div className="flex items-start justify-between mb-3">
      <span className="text-2xl">{icon}</span>
      <span className="font-mono text-[9px] tracking-widest text-white/25 uppercase">{label}</span>
    </div>
    <div className={`font-orbitron font-bold text-4xl ${color === 'cyan' ? 'text-cyan' : color === 'purple' ? 'text-purple' : 'text-white'}`}
      style={{ textShadow: `0 0 20px ${color === 'cyan' ? 'rgba(0,245,255,0.4)' : 'rgba(191,0,255,0.4)'}` }}>
      {value}
    </div>
    {sub && <div className="font-mono text-[10px] text-white/30 mt-1">{sub}</div>}
  </div>
)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#060e1e',
      borderColor: 'rgba(0,245,255,0.2)',
      borderWidth: 1,
      titleFont: { family: 'Space Mono' },
      bodyFont: { family: 'Space Mono' },
    },
  },
  scales: {
    x: {
      ticks: { color: 'rgba(226,238,255,0.3)', font: { family: 'Space Mono', size: 10 } },
      grid: { color: 'rgba(255,255,255,0.04)' },
    },
    y: {
      ticks: { color: 'rgba(226,238,255,0.3)', font: { family: 'Space Mono', size: 10 } },
      grid: { color: 'rgba(255,255,255,0.04)' },
    },
  },
}

function timeAgo(ts) {
  if (!ts) return '—'
  const date = ts.toDate ? ts.toDate() : new Date(ts)
  const diff = Math.floor((Date.now() - date) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [media, setMedia] = useState([])
  const [activity, setActivity] = useState([])

  useEffect(() => {
    getProjects().then(setProjects)
    getMedia().then(setMedia)
    getActivity(10).then(setActivity)
  }, [])

  const chartData = {
    labels: ['Projects', 'Media Files', 'Hackathons', 'Skills', 'Community'],
    datasets: [{
      data: [projects.length, media.length, 8, 10, 130],
      backgroundColor: ['#00f5ff33', '#bf00ff33', '#0066ff33', '#00f5ff22', '#bf00ff22'],
      borderColor: ['#00f5ff', '#bf00ff', '#0066ff', '#00f5ff88', '#bf00ff88'],
      borderWidth: 1,
    }],
  }

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-[10px] tracking-[0.35em] text-cyan/60 uppercase mb-2">Admin Panel</div>
        <h1 className="font-orbitron font-bold text-3xl">Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Projects" value={projects.length} icon="◈" color="cyan" sub="in Firestore" />
        <StatCard label="Media Files" value={media.length} icon="◫" color="purple" sub="uploaded" />
        <StatCard label="Hackathons" value="8+" icon="🏆" color="white" sub="competed" />
        <StatCard label="SGPA" value="8.99" icon="⚡" color="cyan" sub="PRMIT&R" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Chart */}
        <div className="glass corner-br relative p-6">
          <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase mb-5">Portfolio Overview</div>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Quick actions */}
        <div className="glass corner-br relative p-6">
          <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase mb-5">Quick Actions</div>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Add New Project', to: '/admin/projects', icon: '+' },
              { label: 'Upload Media', to: '/admin/media', icon: '↑' },
              { label: 'Edit About Section', to: '/admin/about', icon: '✎' },
              { label: 'Update Social Links', to: '/admin/socials', icon: '◎' },
              { label: 'Section Visibility', to: '/admin/settings', icon: '◬' },
            ].map((a) => (
              <Link key={a.to} to={a.to}
                className="flex items-center gap-4 px-4 py-3 border border-white/[0.06] 
                  hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-200 group">
                <span className="font-orbitron text-cyan/50 group-hover:text-cyan transition-colors">{a.icon}</span>
                <span className="font-mono text-xs tracking-widest text-white/50 group-hover:text-white transition-colors">{a.label}</span>
                <span className="ml-auto font-mono text-[10px] text-white/20 group-hover:text-cyan/50 transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Activity log */}
      <div className="glass corner-br relative p-6">
        <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase mb-5">Recent Activity</div>
        {activity.length === 0 ? (
          <div className="font-mono text-xs text-white/20 text-center py-6">No activity logged yet.</div>
        ) : (
          <div className="flex flex-col divide-y divide-white/[0.04]">
            {activity.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-cyan rounded-full flex-shrink-0" />
                  <div>
                    <span className="font-mono text-xs text-white/70 tracking-wider">{a.action}</span>
                    {a.detail && <span className="font-mono text-[10px] text-white/30 ml-2">— {a.detail}</span>}
                  </div>
                </div>
                <span className="font-mono text-[9px] text-white/25 flex-shrink-0 ml-4">{timeAgo(a.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
