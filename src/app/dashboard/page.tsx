'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar, Clock, MapPin, Star, User, Settings, LogOut,
  ChevronRight, Download, MessageSquare, Heart
} from 'lucide-react';
import { activities, formatDuration, formatPrice } from '@/lib/sample-data';
import { RatingStars } from '@/components/ui/RatingStars';

const userTabs = [
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'reviews', label: 'My Reviews', icon: Star },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const mockUserBookings = [
  {
    id: 'CX-MK8F-A2B4',
    activity: activities[4], // Sunset Sailing
    date: 'March 20, 2026',
    time: '4:30 PM',
    guests: { adults: 2, children: 1 },
    total: 315,
    status: 'CONFIRMED' as const,
    canReview: false,
  },
  {
    id: 'CX-NP2G-C7D1',
    activity: activities[2], // Whale Watching
    date: 'February 15, 2026',
    time: '8:00 AM',
    guests: { adults: 2, children: 0 },
    total: 170,
    status: 'COMPLETED' as const,
    canReview: true,
  },
  {
    id: 'CX-QR9H-E3F6',
    activity: activities[7], // Taco Trail
    date: 'February 14, 2026',
    time: '5:00 PM',
    guests: { adults: 4, children: 0 },
    total: 300,
    status: 'COMPLETED' as const,
    canReview: false,
  },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [reviewModalOpen, setReviewModalOpen] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
    CONFIRMED: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Confirmed' },
    COMPLETED: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Completed' },
    PENDING: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
    CANCELLED: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-cabo-white">
      <div className="section-padding py-8">
        {/* User header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-ocean rounded-2xl flex items-center justify-center text-white text-xl font-bold">
            JS
          </div>
          <div>
            <h1 className="text-xl font-bold text-cabo-dark">Welcome back, John!</h1>
            <p className="text-sm text-cabo-dark/40">john@example.com · Member since Dec 2025</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {userTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                activeTab === tab.id
                  ? 'bg-cabo-ocean text-white border-cabo-ocean'
                  : 'bg-white text-cabo-dark/50 border-cabo-ocean/10 hover:border-cabo-ocean/30'
              }`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-4 border border-cabo-ocean/5 text-center">
                <p className="text-2xl font-bold text-cabo-dark">3</p>
                <p className="text-xs text-cabo-dark/40">Total Bookings</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-cabo-ocean/5 text-center">
                <p className="text-2xl font-bold text-cabo-ocean">1</p>
                <p className="text-xs text-cabo-dark/40">Upcoming</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-cabo-ocean/5 text-center">
                <p className="text-2xl font-bold text-cabo-dark">${785}</p>
                <p className="text-xs text-cabo-dark/40">Total Spent</p>
              </div>
            </div>

            {mockUserBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-2xl border border-cabo-ocean/5 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <Link href={`/${booking.activity.slug}`} className="sm:w-48 shrink-0">
                    <img src={booking.activity.mainImage} alt={booking.activity.title}
                      className="w-full h-40 sm:h-full object-cover" />
                  </Link>
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${statusStyle[booking.status].bg} ${statusStyle[booking.status].text}`}>
                          {statusStyle[booking.status].label}
                        </span>
                        <h3 className="font-display text-lg text-cabo-dark mt-2">{booking.activity.title}</h3>
                        <p className="text-xs text-cabo-dark/40">Ref: {booking.id}</p>
                      </div>
                      <span className="text-lg font-bold text-cabo-dark">{formatPrice(booking.total)}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-cabo-dark/50">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {booking.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {booking.time}</span>
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {booking.guests.adults} adults{booking.guests.children > 0 ? `, ${booking.guests.children} child` : ''}</span>
                    </div>

                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-cabo-ocean/5">
                      <Link href={`/${booking.activity.slug}`}
                        className="text-sm font-medium text-cabo-ocean hover:text-cabo-ocean-deep transition-colors flex items-center gap-1">
                        View Activity <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      {booking.status === 'CONFIRMED' && (
                        <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                          Cancel Booking
                        </button>
                      )}
                      {booking.canReview && (
                        <button onClick={() => setReviewModalOpen(booking.id)}
                          className="text-sm font-medium text-cabo-sunset hover:text-cabo-coral transition-colors flex items-center gap-1 ml-auto">
                          <Star className="w-3.5 h-3.5" /> Write Review
                        </button>
                      )}
                      <button className="text-sm text-cabo-dark/30 hover:text-cabo-dark/60 transition-colors flex items-center gap-1 ml-auto">
                        <Download className="w-3.5 h-3.5" /> Receipt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div>
            <p className="text-sm text-cabo-dark/40 mb-6">You&apos;ve written 2 reviews</p>
            <div className="space-y-4">
              {[
                { activity: activities[7], rating: 5, title: 'Best food tour ever!', comment: 'The tacos were incredible and our guide knew all the hidden spots. The tequila tasting at the end was the cherry on top!', date: 'Feb 14, 2026' },
                { activity: activities[2], rating: 5, title: 'Unforgettable whale experience', comment: 'Saw multiple humpback whales including a mother and calf. The marine biologist guide was exceptional.', date: 'Feb 15, 2026' },
              ].map((review, i) => (
                <div key={i} className="bg-white rounded-2xl border border-cabo-ocean/5 p-5">
                  <div className="flex items-start gap-4">
                    <img src={review.activity.mainImage} alt="" className="w-20 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-cabo-dark text-sm">{review.activity.title}</h3>
                          <RatingStars rating={review.rating} size={14} showNumber={false} />
                        </div>
                        <span className="text-xs text-cabo-dark/30">{review.date}</span>
                      </div>
                      <p className="font-medium text-cabo-dark text-sm mt-2">{review.title}</p>
                      <p className="text-sm text-cabo-dark/55 mt-1">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WISHLIST TAB */}
        {activeTab === 'wishlist' && (
          <div>
            <p className="text-sm text-cabo-dark/40 mb-6">Activities you&apos;ve saved for later</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.slice(0, 3).map((activity, i) => (
                <div key={activity.id} className="bg-white rounded-2xl border border-cabo-ocean/5 overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <img src={activity.mainImage} alt={activity.title} className="w-full h-full object-cover" />
                    <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Heart className="w-4.5 h-4.5 fill-cabo-coral text-cabo-coral" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-cabo-dark mb-1">{activity.title}</h3>
                    <div className="flex items-center justify-between">
                      <RatingStars rating={activity.avgRating} size={12} totalReviews={activity.totalReviews} />
                      <span className="font-bold text-cabo-dark">{formatPrice(activity.priceAdult)}</span>
                    </div>
                    <Link href={`/${activity.slug}`} className="block mt-3 btn-primary !py-2 !text-sm text-center">
                      View & Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-6 mb-6">
              <h2 className="font-semibold text-cabo-dark mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Name</label>
                    <input type="text" defaultValue="John Smith"
                      className="w-full px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Email</label>
                    <input type="email" defaultValue="john@example.com"
                      className="w-full px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30" />
                </div>
                <button className="btn-primary !py-2.5 !text-sm">Save Changes</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-6 mb-6">
              <h2 className="font-semibold text-cabo-dark mb-4">Notifications</h2>
              <div className="space-y-3">
                {['Booking confirmations', 'Review reminders', 'Special offers & deals', 'Newsletter'].map(pref => (
                  <label key={pref} className="flex items-center justify-between py-2">
                    <span className="text-sm text-cabo-dark/70">{pref}</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-cabo-ocean rounded" />
                  </label>
                ))}
              </div>
            </div>

            <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        )}

        {/* Review Modal */}
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cabo-dark/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 animate-scale-in">
              <h2 className="font-display text-xl text-cabo-dark mb-1">Write a Review</h2>
              <p className="text-sm text-cabo-dark/40 mb-6">Share your experience to help other travelers</p>

              <div className="mb-4">
                <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setReviewRating(n)}
                      className="w-10 h-10 rounded-xl border transition-all flex items-center justify-center">
                      <Star className={`w-5 h-5 ${n <= reviewRating ? 'fill-cabo-sunset-warm text-cabo-sunset-warm' : 'text-cabo-dark/20'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Your Review</label>
                <textarea rows={4} placeholder="What was great about this experience?"
                  value={reviewComment} onChange={e => setReviewComment(e.target.value)}
                  className="w-full px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 resize-none" />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setReviewModalOpen(null)} className="flex-1 btn-secondary !py-3">Cancel</button>
                <button onClick={() => { setReviewModalOpen(null); setReviewComment(''); }} className="flex-1 btn-accent !py-3">Submit Review</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
