import { NextResponse } from 'next/server';
import { categories, activities } from '@/lib/sample-data';

export async function GET() {
  const categoriesWithCount = categories.map(cat => ({
    ...cat,
    activityCount: activities.filter(a => a.categoryId === cat.id).length,
    totalBookings: activities
      .filter(a => a.categoryId === cat.id)
      .reduce((sum, a) => sum + a.totalBookings, 0),
  }));

  return NextResponse.json({ categories: categoriesWithCount });
}
