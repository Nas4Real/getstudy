import React from 'react';

const REVIEWS = [
  {
    name: 'Thomas Laurent',
    role: 'Major Concours CPGE (MP*)',
    avatar: 'TL',
    avatarColor: 'from-cyan-600 to-cyan-400',
    content:
      'The timetable and DS exam countdowns saved my preparatory year. Having my revision blocks bound directly to chapter mastery with native KaTeX is unmatched.',
    offset: '',
  },
  {
    name: 'Amira Ben Salem',
    role: 'Engineering Student, CentraleSupélec',
    avatar: 'AB',
    avatarColor: 'from-pink-600 to-pink-400',
    content:
      'No consumer fluff, no cartoon badges—just pure focus. The active recall flashcards with formula rendering made retaining reduction theorems effortless.',
    offset: 'lg:mt-12',
  },
  {
    name: 'David Klein',
    role: 'Mathematics & EECS, MIT',
    avatar: 'DK',
    avatarColor: 'from-emerald-600 to-emerald-400',
    content:
      'I used to juggle three separate apps for my problem sets, formula cheatsheets, and calendar. GetStudy unified everything into one cockpit.',
    offset: 'lg:-mt-6',
  },
  {
    name: 'Léa Marchand',
    role: 'PCSI Preparatory Track',
    avatar: 'LM',
    avatarColor: 'from-purple-600 to-purple-400',
    content:
      'The autonomous AI assistant actually scheduled my revision blocks right into my calendar when DS 3 was 48 hours away. Truly built for STEM.',
    offset: 'lg:mt-6',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8 bg-black overflow-hidden border-t border-neutral-900">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Sticky Column */}
        <div className="w-full lg:w-[40%] flex flex-col justify-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent">
                Validated by Top Rank Achievers
              </span>
            </h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-md leading-relaxed">
              Students from competitive preparatory classes and engineering programs share
              how GetStudy eliminated revision chaos and sharpened their academic focus.
            </p>
          </div>
        </div>

        {/* Right Staggered Grid */}
        <div className="w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className={`rounded-3xl bg-neutral-950/80 border border-neutral-800 p-7 flex flex-col justify-between hover:border-neutral-700 transition-all ${review.offset}`}
            >
              <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                "{review.content}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-900">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${review.avatarColor} flex items-center justify-center text-xs font-bold text-black font-mono shadow-sm`}
                >
                  {review.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">
                    {review.name}
                  </h4>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
