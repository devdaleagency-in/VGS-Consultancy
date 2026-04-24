'use client';

import VisaPageLayout from '@/components/visa/VisaPageLayout';

export default function StudyVisaPage() {
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
    { title: "Pre-departure Brief", icon: "✈️" }
  ].map(f => f.title);

  const process = [
    { step: "01", title: "Assessment", desc: "Evaluating your profile for global university standards." },
    { step: "02", title: "Selection", desc: "Finding the perfect match for your academic goals." },
    { step: "03", title: "Application", desc: "Handling all documentation and submission tasks." },
    { step: "04", title: "Visa Stamping", desc: "Expert interview prep and visa filing for success." }
  ];

  return (
    <VisaPageLayout
      title="Study Visa"
      fullName="Global Academic Success"
      banner="https://images.unsplash.com/photo-1523050335192-ce1dee0a80ae?auto=format&fit=crop&q=80&w=2000"
      description="Access the world's most prestigious universities. We provide the expertise needed to secure your academic future abroad."
      stats={stats}
      features={features}
      process={process}
    />
  );
}
