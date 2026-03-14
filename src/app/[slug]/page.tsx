'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Clock, Users, MapPin, Star, Shield, ChevronLeft, ChevronRight,
  Check, X as XIcon, AlertCircle, Globe, Calendar, Heart, Share2,
  Minus, Plus, ArrowRight, Info
} from 'lucide-react';
import { getActivityBySlug, formatDuration, formatPrice, activities } from '@/lib/sample-data';
import { RatingStars } from '@/components/ui/RatingStars';
import { ActivityCard } from '@/components/activities/ActivityCard';

export default function ActivityDetailPage() {
  const params = useParams();
  const activity = getActivityBySlug(params.slug as string);

  const [currentImage, setCurrentImage] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!activity) {
    return (
      <div className="pt-32 text-center section-padding">
        <div className="text-6xl mb-4">🏖️</div>
        <h1 className="heading-2 mb-2">Activity Not Found</h1>
        <p className="text-cabo-dark/50 mb-6">This activity doesn&apos;t exist or has been removed.</p>
        <Link href="/activities" className="btn-primary">Browse Activities</Link>
      </div>
    );
  }

  const totalPrice = (adults * activity.priceAdult) + (children * (activity.priceChild || 0));

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % activity.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + activity.images.length) % activity.images.length);

  // Generate next 14 days for date picker
  const dateOptions = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
    };
  });

  const timeSlots = activity.duration >= 360
    ? ['6:00 AM']
    : activity.duration >= 180
    ? ['8:00 AM', '1:00 PM']
    : ['8:00 AM', '10:30 AM', '2:00 PM', '4:00 PM'];

  const related = activities.filter(a => a.categoryId === activity.categoryId && a.id !== activity.id).slice(0, 3);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-cabo-white">
      {/* Breadcrumb */}
      <div className="section-padding py-3 bg-white border-b border-cabo-ocean/5">
        <div className="flex items-center gap-2 text-sm text-cabo-dark/40">
          <Link href="/" className="hover:text-cabo-ocean transition-colors">Home</Link>
          <span>/</span>
          <Link href="/activities" className="hover:text-cabo-ocean transition-colors">Activities</Link>
          <span>/</span>
          <Link href={`/activities?category=${activity.category?.slug}`} className="hover:text-cabo-ocean transition-colors">
            {activity.category?.name}
          </Link>
          <span>/</span>
          <span className="text-cabo-dark/70 truncate">{activity.title}</span>
        </div>
      </div>

      <div className="section-padding py-6 lg:py-10">
        <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-10">
          {/* Left column - Content */}
          <div className="min-w-0">
            {/* Image gallery */}
            <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/10] sm:aspect-[16/9] bg-cabo-dark/5">
              <img
                src={activity.images[currentImage]}
                alt={activity.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Navigation arrows */}
              {activity.images.length > 1 && (
                <>
                  <button onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                    <ChevronLeft className="w-5 h-5 text-cabo-dark" />
                  </button>
                  <button onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                    <ChevronRight className="w-5 h-5 text-cabo-dark" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {activity.images.map((_, i) => (
                  <button key={i} onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`} />
                ))}
              </div>

              {/* Actions */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                  <Share2 className="w-4.5 h-4.5 text-cabo-dark/60" />
                </button>
                <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                  <Heart className="w-4.5 h-4.5 text-cabo-dark/60" />
                </button>
              </div>
            </div>

            {/* Thumbnail strip */}
            {activity.images.length > 1 && (
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {activity.images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImage(i)}
                    className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentImage ? 'border-cabo-ocean' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title & meta */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-cabo-dark leading-snug">
                  {activity.title}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-cabo-dark/50">
                <RatingStars rating={activity.avgRating} size={16} totalReviews={activity.totalReviews} />
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {formatDuration(activity.duration)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> Max {activity.maxCapacity} guests
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" /> {activity.languages.map(l => l === 'en' ? 'English' : 'Spanish').join(', ')}
                </span>
              </div>

              <div className="mt-3 text-sm text-cabo-dark/50">
                Operated by <span className="font-semibold text-cabo-ocean">{activity.operator?.companyName}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-display text-xl text-cabo-dark mb-4">About This Experience</h2>
              <p className="text-cabo-dark/65 leading-relaxed whitespace-pre-line">{activity.description}</p>
            </div>

            {/* What's included */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
                <h3 className="font-semibold text-cabo-dark mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  What&apos;s Included
                </h3>
                <ul className="space-y-2.5">
                  {activity.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-cabo-dark/65">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100">
                <h3 className="font-semibold text-cabo-dark mb-4 flex items-center gap-2">
                  <XIcon className="w-5 h-5 text-red-500" />
                  Not Included
                </h3>
                <ul className="space-y-2.5">
                  {activity.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-cabo-dark/65">
                      <XIcon className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Requirements */}
            {activity.requirements.length > 0 && (
              <div className="mb-10 bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                <h3 className="font-semibold text-cabo-dark mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  What to Bring
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activity.requirements.map((req, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white rounded-lg text-sm text-cabo-dark/65 border border-amber-200/50">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Meeting point */}
            <div className="mb-10">
              <h2 className="font-display text-xl text-cabo-dark mb-4">Meeting Point</h2>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-cabo-ocean mt-0.5 shrink-0" />
                <span className="text-cabo-dark/65">{activity.meetingPoint}</span>
              </div>
              {/* Map placeholder */}
              <div className="w-full h-64 bg-cabo-sky/20 rounded-2xl border border-cabo-ocean/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-cabo-ocean mx-auto mb-2" />
                  <p className="text-sm text-cabo-dark/40">Google Maps integration</p>
                  <p className="text-xs text-cabo-dark/30 mt-1">
                    {activity.meetingLat?.toFixed(4)}, {activity.meetingLng?.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            {/* Cancellation policy */}
            {activity.cancellationPolicy && (
              <div className="mb-10 flex items-start gap-3 p-5 bg-cabo-ocean/5 rounded-2xl border border-cabo-ocean/10">
                <Shield className="w-5 h-5 text-cabo-ocean mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-cabo-dark text-sm mb-1">Cancellation Policy</h3>
                  <p className="text-sm text-cabo-dark/55">{activity.cancellationPolicy}</p>
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-cabo-dark">
                  Reviews <span className="text-cabo-dark/30">({activity.totalReviews})</span>
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-cabo-dark">{activity.avgRating}</span>
                  <RatingStars rating={activity.avgRating} size={18} showNumber={false} />
                </div>
              </div>

              <div className="space-y-4">
                {activity.reviews?.map(review => (
                  <div key={review.id} className="bg-white rounded-2xl p-5 border border-cabo-ocean/5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cabo-ocean/10 rounded-full flex items-center justify-center text-cabo-ocean font-bold text-sm">
                          {review.user?.name?.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-cabo-dark text-sm">{review.user?.name}</p>
                          <p className="text-xs text-cabo-dark/40">
                            {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <RatingStars rating={review.rating} size={14} showNumber={false} />
                    </div>
                    {review.title && <p className="font-semibold text-cabo-dark text-sm mb-1">{review.title}</p>}
                    <p className="text-sm text-cabo-dark/60 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Booking widget (sticky) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="bg-white rounded-2xl border border-cabo-ocean/10 shadow-xl shadow-cabo-ocean/5 overflow-hidden">
                {/* Price header */}
                <div className="p-6 bg-gradient-ocean text-white">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{formatPrice(activity.priceAdult)}</span>
                    <span className="text-white/60">/ person</span>
                  </div>
                  {activity.priceChild && (
                    <p className="text-sm text-white/50 mt-1">
                      Children: {formatPrice(activity.priceChild)} /person
                    </p>
                  )}
                </div>

                <div className="p-6 space-y-5">
                  {/* Date picker */}
                  <div>
                    <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-2">
                      <Calendar className="w-3.5 h-3.5 inline mr-1" /> Select Date
                    </label>
                    <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1">
                      {dateOptions.slice(0, 7).map(d => (
                        <button key={d.value}
                          onClick={() => setSelectedDate(d.value)}
                          className={`shrink-0 flex flex-col items-center w-14 py-2 rounded-xl border text-center transition-all ${
                            selectedDate === d.value
                              ? 'bg-cabo-ocean text-white border-cabo-ocean'
                              : 'bg-cabo-white border-cabo-ocean/10 hover:border-cabo-ocean/30'
                          }`}>
                          <span className={`text-[10px] font-medium ${selectedDate === d.value ? 'text-white/70' : 'text-cabo-dark/40'}`}>
                            {d.day}
                          </span>
                          <span className="text-lg font-bold leading-none mt-0.5">{d.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map(time => (
                        <button key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 text-sm font-medium rounded-xl border transition-all ${
                            selectedTime === time
                              ? 'bg-cabo-ocean text-white border-cabo-ocean'
                              : 'bg-cabo-white border-cabo-ocean/10 hover:border-cabo-ocean/30 text-cabo-dark/70'
                          }`}>
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-2">
                      Guests
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-cabo-dark">Adults</span>
                          <span className="text-xs text-cabo-dark/40 ml-1">({formatPrice(activity.priceAdult)} each)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-8 h-8 rounded-lg border border-cabo-ocean/15 flex items-center justify-center hover:bg-cabo-ocean/5 transition-colors">
                            <Minus className="w-3.5 h-3.5 text-cabo-dark/50" />
                          </button>
                          <span className="w-6 text-center font-semibold text-cabo-dark">{adults}</span>
                          <button onClick={() => setAdults(Math.min(activity.maxCapacity, adults + 1))}
                            className="w-8 h-8 rounded-lg border border-cabo-ocean/15 flex items-center justify-center hover:bg-cabo-ocean/5 transition-colors">
                            <Plus className="w-3.5 h-3.5 text-cabo-dark/50" />
                          </button>
                        </div>
                      </div>

                      {activity.priceChild !== null && (
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-cabo-dark">Children</span>
                            <span className="text-xs text-cabo-dark/40 ml-1">({formatPrice(activity.priceChild || 0)} each)</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={() => setChildren(Math.max(0, children - 1))}
                              className="w-8 h-8 rounded-lg border border-cabo-ocean/15 flex items-center justify-center hover:bg-cabo-ocean/5 transition-colors">
                              <Minus className="w-3.5 h-3.5 text-cabo-dark/50" />
                            </button>
                            <span className="w-6 text-center font-semibold text-cabo-dark">{children}</span>
                            <button onClick={() => setChildren(Math.min(activity.maxCapacity - adults, children + 1))}
                              className="w-8 h-8 rounded-lg border border-cabo-ocean/15 flex items-center justify-center hover:bg-cabo-ocean/5 transition-colors">
                              <Plus className="w-3.5 h-3.5 text-cabo-dark/50" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Total & CTA */}
                  <div className="pt-4 border-t border-cabo-ocean/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-cabo-dark">Total</span>
                      <span className="text-2xl font-bold text-cabo-dark">{formatPrice(totalPrice)}</span>
                    </div>

                    <button className="w-full btn-accent !py-4 !text-base !rounded-xl flex items-center justify-center gap-2">
                      Book Now <ArrowRight className="w-5 h-5" />
                    </button>

                    <p className="text-xs text-cabo-dark/30 text-center mt-3 flex items-center justify-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      Free cancellation available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related activities */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-cabo-ocean/10">
            <h2 className="heading-2 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a, i) => (
                <ActivityCard key={a.id} activity={a} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile booking bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-cabo-ocean/10 shadow-2xl shadow-black/10 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-cabo-dark">{formatPrice(activity.priceAdult)}</span>
              <span className="text-sm text-cabo-dark/40">/ person</span>
            </div>
            <RatingStars rating={activity.avgRating} size={12} totalReviews={activity.totalReviews} />
          </div>
          <button className="btn-accent !py-3 !px-8 flex items-center gap-2">
            Book Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
