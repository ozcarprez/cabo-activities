'use client';

import { useState } from 'react';
import {
  BarChart3, Users, DollarSign, Settings, Shield, TrendingUp,
  Search, Filter, MoreVertical, Eye, Ban, CheckCircle, AlertTriangle,
  Activity as ActivityIcon, Percent, Globe, Calendar, ChevronDown,
  ArrowUpRight, ArrowDownRight, Layers
} from 'lucide-react';
import { activities, categories, formatPrice } from '@/lib/sample-data';

const adminTabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'activities', label: 'Activities', icon: ActivityIcon },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'commissions', label: 'Commissions', icon: Percent },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const mockUsers = [
  { id: 1, name: 'Cabo Adventures', email: 'info@caboadventures.com', role: 'OPERATOR', status: 'active', activities: 7, revenue: 45200, joined: 'Jan 2024' },
  { id: 2, name: 'Pisces Sportfishing', email: 'info@pisces.com', role: 'OPERATOR', status: 'active', activities: 3, revenue: 28900, joined: 'Mar 2024' },
  { id: 3, name: 'Cabo Sailing', email: 'info@cabosailing.com', role: 'OPERATOR', status: 'active', activities: 4, revenue: 52100, joined: 'Feb 2024' },
  { id: 4, name: 'Sarah Mitchell', email: 'sarah@example.com', role: 'TOURIST', status: 'active', activities: 0, revenue: 0, joined: 'Dec 2025' },
  { id: 5, name: 'David Chen', email: 'david@example.com', role: 'TOURIST', status: 'active', activities: 0, revenue: 0, joined: 'Jan 2026' },
  { id: 6, name: 'Beach Riders MX', email: 'info@beachriders.mx', role: 'OPERATOR', status: 'pending', activities: 0, revenue: 0, joined: 'Mar 2026' },
];

const mockBookings = [
  { id: 'CX-MK8F-A2B4', guest: 'Sarah M.', activity: 'Luxury Sunset Sailing', operator: 'Cabo Sailing', date: 'Mar 15, 2026', amount: 480, commission: 72, status: 'CONFIRMED' },
  { id: 'CX-NP2G-C7D1', guest: 'David C.', activity: 'Deep Sea Marlin Fishing', operator: 'Pisces Sportfishing', date: 'Mar 16, 2026', amount: 1050, commission: 157.5, status: 'CONFIRMED' },
  { id: 'CX-QR9H-E3F6', guest: 'Emma R.', activity: 'Whale Watching Eco-Tour', operator: 'Cabo Adventures', date: 'Mar 14, 2026', amount: 170, commission: 25.5, status: 'COMPLETED' },
  { id: 'CX-ST4J-G8K2', guest: 'Mike T.', activity: 'Taco Trail & Tequila', operator: 'Cabo Adventures', date: 'Mar 17, 2026', amount: 300, commission: 45, status: 'PENDING' },
  { id: 'CX-UV5L-H1M9', guest: 'Lisa K.', activity: 'Snorkel Pelican Rock', operator: 'Cabo Adventures', date: 'Mar 13, 2026', amount: 195, commission: 29.25, status: 'COMPLETED' },
  { id: 'CX-WX6N-J4P5', guest: 'James B.', activity: 'Desert ATV Adventure', operator: 'Cabo Adventures', date: 'Mar 18, 2026', amount: 380, commission: 57, status: 'CONFIRMED' },
];

const monthlyRevenue = [
  { month: 'Oct', revenue: 18200, commission: 2730 },
  { month: 'Nov', revenue: 24500, commission: 3675 },
  { month: 'Dec', revenue: 38900, commission: 5835 },
  { month: 'Jan', revenue: 42100, commission: 6315 },
  { month: 'Feb', revenue: 35600, commission: 5340 },
  { month: 'Mar', revenue: 28400, commission: 4260 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userFilter, setUserFilter] = useState('all');
  const [commissionRate, setCommissionRate] = useState(15);
  const [searchQuery, setSearchQuery] = useState('');

  const statusColor: Record<string, string> = {
    CONFIRMED: 'bg-emerald-100 text-emerald-700',
    PENDING: 'bg-amber-100 text-amber-700',
    COMPLETED: 'bg-blue-100 text-blue-700',
    CANCELLED: 'bg-red-100 text-red-700',
    active: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    suspended: 'bg-red-100 text-red-700',
  };

  const roleColor: Record<string, string> = {
    ADMIN: 'bg-purple-100 text-purple-700',
    OPERATOR: 'bg-blue-100 text-blue-700',
    TOURIST: 'bg-gray-100 text-gray-600',
  };

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-cabo-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 bg-white border-r border-cabo-ocean/5 min-h-[calc(100vh-5rem)] sticky top-20">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-cabo-dark text-sm">Admin Panel</p>
                <p className="text-xs text-cabo-dark/40">CaboXplore</p>
              </div>
            </div>
            <p className="text-[10px] font-accent uppercase tracking-widest text-cabo-dark/30 mb-6 pl-1">Management</p>

            <nav className="space-y-1">
              {adminTabs.map(tab => (
                <button key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-cabo-dark/50 hover:text-cabo-dark hover:bg-purple-50'
                  }`}>
                  <tab.icon className="w-4.5 h-4.5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="bg-white border-b border-cabo-ocean/5 px-6 lg:px-10 py-4 flex items-center justify-between sticky top-20 z-30">
            <div>
              <h1 className="text-xl font-bold text-cabo-dark capitalize">{activeTab === 'overview' ? 'Admin Dashboard' : activeTab}</h1>
              <p className="text-sm text-cabo-dark/40">Platform management & analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cabo-dark/30" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-64 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-purple-300" />
              </div>
            </div>
          </div>

          {/* Mobile tabs */}
          <div className="lg:hidden overflow-x-auto border-b border-cabo-ocean/5 bg-white">
            <div className="flex px-4 gap-1">
              {adminTabs.map(tab => (
                <button key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                    activeTab === tab.id ? 'border-purple-600 text-purple-600' : 'border-transparent text-cabo-dark/40'
                  }`}>
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 lg:p-10">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Revenue', value: '$187,700', change: '+18%', up: true, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Platform Commission', value: '$28,155', change: '+18%', up: true, icon: Percent, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Total Bookings', value: '1,247', change: '+24%', up: true, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Operators', value: '14', change: '+3', up: true, icon: Users, color: 'text-cabo-sunset', bg: 'bg-orange-50' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 border border-cabo-ocean/5">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                          {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-cabo-dark">{stat.value}</p>
                      <p className="text-xs text-cabo-dark/40 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Revenue chart */}
                <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-cabo-dark">Monthly Revenue</h2>
                    <select className="text-sm text-cabo-dark/50 bg-cabo-white border border-cabo-ocean/10 rounded-lg px-3 py-1.5">
                      <option>Last 6 months</option>
                      <option>Last 12 months</option>
                    </select>
                  </div>
                  <div className="flex items-end gap-3 h-48">
                    {monthlyRevenue.map(m => (
                      <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs font-semibold text-cabo-dark">${(m.revenue / 1000).toFixed(1)}k</span>
                        <div className="w-full flex flex-col gap-0.5" style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}>
                          <div className="flex-1 bg-purple-100 rounded-t-lg relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 right-0 bg-purple-500 rounded-t-lg"
                              style={{ height: `${(m.commission / m.revenue) * 100}%` }} />
                          </div>
                        </div>
                        <span className="text-xs text-cabo-dark/40">{m.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-cabo-ocean/5">
                    <span className="flex items-center gap-2 text-xs text-cabo-dark/50">
                      <span className="w-3 h-3 bg-purple-100 rounded" /> Total revenue
                    </span>
                    <span className="flex items-center gap-2 text-xs text-cabo-dark/50">
                      <span className="w-3 h-3 bg-purple-500 rounded" /> Commission ({commissionRate}%)
                    </span>
                  </div>
                </div>

                {/* Recent bookings overview */}
                <div className="bg-white rounded-2xl border border-cabo-ocean/5">
                  <div className="flex items-center justify-between p-5 border-b border-cabo-ocean/5">
                    <h2 className="font-semibold text-cabo-dark">Recent Bookings</h2>
                    <button onClick={() => setActiveTab('bookings')} className="text-sm text-purple-600 font-medium">View All →</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-cabo-ocean/5">
                          <th className="text-left text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Booking</th>
                          <th className="text-left text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Activity</th>
                          <th className="text-left text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Date</th>
                          <th className="text-right text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Amount</th>
                          <th className="text-right text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Commission</th>
                          <th className="text-center text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockBookings.map(b => (
                          <tr key={b.id} className="border-b border-cabo-ocean/5 last:border-0 hover:bg-cabo-ocean/[0.02] transition-colors">
                            <td className="px-5 py-3.5">
                              <p className="font-mono text-xs text-cabo-dark/60">{b.id}</p>
                              <p className="text-sm font-medium text-cabo-dark">{b.guest}</p>
                            </td>
                            <td className="px-5 py-3.5">
                              <p className="text-sm text-cabo-dark">{b.activity}</p>
                              <p className="text-xs text-cabo-dark/40">{b.operator}</p>
                            </td>
                            <td className="px-5 py-3.5 hidden sm:table-cell text-sm text-cabo-dark/60">{b.date}</td>
                            <td className="px-5 py-3.5 text-right text-sm font-semibold text-cabo-dark">{formatPrice(b.amount)}</td>
                            <td className="px-5 py-3.5 text-right text-sm font-semibold text-purple-600">{formatPrice(b.commission)}</td>
                            <td className="px-5 py-3.5 text-center">
                              <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${statusColor[b.status]}`}>{b.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex gap-2">
                    {['all', 'OPERATOR', 'TOURIST', 'pending'].map(f => (
                      <button key={f} onClick={() => setUserFilter(f)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all capitalize ${
                          userFilter === f ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-cabo-dark/50 border-cabo-ocean/10'
                        }`}>
                        {f === 'all' ? 'All Users' : f === 'OPERATOR' ? 'Operators' : f === 'TOURIST' ? 'Tourists' : 'Pending'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-cabo-ocean/5 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-cabo-ocean/5">
                          <th className="text-left text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">User</th>
                          <th className="text-center text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Role</th>
                          <th className="text-center text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Status</th>
                          <th className="text-right text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Activities</th>
                          <th className="text-right text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Revenue</th>
                          <th className="text-right text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Joined</th>
                          <th className="text-center text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3 w-16">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockUsers
                          .filter(u => userFilter === 'all' || u.role === userFilter || (userFilter === 'pending' && u.status === 'pending'))
                          .map(user => (
                          <tr key={user.id} className="border-b border-cabo-ocean/5 last:border-0 hover:bg-cabo-ocean/[0.02] transition-colors">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xs shrink-0">
                                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-cabo-dark">{user.name}</p>
                                  <p className="text-xs text-cabo-dark/40">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-center">
                              <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${roleColor[user.role]}`}>{user.role}</span>
                            </td>
                            <td className="px-5 py-3.5 text-center">
                              <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${statusColor[user.status]}`}>{user.status}</span>
                            </td>
                            <td className="px-5 py-3.5 text-right text-sm text-cabo-dark/60 hidden md:table-cell">{user.activities || '—'}</td>
                            <td className="px-5 py-3.5 text-right text-sm font-medium text-cabo-dark hidden md:table-cell">{user.revenue ? formatPrice(user.revenue) : '—'}</td>
                            <td className="px-5 py-3.5 text-right text-sm text-cabo-dark/40 hidden sm:table-cell">{user.joined}</td>
                            <td className="px-5 py-3.5 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button className="w-7 h-7 rounded-lg hover:bg-cabo-ocean/5 flex items-center justify-center text-cabo-dark/30 hover:text-cabo-ocean transition-colors">
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                {user.status === 'pending' ? (
                                  <button className="w-7 h-7 rounded-lg hover:bg-emerald-50 flex items-center justify-center text-cabo-dark/30 hover:text-emerald-600 transition-colors">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                  </button>
                                ) : (
                                  <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-cabo-dark/30 hover:text-red-500 transition-colors">
                                    <Ban className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* COMMISSIONS TAB */}
            {activeTab === 'commissions' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Global commission setting */}
                  <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-6">
                    <h2 className="font-semibold text-cabo-dark mb-1">Platform Commission Rate</h2>
                    <p className="text-sm text-cabo-dark/40 mb-6">Default commission applied to all bookings</p>

                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex-1">
                        <input type="range" min="5" max="30" step="0.5" value={commissionRate}
                          onChange={(e) => setCommissionRate(Number(e.target.value))}
                          className="w-full accent-purple-600" />
                        <div className="flex justify-between text-xs text-cabo-dark/30 mt-1">
                          <span>5%</span><span>15%</span><span>30%</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600">{commissionRate}%</div>
                        <div className="text-xs text-cabo-dark/40">per booking</div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 mb-4">
                      <p className="text-sm text-purple-800 font-medium mb-2">Example calculation</p>
                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between text-purple-700/70">
                          <span>Booking total</span><span>$100.00</span>
                        </div>
                        <div className="flex justify-between text-purple-700/70">
                          <span>Platform commission ({commissionRate}%)</span><span>${(100 * commissionRate / 100).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-purple-800 pt-1.5 border-t border-purple-200">
                          <span>Operator receives</span><span>${(100 - (100 * commissionRate / 100)).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors">
                      Save Commission Rate
                    </button>
                  </div>

                  {/* Per-operator overrides */}
                  <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-6">
                    <h2 className="font-semibold text-cabo-dark mb-1">Operator Overrides</h2>
                    <p className="text-sm text-cabo-dark/40 mb-6">Custom rates for specific operators</p>

                    <div className="space-y-3">
                      {[
                        { name: 'Cabo Adventures', rate: 12, reason: 'Volume discount' },
                        { name: 'Pisces Sportfishing', rate: 15, reason: 'Standard rate' },
                        { name: 'Cabo Sailing', rate: 10, reason: 'Launch partner' },
                      ].map(op => (
                        <div key={op.name} className="flex items-center justify-between p-3 bg-cabo-white rounded-xl border border-cabo-ocean/5">
                          <div>
                            <p className="font-medium text-cabo-dark text-sm">{op.name}</p>
                            <p className="text-xs text-cabo-dark/40">{op.reason}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-purple-600">{op.rate}%</span>
                            <button className="text-xs text-cabo-ocean hover:underline">Edit</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-4 py-2.5 border-2 border-dashed border-cabo-ocean/15 text-cabo-dark/40 text-sm font-medium rounded-xl hover:border-purple-300 hover:text-purple-600 transition-colors">
                      + Add Override
                    </button>
                  </div>
                </div>

                {/* Commission summary */}
                <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-6">
                  <h2 className="font-semibold text-cabo-dark mb-4">Commission Summary (Last 30 Days)</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Collected', value: '$4,260', color: 'text-purple-600' },
                      { label: 'Avg per Booking', value: '$34.14', color: 'text-cabo-ocean' },
                      { label: 'Highest Single', value: '$157.50', color: 'text-cabo-sunset' },
                      { label: 'Pending Payouts', value: '$1,890', color: 'text-amber-600' },
                    ].map(s => (
                      <div key={s.label} className="bg-cabo-white rounded-xl p-4">
                        <p className="text-xs text-cabo-dark/40 mb-1">{s.label}</p>
                        <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* CATEGORIES TAB */}
            {activeTab === 'categories' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-cabo-dark/50">{categories.length} categories</p>
                  <button className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 transition-colors">
                    + Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map(cat => {
                    const catActivities = activities.filter(a => a.categoryId === cat.id);
                    const totalBookings = catActivities.reduce((sum, a) => sum + a.totalBookings, 0);
                    return (
                      <div key={cat.id} className="bg-white rounded-2xl border border-cabo-ocean/5 p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-cabo-dark">{cat.name}</h3>
                            <p className="text-xs text-cabo-dark/40">{cat.nameEs}</p>
                          </div>
                          <button className="w-8 h-8 rounded-lg hover:bg-cabo-ocean/5 flex items-center justify-center text-cabo-dark/30">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-cabo-dark/50 mb-4 line-clamp-2">{cat.description}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-cabo-ocean/5">
                          <span className="text-xs text-cabo-dark/40">{catActivities.length} activities</span>
                          <span className="text-xs text-cabo-dark/40">{totalBookings.toLocaleString()} total bookings</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl border border-cabo-ocean/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-cabo-ocean/5">
                        <th className="text-left text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">ID / Guest</th>
                        <th className="text-left text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Activity</th>
                        <th className="text-left text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Date</th>
                        <th className="text-right text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Total</th>
                        <th className="text-right text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Commission</th>
                        <th className="text-center text-xs font-semibold text-cabo-dark/40 uppercase tracking-wider px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBookings.map(b => (
                        <tr key={b.id} className="border-b border-cabo-ocean/5 last:border-0 hover:bg-cabo-ocean/[0.02] transition-colors">
                          <td className="px-5 py-3.5">
                            <p className="font-mono text-xs text-cabo-dark/50">{b.id}</p>
                            <p className="text-sm font-medium text-cabo-dark">{b.guest}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="text-sm text-cabo-dark">{b.activity}</p>
                            <p className="text-xs text-cabo-dark/40">{b.operator}</p>
                          </td>
                          <td className="px-5 py-3.5 hidden md:table-cell text-sm text-cabo-dark/60">{b.date}</td>
                          <td className="px-5 py-3.5 text-right text-sm font-semibold text-cabo-dark">{formatPrice(b.amount)}</td>
                          <td className="px-5 py-3.5 text-right text-sm font-semibold text-purple-600">{formatPrice(b.commission)}</td>
                          <td className="px-5 py-3.5 text-center">
                            <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${statusColor[b.status]}`}>{b.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ACTIVITIES / REVIEWS / SETTINGS — placeholder */}
            {['activities', 'reviews', 'settings'].includes(activeTab) && (
              <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-10 text-center">
                <div className="text-5xl mb-4">{activeTab === 'activities' ? '🏄' : activeTab === 'reviews' ? '⭐' : '⚙️'}</div>
                <h2 className="heading-3 mb-2 capitalize">{activeTab} Management</h2>
                <p className="text-cabo-dark/40 mb-6">This section is ready for full implementation with database connection.</p>
                <button onClick={() => setActiveTab('overview')} className="btn-secondary !text-sm">← Back to Overview</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
