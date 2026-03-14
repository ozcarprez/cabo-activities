'use client';

import { useState } from 'react';
import {
  BarChart3, Calendar, DollarSign, Star, TrendingUp, Plus, Settings,
  Eye, Edit2, Trash2, Users, MapPin, Clock, ChevronRight, Bell,
  Activity as ActivityIcon
} from 'lucide-react';
import { activities, formatPrice, formatDuration } from '@/lib/sample-data';

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'activities', label: 'Activities', icon: ActivityIcon },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'earnings', label: 'Earnings', icon: DollarSign },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const recentBookings = [
  { id: 1, guest: 'Sarah M.', activity: 'Luxury Sunset Sailing', date: 'Mar 15, 2026', guests: 4, amount: 480, status: 'CONFIRMED' },
  { id: 2, guest: 'David C.', activity: 'Deep Sea Marlin Fishing', date: 'Mar 16, 2026', guests: 3, amount: 1050, status: 'PENDING' },
  { id: 3, guest: 'Emma R.', activity: 'Whale Watching Eco-Tour', date: 'Mar 14, 2026', guests: 2, amount: 170, status: 'COMPLETED' },
  { id: 4, guest: 'Mike T.', activity: 'Snorkel at Pelican Rock', date: 'Mar 17, 2026', guests: 5, amount: 325, status: 'CONFIRMED' },
];

export default function OperatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const operatorActivities = activities.slice(0, 6);

  const statusColor: Record<string, string> = {
    CONFIRMED: 'bg-emerald-100 text-emerald-700',
    PENDING: 'bg-amber-100 text-amber-700',
    COMPLETED: 'bg-blue-100 text-blue-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-cabo-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 bg-white border-r border-cabo-ocean/5 min-h-[calc(100vh-5rem)] sticky top-20">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-ocean rounded-xl flex items-center justify-center text-white font-bold">
                CA
              </div>
              <div>
                <p className="font-semibold text-cabo-dark text-sm">Cabo Adventures</p>
                <p className="text-xs text-cabo-dark/40">Operator Dashboard</p>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map(tab => (
                <button key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-cabo-ocean text-white'
                      : 'text-cabo-dark/50 hover:text-cabo-dark hover:bg-cabo-ocean/5'
                  }`}>
                  <tab.icon className="w-4.5 h-4.5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="bg-white border-b border-cabo-ocean/5 px-6 lg:px-10 py-4 flex items-center justify-between sticky top-20 z-30">
            <div>
              <h1 className="text-xl font-bold text-cabo-dark">Dashboard</h1>
              <p className="text-sm text-cabo-dark/40">Welcome back! Here&apos;s your overview.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 rounded-xl bg-cabo-white border border-cabo-ocean/10 flex items-center justify-center hover:bg-cabo-ocean/5 transition-colors">
                <Bell className="w-4.5 h-4.5 text-cabo-dark/50" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cabo-sunset rounded-full text-white text-[10px] font-bold flex items-center justify-center">3</span>
              </button>
              <button className="btn-primary !py-2.5 !px-4 !text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> New Activity
              </button>
            </div>
          </div>

          {/* Mobile tabs */}
          <div className="lg:hidden overflow-x-auto border-b border-cabo-ocean/5 bg-white">
            <div className="flex px-4 gap-1">
              {tabs.map(tab => (
                <button key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-cabo-ocean text-cabo-ocean'
                      : 'border-transparent text-cabo-dark/40'
                  }`}>
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 lg:p-10">
            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Revenue', value: '$24,850', change: '+12%', icon: DollarSign, color: 'text-cabo-ocean', bg: 'bg-cabo-ocean/10' },
                { label: 'Bookings', value: '148', change: '+8%', icon: Calendar, color: 'text-cabo-sunset', bg: 'bg-cabo-sunset/10' },
                { label: 'Avg Rating', value: '4.8', change: '+0.2', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Guests Served', value: '512', change: '+15%', icon: Users, color: 'text-cabo-agave', bg: 'bg-cabo-agave/10' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 border border-cabo-ocean/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-cabo-dark">{stat.value}</p>
                  <p className="text-xs text-cabo-dark/40 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Recent bookings */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-cabo-ocean/5">
                <div className="flex items-center justify-between p-5 border-b border-cabo-ocean/5">
                  <h2 className="font-semibold text-cabo-dark">Recent Bookings</h2>
                  <button className="text-sm text-cabo-ocean font-medium">View All →</button>
                </div>
                <div className="divide-y divide-cabo-ocean/5">
                  {recentBookings.map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-4 hover:bg-cabo-ocean/[0.02] transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-cabo-ocean/10 rounded-xl flex items-center justify-center text-cabo-ocean font-bold text-xs shrink-0">
                          {booking.guest.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-cabo-dark text-sm truncate">{booking.guest}</p>
                          <p className="text-xs text-cabo-dark/40 truncate">{booking.activity} · {booking.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColor[booking.status]}`}>
                          {booking.status}
                        </span>
                        <span className="font-semibold text-cabo-dark text-sm">${booking.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Popular activities */}
                <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-5">
                  <h3 className="font-semibold text-cabo-dark mb-4">Top Activities</h3>
                  <div className="space-y-3">
                    {operatorActivities.slice(0, 4).map((activity, i) => (
                      <div key={activity.id} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-cabo-ocean/10 flex items-center justify-center text-xs font-bold text-cabo-ocean">{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-cabo-dark truncate">{activity.title}</p>
                          <p className="text-xs text-cabo-dark/40">{activity.totalBookings} bookings</p>
                        </div>
                        <span className="text-sm font-semibold text-cabo-dark">{formatPrice(activity.priceAdult)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming schedule */}
                <div className="bg-gradient-ocean rounded-2xl p-5 text-white">
                  <h3 className="font-semibold mb-1">Today&apos;s Schedule</h3>
                  <p className="text-sm text-white/50 mb-4">3 tours scheduled</p>
                  <div className="space-y-3">
                    {[
                      { time: '8:00 AM', activity: 'Snorkel Tour', guests: 8 },
                      { time: '1:00 PM', activity: 'Whale Watching', guests: 12 },
                      { time: '4:30 PM', activity: 'Sunset Sail', guests: 20 },
                    ].map(item => (
                      <div key={item.time} className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
                        <span className="text-xs font-mono text-white/60 w-16">{item.time}</span>
                        <span className="text-sm font-medium flex-1">{item.activity}</span>
                        <span className="text-xs text-white/50">{item.guests} guests</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Activities management */}
            {activeTab === 'activities' && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-cabo-dark">Your Activities</h2>
                  <button className="btn-primary !py-2 !px-4 !text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Activity
                  </button>
                </div>

                <div className="grid gap-4">
                  {operatorActivities.map(activity => (
                    <div key={activity.id} className="bg-white rounded-2xl border border-cabo-ocean/5 p-4 flex items-center gap-4">
                      <img src={activity.mainImage} alt={activity.title}
                        className="w-24 h-20 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-cabo-dark text-sm truncate">{activity.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-cabo-dark/40">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDuration(activity.duration)}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Max {activity.maxCapacity}</span>
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-cabo-sunset-warm text-cabo-sunset-warm" /> {activity.avgRating}</span>
                        </div>
                      </div>
                      <span className="font-bold text-cabo-dark">{formatPrice(activity.priceAdult)}</span>
                      <div className="flex items-center gap-1.5">
                        <button className="w-8 h-8 rounded-lg hover:bg-cabo-ocean/5 flex items-center justify-center text-cabo-dark/30 hover:text-cabo-ocean transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg hover:bg-cabo-ocean/5 flex items-center justify-center text-cabo-dark/30 hover:text-cabo-ocean transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-cabo-dark/30 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
