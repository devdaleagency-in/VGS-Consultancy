'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisaPageLayout from '@/components/visa/VisaPageLayout';

const countries = [
  { id: 'usa', name: 'USA', code: 'us' },
  { id: 'uk', name: 'UK', code: 'gb' },
  { id: 'canada', name: 'Canada', code: 'ca' },
  { id: 'schengen', name: 'Schengen (EU)', code: 'eu' },
  { id: 'australia', name: 'Australia', code: 'au' },
  { id: 'dubai', name: 'Dubai (UAE)', code: 'ae' },
  { id: 'singapore', name: 'Singapore', code: 'sg' },
  { id: 'thailand', name: 'Thailand', code: 'th' }
];

const countryContent: Record<string, any> = {
  usa: {
    title: "USA Visit Visa (B1/B2)",
    intro: "The USA B1/B2 visa is for people who want to enter the United States temporarily for business (B1), tourism, pleasure, or visiting (B2). It is one of the most sought-after visas for global travelers.",
    sections: [
      {
        id: "1",
        title: "Visa Categories",
        points: [
          { subtitle: "B1 Business", icon: "💼", text: "For professional meetings, conferences, or settling estates." },
          { subtitle: "B2 Tourism", icon: "📸", text: "For holidays, visiting friends/family, or medical treatment." }
        ]
      },
      {
        id: "2",
        title: "Key Requirements",
        icon: "📋",
        text: "You must demonstrate 'Strong Ties' to your home country, sufficient funds for the trip, and a clear purpose of visit. The process includes a mandatory consular interview."
      }
    ]
  },
  uk: {
    title: "UK Standard Visitor Visa",
    intro: "The UK Standard Visitor Visa allows you to visit the UK for leisure, business, or other activities like short-term study or medical treatment. It is usually valid for up to 6 months.",
    sections: [
      {
        id: "1",
        title: "Permitted Activities",
        points: [
          { subtitle: "Leisure", icon: "🎡", text: "Sightseeing, visiting family, or attending a relative's graduation." },
          { subtitle: "Business", icon: "🤝", text: "Attending trade fairs, corporate training, or negotiating contracts." }
        ]
      },
      {
        id: "2",
        title: "Documentation",
        icon: "🇬🇧",
        text: "Proof of accommodation, financial bank statements, and a detailed travel itinerary are essential for a successful UK visit visa application."
      }
    ]
  },
  schengen: {
    title: "Schengen Visitor Visa",
    intro: "A Schengen Visa allows you to travel to any of the 29 Schengen member countries for up to 90 days. It is the perfect choice for a grand European tour.",
    sections: [
      {
        id: "1",
        title: "Visa Benefits",
        points: [
          { subtitle: "29 Countries", icon: "🇪🇺", text: "One visa grants you access to France, Germany, Italy, Spain, and more." },
          { subtitle: "Multi-Entry", icon: "🛂", text: "Options for single, double, or multiple entries depending on your travel history." }
        ]
      },
      {
        id: "2",
        title: "Application Rule",
        icon: "📍",
        text: "You must apply at the embassy of the country where you will spend the most time, or the country of your first entry if staying equally in multiple places."
      }
    ]
  },
  canada: {
    title: "Canada Visitor Visa (TRV)",
    intro: "Whether you're visiting the Rocky Mountains or family in Toronto, the Temporary Resident Visa (TRV) is your ticket to exploring the beauty of Canada.",
    sections: [
      {
        id: "1",
        title: "Trip Purpose",
        points: [
          { subtitle: "Tourism", icon: "🏔️", text: "Exploring Canada's natural wonders and vibrant cities." },
          { subtitle: "Family Super Visa", icon: "👵", text: "Special long-term visa for parents and grandparents of Canadian residents." }
        ]
      },
      {
        id: "2",
        title: "Proof of Funds",
        icon: "🇨🇦",
        text: "Applicants must show they have enough money to support themselves and any family members during their stay in Canada."
      }
    ]
  },
  dubai: {
    title: "UAE (Dubai) Tourist Visa",
    intro: "Experience the luxury of Dubai with a straightforward tourist visa process. The UAE offers various durations, from 30 to 60 days, with options for extensions.",
    sections: [
      {
        id: "1",
        title: "Quick Processing",
        points: [
          { subtitle: "Fast Approval", icon: "⚡", text: "Most Dubai tourist visas are processed within 48 to 72 hours." },
          { subtitle: "E-Visa", icon: "📱", text: "Completely digital process with no need for physical passport submission." }
        ]
      },
      {
        id: "2",
        title: "Requirements",
        icon: "🏙️",
        text: "Requires a clear passport copy, photograph, and sometimes a security deposit or proof of onward travel."
      }
    ]
  }
};

const getDefaultContent = (name: string) => ({
  title: `${name} Visitor Visa`,
  intro: `Discover the wonders of ${name} with a hassle-free visit visa. Whether it's for leisure, business, or family, we ensure your documentation is perfect for a high success rate.`,
  sections: [
    {
      id: "1",
      title: "Why Visit?",
      points: [
        { subtitle: "Leisure & Fun", icon: "🏖️", text: "Explore world-class attractions and create unforgettable memories." },
        { subtitle: "Business Growth", icon: "💼", text: "Expand your professional network and attend global events." }
      ]
    },
    {
      id: "2",
      title: "Our Assistance",
      icon: "✨",
      text: "From itinerary planning to document verification, we handle every detail to make your travel dreams a reality."
    }
  ]
});

export default function VisitVisaPage() {
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [activeSectionId, setActiveSectionId] = useState<string | null>("1");

  const stats = [
    { label: "Countries", value: "50+" },
    { label: "Approval Rate", value: "99%" },
    { label: "Processing", value: "48h-7d" },
    { label: "Client Smiles", value: "10k+" }
  ];

  const features = [
    "Itinerary Planning",
    "Flight Bookings",
    "Hotel Reservations",
    "Document Assistance",
    "Mock Interview",
    "Cover Letter Prep"
  ];

  const currentContent = countryContent[selectedCountry] || getDefaultContent(countries.find(c => c.id === selectedCountry)?.name || selectedCountry);

  return (
    <VisaPageLayout
      title="Visit Visa"
      fullName="Seamless Global Travel"
      banner="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=2000"
      description="Explore the world with zero documentation stress. We make global travel accessible and straightforward for everyone."
      stats={stats}
      features={features}
      process={[]}
    >
      <div className="space-y-20 pt-10">
        {/* Destination Explorer */}
        <div className="text-center max-w-[1400px] mx-auto">
          <h3 className="text-3xl md:text-5xl font-heading font-black text-dark mb-10 tracking-tight italic">Top Travel <span className="text-primary tracking-normal">Destinations.</span></h3>
          <div className="flex flex-wrap justify-center gap-4 px-6">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCountry(c.id);
                  setActiveSectionId("1");
                }}
                className={`px-8 py-4 rounded-3xl font-black text-xs transition-all border flex items-center gap-3 ${
                  selectedCountry === c.id
                    ? 'bg-primary text-white border-primary shadow-2xl scale-110 z-10'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30 hover:text-primary hover:shadow-lg'
                }`}
              >
                <img 
                  src={`https://flagcdn.com/w80/${c.code}.png`} 
                  alt={c.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white/20 shadow-sm"
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCountry}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[4rem] p-8 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.03)] border border-gray-50 max-w-[1400px] mx-auto"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-heading font-black text-dark mb-8 tracking-tighter uppercase">
                Visit <span className="text-primary italic font-accent lowercase first-letter:uppercase">{currentContent.title.replace('Visit Visa', '')}</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed mb-16 italic">
                "{currentContent.intro}"
              </p>

              <div className="space-y-6">
                {currentContent.sections.map((section: any) => {
                  const isOpen = activeSectionId === section.id;
                  return (
                    <div 
                      key={section.id} 
                      className={`rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                        isOpen ? 'bg-gray-50/80 border-primary/20 shadow-xl' : 'bg-white border-gray-100 hover:border-primary/20 hover:bg-gray-50/30'
                      }`}
                    >
                      <button 
                        onClick={() => setActiveSectionId(isOpen ? null : section.id)}
                        className="w-full flex items-center gap-6 p-8 md:p-10 text-left"
                      >
                        <span className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transition-all duration-500 ${
                          isOpen ? 'bg-primary text-white rotate-[360deg]' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {section.id}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-heading font-black text-dark tracking-tighter flex-1">
                          {section.title}
                        </h3>
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          isOpen ? 'border-primary text-primary rotate-180' : 'border-gray-200 text-gray-300'
                        }`}>
                          <span className="text-xl font-black">{isOpen ? '−' : '+'}</span>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                          >
                            <div className="px-8 md:px-10 pb-12 pt-0">
                              {section.points ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-4 md:ml-10 pl-8 md:pl-12 border-l-2 border-primary/20">
                                  {section.points.map((point: any, idx: number) => (
                                    <div key={idx} className="space-y-4 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                                      <div className="flex items-center gap-4">
                                        <span className="text-2xl">{point.icon}</span>
                                        <h4 className="text-lg font-black text-dark uppercase tracking-widest">{point.subtitle}</h4>
                                      </div>
                                      <p className="text-gray-500 font-medium leading-relaxed">{point.text}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="ml-4 md:ml-10 pl-8 md:pl-12 border-l-2 border-primary/20">
                                  <div className="flex gap-8 items-start p-8 rounded-[2.5rem] bg-white border border-gray-100">
                                    <span className="text-5xl">{section.icon}</span>
                                    <p className="text-gray-500 font-medium leading-relaxed text-xl md:text-2xl italic flex-1">{section.text}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </VisaPageLayout>
  );
}
