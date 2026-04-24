'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisaPageLayout from '@/components/visa/VisaPageLayout';

const countries = [
  { id: 'uk', name: 'UK', code: 'gb' },
  { id: 'usa', name: 'USA', code: 'us' },
  { id: 'canada', name: 'CANADA', code: 'ca' },
  { id: 'germany', name: 'GERMANY', code: 'de' },
  { id: 'europe', name: 'EUROPE', code: 'eu' },
  { id: 'france', name: 'FRANCE', code: 'fr' },
  { id: 'newzealand', name: 'NEW ZEALAND', code: 'nz' }
];

const countryContent = {
  canada: {
    title: "Study at Canada",
    intro: "Hosting nearly half a million international students, Canada is known to offer high quality education at affordable tuition fees with degrees that are globally recognised. Add to it, an excellent quality of life, immense post-study work and immigration opportunities - Canada stands out as a popular country to study among Indian students.",
    sections: [
      {
        id: "1",
        title: "Why Study in Canada?",
        points: [
          {
            subtitle: "Academic excellence",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-academic-ca" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="url(#grad-academic-ca)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="url(#grad-academic-ca)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "One of the most important reasons why students choose to study in Canada is because of the high quality of education."
          },
          {
            subtitle: "Research Opportunities",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-research-ca" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke="url(#grad-research-ca)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Canada education stands unique because of its strong focus on research and development."
          },
          {
            subtitle: "Affordable Budget",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-budget-ca" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" stroke="url(#grad-budget-ca)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Tuition fees in Canada, when compared to the US and UK, are fairly cheaper."
          },
          {
            subtitle: "Cultural Diversity",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-culture-ca" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" stroke="url(#grad-culture-ca)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "In Canada, you’ll find warm and welcoming people from varied ethnic groups."
          },
          {
            subtitle: "Safe & Peaceful",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-safety-ca" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="url(#grad-safety-ca)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Canada consistently ranks as one of the safest nations globally."
          },
          {
            subtitle: "Earn While You Learn",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-work-ca" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F43F5E" />
                    <stop offset="100%" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="url(#grad-work-ca)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Work up to 20 hours per week during semesters and gain valuable experience."
          }
        ]
      },
      {
        id: "2",
        title: "Canada Student Visa Process",
        icon: (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="grad-visa-ca" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="url(#grad-visa-ca)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        text: "Our experts guide you through every milestone of the Canadian Study Permit. From choosing the SDS stream to managing GIC and medical clearances."
      },
      {
        id: "3",
        title: "What Exams are Required?",
        icon: (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="grad-exams-ca" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="url(#grad-exams-ca)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        text: "Typically you'll need English proficiency scores (IELTS/TOEFL/PTE). We provide coaching for GRE/GMAT to ensure you meet top-tier standards."
      }
    ]
  },
  usa: {
    title: "Study at USA",
    intro: "The USA has the world’s largest international student population, with more than 1,000,000 students choosing to broaden their education and life experience in the United States. Nearly 5% of all students enrolled in higher-level education in the USA are international students, and the numbers are growing. You will find all the tools you need to compile your necessary research in deciding if the United States is the best place for you.",
    sections: [
      {
        id: "1",
        title: "Why Study in the USA?",
        points: [
          {
            subtitle: "International Reputation",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-rep-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="url(#grad-rep-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="url(#grad-rep-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "U.S. degrees have an excellent international reputation. Top universities maintain a strong presence among the best ranked institutions due to high academic standards and rigorous requirements."
          },
          {
            subtitle: "Cultural Diversity",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-culture-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" stroke="url(#grad-culture-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "American universities are bastions of cultural diversity. Historically, there has been a strong effort to increase educational opportunities and make cultural diversity central to enrollment."
          },
          {
            subtitle: "Support Facilities",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-support-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="url(#grad-support-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Through various workshops, English-language practice courses, orientations, and training, foreign students are given plenty of help to get them ready for their classes."
          },
          {
            subtitle: "Flexible Environment",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-flex-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m0 0H5" stroke="url(#grad-flex-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "U.S. universities deliberately shift their classroom structures and instruction methods to make learning engaging and relevant to your own domain."
          }
        ]
      },
      {
        id: "2",
        title: "What Exams are Required?",
        points: [
          {
            subtitle: "TOEFL & IELTS",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-lang-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.19 15.378 6 18" stroke="url(#grad-lang-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "TOEFL scores (71-92) or IELTS (6.0-7.0) are essential. Over 4,000 institutions accept IELTS, while TOEFL remains a standard for PhD admissions."
          },
          {
            subtitle: "SAT & ACT (UG)",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-ug-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="url(#grad-ug-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "SAT (min 1000) or ACT (min 25) are mandatory for undergraduate courses, evaluating aptitude and critical thinking abilities."
          },
          {
            subtitle: "GRE & GMAT (PG)",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-pg-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="url(#grad-pg-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "GRE (min 170) for MS/Engineering, and GMAT for Business degrees. Specialized tests like MCAT (Medical) or LSAT (Law) may also be required."
          }
        ]
      },
      {
        id: "3",
        title: "US Student Visa Process",
        points: [
          {
            subtitle: "Visa Categories",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-cat-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" stroke="url(#grad-cat-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Category 'F' for academic institutions/language programs, and Category 'M' for vocational and non-academic programs."
          },
          {
            subtitle: "Step-by-Step Roadmap",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-step-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F43F5E" />
                    <stop offset="100%" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
                <path d="M9 5l7 7-7 7" stroke="url(#grad-step-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Register with AECC Global -> Apply to institutions -> Take English test -> Receive i20 -> Collect documents -> Fill DS 160 -> Attend Interview -> Collect Passport."
          }
        ]
      },
      {
        id: "4",
        title: "Employment Opportunities",
        points: [
          {
            subtitle: "On-Campus Jobs",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-on-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="url(#grad-on-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Work in cafeterias, computer centers, or libraries (up to 20 hrs/week). Earn between $7 and $12 an hour while gaining experience."
          },
          {
            subtitle: "CPT & OPT",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-opt-us" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="url(#grad-opt-us)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "CPT for employment while enrolled. OPT allows for temporary work up to 12 months post-graduation in your field of study."
          }
        ]
      }
    ]
  },
  uk: {
    title: "Study at UK",
    intro: "The United Kingdom (UK) is known for its high educational standards, interactive teaching methods, top-ranked colleges, and high levels of student satisfaction. Degrees earned in the UK are recognized and favoured by employers worldwide, influencing your future career choices with immense worth.",
    sections: [
      {
        id: "1",
        title: "Why Study in the UK?",
        points: [
          {
            subtitle: "Global Rankings",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-rank-uk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M5 3v18M19 3v18M5 7h14M5 11h14M5 15h14" stroke="url(#grad-rank-uk)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Universities in the UK are among the highest-ranked in the world. They consistently perform well and maintain high academic standards across all disciplines."
          },
          {
            subtitle: "Research Powerhouse",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-res-uk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke="url(#grad-res-uk)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "The UK is responsible for 5% of world research. UK researchers produce 14% of the world’s most frequently cited papers."
          },
          {
            subtitle: "Student Development",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-dev-uk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="url(#grad-dev-uk)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "The system encourages creativity, develops multiple skills, builds confidence, and enables students to think critically while forming useful career connections."
          },
          {
            subtitle: "Shorter Programs",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-short-uk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="url(#grad-short-uk)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Programs are shorter than counterparts elsewhere, meaning you move into your career sooner while significantly cutting costs."
          }
        ]
      },
      {
        id: "2",
        title: "UK Student Visa Process",
        points: [
          {
            subtitle: "Cost & Payments",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-cost-uk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.62 1M12 17V7m0 10c-1.11 0-2.08-.407-2.62-1M12 7c-1.11 0-2.08.407-2.62 1" stroke="url(#grad-cost-uk)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Tier 4 General Visa fee is £348. Payments via MasterCard/Visa, Demand Draft, or Cash at application centers."
          },
          {
            subtitle: "Required Documents",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-docs-uk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="url(#grad-docs-uk)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "CAS (Letter of Acceptance), proof of funds (first year fees + 9 months living costs), and financial records held for 28 days."
          }
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
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-cost-de" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.62 1M12 17V7m0 10c-1.11 0-2.08-.407-2.62-1M12 7c-1.11 0-2.08.407-2.62 1" stroke="url(#grad-cost-de)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Most public universities do not charge tuition fees for international students, requiring only a small semester contribution (€100–€300)."
          },
          {
            subtitle: "Economic Powerhouse",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-econ-de" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="url(#grad-econ-de)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
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
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-bank-de" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="url(#grad-bank-de)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "You must prove funds of €11,904 per year via a Blocked Account (Sperrkonto) to cover living expenses."
          },
          {
            subtitle: "APS Certificate",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-aps-de" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="url(#grad-aps-de)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Mandatory for Indian students to verify the authenticity of academic documents before the visa application."
          }
        ]
      }
    ]
  },
  europe: {
    title: "Study in EUROPE",
    intro: "Experience the ultimate academic mobility across 29 Schengen countries. Europe offers a multi-cultural educational landscape with the standardized ECTS credit system and world-famous Erasmus+ opportunities.",
    sections: [
      {
        id: "1",
        title: "Why Study in Europe?",
        points: [
          {
            subtitle: "Schengen Mobility",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-mob-eu" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1E3A8A" />
                  </linearGradient>
                </defs>
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2.5 2.5 0 012.5-2.5h.5a.5.5 0 00.5-.5V5.414a2 2 0 00-.586-1.414l-2.431-2.431A2 2 0 0016.1 1H11a2 2 0 00-2 2v.5a.5.5 0 01-1 0V3M8 3.935A9.001 9.001 0 0111 1m0 0a8.997 8.997 0 017.843 4.582M11 1a8.997 8.997 0 00-7.843 4.582m15.686 0A9 9 0 0121 12c0 1.657-.45 3.208-1.233 4.542m0 0L18.5 15a1.5 1.5 0 01-3 0V13a2 2 0 00-2-2H11" stroke="url(#grad-mob-eu)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "A student visa from one Schengen country often allows you to travel freely across 29 European nations for short stays."
          }
        ]
      }
    ]
  },
  france: {
    title: "Study at FRANCE",
    intro: "France is a global leader in business and engineering education with its prestigious Grandes Écoles. Immerse yourself in a world-renowned culture while studying at institutions that offer degrees following the international LMD system.",
    sections: [
      {
        id: "1",
        title: "Why Study in France?",
        points: [
          {
            subtitle: "Grandes Écoles",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-edu-fr" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="url(#grad-edu-fr)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="url(#grad-edu-fr)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Access elite specialized schools for business and engineering that are ranked among the best in the world."
          }
        ]
      }
    ]
  },
  newzealand: {
    title: "Study at NEW ZEALAND",
    intro: "New Zealand is a safe, peaceful, and visually stunning destination for international students. Its education system fosters critical thinking and innovation, balanced with a unique urban-nature lifestyle.",
    sections: [
      {
        id: "1",
        title: "Why Study in New Zealand?",
        points: [
          {
            subtitle: "Global Safety",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-safe-nz" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="url(#grad-safe-nz)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Frequently ranked as one of the world's safest and most peaceful countries, offering an ideal environment for focused learning."
          },
          {
            subtitle: "Work-Life Balance",
            icon: (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-life-nz" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="url(#grad-life-nz)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: "Experience a culture that values well-being, balancing rigorous academics with personal growth and outdoor adventure."
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
          <div className="flex flex-wrap justify-center gap-4">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCountry(c.id);
                  setActiveSectionId("1"); // Reset accordion to first section on country change
                }}
                className={`px-8 py-4 rounded-[1.5rem] font-black text-sm md:text-base transition-all border flex items-center gap-4 ${
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
              className="bg-white rounded-[4rem] p-8 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.03)] border border-gray-50"
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
                              <div className="px-8 md:px-10 pb-12 pt-0">
                                {section.points ? (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-4 md:ml-10 pl-8 md:pl-12 border-l-2 border-primary/20">
                                    {section.points.map((point, idx) => (
                                      <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 + 0.3 }}
                                        className="space-y-4 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group"
                                      >
                                        <div className="flex items-center gap-4">
                                          <span className="text-2xl group-hover:scale-125 transition-transform duration-500">{point.icon}</span>
                                          <h4 className="text-lg font-black text-dark uppercase tracking-widest">
                                            {point.subtitle}
                                          </h4>
                                        </div>
                                        <p className="text-gray-500 font-medium leading-relaxed text-base">
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
                                    className="ml-4 md:ml-10 pl-8 md:pl-12 border-l-2 border-primary/20"
                                  >
                                    <div className="flex gap-8 items-start p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm">
                                      <span className="text-5xl">{section.icon}</span>
                                      <p className="text-gray-500 font-medium leading-relaxed text-xl md:text-2xl italic flex-1">
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
