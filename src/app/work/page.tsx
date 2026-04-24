'use client';

import VisaPageLayout from '@/components/visa/VisaPageLayout';

export default function WorkVisaPage() {
  const stats = [
    { label: "Employer Network", value: "200+" },
    { label: "Visa Success", value: "95%" },
    { label: "High Demand", value: "STEM" },
    { label: "Regions", value: "EU/NA" }
  ];

  const features = [
    { title: "Sponsorship Support", icon: "💼" },
    { title: "Legal Documentation", icon: "📜" },
    { title: "Skill Assessment", icon: "🛠️" },
    { title: "Relocation Help", icon: "🏠" }
  ].map(f => f.title);

  const process = [
    { step: "01", title: "Skill Audit", desc: "Verifying your professional eligibility for global markets." },
    { step: "02", title: "Job Matching", desc: "Connecting you with verified international employers." },
    { step: "03", title: "Documentation", desc: "Expert handling of work permits and legal filings." },
    { step: "04", title: "Departure", desc: "Comprehensive briefing for your new professional life." }
  ];

  return (
    <VisaPageLayout
      title="Work Visa"
      fullName="International Career Growth"
      banner="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
      description="Unlock global professional opportunities. We bridge the gap between skilled experts and world-class employers."
      stats={stats}
      features={features}
      process={process}
    />
  );
}
