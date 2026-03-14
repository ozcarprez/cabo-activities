// prisma/seed.ts
// Run with: npx ts-node prisma/seed.ts

import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.review.deleteMany();
  await prisma.bookingItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.category.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: 'Admin CaboXplore',
      email: 'admin@caboxplore.com',
      role: UserRole.ADMIN,
      password: '$2b$10$placeholder', // hash in production
    },
  });

  // Create operators
  const operators = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Cabo Adventures',
        email: 'info@caboAdventures.com',
        role: UserRole.OPERATOR,
        companyName: 'Cabo Adventures',
        companyDesc: 'Premier adventure tours in Los Cabos since 2005',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Pisces Sportfishing',
        email: 'info@piscessportfishing.com',
        role: UserRole.OPERATOR,
        companyName: 'Pisces Sportfishing',
        companyDesc: 'World-class sportfishing charters in Cabo San Lucas',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Cabo Sailing',
        email: 'info@cabosailing.com',
        role: UserRole.OPERATOR,
        companyName: 'Cabo Sailing Ocean Adventures',
        companyDesc: 'Luxury sailing experiences in the Sea of Cortez',
      },
    }),
  ]);

  // Create a tourist
  const tourist = await prisma.user.create({
    data: {
      name: 'John Smith',
      email: 'john@example.com',
      role: UserRole.TOURIST,
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Sport Fishing',
        nameEs: 'Pesca Deportiva',
        slug: 'sport-fishing',
        description: 'World-class sportfishing in the Marlin Capital of the World',
        icon: 'fish',
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Snorkel & Diving',
        nameEs: 'Snorkel y Buceo',
        slug: 'snorkel-diving',
        description: 'Explore the vibrant underwater world of the Sea of Cortez',
        icon: 'waves',
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Boat Tours',
        nameEs: 'Tours en Lancha',
        slug: 'boat-tours',
        description: 'Whale watching, glass bottom boats, and coastal cruises',
        icon: 'ship',
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: 'ATV & Land Adventures',
        nameEs: 'ATV y Aventuras en Tierra',
        slug: 'atv-land',
        description: 'Off-road desert adventures and adrenaline-pumping activities',
        icon: 'mountain',
        sortOrder: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Sailing & Cruises',
        nameEs: 'Veleros y Cruceros',
        slug: 'sailing-cruises',
        description: 'Sunset sails, luxury catamarans, and romantic cruises',
        icon: 'sailboat',
        sortOrder: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Water Sports',
        nameEs: 'Deportes Acuáticos',
        slug: 'water-sports',
        description: 'Jet skis, flyboards, parasailing, and more',
        icon: 'droplets',
        sortOrder: 6,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Cultural Tours',
        nameEs: 'Tours Culturales',
        slug: 'cultural-tours',
        description: 'Explore the history, art, and culture of Los Cabos',
        icon: 'landmark',
        sortOrder: 7,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Food & Drinks',
        nameEs: 'Gastronomía y Bebidas',
        slug: 'food-drinks',
        description: 'Taco tours, tequila tastings, and culinary experiences',
        icon: 'utensils',
        sortOrder: 8,
      },
    }),
  ]);

  // Create activities
  const activities = [
    {
      title: 'Deep Sea Marlin Fishing Charter',
      titleEs: 'Charter de Pesca de Marlín en Alta Mar',
      slug: 'deep-sea-marlin-fishing',
      description: `Experience world-class sportfishing in Cabo San Lucas, the undisputed Marlin Capital of the World. Board a fully equipped 31-foot Bertram yacht and head out into the deep blue waters where the Pacific Ocean meets the Sea of Cortez. Our experienced captains know exactly where to find the big ones — striped marlin, blue marlin, yellowfin tuna, dorado (mahi-mahi), and wahoo. All tackle, bait, and fishing licenses are included. Whether you're a seasoned angler or casting your first line, our crew will make sure you have the catch of a lifetime. We practice catch and release for billfish to preserve our incredible marine ecosystem.`,
      shortDesc: 'Chase marlin, tuna, and dorado on a premium deep-sea fishing charter.',
      highlights: ['Premium 31ft Bertram yacht', 'Professional captain & crew', 'All tackle & bait included', 'Fishing license included', 'Cooler with ice, water & soft drinks', 'Catch cleaning & filleting', 'Hotel pickup in Cabo corridor'],
      notIncluded: ['Gratuities for crew', 'Alcoholic beverages', 'Sunscreen and personal items', 'Taxidermy services'],
      requirements: ['Sunscreen', 'Sunglasses', 'Light jacket', 'Camera', 'Comfortable shoes'],
      duration: 480,
      maxCapacity: 6,
      priceAdult: 350,
      priceChild: 250,
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
        'https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?w=1200',
        'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200',
      ],
      mainImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
      meetingPoint: 'Cabo San Lucas Marina, Dock C',
      meetingLat: 22.8825,
      meetingLng: -109.9058,
      cancellationPolicy: 'Free cancellation up to 48 hours before. 50% refund within 24-48 hours.',
      difficulty: 'moderate',
      isFeatured: true,
      avgRating: 4.8,
      totalReviews: 127,
      totalBookings: 850,
      categoryId: categories[0].id,
      operatorId: operators[1].id,
    },
    {
      title: 'Snorkel at Pelican Rock & Lover\'s Beach',
      titleEs: 'Snorkel en Roca Pelícano y Playa del Amor',
      slug: 'snorkel-pelican-rock',
      description: `Discover the stunning underwater paradise of Cabo San Lucas on this guided snorkel tour. Glide through the crystal-clear waters of Pelican Rock, one of the area's premier snorkeling spots, where you'll encounter tropical fish, sea lions, and beautiful coral formations. Then visit the iconic Lover's Beach (Playa del Amor) at the very tip of the Baja Peninsula, nestled between the Pacific Ocean and the Sea of Cortez near the famous El Arco rock formation. Jacques Cousteau called the Sea of Cortez "the world's aquarium" — and you're about to see why. Small groups ensure a personalized experience with our certified guides.`,
      shortDesc: 'Snorkel with tropical fish and sea lions at Cabo\'s most iconic spots.',
      highlights: ['Professional snorkel equipment', 'Certified bilingual guide', 'Glass-bottom boat ride', 'Visit to El Arco & Lover\'s Beach', 'Bottled water & fresh fruit', 'Underwater photos included', 'Small group (max 12)'],
      notIncluded: ['Hotel transportation', 'Gratuities', 'Wetsuit rental ($10)'],
      requirements: ['Swimsuit', 'Towel', 'Biodegradable sunscreen', 'Water shoes recommended'],
      duration: 180,
      maxCapacity: 12,
      priceAdult: 65,
      priceChild: 45,
      images: [
        'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1200',
        'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200',
        'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200',
      ],
      mainImage: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1200',
      meetingPoint: 'Medano Beach, near The Office restaurant',
      meetingLat: 22.8838,
      meetingLng: -109.9011,
      cancellationPolicy: 'Free cancellation up to 24 hours before departure.',
      minAge: 6,
      difficulty: 'easy',
      isFeatured: true,
      avgRating: 4.9,
      totalReviews: 312,
      totalBookings: 2100,
      categoryId: categories[1].id,
      operatorId: operators[0].id,
    },
    {
      title: 'Whale Watching Eco-Tour',
      titleEs: 'Tour Ecológico de Avistamiento de Ballenas',
      slug: 'whale-watching-eco-tour',
      description: `Witness the majestic humpback and gray whales in their natural habitat during their annual migration to the warm waters of Baja California Sur. From December through April, thousands of whales travel from Alaska to breed and give birth in the waters surrounding Cabo. Our expert marine biologist guides will share fascinating facts about these gentle giants while ensuring responsible whale-watching practices. We use specialized zodiacs that allow for closer (yet respectful) encounters. See mothers with their calves, dramatic breaches, and the haunting sound of whale songs through our hydrophone.`,
      shortDesc: 'Get up close with humpback whales on a marine biologist-led eco-tour.',
      highlights: ['Marine biologist guide', 'Specialized zodiac boat', 'Hydrophone to hear whale songs', 'Binoculars provided', 'Light snacks & drinks', 'Whale sighting guarantee*', 'Certified eco-friendly tour'],
      notIncluded: ['Hotel pickup', 'Gratuities', 'Rain gear'],
      requirements: ['Warm layer for morning tours', 'Camera with zoom', 'Sea sickness medication if needed'],
      duration: 150,
      maxCapacity: 16,
      priceAdult: 85,
      priceChild: 55,
      images: [
        'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1200',
        'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=1200',
        'https://images.unsplash.com/photo-1511159817101-f7f14839dd50?w=1200',
      ],
      mainImage: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1200',
      meetingPoint: 'Cabo San Lucas Marina, Main Dock',
      meetingLat: 22.8825,
      meetingLng: -109.9058,
      cancellationPolicy: 'Free cancellation up to 24 hours before. Full refund if no whales spotted.',
      minAge: 4,
      difficulty: 'easy',
      isFeatured: true,
      avgRating: 4.9,
      totalReviews: 489,
      totalBookings: 3200,
      categoryId: categories[2].id,
      operatorId: operators[0].id,
    },
    {
      title: 'Desert ATV & Beach Adventure',
      titleEs: 'ATV por el Desierto y Playa',
      slug: 'desert-atv-beach-adventure',
      description: `Kick up dust on an exhilarating ATV ride through the Baja desert landscape. This guided adventure takes you along rugged desert trails with stunning panoramic views of the Pacific coastline, through dry river beds, and across sandy dunes before arriving at a secluded beach. Learn about the unique desert flora and fauna of the region — from towering cardón cacti (the world's largest) to the curious chuckwalla lizards. Includes a stop at a traditional rancho for refreshments and a chance to learn about rural Baja life. Single and double ATVs available.`,
      shortDesc: 'Ride ATVs through Baja desert canyons to a hidden Pacific beach.',
      highlights: ['Polaris ATV (single or double)', 'Professional guide', 'Safety equipment & training', 'Desert landscape views', 'Visit to traditional rancho', 'Refreshments included', 'Beach stop for swimming', 'Hotel pickup & dropoff'],
      notIncluded: ['Gratuities', 'Photos ($25 USB package)', 'Insurance upgrade'],
      requirements: ['Closed-toe shoes mandatory', 'Long pants recommended', 'Bandana for dust', 'Valid driver license for single ATV'],
      duration: 210,
      maxCapacity: 20,
      priceAdult: 95,
      priceChild: 65,
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200',
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
      ],
      mainImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200',
      meetingPoint: 'Rancho San Cristobal, Km 4.5 Carretera a Todos Santos',
      meetingLat: 22.9054,
      meetingLng: -109.9308,
      cancellationPolicy: 'Free cancellation up to 24 hours before departure.',
      minAge: 6,
      difficulty: 'moderate',
      isFeatured: false,
      avgRating: 4.7,
      totalReviews: 256,
      totalBookings: 1800,
      categoryId: categories[3].id,
      operatorId: operators[0].id,
    },
    {
      title: 'Luxury Sunset Sailing Cruise',
      titleEs: 'Crucero de Vela al Atardecer de Lujo',
      slug: 'luxury-sunset-sailing',
      description: `Set sail aboard a stunning 42-foot luxury catamaran as the sun paints the sky in shades of gold, orange, and crimson over the Pacific Ocean. This intimate sailing experience takes you past the iconic El Arco de Cabo San Lucas, Lover's Beach, and along the dramatic coastline. Enjoy an open premium bar (featuring top-shelf tequila, mezcal, and Mexican wines), gourmet appetizers prepared by our onboard chef, and the soothing sounds of live acoustic music. As the sun dips below the horizon, toast to paradise with a glass of champagne. Limited to 24 guests for an exclusive experience.`,
      shortDesc: 'Sail past El Arco on a luxury catamaran with open bar and live music.',
      highlights: ['42ft luxury catamaran', 'Premium open bar', 'Gourmet appetizers', 'Live acoustic music', 'Sail past El Arco', 'Champagne sunset toast', 'Professional crew', 'Limited to 24 guests'],
      notIncluded: ['Hotel transportation', 'Gratuities for crew'],
      requirements: ['Light sweater for after sunset', 'Camera'],
      duration: 150,
      maxCapacity: 24,
      priceAdult: 120,
      priceChild: 75,
      images: [
        'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200',
        'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=1200',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
      ],
      mainImage: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200',
      meetingPoint: 'Cabo San Lucas Marina, Dock E (Luxury Pier)',
      meetingLat: 22.8830,
      meetingLng: -109.9062,
      cancellationPolicy: 'Free cancellation up to 48 hours before. Non-refundable within 48 hours.',
      minAge: 0,
      difficulty: 'easy',
      isFeatured: true,
      avgRating: 4.9,
      totalReviews: 567,
      totalBookings: 4500,
      categoryId: categories[4].id,
      operatorId: operators[2].id,
    },
    {
      title: 'Jet Ski & Flyboard Combo Package',
      titleEs: 'Paquete Combo Jet Ski y Flyboard',
      slug: 'jet-ski-flyboard-combo',
      description: `Get your adrenaline pumping with this ultimate water sports combo in the warm waters of Medano Beach. Start with a thrilling jet ski ride along the Cabo coastline — cruise past luxury resorts, feel the spray, and take in the stunning views of Land's End from the water. Then, strap on a flyboard and experience the sensation of flying above the ocean! Our certified instructors will have you hovering in no time. The flyboard uses water jet propulsion to lift you up to 15 meters above the surface — an unforgettable rush. Both activities include full safety briefing and equipment.`,
      shortDesc: 'Ride jet skis along the coast then soar above the ocean on a flyboard.',
      highlights: ['30-min jet ski ride', '20-min flyboard session', 'Certified instructors', 'All safety equipment', 'Go-Pro video available', 'Locker and changing area', 'On-beach location'],
      notIncluded: ['Hotel transportation', 'GoPro video ($30)', 'Additional jet ski time'],
      requirements: ['Swimsuit', 'Must know how to swim', 'No previous experience needed'],
      duration: 90,
      maxCapacity: 8,
      priceAdult: 145,
      priceChild: null,
      images: [
        'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200',
        'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1200',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
      ],
      mainImage: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200',
      meetingPoint: 'Medano Beach Water Sports Center',
      meetingLat: 22.8842,
      meetingLng: -109.9008,
      cancellationPolicy: 'Free cancellation up to 24 hours before.',
      minAge: 16,
      difficulty: 'moderate',
      isFeatured: false,
      avgRating: 4.6,
      totalReviews: 198,
      totalBookings: 950,
      categoryId: categories[5].id,
      operatorId: operators[0].id,
    },
    {
      title: 'San José del Cabo Art Walk & History Tour',
      titleEs: 'Caminata de Arte e Historia en San José del Cabo',
      slug: 'san-jose-art-walk-history',
      description: `Discover the cultural heart of Los Cabos on this guided walking tour through the charming colonial streets of San José del Cabo's historic Art District. Every Thursday evening from November to June, the town's galleries open their doors for the famous Art Walk — and our expert local guide will take you behind the scenes. Visit working artists' studios, learn about the region's rich history from its indigenous roots to the Spanish colonial era, explore the beautifully restored 18th-century Mission of San José, and discover hidden murals and street art. The tour includes stops at 6-8 galleries and a mezcal tasting at a local gallery bar.`,
      shortDesc: 'Explore galleries, colonial history, and mezcal on a guided art walk.',
      highlights: ['Local expert guide', 'Visit 6-8 galleries', 'Meet working artists', 'Mission San José visit', 'Mezcal tasting included', 'Street art & murals tour', 'Small group (max 10)', 'Air-conditioned transport from Cabo'],
      notIncluded: ['Artwork purchases', 'Additional drinks', 'Dinner'],
      requirements: ['Comfortable walking shoes', 'Light clothing', 'Cash for art purchases'],
      duration: 180,
      maxCapacity: 10,
      priceAdult: 55,
      priceChild: 35,
      images: [
        'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200',
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200',
        'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=1200',
      ],
      mainImage: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200',
      meetingPoint: 'San José del Cabo Town Square (Plaza Mijares)',
      meetingLat: 23.0578,
      meetingLng: -109.6987,
      cancellationPolicy: 'Free cancellation up to 24 hours before.',
      minAge: 0,
      difficulty: 'easy',
      isFeatured: false,
      avgRating: 4.8,
      totalReviews: 178,
      totalBookings: 1200,
      categoryId: categories[6].id,
      operatorId: operators[0].id,
    },
    {
      title: 'Taco Trail & Tequila Tasting Experience',
      titleEs: 'Ruta de Tacos y Degustación de Tequila',
      slug: 'taco-trail-tequila-tasting',
      description: `Eat your way through the best-kept culinary secrets of Cabo San Lucas on this mouth-watering food tour. Your local foodie guide will take you to 5 carefully selected taco stops — from street vendors to hidden gems — where you'll taste everything from freshly caught fish tacos to al pastor cooked on a traditional trompo, birria tacos, and more. Between stops, learn about the history of Mexican cuisine and the unique Baja Med fusion style that makes Los Cabos a gastronomic destination. The tour culminates with a premium tequila and mezcal tasting at one of Cabo's finest agave bars, where you'll learn to distinguish between blanco, reposado, and añejo. Includes 12+ taco tastings and 4 tequila/mezcal pours.`,
      shortDesc: 'Taste 12+ street tacos and premium tequilas with a local foodie guide.',
      highlights: ['Local foodie guide', '5 taco stops, 12+ tastings', 'Fish, al pastor, birria & more', 'Premium tequila & mezcal tasting', '4 agave spirit pours', 'Baja Med fusion explanation', 'Vegetarian options available', 'Walking tour of downtown'],
      notIncluded: ['Additional drinks', 'Gratuities', 'Transportation to starting point'],
      requirements: ['Empty stomach!', 'Comfortable shoes', 'Cash for optional purchases'],
      duration: 210,
      maxCapacity: 12,
      priceAdult: 75,
      priceChild: 45,
      images: [
        'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200',
        'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1200',
        'https://images.unsplash.com/photo-1582544793929-585cc5c0820d?w=1200',
      ],
      mainImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200',
      meetingPoint: 'Outside Squid Roe Bar, Boulevard Marina',
      meetingLat: 22.8898,
      meetingLng: -109.9050,
      cancellationPolicy: 'Free cancellation up to 24 hours before departure.',
      minAge: 12,
      difficulty: 'easy',
      isFeatured: true,
      avgRating: 4.9,
      totalReviews: 423,
      totalBookings: 2800,
      categoryId: categories[7].id,
      operatorId: operators[0].id,
    },
    {
      title: 'Cabo Arch & Sea Lion Colony Kayak Tour',
      titleEs: 'Tour en Kayak al Arco y Colonia de Lobos Marinos',
      slug: 'arch-sea-lion-kayak',
      description: `Paddle your way to Cabo's most iconic landmark — El Arco — on this guided kayak and snorkel adventure. Launch from Medano Beach and glide across the turquoise waters, passing by luxury yachts and pangas as you approach the dramatic rock formations at Land's End. Kayak right through the famous arch (conditions permitting), then visit the sea lion colony at nearby rocks where dozens of playful California sea lions sun themselves and splash in the surf. After kayaking, snorkel in the protected cove at Pelican Rock where visibility often exceeds 15 meters. Transparent kayaks available for an extra-special view of the marine life below.`,
      shortDesc: 'Kayak to El Arco, visit sea lions, and snorkel at Pelican Rock.',
      highlights: ['Guided kayak to El Arco', 'Sea lion colony visit', 'Snorkel at Pelican Rock', 'Snorkel gear included', 'Certified bilingual guide', 'Dry bag for belongings', 'Photos from guide', 'Transparent kayak upgrade available'],
      notIncluded: ['Transparent kayak upgrade ($15)', 'Wetsuit rental ($10)', 'Gratuities'],
      requirements: ['Swimsuit', 'Biodegradable sunscreen', 'Water shoes', 'Basic swimming ability'],
      duration: 150,
      maxCapacity: 14,
      priceAdult: 60,
      priceChild: 40,
      images: [
        'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200',
        'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200',
        'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200',
      ],
      mainImage: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200',
      meetingPoint: 'Medano Beach, Cabo Kayak Hut (next to Mango Deck)',
      meetingLat: 22.8840,
      meetingLng: -109.9010,
      cancellationPolicy: 'Free cancellation up to 24 hours before. No-show no refund.',
      minAge: 8,
      difficulty: 'moderate',
      isFeatured: false,
      avgRating: 4.7,
      totalReviews: 345,
      totalBookings: 2400,
      categoryId: categories[2].id,
      operatorId: operators[0].id,
    },
    {
      title: 'Luxury Glass-Bottom Boat & Snorkel at Chileno Bay',
      titleEs: 'Lancha con Fondo de Cristal y Snorkel en Bahía Chileno',
      slug: 'glass-bottom-boat-chileno',
      description: `Experience the best of both worlds on this premium glass-bottom boat tour to Chileno Bay — one of Mexico's few Blue Flag certified beaches. Start at the Cabo San Lucas marina and cruise along the Tourist Corridor with narration about the stunning rock formations, celebrity homes, and marine life visible through the glass panels beneath your feet. At Chileno Bay, a protected marine area, disembark for world-class snorkeling among vibrant coral reefs teeming with parrotfish, pufferfish, moray eels, and giant Moorish idols. The calm, shallow waters make this perfect for beginners and families. Includes a gourmet box lunch, fresh ceviche, and an open bar.`,
      shortDesc: 'See marine life through glass then snorkel a Blue Flag bay with open bar.',
      highlights: ['Glass-bottom boat experience', 'Snorkel at Blue Flag beach', 'Gourmet box lunch', 'Fresh ceviche onboard', 'Open bar (beer, wine, cocktails)', 'Professional guide', 'All snorkel equipment', 'Shaded and sun areas on boat'],
      notIncluded: ['Hotel pickup', 'Gratuities', 'Underwater camera rental'],
      requirements: ['Swimsuit', 'Towel', 'Biodegradable sunscreen only', 'Cash for tips'],
      duration: 240,
      maxCapacity: 30,
      priceAdult: 95,
      priceChild: 65,
      images: [
        'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200',
        'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
      ],
      mainImage: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200',
      meetingPoint: 'Cabo San Lucas Marina, Dock A (Glass Bottom Fleet)',
      meetingLat: 22.8827,
      meetingLng: -109.9056,
      cancellationPolicy: 'Free cancellation up to 24 hours before departure.',
      minAge: 3,
      difficulty: 'easy',
      isFeatured: false,
      avgRating: 4.6,
      totalReviews: 289,
      totalBookings: 1950,
      categoryId: categories[2].id,
      operatorId: operators[2].id,
    },
  ];

  for (const actData of activities) {
    const activity = await prisma.activity.create({ data: actData });

    // Create availability for next 60 days
    const today = new Date();
    for (let i = 1; i <= 60; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      const times = actData.duration >= 360
        ? ['06:00']
        : actData.duration >= 180
        ? ['08:00', '13:00']
        : ['08:00', '10:30', '14:00', '16:00'];

      for (const time of times) {
        await prisma.availability.create({
          data: {
            activityId: activity.id,
            date,
            startTime: time,
            totalSpots: actData.maxCapacity,
            bookedSpots: Math.floor(Math.random() * Math.floor(actData.maxCapacity * 0.4)),
          },
        });
      }
    }
  }

  // Create some sample reviews
  const allActivities = await prisma.activity.findMany();
  const reviewTexts = [
    { title: 'Best experience ever!', comment: 'This was the highlight of our Cabo trip. The crew was amazing, professional, and made us feel so welcome. Would book again in a heartbeat!', rating: 5 },
    { title: 'Absolutely incredible', comment: 'Everything exceeded our expectations. The scenery was breathtaking and the guides were so knowledgeable. A must-do in Cabo!', rating: 5 },
    { title: 'Great value for money', comment: 'Really well organized tour with excellent equipment. The staff went above and beyond. Highly recommended for families.', rating: 4 },
    { title: 'Unforgettable day', comment: 'We had such an amazing time! The crew was friendly and professional. The views were out of this world. Already planning to come back.', rating: 5 },
    { title: 'Wonderful experience', comment: 'A truly magical experience. Everything was well organized and the guides made sure everyone had a great time. Top notch!', rating: 4 },
  ];

  for (const activity of allActivities.slice(0, 5)) {
    for (let i = 0; i < 2; i++) {
      const rv = reviewTexts[i];
      const booking = await prisma.booking.create({
        data: {
          bookingNumber: `CB-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          status: 'COMPLETED',
          totalAmount: activity.priceAdult * 2,
          commissionAmount: activity.priceAdult * 2 * 0.15,
          operatorAmount: activity.priceAdult * 2 * 0.85,
          guestName: 'John Smith',
          guestEmail: 'john@example.com',
          userId: tourist.id,
          activityId: activity.id,
        },
      });

      await prisma.review.create({
        data: {
          rating: rv.rating,
          title: rv.title,
          comment: rv.comment,
          userId: tourist.id,
          activityId: activity.id,
          bookingId: booking.id,
        },
      });
    }
  }

  console.log('✅ Seed completed successfully!');
  console.log(`Created: ${allActivities.length} activities, ${categories.length} categories, ${operators.length + 2} users`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
