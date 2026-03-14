// src/lib/types.ts

export interface Category {
  id: string;
  name: string;
  nameEs: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  sortOrder: number;
  _count?: { activities: number };
}

export interface Activity {
  id: string;
  title: string;
  titleEs: string | null;
  slug: string;
  description: string;
  shortDesc: string;
  highlights: string[];
  notIncluded: string[];
  requirements: string[];
  duration: number;
  maxCapacity: number;
  priceAdult: number;
  priceChild: number | null;
  priceCurrency: string;
  images: string[];
  mainImage: string;
  meetingPoint: string;
  meetingLat: number | null;
  meetingLng: number | null;
  cancellationPolicy: string | null;
  minAge: number | null;
  difficulty: string | null;
  languages: string[];
  isActive: boolean;
  isFeatured: boolean;
  avgRating: number;
  totalReviews: number;
  totalBookings: number;
  categoryId: string;
  operatorId: string;
  category?: Category;
  operator?: { name: string; companyName: string | null };
  reviews?: Review[];
  availabilities?: Availability[];
}

export interface Availability {
  id: string;
  date: string;
  startTime: string;
  endTime: string | null;
  totalSpots: number;
  bookedSpots: number;
  priceOverride: number | null;
  isBlocked: boolean;
  activityId: string;
}

export interface Review {
  id: string;
  rating: number;
  title: string | null;
  comment: string;
  images: string[];
  createdAt: string;
  user?: { name: string; image: string | null };
}

export interface Booking {
  id: string;
  bookingNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  totalAmount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string | null;
  specialRequests: string | null;
  createdAt: string;
  activity?: Activity;
  items?: BookingItem[];
}

export interface BookingItem {
  id: string;
  adults: number;
  children: number;
  pricePerAdult: number;
  pricePerChild: number;
  subtotal: number;
  availability?: Availability;
}

export interface SearchFilters {
  category?: string;
  date?: string;
  priceMin?: number;
  priceMax?: number;
  duration?: string;
  rating?: number;
  sort?: 'price-asc' | 'price-desc' | 'rating' | 'popular' | 'newest';
  q?: string;
}
