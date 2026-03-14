import { NextRequest, NextResponse } from 'next/server';
import { getActivityBySlug } from '@/lib/sample-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { activitySlug, date, time, adults, children, guestName, guestEmail, guestPhone, specialRequests } = body;

    // Validate required fields
    if (!activitySlug || !date || !time || !adults || !guestName || !guestEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: activitySlug, date, time, adults, guestName, guestEmail' },
        { status: 400 }
      );
    }

    const activity = getActivityBySlug(activitySlug);
    if (!activity) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    // Calculate pricing
    const adultTotal = adults * activity.priceAdult;
    const childTotal = (children || 0) * (activity.priceChild || 0);
    const totalAmount = adultTotal + childTotal;
    const commissionRate = 0.15; // 15% platform commission
    const commissionAmount = totalAmount * commissionRate;
    const operatorAmount = totalAmount - commissionAmount;

    // Generate booking number
    const bookingNumber = `CX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    // In production, this would:
    // 1. Check availability in DB
    // 2. Create Stripe payment intent
    // 3. Create booking record
    // 4. Update availability (bookedSpots)
    // 5. Send confirmation email

    const booking = {
      bookingNumber,
      status: 'PENDING',
      activity: {
        title: activity.title,
        slug: activity.slug,
        mainImage: activity.mainImage,
        duration: activity.duration,
        meetingPoint: activity.meetingPoint,
      },
      date,
      time,
      guests: { adults, children: children || 0 },
      pricing: {
        adultPrice: activity.priceAdult,
        childPrice: activity.priceChild || 0,
        adultTotal,
        childTotal,
        subtotal: totalAmount,
        commissionAmount,
        operatorAmount,
        total: totalAmount,
        currency: 'USD',
      },
      guest: { name: guestName, email: guestEmail, phone: guestPhone },
      specialRequests,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      booking,
      // In production: stripeClientSecret for payment
      message: 'Booking created successfully. Proceed to payment.',
    }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // In production, this would fetch bookings for the authenticated user
  return NextResponse.json({
    bookings: [],
    message: 'Connect to database to fetch real bookings',
  });
}
