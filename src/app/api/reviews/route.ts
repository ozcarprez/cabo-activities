import { NextRequest, NextResponse } from 'next/server';

// GET reviews for an activity
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activityId = searchParams.get('activityId');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');

  if (!activityId) {
    return NextResponse.json({ error: 'activityId is required' }, { status: 400 });
  }

  // In production, fetch from DB:
  // const reviews = await prisma.review.findMany({
  //   where: { activityId, isVisible: true },
  //   include: { user: { select: { name: true, image: true } } },
  //   orderBy: { createdAt: 'desc' },
  //   take: limit,
  //   skip: offset,
  // });

  const sampleReviews = [
    {
      id: 'r1',
      rating: 5,
      title: 'Best experience ever!',
      comment: 'This was the highlight of our Cabo trip. The crew was amazing, professional, and made us feel so welcome.',
      images: [],
      createdAt: new Date('2025-12-15').toISOString(),
      user: { name: 'Sarah M.', image: null },
    },
    {
      id: 'r2',
      rating: 5,
      title: 'Absolutely incredible',
      comment: 'Everything exceeded our expectations. The scenery was breathtaking and the guides were knowledgeable.',
      images: [],
      createdAt: new Date('2025-11-20').toISOString(),
      user: { name: 'Mike T.', image: null },
    },
    {
      id: 'r3',
      rating: 4,
      title: 'Great value for money',
      comment: 'Really well organized tour with excellent equipment. The staff went above and beyond. Recommended for families.',
      images: [],
      createdAt: new Date('2025-11-05').toISOString(),
      user: { name: 'Emma R.', image: null },
    },
  ];

  return NextResponse.json({
    reviews: sampleReviews,
    total: sampleReviews.length,
    averageRating: 4.7,
  });
}

// POST a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { activityId, bookingId, rating, title, comment } = body;

    if (!activityId || !bookingId || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields: activityId, bookingId, rating, comment' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // In production:
    // 1. Verify user is authenticated
    // 2. Verify booking exists and belongs to user
    // 3. Verify booking status is COMPLETED
    // 4. Check user hasn't already reviewed this booking
    // 5. Create review
    // 6. Update activity avgRating and totalReviews

    const review = {
      id: `rv_${Date.now()}`,
      activityId,
      bookingId,
      rating,
      title: title || null,
      comment,
      images: [],
      isVisible: true,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error('Review error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
