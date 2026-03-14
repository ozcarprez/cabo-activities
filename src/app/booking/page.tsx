'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Shield, Clock, Calendar, Users, MapPin,
  CreditCard, Lock, Check, ChevronRight, AlertCircle, Mail, Phone, User
} from 'lucide-react';
import { getActivityBySlug, formatDuration, formatPrice, activities } from '@/lib/sample-data';

type BookingStep = 'details' | 'payment' | 'confirmation';

export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');

  // For demo, use the first activity
  const activity = activities[4]; // Sunset Sailing
  const selectedDate = 'March 20, 2026';
  const selectedTime = '4:30 PM';
  const adults = 2;
  const children = 1;

  const adultTotal = adults * activity.priceAdult;
  const childTotal = children * (activity.priceChild || 0);
  const subtotal = adultTotal + childTotal;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setBookingNumber(`CX-${Date.now().toString(36).toUpperCase().slice(0, 4)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`);
    setIsProcessing(false);
    setStep('confirmation');
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-cabo-white">
      {/* Progress bar */}
      <div className="bg-white border-b border-cabo-ocean/5">
        <div className="section-padding py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { key: 'details', label: 'Your Details', num: 1 },
              { key: 'payment', label: 'Payment', num: 2 },
              { key: 'confirmation', label: 'Confirmation', num: 3 },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                  step === s.key ? 'bg-cabo-ocean text-white' :
                  (s.key === 'details' && step !== 'details') || (s.key === 'payment' && step === 'confirmation') ? 'bg-emerald-500 text-white' :
                  'bg-cabo-ocean/10 text-cabo-dark/30'
                }`}>
                  {(s.key === 'details' && step !== 'details') || (s.key === 'payment' && step === 'confirmation')
                    ? <Check className="w-4 h-4" />
                    : s.num}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step === s.key ? 'text-cabo-dark' : 'text-cabo-dark/30'}`}>{s.label}</span>
                {i < 2 && <div className={`flex-1 h-0.5 mx-2 rounded ${
                  (i === 0 && step !== 'details') || (i === 1 && step === 'confirmation') ? 'bg-emerald-500' : 'bg-cabo-ocean/10'
                }`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-padding py-8">
        <div className="max-w-5xl mx-auto lg:grid lg:grid-cols-[1fr_380px] lg:gap-8">
          {/* Left column - Forms */}
          <div>
            {step === 'details' && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <Link href={`/${activity.slug}`} className="w-9 h-9 rounded-xl border border-cabo-ocean/10 flex items-center justify-center hover:bg-cabo-ocean/5 transition-colors">
                    <ArrowLeft className="w-4 h-4 text-cabo-dark/50" />
                  </Link>
                  <h1 className="text-xl font-bold text-cabo-dark">Complete Your Booking</h1>
                </div>

                {/* Activity summary card */}
                <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-4 flex gap-4 mb-6">
                  <img src={activity.mainImage} alt={activity.title} className="w-28 h-20 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <h2 className="font-display text-lg text-cabo-dark leading-snug mb-1 truncate">{activity.title}</h2>
                    <div className="flex flex-wrap gap-3 text-xs text-cabo-dark/50">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedDate}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedTime} · {formatDuration(activity.duration)}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {adults} adults, {children} child</span>
                    </div>
                  </div>
                </div>

                {/* Guest details form */}
                <form onSubmit={handleSubmitDetails}>
                  <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-6 mb-6">
                    <h3 className="font-semibold text-cabo-dark mb-1">Guest Details</h3>
                    <p className="text-sm text-cabo-dark/40 mb-5">We&apos;ll send your booking confirmation to this email</p>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-cabo-dark/20" />
                          <input type="text" required placeholder="As it appears on your ID"
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-cabo-dark/20" />
                            <input type="email" required placeholder="you@example.com"
                              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                              className="w-full pl-11 pr-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-cabo-dark/20" />
                            <input type="tel" placeholder="+1 (555) 000-0000"
                              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                              className="w-full pl-11 pr-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Special Requests</label>
                        <textarea rows={3} placeholder="Allergies, accessibility needs, celebrations..."
                          value={formData.specialRequests} onChange={e => setFormData({...formData, specialRequests: e.target.value})}
                          className="w-full px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10 resize-none" />
                      </div>
                    </div>
                  </div>

                  {/* Cancellation policy */}
                  <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mb-6">
                    <Shield className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-emerald-800 text-sm">Free Cancellation</p>
                      <p className="text-xs text-emerald-700/60">{activity.cancellationPolicy}</p>
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-accent !py-4 !text-base flex items-center justify-center gap-2">
                    Continue to Payment <ChevronRight className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}

            {step === 'payment' && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setStep('details')} className="w-9 h-9 rounded-xl border border-cabo-ocean/10 flex items-center justify-center hover:bg-cabo-ocean/5 transition-colors">
                    <ArrowLeft className="w-4 h-4 text-cabo-dark/50" />
                  </button>
                  <h1 className="text-xl font-bold text-cabo-dark">Payment</h1>
                </div>

                <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-6 mb-6">
                  <div className="flex items-center gap-2 mb-5">
                    <CreditCard className="w-5 h-5 text-cabo-ocean" />
                    <h3 className="font-semibold text-cabo-dark">Card Details</h3>
                    <div className="ml-auto flex gap-1.5">
                      {['visa', 'mastercard', 'amex'].map(card => (
                        <div key={card} className="w-10 h-7 bg-cabo-white rounded border border-cabo-ocean/10 flex items-center justify-center text-[8px] font-bold text-cabo-dark/30 uppercase">
                          {card.slice(0, 4)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10 font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Expiry</label>
                        <input type="text" placeholder="MM / YY"
                          className="w-full px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10 font-mono" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">CVC</label>
                        <input type="text" placeholder="123"
                          className="w-full px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10 font-mono" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Name on Card</label>
                      <input type="text" placeholder="JOHN DOE"
                        className="w-full px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-cabo-ocean/5">
                    <Lock className="w-4 h-4 text-cabo-dark/30" />
                    <span className="text-xs text-cabo-dark/30">Secured with 256-bit SSL encryption by Stripe</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 mb-6">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-amber-800 text-sm">Demo Mode</p>
                    <p className="text-xs text-amber-700/60">This is a demo checkout. No real charges will be made. In production, this integrates with Stripe Elements.</p>
                  </div>
                </div>

                <button onClick={handlePayment} disabled={isProcessing}
                  className={`w-full py-4 text-base font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                    isProcessing
                      ? 'bg-cabo-dark/20 text-cabo-dark/40 cursor-wait'
                      : 'bg-cabo-ocean text-white hover:bg-cabo-ocean-deep shadow-lg shadow-cabo-ocean/20 active:scale-[0.98]'
                  }`}>
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-cabo-dark/20 border-t-cabo-dark/60 rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay {formatPrice(total)}
                    </>
                  )}
                </button>
              </>
            )}

            {step === 'confirmation' && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <Check className="w-10 h-10 text-emerald-600" />
                </div>

                <h1 className="heading-2 mb-2 animate-slide-up">Booking Confirmed!</h1>
                <p className="text-cabo-dark/50 mb-8 animate-slide-up stagger-1">
                  Your adventure in Cabo is all set. We&apos;ve sent a confirmation to <strong>{formData.email || 'your email'}</strong>.
                </p>

                <div className="bg-white rounded-2xl border border-cabo-ocean/5 p-6 max-w-md mx-auto mb-8 text-left animate-slide-up stagger-2">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-cabo-ocean/5">
                    <span className="text-sm text-cabo-dark/40">Booking Reference</span>
                    <span className="font-mono font-bold text-cabo-ocean text-lg">{bookingNumber}</span>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <img src={activity.mainImage} alt="" className="w-20 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <h3 className="font-display text-cabo-dark leading-snug">{activity.title}</h3>
                      <p className="text-xs text-cabo-dark/40 mt-0.5">by {activity.operator?.companyName}</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-2 text-cabo-dark/60">
                      <Calendar className="w-4 h-4 text-cabo-ocean" /> {selectedDate} at {selectedTime}
                    </div>
                    <div className="flex items-center gap-2 text-cabo-dark/60">
                      <Clock className="w-4 h-4 text-cabo-ocean" /> {formatDuration(activity.duration)}
                    </div>
                    <div className="flex items-center gap-2 text-cabo-dark/60">
                      <Users className="w-4 h-4 text-cabo-ocean" /> {adults} adults, {children} child
                    </div>
                    <div className="flex items-center gap-2 text-cabo-dark/60">
                      <MapPin className="w-4 h-4 text-cabo-ocean" /> {activity.meetingPoint}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-cabo-ocean/5 flex justify-between items-center">
                    <span className="font-medium text-cabo-dark">Total Paid</span>
                    <span className="text-xl font-bold text-cabo-dark">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up stagger-3">
                  <Link href="/activities" className="btn-primary">
                    Explore More Activities
                  </Link>
                  <Link href="/" className="btn-secondary">
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right column - Order Summary (visible on details and payment steps) */}
          {step !== 'confirmation' && (
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-cabo-ocean/5 overflow-hidden">
                  <div className="p-5 border-b border-cabo-ocean/5">
                    <h3 className="font-semibold text-cabo-dark">Order Summary</h3>
                  </div>

                  <div className="p-5">
                    <div className="flex gap-3 mb-5 pb-5 border-b border-cabo-ocean/5">
                      <img src={activity.mainImage} alt="" className="w-20 h-16 rounded-xl object-cover shrink-0" />
                      <div>
                        <h4 className="font-display text-sm text-cabo-dark leading-snug">{activity.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-cabo-dark/40">
                          <Calendar className="w-3 h-3" /> {selectedDate}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-cabo-dark/40">
                          <Clock className="w-3 h-3" /> {selectedTime}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between text-cabo-dark/60">
                        <span>Adults × {adults}</span>
                        <span>{formatPrice(adultTotal)}</span>
                      </div>
                      {children > 0 && (
                        <div className="flex justify-between text-cabo-dark/60">
                          <span>Children × {children}</span>
                          <span>{formatPrice(childTotal)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-cabo-dark/60">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-cabo-dark/60">
                        <span>Service fee</span>
                        <span>{formatPrice(serviceFee)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-cabo-dark text-base pt-3 border-t border-cabo-ocean/5">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-cabo-ocean/[0.03] border-t border-cabo-ocean/5">
                    <div className="flex items-center gap-2 text-xs text-cabo-dark/40">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      <span>Free cancellation · Secure payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
