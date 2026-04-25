'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisaPageLayout from '@/components/visa/VisaPageLayout';

const countries = [
  { id: 'lithuania', name: 'Lithuania', code: 'lt' },
  { id: 'newzealand', name: 'New Zealand', code: 'nz' },
  { id: 'canada', name: 'Canada', code: 'ca' },
  { id: 'luxembourg', name: 'Luxembourg', code: 'lu' },
  { id: 'italy', name: 'Italy', code: 'it' },
  { id: 'norway', name: 'Norway', code: 'no' },
  { id: 'denmark', name: 'Denmark', code: 'dk' },
  { id: 'croatia', name: 'Croatia', code: 'hr' },
  { id: 'portugal', name: 'Portugal', code: 'pt' },
  { id: 'slovakia', name: 'Slovakia', code: 'sk' },
  { id: 'ireland', name: 'Ireland', code: 'ie' },
  { id: 'spain', name: 'Spain', code: 'es' },
  { id: 'malta', name: 'Malta', code: 'mt' },
  { id: 'netherlands', name: 'Netherlands', code: 'nl' },
  { id: 'switzerland', name: 'Switzerland', code: 'ch' },
  { id: 'germany', name: 'Germany', code: 'de' },
  { id: 'bulgaria', name: 'Bulgaria', code: 'bg' },
  { id: 'czech', name: 'Czech Republic', code: 'cz' },
  { id: 'poland', name: 'Poland', code: 'pl' },
  { id: 'serbia', name: 'Serbia', code: 'rs' },
  { id: 'ukraine', name: 'Ukraine', code: 'ua' },
  { id: 'russia', name: 'Russia', code: 'ru' },
  { id: 'romania', name: 'Romania', code: 'ro' },
  { id: 'greece', name: 'Greece', code: 'gr' },
  { id: 'estonia', name: 'Estonia', code: 'ee' },
  { id: 'malaysia', name: 'Malaysia', code: 'my' },
  { id: 'armenia', name: 'Armenia', code: 'am' },
  { id: 'dubai', name: 'Dubai', code: 'ae' },
  { id: 'australia', name: 'Australia', code: 'au' }
];

const countryContent: Record<string, any> = {
  lithuania: {
    title: "Work in Lithuania",
    intro: "Lithuania is a rising star in Northern Europe, offering a high quality of life and a rapidly growing tech sector. With the EU Blue Card and simplified work permit processes, it's an ideal gateway for skilled professionals.",
    sections: [
      {
        id: "1",
        title: "Why Lithuania?",
        points: [
          { subtitle: "Tech Growth", icon: "🚀", text: "Home to a booming fintech and biotech scene with a high demand for global talent." },
          { subtitle: "EU Gateway", icon: "🇪🇺", text: "Working in Lithuania provides seamless access to the entire European Union market." }
        ]
      },
      {
        id: "2",
        title: "Work Visa Process",
        icon: "📜",
        text: "The process usually involves securing an employment contract first. For highly skilled workers, the EU Blue Card offers a fast-track route with significant benefits."
      }
    ]
  },
  newzealand: {
    title: "Work in New Zealand",
    intro: "Experience an unparalleled work-life balance in the stunning landscapes of New Zealand. The country actively seeks skilled workers in engineering, healthcare, and trade through its Accredited Employer Work Visa (AEWV).",
    sections: [
      {
        id: "1",
        title: "Key Benefits",
        points: [
          { subtitle: "Work-Life Balance", icon: "🧘", text: "New Zealand is world-famous for its relaxed lifestyle and focus on personal well-being." },
          { subtitle: "Green List Roles", icon: "🌿", text: "Fast-track residency pathways are available for roles on the 'Green List' such as doctors and engineers." }
        ]
      },
      {
        id: "2",
        title: "AEWV Process",
        icon: "🎫",
        text: "Requires an offer from an accredited employer. The visa is tied to the employer but allows for a clear pathway to permanent residency."
      }
    ]
  },
  canada: {
    title: "Work in Canada",
    intro: "Canada remains one of the most welcoming destinations for skilled workers, offering robust immigration programs like Express Entry and Provincial Nominee Programs (PNP).",
    sections: [
      {
        id: "1",
        title: "Employment Outlook",
        points: [
          { subtitle: "Express Entry", icon: "🚄", text: "A points-based system that fast-tracks permanent residency for skilled professionals." },
          { subtitle: "High Wages", icon: "💰", text: "Competitive salaries across various sectors including IT, healthcare, and engineering." }
        ]
      },
      {
        id: "2",
        title: "Work Permit Types",
        icon: "🍁",
        text: "Includes Employer-Specific Work Permits and Open Work Permits. The Global Skills Strategy provides two-week processing for eligible roles."
      }
    ]
  },
  germany: {
    title: "Work in Germany",
    intro: "As Europe's largest economy, Germany offers immense opportunities for qualified professionals. The 'Opportunity Card' (Chancenkarte) now allows job seekers to enter the country to find work.",
    sections: [
      {
        id: "1",
        title: "Economic Power",
        points: [
          { subtitle: "Industrial Leader", icon: "🏭", text: "Global hub for automotive, engineering, and renewable energy sectors." },
          { subtitle: "Social Security", icon: "🛡️", text: "Comprehensive healthcare and social benefits for all legally employed residents." }
        ]
      },
      {
        id: "2",
        title: "Visa Options",
        icon: "🇩🇪",
        text: "Qualified Opportunity Card, EU Blue Card, and Skilled Worker Visa. Recognition of professional qualifications is a key step."
      }
    ]
  },
  dubai: {
    title: "Work in Dubai (UAE)",
    intro: "Dubai is a global business hub offering tax-free salaries and a luxurious lifestyle. With new visa categories like the Golden Visa and Green Visa, long-term residency is more accessible than ever.",
    sections: [
      {
        id: "1",
        title: "Tax-Free Lifestyle",
        points: [
          { subtitle: "0% Income Tax", icon: "💎", text: "Enjoy 100% of your earnings with no personal income tax in the UAE." },
          { subtitle: "Global Connectivity", icon: "✈️", text: "A strategic location connecting East and West, ideal for international business." }
        ]
      },
      {
        id: "2",
        title: "Visa Categories",
        icon: "🏙️",
        text: "Standard Work Permit (Employer Sponsored), Golden Visa (10 years for talent), and Green Visa (5 years for self-sponsored professionals)."
      }
    ]
  },
  australia: {
    title: "Work in Australia",
    intro: "Australia offers a high standard of living and a strong economy. The Temporary Skill Shortage (TSS) visa and Skilled Independent visas are popular routes for global talent.",
    sections: [
      {
        id: "1",
        title: "Why Australia?",
        points: [
          { subtitle: "High Quality of Life", icon: "☀️", text: "Consistently ranked among the best places to live with great weather and safety." },
          { subtitle: "Strong Economy", icon: "📈", text: "Resilient job market with a high demand for skilled labor in construction and tech." }
        ]
      },
      {
        id: "2",
        title: "Visa Pathways",
        icon: "🇦🇺",
        text: "Subclass 482 (TSS), Subclass 189 (Skilled Independent), and Subclass 190 (Skilled Nominated). Skills assessment is mandatory for most categories."
      }
    ]
  },
  luxembourg: {
    title: "Work in Luxembourg",
    intro: "The wealthiest country in the EU per capita, Luxembourg is a major financial hub. It offers multilingual work environments and excellent social benefits.",
    sections: [
        {
          id: "1",
          title: "Financial Hub",
          points: [
            { subtitle: "Wealth & Stability", icon: "🏦", text: "Europe's leading financial center with top salaries and stability." },
            { subtitle: "Multilingual", icon: "🗣️", text: "English, French, and German are widely used in professional settings." }
          ]
        },
        {
          id: "2",
          title: "Visa Requirements",
          icon: "🇱🇺",
          text: "Requires a temporary authorization to stay and a work permit. High demand for finance and IT specialists."
        }
      ]
  },
  italy: {
    title: "Work in Italy",
    intro: "Italy is not just for tourism; it's an industrial powerhouse. The 'Decreto Flussi' governs the entry of foreign workers into various sectors annually.",
    sections: [
        {
          id: "1",
          title: "Industrial Base",
          points: [
            { subtitle: "Manufacturing", icon: "🏎️", text: "Leading sectors in fashion, automotive, and high-end manufacturing." },
            { subtitle: "Culture & Living", icon: "🍝", text: "Unmatched cultural heritage and Mediterranean lifestyle." }
          ]
        },
        {
          id: "2",
          title: "Work Permits",
          icon: "🇮🇹",
          text: "Annual quotas (Decreto Flussi) for seasonal and non-seasonal work. EU Blue Card is also available for high-skilled workers."
        }
      ]
  },
  norway: {
    title: "Work in Norway",
    intro: "Norway offers some of the highest wages and best worker protections in the world. Its energy and maritime sectors are major employers of international talent.",
    sections: [
        {
          id: "1",
          title: "Social Welfare",
          points: [
            { subtitle: "High Wages", icon: "🇳🇴", text: "Competitive salaries and a very low income gap compared to global standards." },
            { subtitle: "Nature & Safety", icon: "🏔️", text: "Incredible natural beauty combined with one of the safest societies." }
          ]
        },
        {
          id: "2",
          title: "Visa Process",
          icon: "⚓",
          text: "Skilled worker permits require a concrete job offer. Norway also offers job seeker visas for certain highly qualified professionals."
        }
      ]
  }
};

// Default content for countries not explicitly detailed yet
const getDefaultContent = (name: string) => ({
  title: `Work in ${name}`,
  intro: `${name} offers unique opportunities for skilled professionals looking to expand their horizons in a global market. With growing economies and a need for international expertise, it's a great time to explore professional paths here.`,
  sections: [
    {
      id: "1",
      title: "Market Opportunities",
      points: [
        { subtitle: "Skill Demand", icon: "🛠️", text: `High demand for professionals in technology, healthcare, and engineering across ${name}.` },
        { subtitle: "Career Growth", icon: "📈", text: "Excellent prospects for long-term career advancement and global exposure." }
      ]
    },
    {
      id: "2",
      title: "General Visa Info",
      icon: "🌐",
      text: "Most work permits require a valid job offer and proof of qualifications. Our team handles the end-to-end documentation for a hassle-free experience."
    }
  ]
});

export default function WorkVisaPage() {
  const [selectedCountry, setSelectedCountry] = useState('canada');
  const [activeSectionId, setActiveSectionId] = useState<string | null>("1");

  const stats = [
    { label: "Employer Network", value: "200+" },
    { label: "Visa Success", value: "95%" },
    { label: "High Demand", value: "STEM" },
    { label: "Regions", value: "30+" }
  ];

  const features = [
    "Employer Sponsorship",
    "Legal Documentation",
    "Skill Assessment",
    "Relocation Support",
    "Post-Arrival Help",
    "Family Sponsorship"
  ];

  const currentContent = countryContent[selectedCountry] || getDefaultContent(countries.find(c => c.id === selectedCountry)?.name || selectedCountry);

  return (
    <VisaPageLayout
      title="Work Visa"
      fullName="Global Career Advancement"
      banner="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
      description="Unlock global professional opportunities. We bridge the gap between skilled experts and world-class employers."
      stats={stats}
      features={features}
      process={[]}
    >
      <div className="space-y-20 pt-10">
        {/* Destination Explorer - Grid Layout for more countries */}
        <div className="text-center max-w-[1400px] mx-auto">
          <h3 className="text-3xl md:text-5xl font-heading font-black text-dark mb-10 tracking-tight italic">Global Employment <span className="text-primary tracking-normal">Hotspots.</span></h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-6">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCountry(c.id);
                  setActiveSectionId("1");
                }}
                className={`p-4 rounded-3xl font-black text-xs transition-all border flex flex-col items-center justify-center gap-3 ${
                  selectedCountry === c.id
                    ? 'bg-primary text-white border-primary shadow-2xl scale-110 z-10'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30 hover:text-primary hover:shadow-lg'
                }`}
              >
                <img 
                  src={`https://flagcdn.com/w80/${c.code}.png`} 
                  alt={c.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20 shadow-sm"
                />
                <span className="text-center truncate w-full">{c.name}</span>
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
                Work in <span className="text-primary italic font-accent lowercase first-letter:uppercase">{currentContent.title.replace('Work in ', '')}</span>
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
