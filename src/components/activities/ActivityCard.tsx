'use client';

import Link from 'next/link';
import { Clock, Users, Heart, MapPin } from 'lucide-react';
import { Activity } from '@/lib/types';
import { formatDuration, formatPrice } from '@/lib/sample-data';
import { RatingStars } from '@/components/ui/RatingStars';

interface ActivityCardProps {
  activity: Activity;
  index?: number;
}

export function ActivityCard({ activity, index = 0 }: ActivityCardProps) {
  const difficultyColor = {
    easy: 'bg-emerald-100 text-emerald-700',
    moderate: 'bg-amber-100 text-amber-700',
    hard: 'bg-red-100 text-red-700',
  }[activity.difficulty || 'easy'] || 'bg-gray-100 text-gray-700';

  return (
    <Link href={`/${activity.slug}`}
      className={`activity-card block bg-white rounded-2xl overflow-hidden border border-cabo-ocean/5 opacity-0 animate-slide-up`}
      style={{ animationDelay: `${index * 0.08}s` }}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={activity.mainImage}
          alt={activity.title}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {activity.isFeatured && (
            <span className="px-2.5 py-1 bg-cabo-sunset text-white text-xs font-bold rounded-lg uppercase tracking-wider shadow-lg">
              Featured
            </span>
          )}
          {activity.difficulty && (
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize ${difficultyColor}`}>
              {activity.difficulty}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg group"
          onClick={(e) => { e.preventDefault(); }}>
          <Heart className="w-4.5 h-4.5 text-cabo-dark/40 group-hover:text-cabo-coral transition-colors" />
        </button>

        {/* Price badge */}
        <div className="absolute bottom-3 right-3 glass-dark px-3 py-1.5 rounded-xl">
          <span className="text-xs text-white/60">From </span>
          <span className="text-lg font-bold text-white">{formatPrice(activity.priceAdult)}</span>
          <span className="text-xs text-white/60"> /person</span>
        </div>

        {/* Category */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-medium text-white/90 bg-white/15 backdrop-blur px-2.5 py-1 rounded-lg">
            {activity.category?.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-lg sm:text-xl text-cabo-dark leading-snug mb-2 line-clamp-2">
          {activity.title}
        </h3>

        <p className="text-sm text-cabo-dark/55 mb-3 line-clamp-2 leading-relaxed">
          {activity.shortDesc}
        </p>

        <div className="flex items-center gap-3 mb-3 text-cabo-dark/50">
          <span className="flex items-center gap-1 text-xs">
            <Clock className="w-3.5 h-3.5" />
            {formatDuration(activity.duration)}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Users className="w-3.5 h-3.5" />
            Max {activity.maxCapacity}
          </span>
          {activity.meetingPoint && (
            <span className="flex items-center gap-1 text-xs truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{activity.meetingPoint.split(',')[0]}</span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-cabo-ocean/5">
          <RatingStars rating={activity.avgRating} size={14} totalReviews={activity.totalReviews} />
          <span className="text-xs font-medium text-cabo-ocean">
            {activity.totalBookings.toLocaleString()} booked
          </span>
        </div>
      </div>
    </Link>
  );
}
