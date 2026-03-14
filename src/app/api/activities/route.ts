import { NextRequest, NextResponse } from 'next/server';
import { activities, categories } from '@/lib/sample-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q');
  const sort = searchParams.get('sort') || 'popular';
  const featured = searchParams.get('featured');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  let result = [...activities];

  // Filters
  if (featured === 'true') {
    result = result.filter(a => a.isFeatured);
  }

  if (category) {
    const cat = categories.find(c => c.slug === category);
    if (cat) result = result.filter(a => a.categoryId === cat.id);
  }

  if (q) {
    const query = q.toLowerCase();
    result = result.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.shortDesc.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query)
    );
  }

  // Sort
  switch (sort) {
    case 'rating':
      result.sort((a, b) => b.avgRating - a.avgRating);
      break;
    case 'price-asc':
      result.sort((a, b) => a.priceAdult - b.priceAdult);
      break;
    case 'price-desc':
      result.sort((a, b) => b.priceAdult - a.priceAdult);
      break;
    default:
      result.sort((a, b) => b.totalBookings - a.totalBookings);
  }

  const total = result.length;
  result = result.slice(offset, offset + limit);

  return NextResponse.json({
    activities: result,
    total,
    limit,
    offset,
  });
}
