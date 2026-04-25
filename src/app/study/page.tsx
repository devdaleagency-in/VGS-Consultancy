'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisaPageLayout from '@/components/visa/VisaPageLayout';

const countries = [
  { id: 'uk', name: 'UK', code: 'gb' },
  { id: 'usa', name: 'USA', code: 'us' },
  { id: 'canada', name: 'CANADA', code: 'ca' },
  { id: 'australia', name: 'AUSTRALIA', code: 'au' },
  { id: 'germany', name: 'GERMANY', code: 'de' },
  { id: 'europe', name: 'EUROPE', code: 'eu' },
  { id: 'france', name: 'FRANCE', code: 'fr' },
  { id: 'newzealand', name: 'NEW ZEALAND', code: 'nz' }
];

const countryContent = {
  canada: {
    title: "Study at Canada",
    intro: "Hosting nearly half a million international students, Canada is known for high-quality education at affordable tuition fees with globally recognized degrees. It offers an excellent quality of life, immense post-study work opportunities, and a safe, peaceful environment for Indian students.",
    sections: [
      {
        id: "1",
        title: "Why Study in Canada?",
        points: [
          {
            subtitle: "Academic excellence",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Canada is globally recognized for its high academic standards and rigorous quality controls."
          },
          {
            subtitle: "Affordable Budget",
            icon: "💰",
            text: "Tuition fees in Canada are fairly cheaper compared to the US and UK, making it a cost-effective destination."
          },
          {
            subtitle: "Safe & Peaceful",
            icon: "🛡️",
            text: "Consistently ranked among the safest nations globally, providing a secure environment for students."
          },
          {
            subtitle: "Earn While You Learn",
            icon: "💼",
            text: "Work up to 20 hours per week during semesters and full-time during scheduled breaks."
          }
        ]
      },
      {
        id: "2",
        title: "Canada Student Visa Process",
        icon: "📄",
        text: "The Canadian Study Permit process involves receiving a Letter of Acceptance, proving identity and financial support. For Quebec, a Certificat d'acceptation du Québec (CAQ) is mandatory."
      },
      {
        id: "3",
        title: "Required Exams",
        points: [
          { subtitle: "IELTS", icon: "✍️", text: "Score: 6.0 - 6.5" },
          { subtitle: "TOEFL", icon: "🎧", text: "Score: 80 - 90" },
          { subtitle: "PTE", icon: "💻", text: "Score: 58 - 65" },
          { subtitle: "GMAT", icon: "📊", text: "Score: 550+" }
        ]
      }
    ]
  },
  usa: {
    title: "Study at USA",
    intro: "The USA hosts the world’s largest international student population. With over 1,000,000 students, it offers an unparalleled academic environment, cultural diversity, and top-tier support facilities for global success.",
    sections: [
      {
        id: "1",
        title: "Why Study in the USA?",
        points: [
          {
            subtitle: "International Reputation",
            icon: "🌟",
            text: "U.S. degrees are globally recognized for excellence. Top universities maintain high academic standards and rigorous requirements."
          },
          {
            subtitle: "Cultural Diversity",
            icon: "🌍",
            text: "American universities are bastions of cultural diversity, offering a rich multicultural experience and interactive learning."
          },
          {
            subtitle: "Support Facilities",
            icon: "🤝",
            text: "Extensive help through workshops, language practice, and orientations to prepare students for their academic journey."
          },
          {
            subtitle: "Flexible Environment",
            icon: "🔄",
            text: "Classroom structures and instruction methods are shifted to make learning engaging and relevant to your field."
          }
        ]
      },
      {
        id: "2",
        title: "Required Exams",
        points: [
          { subtitle: "Undergraduate", icon: "🎓", text: "SAT or ACT mandatory for aptitude evaluation." },
          { subtitle: "Postgraduate", icon: "🔬", text: "GRE for MS/Engineering; GMAT for Business degrees." },
          { subtitle: "English", icon: "🗣️", text: "TOEFL (71-92), IELTS (6.0-7.0), or PTE (min 54)." }
        ]
      },
      {
        id: "3",
        title: "US Student Visa Process",
        points: [
          { subtitle: "Visa Categories", icon: "🎫", text: "F Visa for academic studies; M Visa for vocational/non-academic programs." },
          { subtitle: "Process Steps", icon: "🛤️", text: "Register -> Apply -> Receive I-20 -> Pay SEVIS -> DS-160 -> Interview -> Passport Collection." }
        ]
      },
      {
        id: "4",
        title: "Employment Opportunities",
        points: [
          { subtitle: "On-Campus", icon: "🏫", text: "Work in cafeterias or libraries (up to 20 hrs/week) earning $7-$12 per hour." },
          { subtitle: "CPT & OPT", icon: "👔", text: "CPT during studies and OPT for up to 12 months post-graduation in your field." }
        ]
      }
    ]
  },
  uk: {
    title: "Study at UK",
    intro: "The UK is world-renowned for its interactive teaching methods, world-class educational standards, and globally recognized degrees. It offers a vibrant cultural experience and the reinstatement of the two-year post-study work visa.",
    sections: [
      {
        id: "1",
        title: "Why Study in the UK?",
        points: [
          { subtitle: "World-Class Standards", icon: "🏫", text: "Interactive teaching methods and high-quality education standards globally recognized." },
          { subtitle: "Shorter Programs", icon: "⏳", text: "UK programs are often shorter, saving costs and allowing you to start your career sooner." },
          { subtitle: "Post-Study Work", icon: "💼", text: "Reinstatement of the two-year post-study work visa for international graduates." }
        ]
      },
      {
        id: "2",
        title: "UK Student Visa Process",
        points: [
          { subtitle: "Visa Categories", icon: "🎫", text: "Tier 4 (General) for students 16+; Tier 4 (Child) for ages 4-15." },
          { subtitle: "Required Docs", icon: "📄", text: "Valid Passport, CAS (Confirmation of Acceptance for Studies), Proof of Funds, ATAS, and TB test (if required)." }
        ]
      },
      {
        id: "3",
        title: "Required Exams",
        points: [
          { subtitle: "English", icon: "🗣️", text: "IELTS UKVI or PTE." },
          { subtitle: "Standardized", icon: "📊", text: "GMAT or GRE for specific courses." }
        ]
      }
    ]
  },
  australia: {
    title: "Study at AUSTRALIA",
    intro: "Australia is home to 7 of the top 100 universities globally. It offers a high quality of life, diverse course options, and excellent support for international students in a vibrant multicultural setting.",
    sections: [
      {
        id: "1",
        title: "Why Study in Australia?",
        points: [
          { subtitle: "Top Rankings", icon: "🏆", text: "Home to world-class universities consistently ranked in the global top 100." },
          { subtitle: "Quality of Life", icon: "🌈", text: "Exceptional living standards and a safe, welcoming environment for students." },
          { subtitle: "Course Diversity", icon: "📚", text: "Wide range of courses and research opportunities across various disciplines." }
        ]
      },
      {
        id: "2",
        title: "Australia Student Visa",
        icon: "🇦🇺",
        text: "The Subclass 500 Student Visa requires Confirmation of Enrolment (CoE), Genuine Temporary Entrant (GTE) statement, and Overseas Student Health Cover (OSHC)."
      },
      {
        id: "3",
        title: "Required Exams",
        points: [
          { subtitle: "IELTS", icon: "✍️", text: "Score: 6.0 - 6.5" },
          { subtitle: "TOEFL", icon: "🎧", text: "Score: 60 - 90" },
          { subtitle: "PTE", icon: "💻", text: "Score: 50 - 64" }
        ]
      }
    ]
  },
  newzealand: {
    title: "Study at NEW ZEALAND",
    intro: "Consistently ranked as the 2nd safest country on the Global Peace Index, New Zealand offers a safe, peaceful environment with practical teaching methods and small class sizes.",
    sections: [
      {
        id: "1",
        title: "Why Study in New Zealand?",
        points: [
          { subtitle: "Safety First", icon: "🛡️", text: "Ranked as one of the safest countries globally, ideal for international students." },
          { subtitle: "Practical Learning", icon: "🛠️", text: "Education system focuses on practical skills and interactive teaching methods." },
          { subtitle: "Small Classes", icon: "👥", text: "Benefit from personalized attention in smaller class environments." }
        ]
      },
      {
        id: "2",
        title: "Visa & Documents",
        points: [
          { subtitle: "Visa Types", icon: "🎫", text: "Fee Paying Student Visa, Exchange Student Visa, or Pathway Student Visa." },
          { subtitle: "Requirements", icon: "📄", text: "Offer of place, proof of funds (NZD 15,000/year), health and character certificates." }
        ]
      },
      {
        id: "3",
        title: "Required Exams",
        points: [
          { subtitle: "IELTS", icon: "✍️", text: "Score: 6.0+" },
          { subtitle: "TOEFL", icon: "🎧", text: "Score: 80+" },
          { subtitle: "PTE", icon: "💻", text: "Score: 50+" }
        ]
      }
    ]
  },
  europe: {
    title: "Study in EUROPE",
    intro: "Ireland and other European nations offer an exceptional quality of life, vibrant culture, and an entrepreneurial spirit. The 'D Study Visa' opens doors to high-quality education and diverse cultural experiences.",
    sections: [
      {
        id: "1",
        title: "Why Study in Europe?",
        points: [
          { subtitle: "Quality of Life", icon: "🌿", text: "Exceptional living standards and rich cultural heritage across the continent." },
          { subtitle: "Entrepreneurial Spirit", icon: "💡", text: "Vibrant innovation hubs and great career opportunities in global markets." }
        ]
      },
      {
        id: "2",
        title: "Visa (Ireland Focus)",
        icon: "🇮🇪",
        text: "The 'D Study Visa' is required for stays exceeding 3 months. Requires signed application, enrollment proof, and funds."
      },
      {
        id: "3",
        title: "Required Exams",
        points: [
          { subtitle: "IELTS", icon: "✍️", text: "Score: 6.0+" },
          { subtitle: "TOEFL", icon: "🎧", text: "Score: 80+" },
          { subtitle: "PTE", icon: "💻", text: "Score: 50+" }
        ]
      }
    ]
  },
  france: {
    title: "Study at FRANCE",
    intro: "France is a leader in high technological development and culture. It offers excellent international career opportunities post-graduation and world-class educational institutions.",
    sections: [
      {
        id: "1",
        title: "Why Study in France?",
        points: [
          { subtitle: "Rich Culture", icon: "🎨", text: "Immerse yourself in a world-famous cultural environment while studying." },
          { subtitle: "Tech Development", icon: "🚀", text: "Global leader in technology, aerospace, and luxury brand management." },
          { subtitle: "Career Prospects", icon: "📈", text: "Excellent opportunities for international students post-graduation." }
        ]
      },
      {
        id: "2",
        title: "Visa Categories",
        icon: "🇫🇷",
        text: "Short-stay (up to 3 months), Temporary long-stay (3-6 months), or Long-stay visa (VLS-TS). Requires proof of admission and funds (€615/month)."
      },
      {
        id: "3",
        title: "Required Exams",
        points: [
          { subtitle: "IELTS", icon: "✍️", text: "Score: 6.0+" },
          { subtitle: "TOEFL", icon: "🎧", text: "Score: 80+" },
          { subtitle: "PTE", icon: "💻", text: "Score: 50+" }
        ]
      }
    ]
  },
  germany: {
    title: "Study at GERMANY",
    intro: "Germany is a top-tier destination offering high-quality education with low-to-no tuition fees at public universities. It's a land of innovation and research, providing excellent post-study career prospects in a strong, growing economy.",
    sections: [
      {
        id: "1",
        title: "Why Study in Germany?",
        points: [
          {
            subtitle: "Affordable Education",
            icon: "🎓",
            text: "Most public universities do not charge tuition fees for international students, requiring only a small semester contribution (€100–€300)."
          },
          {
            subtitle: "Economic Powerhouse",
            icon: "📈",
            text: "Germany has the EU's largest economy and a significant shortage of skilled labor, providing excellent career prospects post-graduation."
          }
        ]
      },
      {
        id: "2",
        title: "German Study Visa Process",
        points: [
          {
            subtitle: "Blocked Account",
            icon: "🏦",
            text: "You must prove funds of €11,904 per year via a Blocked Account (Sperrkonto) to cover living expenses."
          },
          {
            subtitle: "APS Certificate",
            icon: "✅",
            text: "Mandatory for Indian students to verify the authenticity of academic documents before the visa application."
          }
        ]
      }
    ]
  }
};

export default function StudyVisaPage() {
  const [selectedCountry, setSelectedCountry] = useState('canada');
  const [activeSectionId, setActiveSectionId] = useState<string | null>("1");

  const stats = [
    { label: "Universities", value: "500+" },
    { label: "Success Rate", value: "98%" },
    { label: "Scholarships", value: "100%" },
    { label: "Destinations", value: "25+" }
  ];

  const features = [
    { title: "Ivy League Access", icon: "🏛️" },
    { title: "Scholarship Guidance", icon: "💰" },
    { title: "SOP & LOR Writing", icon: "✍️" },
    { title: "Pre-departure Brief", icon: "✈️" },
    { title: "Financial Documentation", icon: "📄" },
    { title: "Mock Interview Prep", icon: "🎤" }
  ].map(f => f.title);

  return (
    <VisaPageLayout
      title="Study Visa"
      fullName="Global Academic Success"
      banner="https://images.unsplash.com/photo-1523050335192-ce1dee0a80ae?auto=format&fit=crop&q=80&w=2000"
      description="Access the world's most prestigious universities. We provide the expertise needed to secure your academic future abroad."
      stats={stats}
      features={features}
      process={[]}
    >
      <div className="space-y-20 pt-10">
        {/* Destination Explorer - Full Width */}
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-heading font-black text-dark mb-10 tracking-tight italic">Explore Your Next <span className="text-primary tracking-normal">Chapter.</span></h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCountry(c.id);
                  setActiveSectionId("1"); // Reset accordion to first section on country change
                }}
                className={`px-5 py-3 md:px-8 md:py-4 rounded-[1.25rem] md:rounded-[1.5rem] font-black text-xs md:text-base transition-all border flex items-center gap-2 md:gap-4 ${
                  selectedCountry === c.id
                    ? 'bg-primary text-white border-primary shadow-2xl scale-105 md:scale-110 z-10'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30 hover:text-primary hover:shadow-lg'
                }`}
              >
                <img 
                  src={`https://flagcdn.com/w80/${c.code}.png`} 
                  alt={c.name}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover border-2 border-white/20 shadow-sm"
                />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {countryContent[selectedCountry as keyof typeof countryContent] ? (
            <motion.div
              key={selectedCountry}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[2rem] md:rounded-[4rem] p-3 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.03)] border border-gray-50"
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-heading font-black text-dark mb-8 tracking-tighter uppercase">
                  Study at <span className="text-primary italic font-accent lowercase first-letter:uppercase">{selectedCountry === 'usa' ? 'USA' : selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1)}</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed mb-16 italic">
                  "{countryContent[selectedCountry as keyof typeof countryContent].intro}"
                </p>

                <div className="space-y-6">
                  {countryContent[selectedCountry as keyof typeof countryContent].sections.map((section) => {
                    const isOpen = activeSectionId === section.id;
                    return (
                      <div 
                        key={section.id} 
                        className={`rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                          isOpen ? 'bg-gray-50/80 border-primary/20 shadow-xl' : 'bg-white border-gray-100 hover:border-primary/20 hover:bg-gray-50/30'
                        }`}
                      >
                        {/* Header / Trigger */}
                        <button 
                          onClick={() => setActiveSectionId(isOpen ? null : section.id)}
                          className="w-full flex items-center gap-3 md:gap-6 p-4 md:p-10 text-left"
                        >
                          <span className={`w-9 h-9 md:w-14 md:h-14 rounded-lg md:rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-base md:text-xl shadow-lg transition-all duration-500 ${
                            isOpen ? 'bg-primary text-white rotate-[360deg]' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {section.id}
                          </span>
                          <h3 className="text-lg md:text-3xl font-heading font-black text-dark tracking-tighter flex-1 leading-tight">
                            {section.title}
                          </h3>
                          <div className={`w-7 h-7 md:w-10 md:h-10 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-500 ${
                            isOpen ? 'border-primary text-primary rotate-180' : 'border-gray-200 text-gray-300'
                          }`}>
                            <span className="text-base md:text-xl font-black">{isOpen ? '−' : '+'}</span>
                          </div>
                        </button>

                        {/* Content Area */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: 'auto', 
                                opacity: 1,
                                transition: {
                                  height: {
                                    duration: 0.6,
                                    ease: [0.04, 0.62, 0.23, 0.98]
                                  },
                                  opacity: {
                                    duration: 0.4,
                                    delay: 0.1
                                  }
                                }
                              }}
                              exit={{ 
                                height: 0, 
                                opacity: 0,
                                transition: {
                                  height: {
                                    duration: 0.6,
                                    ease: [0.04, 0.62, 0.23, 0.98]
                                  },
                                  opacity: {
                                    duration: 0.3
                                  }
                                }
                              }}
                            >
                              <div className="px-0 md:px-10 pb-6 md:pb-12 pt-0">
                                {section.points ? (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:ml-10 md:pl-12 md:border-l-2 border-primary/20">
                                    {section.points.map((point, idx) => (
                                      <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 + 0.3 }}
                                        className="space-y-3 md:space-y-4 p-4 md:p-6 rounded-[1rem] md:rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group mx-2 md:mx-0"
                                      >
                                        <div className="flex items-center gap-3 md:gap-4">
                                          <span className="text-xl md:text-2xl group-hover:scale-125 transition-transform duration-500">{point.icon}</span>
                                          <h4 className="text-sm md:text-lg font-black text-dark uppercase tracking-widest leading-tight">
                                            {point.subtitle}
                                          </h4>
                                        </div>
                                        <p className="text-xs md:text-base text-gray-500 font-medium leading-relaxed">
                                          {point.text}
                                        </p>
                                      </motion.div>
                                    ))}
                                  </div>
                                ) : (
                                  <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="px-2 md:px-0 md:ml-10 md:pl-12 md:border-l-2 border-primary/20"
                                  >
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start p-4 md:p-8 rounded-[1rem] md:rounded-[2.5rem] bg-white border border-gray-100 shadow-sm">
                                      <span className="text-3xl md:text-5xl flex-shrink-0">{section.icon}</span>
                                      <p className="text-sm md:text-2xl text-gray-400 font-medium leading-relaxed italic flex-1">
                                        {section.text}
                                      </p>
                                    </div>
                                  </motion.div>
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
          ) : (
            <motion.div
              key="other"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 text-center"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl">🌎</span>
              </div>
              <p className="text-3xl font-heading font-black text-gray-200 italic tracking-tighter">
                Expanding Our Expertise to {selectedCountry.toUpperCase()}...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </VisaPageLayout>
  );
}
