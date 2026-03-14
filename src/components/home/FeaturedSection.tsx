import { getFeaturedActivities } from '@/lib/sample-data';
import { ActivityCard } from '@/components/activities/ActivityCard';

export function FeaturedSection() {
  const featured = getFeaturedActivities();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cabo-sky/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="section-padding relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="font-accent text-xs uppercase tracking-[0.25em] text-cabo-sunset mb-2 block">Most Popular</span>
            <h2 className="heading-2">Featured Experiences</h2>
            <p className="text-cabo-dark/50 mt-2 max-w-md">
              Hand-picked adventures loved by thousands of travelers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((activity, i) => (
            <ActivityCard key={activity.id} activity={activity} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
