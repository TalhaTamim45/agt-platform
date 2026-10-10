import { Target, Award, Truck, Users, CheckCircle } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative border-t border-cream-300 bg-cream-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Slogan Banner */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-gold-700 mb-2">
            Our Core Mission & Philosophy
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-snug">
            Connecting Business <span className="text-gold-600 font-light mx-2">|</span> Building Partnerships <span className="text-gold-600 font-light mx-2">|</span> Delivering Growth
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-cream-300 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Narrative & Value Propositions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Corporate Profile */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Tailored Merchandising for Bangladesh&apos;s Healthcare & Pharmaceutical Leaders
            </h3>

            <p className="text-navy-800/85 text-sm sm:text-base leading-relaxed">
              <strong className="text-navy-950">Abdullah Global Trade (AGT)</strong> bridges the gap between global precision manufacturing and local pharmaceutical brand marketing. We specialize in sourcing, customizing, and delivering high-value promotional gifts designed specifically for PMD campaigns, medical representative kits, and physician symposiums.
            </p>

            <p className="text-navy-800/85 text-sm sm:text-base leading-relaxed">
              Whether you are preparing a nationwide product launch or procuring doctor gift sets for CME conferences, AGT ensures every single item adheres to strict aesthetic standards, functional longevity, and seamless corporate logo imprinting.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-navy-900 font-semibold">
                <CheckCircle className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Custom Laser Engraving & Decals</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-navy-900 font-semibold">
                <CheckCircle className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Sample Prototyping Before Mass Runs</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-navy-900 font-semibold">
                <CheckCircle className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Pharmaceutical PMD Compliance</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-navy-900 font-semibold">
                <CheckCircle className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Doorstep Delivery Across Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Strategic Pillars Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gold-500/25 shadow-cream-sm hover:shadow-cream-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-gold-100 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-3 shadow-sm">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy-950">Targeted Sourcing</h4>
              <p className="text-xs text-navy-700/70 mt-1">
                Direct procurement from certified manufacturers across Asia.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-500/25 shadow-cream-sm hover:shadow-cream-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-500/30 flex items-center justify-center text-emerald-700 mb-3 shadow-sm">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy-950">Premium QA</h4>
              <p className="text-xs text-navy-700/70 mt-1">
                Zero tolerance for defectives, ensuring your brand stays immaculate.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-blue-500/25 shadow-cream-sm hover:shadow-cream-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-500/30 flex items-center justify-center text-blue-700 mb-3 shadow-sm">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy-950">Rapid Logistics</h4>
              <p className="text-xs text-navy-700/70 mt-1">
                Streamlined customs clearance and safe distribution to your headquarters.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-500/25 shadow-cream-sm hover:shadow-cream-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-500/30 flex items-center justify-center text-purple-700 mb-3 shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy-950">B2B Partnerships</h4>
              <p className="text-xs text-navy-700/70 mt-1">
                Long-term collaboration with corporate procurement teams.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
