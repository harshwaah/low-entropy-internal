import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BrandLogo } from '@/components/shared/brand-logo';
import { 
  Heart, 
  ArrowRight,
  Brain,
  Calendar,
  Users,
  Activity,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export default function RootHomePage() {
  return (
    <div className="min-h-screen bg-brand-background text-brand-text flex flex-col font-sans overflow-x-hidden">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-brand-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-dark tracking-tight">SmritiSaathi</span>
            <SparkleIcon className="w-5 h-5 text-brand-primary" />
            <div className="flex flex-col">
               <span className="text-[10px] uppercase font-bold text-brand-primary tracking-wider -mt-1 ml-1">Always with you</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-semibold text-brand-text">
            <Link href="#" className="hover:text-brand-primary transition-colors">Home</Link>
            <Link href="#" className="hover:text-brand-primary transition-colors">About</Link>
            <Link href="#" className="hover:text-brand-primary transition-colors">Features</Link>
            <Link href="#" className="hover:text-brand-primary transition-colors">Our Impact</Link>
          </nav>
          <Button className="rounded-full font-bold">Get Started</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent-orange/20 text-brand-dark font-bold text-sm">
                <Heart className="w-4 h-4 fill-brand-accent-orange text-brand-accent-orange" />
                A Kinder Tomorrow
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-dark leading-[1.1] tracking-tight">
                More Memories.<br />
                Brighter Days.<br />
                Together.
              </h1>
              <p className="text-lg md:text-xl text-brand-muted max-w-md leading-relaxed font-medium">
                An AI-assisted daily companion for dementia patients, supporting memories, routines, well-being and stronger connections with loved ones.
              </p>
              <div className="pt-4 space-y-4">
                <Button size="lg" className="rounded-full text-lg group">
                  Choose Your Experience 
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex items-center gap-2 text-brand-muted font-medium italic">
                  <Heart className="w-4 h-4 fill-brand-accent-orange text-brand-accent-orange" />
                  Different journeys. A happier tomorrow.
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Mascot Illustration Area */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Simulated generated mascot image */}
                <Image 
                  src="/assets/images/mascot_hero_1788622498847.jpg" 
                  alt="SmritiSaathi Mascot" 
                  width={500} 
                  height={500} 
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Pills */}
                <div className="absolute top-10 right-0 space-y-3 flex flex-col items-end">
                  {['Remember', 'Engage', 'Stay Active', 'Feel Connected'].map((text, i) => (
                    <div 
                      key={text} 
                      className="bg-brand-accent-yellow/80 backdrop-blur-sm px-6 py-3 rounded-full text-brand-dark font-bold shadow-sm transform hover:scale-105 transition-transform"
                      style={{ transform: `translateX(${i * 10}px)` }}
                    >
                      {text}
                    </div>
                  ))}
                </div>
                
                {/* Speech Bubble */}
                <div className="absolute top-0 left-0 bg-white px-6 py-4 rounded-3xl rounded-br-none shadow-md transform -rotate-6">
                  <p className="font-bold text-brand-dark text-lg">Hello!</p>
                  <p className="font-medium text-brand-muted">I&apos;m your<br/>SmritiSaathi! <Heart className="inline w-4 h-4 fill-brand-accent-orange text-brand-accent-orange" /></p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Decorative Wavy Shape - Simulated with SVG */}
          <div className="absolute bottom-0 left-0 right-0 -z-10 pointer-events-none">
            <svg viewBox="0 0 1440 320" className="w-full h-auto fill-brand-light-alt text-brand-light-alt" preserveAspectRatio="none">
              <path d="M0,224L48,229.3C96,235,192,245,288,245.3C384,245,480,235,576,213.3C672,192,768,160,864,154.7C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* Personas Section */}
        <section className="bg-brand-light-alt py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 relative -mt-20">
            {/* Patient Card */}
            <Card className="bg-brand-light border-none shadow-md hover:shadow-lg transition-shadow rounded-3xl overflow-hidden group">
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-full flex justify-end mb-4">
                    <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                      <ImagePlaceholder color="text-brand-primary" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-brand-dark mb-3 leading-tight">
                    I&apos;m a<br/>Patient
                  </h3>
                  <p className="text-brand-muted font-medium text-lg">My companion for a brighter, happier day.</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white group-hover:bg-brand-primary transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Caregiver Card */}
            <Card className="bg-brand-accent-orange/20 border-none shadow-md hover:shadow-lg transition-shadow rounded-3xl overflow-hidden group">
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-full flex justify-end mb-4">
                    <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                       <ImagePlaceholder color="text-brand-accent-orange" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-brand-dark mb-3 leading-tight">
                    I&apos;m a<br/>Caregiver
                  </h3>
                  <p className="text-brand-muted font-medium text-lg">Support, care and stay connected.</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="w-12 h-12 rounded-full bg-brand-accent-orange flex items-center justify-center text-white group-hover:bg-brand-accent-orange/80 transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practitioner Card */}
            <Card className="bg-brand-accent-blue border-none shadow-md hover:shadow-lg transition-shadow rounded-3xl overflow-hidden group">
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-full flex justify-end mb-4">
                    <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                       <ImagePlaceholder color="text-blue-500" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-brand-dark mb-3 leading-tight">
                    Medical<br/>Practitioner
                  </h3>
                  <p className="text-brand-muted font-medium text-lg">Insights for better care.</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Icons Row */}
        <section className="bg-brand-light-alt py-16 px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <FeatureIcon icon={<ImageIcon className="w-10 h-10 text-brand-primary" />} label="Memory\nPreservation" />
            <FeatureIcon icon={<Brain className="w-10 h-10 text-brand-accent-orange" />} label="Cognitive\nEngagement" />
            <FeatureIcon icon={<Calendar className="w-10 h-10 text-brand-dark" />} label="Daily\nAssistance" />
            <FeatureIcon icon={<Heart className="w-10 h-10 text-red-500 fill-red-500" />} label="Caregiver\nSupport" />
            <FeatureIcon icon={<Activity className="w-10 h-10 text-blue-500" />} label="Clinical\nInsights" />
          </div>
        </section>

        {/* Companion Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-background relative">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight">
                A Companion <SparkleIcon className="inline w-8 h-8 text-brand-primary" /><br/>
                for Every Moment
              </h2>
              <p className="text-xl text-brand-muted leading-relaxed font-medium max-w-md">
                SmritiSaathi brings together memories, meaningful activities and caring support to help people with dementia live fuller, brighter days.
              </p>
              <Button size="lg" className="rounded-full text-lg">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="w-full aspect-square bg-brand-light rounded-[3rem] p-8 flex items-center justify-center relative">
                 {/* Simulated Scrapbook Mascot */}
                 <div className="text-center space-y-4">
                    <ImagePlaceholder color="text-brand-dark" size="w-32 h-32" />
                    <div className="bg-[#8B5A2B] text-white px-8 py-10 rounded-xl shadow-xl transform rotate-6 border-4 border-[#654321]">
                       <h3 className="text-3xl font-serif font-bold italic mb-2">Good</h3>
                       <h3 className="text-3xl font-serif font-bold italic">Memories</h3>
                       <Heart className="w-6 h-6 mx-auto mt-4 fill-brand-accent-orange text-brand-accent-orange" />
                    </div>
                 </div>
                 
                 {/* Floating Polaroid 1 */}
                 <div className="absolute top-10 left-10 bg-white p-3 rounded-lg shadow-lg transform -rotate-12">
                   <div className="w-24 h-24 bg-brand-accent-blue/30 rounded flex items-center justify-center">
                      <ImageIcon className="text-blue-400" />
                   </div>
                 </div>
                 {/* Floating Polaroid 2 */}
                 <div className="absolute bottom-10 right-10 bg-white p-3 rounded-lg shadow-lg transform rotate-12">
                   <div className="w-24 h-24 bg-brand-accent-orange/30 rounded flex items-center justify-center">
                      <ImageIcon className="text-brand-accent-orange" />
                   </div>
                 </div>
                 
                 <div className="absolute top-0 right-0 bg-white px-4 py-3 rounded-full shadow-md text-brand-dark font-bold transform rotate-6 translate-x-4 -translate-y-4">
                   Every memory<br/>matters <Heart className="inline w-4 h-4 fill-brand-accent-orange text-brand-accent-orange" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Helps Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-background text-center">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="bg-brand-light text-brand-dark px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">How It Helps</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">
                Small Moments. A Big Difference.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              <HelpCard 
                icon={<div className="w-20 h-20 bg-brand-light rounded-full mx-auto flex items-center justify-center text-brand-primary"><Brain className="w-10 h-10" /></div>}
                title="Stay Engaged"
                description="Fun and meaningful cognitive activities designed with care."
              />
              <HelpCard 
                icon={<div className="w-20 h-20 bg-brand-accent-yellow/40 rounded-full mx-auto flex items-center justify-center text-brand-dark"><ImageIcon className="w-10 h-10" /></div>}
                title="Relive Memories"
                description="A personal scrapbook to revisit, cherish and create new memories."
              />
              <HelpCard 
                icon={<div className="w-20 h-20 bg-brand-light rounded-full mx-auto flex items-center justify-center text-brand-primary"><Calendar className="w-10 h-10" /></div>}
                title="Stay on Track"
                description="Gentle reminders for medication, activities and daily routines."
              />
              <HelpCard 
                icon={<div className="w-20 h-20 bg-brand-accent-orange/20 rounded-full mx-auto flex items-center justify-center"><Heart className="w-10 h-10 fill-red-500 text-red-500" /></div>}
                title="Feel Connected"
                description="Stay close to loved ones with a companion who always cares."
              />
            </div>
          </div>
        </section>

        {/* Different Needs Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-light-alt relative overflow-hidden">
           <div className="max-w-7xl mx-auto space-y-16 relative z-10 text-center">
            <div className="space-y-6 max-w-3xl mx-auto">
              <span className="bg-white text-brand-dark px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-sm">A Journey For Everyone</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">
                Different Needs. One Shared Purpose.
              </h2>
              <p className="text-xl text-brand-muted font-medium">
                SmritiSaathi brings patients, caregivers and medical practitioners together for a more supportive and compassionate tomorrow.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-8">
               <div className="relative">
                  <div className="w-48 h-48 bg-white rounded-full shadow-lg flex items-center justify-center relative z-10">
                    <ImagePlaceholder color="text-brand-dark" size="w-24 h-24" />
                    <Heart className="absolute bottom-4 right-4 w-12 h-12 fill-red-500 text-red-500" />
                  </div>
                  <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-md z-20 font-bold text-brand-dark text-center leading-tight">
                    Care<br/>Connects<br/>Us <Heart className="inline w-3 h-3 fill-red-500 text-red-500" />
                  </div>
               </div>
               
               <div className="flex-1 max-w-3xl w-full">
                 <div className="relative flex justify-between items-center w-full pb-8">
                   {/* Dashed Line */}
                   <div className="absolute top-6 left-0 w-full border-t-2 border-dashed border-brand-primary/30 -z-10"></div>
                   
                   <TimelineNode icon={<div className="w-12 h-12 bg-brand-accent-orange/20 rounded-full flex items-center justify-center"><ImageIcon className="text-brand-accent-orange w-6 h-6" /></div>} label="Happier\nIndividuals" />
                   <TimelineNode icon={<div className="w-12 h-12 bg-brand-accent-yellow/40 rounded-full flex items-center justify-center"><Users className="text-brand-dark w-6 h-6" /></div>} label="Stronger\nFamilies" />
                   <TimelineNode icon={<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"><Heart className="text-red-500 fill-red-500 w-6 h-6" /></div>} label="Healthier\nCommunities" />
                 </div>
               </div>
            </div>
           </div>
        </section>

        {/* Impact Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-background text-center">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="bg-brand-light text-brand-dark px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">Our Impact</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">
                Towards a Kinder, Brighter Future
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               <StatBlock icon={<Users className="w-8 h-8 text-brand-primary" />} stat="10M+" desc="People living with dementia in India" />
               <StatBlock icon={<Heart className="w-8 h-8 text-red-500 fill-red-500" />} stat="3x" desc="Better engagement with memory activities" />
               <StatBlock icon={<Activity className="w-8 h-8 text-blue-500" />} stat="70%" desc="Lower feelings of isolation" />
               <StatBlock icon={<SparkleIcon className="w-8 h-8 text-brand-accent-yellow fill-brand-accent-yellow" />} stat="Happier" desc="Families, together" />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-light-alt relative overflow-hidden flex flex-col items-center justify-center text-center">
           <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center pb-20">
              <div className="w-48 h-48 bg-white/50 rounded-full mb-8 flex items-center justify-center shadow-inner relative">
                 <ImagePlaceholder color="text-brand-primary" size="w-32 h-32" />
                 
                 <div className="absolute top-0 right-0 translate-x-1/2 bg-white px-6 py-4 rounded-[2rem] rounded-bl-none shadow-lg transform rotate-6">
                    <p className="font-bold text-brand-dark">Small steps<br/>towards a<br/>happier tomorrow <Heart className="inline w-3 h-3 fill-red-500 text-red-500" /></p>
                 </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-6 flex items-center justify-center gap-2">
                 <SparkleIcon className="w-8 h-8 text-brand-primary" /> Let&apos;s Build Brighter<br/>Tomorrows Together
              </h2>
              <p className="text-xl text-brand-muted font-medium mb-8 max-w-2xl">
                 Join us in creating a more compassionate world for people with dementia and their loved ones.
              </p>
              
              <Button size="lg" className="rounded-full text-lg group px-10">
                 Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
           
           {/* Decorative Floor SVG */}
           <div className="absolute bottom-0 left-0 w-full -z-10">
             <svg viewBox="0 0 1440 200" className="w-full h-auto fill-brand-dark" preserveAspectRatio="none">
                <path d="M0,64L80,85.3C160,107,320,150,480,154.7C640,160,800,128,960,112C1120,96,1280,96,1360,96L1440,96L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z"></path>
             </svg>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-white">SmritiSaathi</span>
                <SparkleIcon className="w-5 h-5 text-brand-light" />
              </div>
              <p className="text-sm text-brand-light/80 italic font-medium">Always with you</p>
              <p className="text-sm font-medium mt-4">More Memories. Brighter Days. Together.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-brand-light">Product</h4>
              <ul className="space-y-3 text-sm text-brand-light/70 font-medium">
                <li><Link href="#" className="hover:text-white transition-colors">Patient App</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Caregiver App</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Practitioner Dashboard</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-brand-light">Company</h4>
              <ul className="space-y-3 text-sm text-brand-light/70 font-medium">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Our Mission</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Our Impact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-brand-light">Legal</h4>
              <ul className="space-y-3 text-sm text-brand-light/70 font-medium">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Accessibility</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-brand-light/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-light/60 font-medium">
            <p>© 2025 SmritiSaathi. All rights reserved.</p>
            <div className="text-right">
              <span className="italic">Because every memory<br/>still matters </span>
              <Heart className="inline w-3 h-3 fill-brand-accent-orange text-brand-accent-orange ml-1" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Helper Components for the Landing Page */

function FeatureIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white rounded-full p-4 shadow-sm">
        {icon}
      </div>
      <p className="font-bold text-brand-dark text-sm whitespace-pre-line leading-tight">
        {label.replace('\\n', '\n')}
      </p>
    </div>
  );
}

function HelpCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      {icon}
      <h3 className="text-xl font-bold text-brand-dark">{title}</h3>
      <p className="text-brand-muted font-medium">{description}</p>
    </div>
  );
}

function TimelineNode({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center relative z-10 gap-3">
      <div className="bg-white p-2 rounded-full shadow-md">
        {icon}
      </div>
      <p className="font-bold text-brand-dark text-sm whitespace-pre-line text-center leading-tight">
        {label.replace('\\n', '\n')}
      </p>
    </div>
  );
}

function StatBlock({ icon, stat, desc }: { icon: React.ReactNode, stat: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <div className="mb-2">{icon}</div>
      <h3 className="text-4xl font-extrabold text-brand-dark">{stat}</h3>
      <p className="text-brand-muted font-medium text-sm">{desc}</p>
    </div>
  );
}

// Simple SVG Sparkle Icon to match the leaf/sparkle logo accent
function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12,2C12,2 12,8 18,10C12,12 12,18 12,22C12,18 6,18 6,10C6,8 12,2 12,2Z" />
    </svg>
  );
}

// Placeholder for the mascot images where we didn't generate specific ones
function ImagePlaceholder({ size = "w-16 h-16", color = "text-brand-primary" }: { size?: string, color?: string }) {
  return (
    <div className={`${size} ${color} bg-white rounded-full flex items-center justify-center opacity-80`}>
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
         <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
         <path d="M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
         <path d="M15.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
         <path d="M15.5 14c-1.5 1.5-5.5 1.5-7 0"/>
       </svg>
    </div>
  );
}
