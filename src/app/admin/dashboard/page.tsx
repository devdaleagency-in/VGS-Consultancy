'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'stories' | 'destinations' | 'inquiries' | 'media' | 'about'>('stories');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Close mobile menu on tab change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  useEffect(() => {
    const pass = localStorage.getItem('vgs_admin_pass');
    if (pass !== 'vgs-admin-2024') {
      router.push('/admin');
    } else {
      fetchData();
    }
  }, [activeTab]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current.firstElementChild as HTMLElement,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading, data, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setData(null);
    setInquiries([]);
    const password = localStorage.getItem('vgs_admin_pass');

    if (activeTab === 'inquiries') {
      try {
        const res = await fetch(`/api/admin/inquiries?password=${password}`);
        const json = await res.json();
        setInquiries(json);
        setData({}); // Set dummy data to satisfy the loading check
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (activeTab === 'media') {
      try {
        const res = await fetch(`/api/admin/upload?password=${password}`);
        const json = await res.json();
        setMedia(json);
        setData({}); // satisfy loading check
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      return;
    }

    const type = activeTab === 'stories' ? 'success-stories' : activeTab === 'destinations' ? 'destinations' : 'about';
    try {
      const res = await fetch(`/api/admin/data?type=${type}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (url: string) => {
    if (!confirm('Are you sure you want to delete this file? This cannot be undone.')) return;
    const password = localStorage.getItem('vgs_admin_pass');
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, password })
      });
      if (res.ok) {
        setMedia(media.filter(m => m.url !== url));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    const password = localStorage.getItem('vgs_admin_pass');
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password })
      });
      if (res.ok) {
        setInquiries(inquiries.filter(i => i._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    const type = activeTab === 'stories' ? 'success-stories' : activeTab === 'destinations' ? 'destinations' : 'about';
    const password = localStorage.getItem('vgs_admin_pass');

    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data, password })
      });
      if (res.ok) {
        setMessage('Changes saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save. Check your connection.');
      }
    } catch (err) {
      setMessage('Error saving data.');
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('vgs_admin_pass');
    router.push('/admin');
  };

  const handleFileUpload = async (file: File, type: 'video' | 'story' | 'destination' | 'feedback-video' | 'team', idx?: number, countryKey?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', localStorage.getItem('vgs_admin_pass') || '');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      
      if (json.url) {
        const newData = { ...data };
        if (type === 'video' && idx !== undefined) {
          newData.videoTestimonials[idx].thumbnail = json.url;
        } else if (type === 'feedback-video' && idx !== undefined) {
          newData.videoTestimonials[idx].videoUrl = json.url;
        } else if (type === 'story' && idx !== undefined) {
          newData.successStories[idx].image = json.url;
        } else if (type === 'destination' && countryKey) {
          newData[countryKey].banner = json.url;
        } else if (type === 'team' && idx !== undefined) {
          newData.team[idx].image = json.url;
        }
        setData(newData);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  if (loading || !data) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black text-xs uppercase tracking-widest text-dark/30 animate-pulse">
      Loading System Data...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden">
      
      <div className="md:hidden bg-dark text-white p-5 flex justify-between items-center sticky top-0 z-[60] shadow-2xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5 shadow-glow shadow-primary/20 overflow-hidden">
            <img src="/logo3.png" alt="VGS" className="w-full h-full object-contain scale-125" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-sm uppercase tracking-tighter text-white leading-none">VGS</span>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-0.5">Admin Panel</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {activeTab !== 'inquiries' && activeTab !== 'media' && (
            <button 
              onClick={handleSave}
              disabled={saving}
              className={`px-4 py-2 rounded-xl font-black text-[8px] uppercase tracking-widest transition-all ${saving ? 'bg-gray-700 text-gray-500' : 'bg-primary text-white active:scale-95'}`}
            >
              {saving ? '...' : 'Deploy'}
            </button>
          )}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[55] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Drawer on Mobile */}
      <div className={`fixed inset-y-0 left-0 z-[56] w-72 bg-dark text-white p-8 flex flex-col justify-between transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div>
          <div className="hidden md:flex items-center gap-4 mb-16">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-2 shadow-glow shadow-primary/10 overflow-hidden">
              <img src="/logo3.png" alt="VGS Logo" className="w-full h-full object-contain scale-125" />
            </div>
            <div>
               <h2 className="font-heading font-black text-2xl leading-tight text-white tracking-tighter">VGS <br/> ADMIN</h2>
            </div>
          </div>

          <nav className="space-y-3">
            {[
              { id: 'inquiries', label: 'Leads & Inquiries' },
              { id: 'stories', label: 'Success Stories' },
              { id: 'destinations', label: 'Destinations' },
              { id: 'about', label: 'About Editor' },
              { id: 'media', label: 'Media Library' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <button onClick={logout} className="w-full p-5 text-white/20 hover:text-red-400 font-black text-[10px] uppercase tracking-widest text-left transition-all flex items-center gap-3">
            <span>⎋</span> Terminate Session
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 h-screen overflow-y-auto p-5 md:p-16 bg-gray-50 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-dark uppercase tracking-tighter">
              {activeTab === 'stories' ? 'Story Management' : activeTab === 'inquiries' ? 'Student Inquiries' : activeTab === 'media' ? 'Media Assets' : activeTab === 'about' ? 'About Editor' : 'Destination Hub'}
            </h1>
            <p className="text-dark/30 font-bold text-[10px] md:text-xs mt-2 uppercase tracking-widest">Live Content Deployment Engine</p>
          </div>
          
          {activeTab !== 'inquiries' && activeTab !== 'media' && (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={saving}
              className={`hidden md:block px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-2xl ${saving ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-dark text-white hover:bg-primary shadow-dark/20'}`}
            >
              {saving ? 'Processing...' : 'Deploy Changes'}
            </motion.button>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
          {message && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-green-500 text-white p-6 rounded-2xl font-black text-[10px] uppercase tracking-widest mb-8 text-center shadow-xl shadow-green-500/20"
            >
              {message}
            </motion.div>
          )}

        {activeTab === 'stories' && data && data.videoTestimonials && (
          <div className="space-y-16">
            
            {/* Video Testimonials Editor */}
            <section>
               <h2 className="text-xl font-black text-dark/40 uppercase tracking-widest mb-8 border-b border-gray-200 pb-4">Video Testimonials</h2>
               <div className="grid grid-cols-1 gap-6">
                 {data.videoTestimonials.map((video: any, idx: number) => (
                   <div key={idx} className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-3xl border border-gray-100 shadow-sm space-y-6">
                     <div className="grid grid-cols-1 gap-6">
                        <div>
                           <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Name</label>
                           <input 
                             type="text" 
                             value={video.name}
                             onChange={(e) => {
                               const newData = {...data};
                               newData.videoTestimonials[idx].name = e.target.value;
                               setData(newData);
                             }}
                             className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary"
                           />
                        </div>
                        <div>
                           <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Destination</label>
                           <input 
                             type="text" 
                             value={video.destination}
                             onChange={(e) => {
                               const newData = {...data};
                               newData.videoTestimonials[idx].destination = e.target.value;
                               setData(newData);
                             }}
                             className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary"
                           />
                        </div>
                     </div>
                     <div>
                        <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Thumbnail (File Upload or URL)</label>
                        <div className="flex gap-4">
                           <input 
                             type="text" 
                             value={video.thumbnail}
                             onChange={(e) => {
                               const newData = {...data};
                               newData.videoTestimonials[idx].thumbnail = e.target.value;
                               setData(newData);
                             }}
                             className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary"
                             placeholder="URL or use upload button →"
                           />
                           <input 
                             type="file" 
                             accept="image/*"
                             onChange={(e) => {
                               const file = e.target.files?.[0];
                               if (file) handleFileUpload(file, 'video', idx);
                             }}
                             className="hidden" 
                             id={`video-upload-${idx}`}
                           />
                           <label 
                             htmlFor={`video-upload-${idx}`}
                             className="px-6 py-3 bg-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-primary transition-all flex items-center"
                           >
                             Upload
                           </label>
                        </div>
                     </div>

                     <div>
                        <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Feedback Video (Upload MP4/MOV)</label>
                        <div className="flex gap-4">
                           <input 
                             type="text" 
                             value={video.videoUrl || ''}
                             onChange={(e) => {
                               const newData = {...data};
                               newData.videoTestimonials[idx].videoUrl = e.target.value;
                               setData(newData);
                             }}
                             className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary"
                             placeholder="Video URL or use upload button →"
                           />
                           <input 
                             type="file" 
                             accept="video/*"
                             onChange={(e) => {
                               const file = e.target.files?.[0];
                               if (file) handleFileUpload(file, 'feedback-video', idx);
                             }}
                             className="hidden" 
                             id={`feedback-video-upload-${idx}`}
                           />
                           <label 
                             htmlFor={`feedback-video-upload-${idx}`}
                             className="px-6 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-dark transition-all flex items-center shadow-lg shadow-primary/20"
                           >
                             Upload Video
                           </label>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
            </section>

            {/* Student Feedbacks Editor */}
            {data.successStories && (
              <section>
                 <h2 className="text-xl font-black text-dark/40 uppercase tracking-widest mb-8 border-b border-gray-200 pb-4">Written Stories</h2>
                 <div className="grid grid-cols-1 gap-6">
                   {data.successStories.map((story: any, idx: number) => (
                     <div key={idx} className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-3xl border border-gray-100 shadow-sm space-y-6">
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div>
                             <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Student Name</label>
                             <input type="text" value={story.name} onChange={(e) => {
                               const newData = {...data}; newData.successStories[idx].name = e.target.value; setData(newData);
                             }} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary" />
                          </div>
                          <div>
                             <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">University</label>
                             <input type="text" value={story.university} onChange={(e) => {
                               const newData = {...data}; newData.successStories[idx].university = e.target.value; setData(newData);
                             }} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary" />
                          </div>
                          <div>
                             <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Course</label>
                             <input type="text" value={story.course} onChange={(e) => {
                               const newData = {...data}; newData.successStories[idx].course = e.target.value; setData(newData);
                             }} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary" />
                          </div>
                          <div>
                             <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Intake Date</label>
                             <input type="text" value={story.date} onChange={(e) => {
                               const newData = {...data}; newData.successStories[idx].date = e.target.value; setData(newData);
                             }} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary" />
                          </div>
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Student Photo (File Upload or URL)</label>
                          <div className="flex gap-4">
                            <input type="text" value={story.image} onChange={(e) => {
                              const newData = {...data}; newData.successStories[idx].image = e.target.value; setData(newData);
                            }} className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary" placeholder="URL or use upload button →" />
                            <input type="file" accept="image/*" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'story', idx);
                            }} className="hidden" id={`story-upload-${idx}`} />
                            <label htmlFor={`story-upload-${idx}`} className="px-6 py-3 bg-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-primary transition-all flex items-center">Upload</label>
                          </div>
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Testimonial Message</label>
                          <textarea 
                            rows={3}
                            value={story.message}
                            onChange={(e) => {
                              const newData = {...data}; newData.successStories[idx].message = e.target.value; setData(newData);
                            }}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary resize-none"
                          />
                       </div>
                     </div>
                   ))}
                 </div>
              </section>
            )}

          </div>
        )}

        {activeTab === 'destinations' && data && (
          <div className="space-y-16">
            {Object.keys(data).map((countryKey) => {
              const country = data[countryKey];
              if (!country || !country.name) return null;
              
              return (
                <section key={countryKey} className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-6">
                    <h3 className="text-2xl font-black text-primary uppercase tracking-tighter">{country.name}</h3>
                    <span className="text-[10px] font-black text-dark/20 uppercase tracking-[0.4em]">{countryKey}</span>
                  </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div>
                      <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Headline</label>
                      <input type="text" value={country.fullName} onChange={(e) => {
                        const newData = {...data}; newData[countryKey].fullName = e.target.value; setData(newData);
                      }} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary" />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Banner Image</label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input type="text" value={country.banner} onChange={(e) => {
                          const newData = {...data}; newData[countryKey].banner = e.target.value; setData(newData);
                        }} className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary" />
                        <input type="file" accept="image/*" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'destination', undefined, countryKey);
                        }} className="hidden" id={`dest-upload-${countryKey}`} />
                        <label htmlFor={`dest-upload-${countryKey}`} className="px-6 py-3 bg-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-primary transition-all flex items-center justify-center">Upload</label>
                      </div>
                   </div>
                </div>

                <div>
                   <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Description</label>
                   <textarea rows={4} value={country.description} onChange={(e) => {
                     const newData = {...data}; newData[countryKey].description = e.target.value; setData(newData);
                   }} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary resize-none" />
                </div>

                {/* Stats Editor */}
                {country.stats && (
                  <div>
                    <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-4">Core Statistics</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {country.stats.map((stat: any, sIdx: number) => (
                          <div key={sIdx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <input type="text" value={stat.label} onChange={(e) => {
                              const newData = {...data}; newData[countryKey].stats[sIdx].label = e.target.value; setData(newData);
                            }} className="w-full bg-transparent font-black text-[10px] uppercase tracking-widest text-dark/40 mb-1 focus:outline-none" />
                            <input type="text" value={stat.value} onChange={(e) => {
                              const newData = {...data}; newData[countryKey].stats[sIdx].value = e.target.value; setData(newData);
                            }} className="w-full bg-transparent font-black text-lg text-primary focus:outline-none" />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </section>
              );
            })}
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-6 pb-20">
            {inquiries.length === 0 ? (
              <div className="bg-white p-20 rounded-[3rem] border border-gray-100 text-center">
                <p className="font-black text-[10px] uppercase tracking-[0.3em] text-dark/20">No inquiries found in the system.</p>
              </div>
            ) : (
              inquiries.map((inquiry) => (
                <div key={inquiry._id} className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm group hover:border-primary/20 transition-all">
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="space-y-6 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-xl font-black uppercase">
                          {inquiry.name[0]}
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-dark uppercase tracking-tight">{inquiry.name}</h3>
                          <p className="text-[10px] font-black text-dark/30 uppercase tracking-widest">{new Date(inquiry.createdAt).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                        <div>
                          <p className="text-[10px] font-black text-dark/30 uppercase tracking-widest mb-1">Email</p>
                          <p className="font-bold text-sm text-dark">{inquiry.email}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-dark/30 uppercase tracking-widest mb-1">Phone</p>
                          <p className="font-bold text-sm text-dark">{inquiry.phone}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-dark/30 uppercase tracking-widest mb-1">Target Country</p>
                          <p className="font-bold text-sm text-primary uppercase">{inquiry.country}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-dark/30 uppercase tracking-widest mb-1">Visa Type</p>
                          <p className="px-3 py-1 bg-primary text-white rounded-full font-black text-[8px] uppercase tracking-widest inline-block">{inquiry.visaType}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-dark/30 uppercase tracking-widest mb-1">Interest</p>
                          <p className="font-bold text-sm text-dark uppercase">{inquiry.course}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Message</p>
                        <p className="text-sm text-dark/70 font-medium leading-relaxed italic">"{inquiry.message}"</p>
                      </div>
                    </div>

                    <div className="flex lg:flex-col justify-end gap-4">
                       <a href={`mailto:${inquiry.email}`} className="px-6 py-4 bg-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all text-center">Reply</a>
                       <button 
                        onClick={() => deleteInquiry(inquiry._id)}
                        className="px-6 py-4 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                       >
                         Delete
                       </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === 'media' && (
          <div className="space-y-8 pb-20">
            {media.length === 0 ? (
              <div className="bg-white p-20 rounded-[3rem] border border-gray-100 text-center">
                <p className="font-black text-[10px] uppercase tracking-[0.3em] text-dark/20">No media assets found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {media.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-primary/20 transition-all flex flex-col">
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100">
                      {item.type === 'video' ? (
                        <video src={item.url} className="w-full h-full object-cover" controls />
                      ) : (
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      )}
                      <div className="absolute top-4 left-4">
                         <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-lg ${item.type === 'video' ? 'bg-orange-500' : 'bg-primary'}`}>
                            {item.type}
                         </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <p className="text-[9px] font-black text-dark/30 uppercase tracking-[0.2em] mb-1 truncate" title={item.name}>{item.name}</p>
                        <p className="text-[10px] font-bold text-dark/50">{(item.size / (1024 * 1024)).toFixed(2)} MB • {new Date(item.mtime).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="flex gap-3">
                         <a 
                           href={item.url} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex-1 py-3 bg-gray-50 text-dark rounded-xl font-black text-[9px] uppercase tracking-widest text-center hover:bg-gray-100 transition-all"
                         >
                           View Full
                         </a>
                         <button 
                           onClick={() => deleteMedia(item.url)}
                           className="px-4 py-3 bg-red-50 text-red-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                         >
                           Delete
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === 'about' && data && data.team && (
          <div className="space-y-16 pb-20">
            {/* Stats Editor */}
            <section className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-dark uppercase tracking-tight mb-8">Platform Statistics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.stats.map((stat: any, idx: number) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">{stat.label}</label>
                    <input 
                      type="text" 
                      value={stat.value} 
                      onChange={(e) => {
                        const newData = { ...data };
                        newData.stats[idx].value = e.target.value;
                        setData(newData);
                      }}
                      className="w-full bg-transparent font-black text-2xl text-primary focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Team Editor */}
            <section className="space-y-8">
              <h3 className="text-xl font-black text-dark uppercase tracking-tight">Leadership Team</h3>
              <div className="grid grid-cols-1 gap-8">
                {data.team.map((member: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-64 space-y-4">
                      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100 shadow-inner">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        id={`team-upload-${idx}`}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'team', idx);
                        }}
                      />
                      <label 
                        htmlFor={`team-upload-${idx}`}
                        className="w-full py-4 bg-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-widest text-center cursor-pointer hover:bg-primary transition-all block"
                      >
                        Change Image
                      </label>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Full Name</label>
                          <input 
                            type="text" 
                            value={member.name}
                            onChange={(e) => {
                              const newData = { ...data };
                              newData.team[idx].name = e.target.value;
                              setData(newData);
                            }}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Professional Role</label>
                          <input 
                            type="text" 
                            value={member.role}
                            onChange={(e) => {
                              const newData = { ...data };
                              newData.team[idx].role = e.target.value;
                              setData(newData);
                            }}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Professional Biography</label>
                        <textarea 
                          rows={3}
                          value={member.bio}
                          onChange={(e) => {
                            const newData = { ...data };
                            newData.team[idx].bio = e.target.value;
                            setData(newData);
                          }}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-dark/30 uppercase tracking-widest mb-2">Experience</label>
                        <input 
                          type="text" 
                          value={member.experience}
                          onChange={(e) => {
                            const newData = { ...data };
                            newData.team[idx].experience = e.target.value;
                            setData(newData);
                          }}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Accreditations Editor */}
            <section className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-dark uppercase tracking-tight mb-8">Recognitions & Accreditations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.accreditations.map((brand: string, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <input 
                      type="text" 
                      value={brand} 
                      onChange={(e) => {
                        const newData = { ...data };
                        newData.accreditations[idx] = e.target.value;
                        setData(newData);
                      }}
                      className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
        </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
