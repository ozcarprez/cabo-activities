import { NextRequest, NextResponse } from 'next/server';
import { getActivityBySlug } from '@/lib/sample-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activitySlug = searchParams.get('activity');
  const date = searchParams.get('date');

  if (!activitySlug) {
    return NextResponse.json({ error: 'activity slug is required' }, { status: 400 });
  }

  const activity = getActivityBySlug(activitySlug);
  if (!activity) {
    return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
  }

  // Generate mock availability for next 30 days
  const availability = [];
  const today = new Date();

  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];

    // Skip if specific date requested and doesn't match
    if (date && dateStr !== date) continue;

    const timeSlots = activity.duration >= 360
      ? [{ time: '06:00', label: '6:00 AM' }]
      : activity.duration >= 180
      ? [{ time: '08:00', label: '8:00 AM' }, { time: '13:00', label: '1:00 PM' }]
      : [
          { time: '08:00', label: '8:00 AM' },
          { time: '10:30', label: '10:30 AM' },
          { time: '14:00', label: '2:00 PM' },
          { time: '16:00', label: '4:00 PM' },
        ];

    const slots = timeSlots.map(slot => {
      const booked = Math.floor(Math.random() * Math.floor(activity.maxCapacity * 0.6));
      const available = activity.maxCapacity - booked;
      return {
        id: `avail_${dateStr}_${slot.time}`,
        date: dateStr,
        startTime: slot.time,
        label: slot.label,
        totalSpots: activity.maxCapacity,
        bookedSpots: booked,
        availableSpots: available,
        isAvailable: available > 0,
        priceAdult: activity.priceAdult,
        priceChild: activity.priceChild,
      };
    });

    availability.push({
      date: dateStr,
      dayOfWeek: d.toLocaleDateString('en-US', { weekday: 'long' }),
      slots,
      hasAvailability: slots.some(s => s.isAvailable),
    });
  }

  return NextResponse.json({
    activity: {
      slug: activity.slug,
      title: activity.title,
      maxCapacity: activity.maxCapacity,
    },
    availability,
    total: availability.length,
  });
}
