'use client';

import VisaPageLayout from '@/components/visa/VisaPageLayout';

export default function VisitVisaPage() {
  const stats = [
    { label: "Countries", value: "50+" },
    { label: "Approval Rate", value: "99%" },
    { label: "Processing", value: "Fast" },
    { label: "Expertise", value: "Schengen" }
  ];

  const features = [
    { title: "Fast-track Filing", icon: "✈️" },
    { title: "Itinerary Planning", icon: "📅" },
    { title: "Personal Statement", icon: "📄" },
    { title: "Family Grouping", icon: "👨‍👩‍👧‍👦" }
  ].map(f => f.title);

  const process = [
    { step: "01", title: "Inquiry", desc: "Selecting your destination and travel dates." },
    { step: "02", title: "Documents", desc: "Curating financial and purpose-of-visit proofs." },
    { step: "03", title: "Filing", desc: "Embassy appointment and application submission." },
    { step: "04", title: "Pick-up", desc: "Visa collection and pre-travel check-up." }
  ];

  return (
    <VisaPageLayout
      title="Visit Visa"
      fullName="Seamless Global Travel"
      banner="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=2000"
      description="Explore the world with zero documentation stress. We make global travel accessible and straightforward for everyone."
      stats={stats}
      features={features}
      process={process}
    />
  );
}
