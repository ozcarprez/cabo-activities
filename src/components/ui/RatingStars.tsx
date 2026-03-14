import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
  totalReviews?: number;
}

export function RatingStars({ rating, size = 16, showNumber = true, totalReviews }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-cabo-sunset-warm text-cabo-sunset-warm" />
        ))}
        {hasHalf && <StarHalf size={size} className="fill-cabo-sunset-warm text-cabo-sunset-warm" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-cabo-sand-dark/30" />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-semibold text-cabo-dark">{rating.toFixed(1)}</span>
      )}
      {totalReviews !== undefined && (
        <span className="text-sm text-cabo-dark/50">({totalReviews.toLocaleString()})</span>
      )}
    </div>
  );
}
