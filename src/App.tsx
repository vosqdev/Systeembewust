import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Home as HomeIcon, Car, Leaf, Map, Droplets, Network, X, ChevronDown, ArrowLeft, Globe } from 'lucide-react';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let stars: { x: number; y: number; radius: number; alpha: number; speed: number }[] = [];
    
    const initStars = () => {
      stars = [];
      // Calculate number of stars based on screen area to maintain density on high resolutions
      const numStars = Math.max(300, Math.floor((width * height) / 4000));
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2,
          alpha: Math.random(),
          speed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    initStars();

    let animationFrameId: number;

    const animate = () => {
      // Create a dark gradient background
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
      gradient.addColorStop(0, '#0a0f1a');
      gradient.addColorStop(1, '#02040a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.speed = -star.speed;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// Translation logic 
const getTranslation = (lang: 'nl' | 'en') => {
  const isEn = lang === 'en';
  return {
    title: isEn ? 'The Netherlands in' : 'Nederland in',
    titleHighlight: isEn ? 'Transition' : 'Transitie',
    subtitle: isEn 
      ? 'The Netherlands is in the midst of multiple system transitions. These are not separate issues, but highly interdependent. The core: scarcity of space, energy, and executive power forces integrated solutions.' 
      : 'Nederland zit midden in meerdere systeemtransities tegelijk. Deze zijn geen losse dossiers, maar onderling sterk afhankelijk. De kern: schaarste aan ruimte, energie en uitvoeringskracht dwingt tot integrale oplossingen.',
    contact: 'Contact',
    backToHome: isEn ? 'Back to Home' : 'Terug naar Home',
    logo1: isEn ? 'TRANSITION' : 'TRANSITIE',
    logo2: isEn ? 'NETHERLANDS' : 'NEDERLAND',
    insightTitle: isEn ? 'Strategic insight' : 'Strategisch inzicht',
    coreTooltip: isEn ? 'THE CORE' : 'DE KERN',
    divisions: [
      { 
        id: 'energie', 
        name: isEn ? '.ENERGY' : '.ENERGIE', 
        icon: Zap, 
        color: '#eab308', 
        category: 'all',
        cardImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop',
        cardTitle: isEn ? 'Energy' : 'Energie',
        cardText: isEn ? 'Transition from fossil to sustainable, explosive growth in electricity demand and structural grid congestion.' : 'Overgang van fossiel naar duurzaam, explosieve groei elektriciteitsvraag en structurele netcongestie.',
        buttonText: isEn ? 'Read more about Energy' : 'Lees meer over Energie',
        details: {
          sections: [
            { title: isEn ? 'What is happening:' : 'Wat speelt er:', items: isEn ? ['Transition from fossil to sustainable (solar, wind)', 'Explosive growth in electricity demand (EV, heat pumps)', 'Structural grid congestion'] : ['Overgang van fossiel naar duurzaam (zon, wind)', 'Explosieve groei elektriciteitsvraag (EV, warmtepompen, industrie)', 'Structurele netcongestie (TenneT / Liander / Enexis)'] },
            { title: isEn ? 'Bottlenecks:' : 'Knelpunten:', items: isEn ? ['Grid capacity limits housing and economy', 'Long lead times for connections (5–10 years)', 'Insufficient flexibility in the system'] : ['Netcapaciteit is beperkende factor voor woningbouw en economie', 'Lange doorlooptijden aansluitingen (5–10 jaar geen uitzondering)', 'Onvoldoende flexibiliteit in het systeem'] },
            { title: isEn ? 'What works:' : 'Wat werkt:', items: isEn ? ['Energy hubs / closed distribution systems', 'Battery storage (BESS, 2–4 hours)', 'Cable pooling & congestion management', 'Energy communities'] : ['Energiehubs / gesloten distributiesystemen (GDS)', 'Batterijopslag (BESS, 2–4 uur)', 'Cable pooling & congestiemanagement', 'Energy communities'] }
          ],
          inzicht: isEn ? 'Energy is no longer a prerequisite, but a driving force for spatial development.' : 'Energie is niet langer een randvoorwaarde, maar sturend voor ruimtelijke ontwikkeling.'
        }
      },
      { 
        id: 'woningbouw', 
        name: isEn ? '.HOUSING' : '.WONINGBOUW', 
        icon: HomeIcon, 
        color: '#ef4444', 
        category: 'all',
        cardImage: 'https://image2url.com/r2/default/images/1775422774522-61a635c6-a63c-45f4-b35e-7460fae2a557.jpg',
        cardTitle: isEn ? 'Housing' : 'Woningbouw',
        cardText: isEn ? 'Housing shortage of ± 900,000 homes until 2030, pressure on affordability and dependence on infrastructure.' : 'Woningtekort van ± 900.000 woningen tot 2030, druk op betaalbaarheid en afhankelijkheid van infrastructuur.',
        buttonText: isEn ? 'Read more about Housing' : 'Lees meer over Woningbouw',
        details: {
          sections: [
            { title: isEn ? 'What is happening:' : 'Wat speelt er:', items: isEn ? ['Housing shortage: ± 900,000 homes until 2030', 'Pressure on affordability and speed', 'Dependence on infrastructure (energy, nitrogen, mobility)'] : ['Woningtekort: ± 900.000 woningen tot 2030', 'Druk op betaalbaarheid en snelheid', 'Afhankelijkheid van infrastructuur (energie, stikstof, mobiliteit)'] },
            { title: isEn ? 'Bottlenecks:' : 'Knelpunten:', items: isEn ? ['Locations without grid capacity = standstill', 'Nitrogen and procedures (Environment Act)', 'High construction costs'] : ['Locaties zonder netcapaciteit = stilstand', 'Stikstof en procedures (Omgevingswet)', 'Hoge bouwkosten'] },
            { title: isEn ? 'What works:' : 'Wat werkt:', items: isEn ? ['Industrial / modular construction', 'Inner-city densification', 'Grid-aware area development', 'Coupling with energy (energy-positive areas)'] : ['Industrieel / modulair bouwen', 'Binnenstedelijke verdichting', 'Netbewuste gebiedsontwikkeling', 'Koppeling met energie (energiepositieve wijken)'] }
          ],
          inzicht: isEn ? 'The question is no longer where we can build, but where we can build with energy and infrastructure.' : 'De vraag is niet meer waar kunnen we bouwen, maar waar kunnen we bouwen mét energie en infrastructuur.'
        }
      },
      { 
        id: 'mobiliteit', 
        name: isEn ? '.MOBILITY' : '.MOBILITEIT', 
        icon: Car, 
        color: '#3b82f6', 
        category: 'all',
        cardImage: 'https://image2url.com/r2/default/images/1775412501084-87c3b634-79fc-4fb2-9233-c656eb5bd4bb.jpeg',
        cardTitle: isEn ? 'Mobility' : 'Mobiliteit',
        cardText: isEn ? 'Electrification of transport, growth of charging infrastructure and change in mobility behavior.' : 'Elektrificatie van vervoer, groei laadinfra en verandering in mobiliteitsgedrag.',
        buttonText: isEn ? 'Read more about Mobility' : 'Lees meer over Mobiliteit',
        details: {
          sections: [
            { title: isEn ? 'What is happening:' : 'Wat speelt er:', items: isEn ? ['Electrification of transport (passenger + logistics)', 'Growth of charging infra (AC + DC fast charging)', 'Change in mobility behavior'] : ['Elektrificatie van vervoer (personen + logistiek)', 'Groei laadinfra (AC + DC snelladen)', 'Verandering in mobiliteitsgedrag'] },
            { title: isEn ? 'Bottlenecks:' : 'Knelpunten:', items: isEn ? ['Charging plazas require massive grid capacity', 'Spatial integration (lack of space)', 'Peak load on the grid'] : ['Laadpleinen vragen enorme netcapaciteit', 'Ruimtelijke inpassing (ruimtegebrek)', 'Piekbelasting op het net'] },
            { title: isEn ? 'What works:' : 'Wat werkt:', items: isEn ? ['Smart charging (load balancing)', 'Integration with energy hubs', 'Logistics clusters', 'Combination with solar parks and batteries'] : ['Smart charging (load balancing)', 'Integratie met energiehubs', 'Logistieke laadclusters', 'Combinatie met zonneparken en batterijen'] }
          ],
          inzicht: isEn ? 'Mobility is becoming part of the energy system.' : 'Mobiliteit wordt onderdeel van het energiesysteem.'
        }
      },
      { 
        id: 'landbouw', 
        name: isEn ? '.AGRICULTURE' : '.LANDBOUW', 
        icon: Leaf, 
        color: '#22c55e', 
        category: 'all',
        cardImage: 'https://image2url.com/r2/default/images/1775422502287-24ca5b98-bd2d-40f2-bcec-aee74ebdd4df.jpg',
        cardTitle: isEn ? 'Agriculture' : 'Landbouw',
        cardText: isEn ? 'Nitrogen issues, pressure on farmers\' revenue models and transition to sustainable agriculture.' : 'Stikstofproblematiek, druk op verdienmodel boeren en transitie naar duurzame landbouw.',
        buttonText: isEn ? 'Read more about Agriculture' : 'Lees meer over Landbouw',
        details: {
          sections: [
            { title: isEn ? 'What is happening:' : 'Wat speelt er:', items: isEn ? ['Nitrogen issues', 'Pressure on farmers\' revenue models', 'Transition to sustainable agriculture'] : ['Stikstofproblematiek', 'Druk op verdienmodel boeren', 'Transitie naar duurzame landbouw'] },
            { title: isEn ? 'Bottlenecks:' : 'Knelpunten:', items: isEn ? ['Uncertain policy', 'Financial pressure on farmers', 'Space conflict (nature vs. production)'] : ['Onzeker beleid', 'Financiële druk op agrariërs', 'Ruimteconflict (natuur vs. productie)'] },
            { title: isEn ? 'What works:' : 'Wat werkt:', items: isEn ? ['Multifunctional land use', 'Agro-energy (solar, wind, storage)', 'New business models (energy + food)'] : ['Multifunctioneel landgebruik', 'Agro-energie (zon, wind, opslag)', 'Nieuwe businessmodellen (energie + voedsel)'] }
          ],
          inzicht: isEn ? 'Farmers are becoming potential energy producers and alternative partners.' : 'Boeren worden potentiële energieproducenten en gebiedspartners.'
        }
      },
      { 
        id: 'ruimte', 
        name: isEn ? '.SPACE' : '.RUIMTE', 
        icon: Map, 
        color: '#a855f7', 
        category: 'all',
        cardImage: 'https://image2url.com/r2/default/images/1775422353570-472d3821-1be5-41f6-8e2e-f147403a11ba.jpg',
        cardTitle: isEn ? 'Space' : 'Ruimte',
        cardText: isEn ? 'Extreme pressure on space, introduction of the Environment Act and the need for integrated trade-offs.' : 'Extreme druk op ruimte, introductie van de Omgevingswet en noodzaak tot integrale afwegingen.',
        buttonText: isEn ? 'Read more about Space' : 'Lees meer over Ruimte',
        details: {
          sections: [
            { title: isEn ? 'What is happening:' : 'Wat speelt er:', items: isEn ? ['Extreme pressure on space (housing, energy, nature, economy)', 'Introduction of the Environment Act', 'Need for integrated trade-offs'] : ['Extreme druk op ruimte (woningbouw, energie, natuur, economie)', 'Introductie van de Omgevingswet', 'Noodzaak tot integrale afwegingen'] },
            { title: isEn ? 'Bottlenecks:' : 'Knelpunten:', items: isEn ? ['Sectoral decision-making no longer works', 'Conflicting claims on the same space', 'Long procedures'] : ['Sectorale besluitvorming werkt niet meer', 'Conflicterende claims op dezelfde ruimte', 'Lange procedures'] },
            { title: isEn ? 'What works:' : 'Wat werkt:', items: isEn ? ['Integrated area development', 'Multiple land use', 'Energy-spatial planning'] : ['Integrale gebiedsontwikkeling', 'Meervoudig ruimtegebruik', 'Energieplanologie'] }
          ],
          inzicht: isEn ? 'Space is scarce → combining becomes the standard.' : 'Ruimte is schaars → combineren wordt de standaard.'
        }
      },
      { 
        id: 'klimaat', 
        name: isEn ? '.CLIMATE & WATER' : '.KLIMAAT & WATER', 
        icon: Droplets, 
        color: '#06b6d4', 
        category: 'all',
        cardImage: 'https://image2url.com/r2/default/images/1775412666397-722cb618-e089-4e00-850f-ee0ae2e1d07f.jpg',
        cardTitle: isEn ? 'Climate and Water' : 'Klimaat en Water',
        cardText: isEn ? 'Sea level rise, extreme weather and heat stress in cities.' : 'Zeespiegelstijging, extreem weer en hittestress in steden.',
        buttonText: isEn ? 'Read more about Climate' : 'Lees meer over Klimaat',
        details: {
          sections: [
            { title: isEn ? 'What is happening:' : 'Wat speelt er:', items: isEn ? ['Sea level rise', 'Extreme weather (drought + peak showers)', 'Heat stress in cities'] : ['Zeespiegelstijging', 'Extreem weer (droogte + piekbuien)', 'Hittestress in steden'] },
            { title: isEn ? 'Bottlenecks:' : 'Knelpunten:', items: isEn ? ['Outdated systems (sewerage, water management)', 'Lack of space for water', 'Costs of adaptation'] : ['Verouderde systemen (riolering, waterbeheer)', 'Gebrek aan ruimte voor water', 'Kosten van adaptatie'] },
            { title: isEn ? 'What works:' : 'Wat werkt:', items: isEn ? ['Water-retaining neighborhoods', 'Climate-adaptive construction', 'Green-blue structures'] : ['Waterbergende wijken', 'Klimaatadaptief bouwen', 'Groen-blauwe structuren'] }
          ],
          inzicht: isEn ? 'Water is becoming a guiding principle in spatial choices.' : 'Water wordt een leidend principe in ruimtelijke keuzes.'
        }
      },
      { 
        id: 'digitaal', 
        name: isEn ? '.DIGITAL TRANSITION' : '.DIGITALE TRANSITIE', 
        icon: Network, 
        color: '#f97316', 
        category: 'all',
        cardImage: 'https://image2url.com/r2/default/images/1775424903472-714ea6c8-30c5-4c07-8289-8b3768550477.png',
        cardTitle: isEn ? 'Digital Transition' : 'Digitale Transitie',
        cardText: isEn ? 'Explosive data growth, digitization of physical systems and the rise of AI.' : 'Explosive datagroei, digitalisering van fysieke systemen en opkomst van AI.',
        buttonText: isEn ? 'Read more about Digital' : 'Lees meer over Digitaal',
        details: {
          sections: [
            { title: isEn ? 'What is happening:' : 'Wat speelt er:', items: isEn ? ['Explosive data growth (AI, IoT, platforms)', 'Digitization of physical systems (smart grids, buildings)', 'Platformization of the economy', 'Rise of AI in decision-making'] : ['Explosieve datagroei (AI, IoT, platforms)', 'Digitalisering van fysieke systemen (smart grids, smart buildings)', 'Platformisering van de economie', 'Opkomst van AI in besluitvorming'] },
            { title: isEn ? 'Bottlenecks:' : 'Knelpunten:', items: isEn ? ['Energy use of digital infra (data centers, AI)', 'Fragmented data & systems (silos)', 'Cybersecurity & dependence', 'Shortage of digital capacity'] : ['Energiegebruik digitale infrastructuur (datacenters, AI)', 'Versnipperde data & systemen (silo\'s)', 'Cybersecurity & afhankelijkheid', 'Tekort aan digitale capaciteit'] },
            { title: isEn ? 'What works:' : 'Wat werkt:', items: isEn ? ['Data platforms at the area level', 'Digital twins (simulating scenarios)', 'AI-driven optimization', 'Open standards & connections (APIs)'] : ['Data-platformen op gebiedsniveau', 'Digital twins (simuleren van scenario\'s)', 'AI-gestuurde optimalisatie', 'Open standaarden & koppelingen (API\'s)'] }
          ],
          inzicht: isEn ? 'The digital transition shifts value from physical assets to data and systems control.' : 'De digitale transitie verschuift waarde van fysieke assets naar data en regie over systemen.'
        }
      },
      { 
        id: 'kern', 
        name: isEn ? '.THE CORE' : '.DE KERN', 
        icon: Network, 
        color: '#fbbf24', 
        category: 'all',
        cardImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
        cardTitle: isEn ? 'Everything is connected' : 'Alles hangt samen',
        cardText: isEn ? 'The real challenge is not in one transition, but in the combination of all factors.' : 'De echte uitdaging zit niet in één transitie, maar in de combinatie van alle factoren.',
        buttonText: isEn ? 'Read more about The Core' : 'Lees meer over De Kern',
        details: {
          sections: [
            { title: isEn ? 'The real challenge is the combination:' : 'De echte uitdaging zit niet in één transitie, maar in de combinatie:', items: isEn ? ['Housing ↔ energy (no grid = no houses)', 'Mobility ↔ energy (charging = peak load)', 'Agriculture ↔ space ↔ energy', 'Climate ↔ area design'] : ['Woningbouw ↔ energie (geen net = geen woningen)', 'Mobiliteit ↔ energie (laden = piekbelasting)', 'Landbouw ↔ ruimte ↔ energie', 'Klimaat ↔ inrichting van gebieden'] },
            { title: isEn ? 'The Netherlands is shifting from:' : 'Nederland verschuift van:', items: isEn ? ['Sectoral thinking → systems thinking', 'Optimulating per domain → integrating systems', 'Growth → system awareness'] : ['Sectoraal denken → systeemdenken', 'Optimaliseren per domein → integreren van systemen', 'Groei → systeem bewust'] }
          ],
          inzicht: isEn ? 'The winner of the next 10 years is the one who can connect and renew systems.' : 'De winnaar van de komende 10 jaar is niet de beste bouwer of energiepartij, maar degene die systemen kan verbinden en vernieuwen.'
        }
      }
    ]
  };
};

const DivisionPage = ({ division, t, lang, onToggleLang, onBack }: { division: any, t: any, lang: 'nl' | 'en', onToggleLang: () => void, onBack: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col md:flex-row bg-black text-white overflow-y-auto md:overflow-hidden touch-pan-y"
    >
      {/* 
        To make natural scrolling work on mobile without flex-col-reverse bugs,
        we structure it normally (flex-col) and use CSS 'order' to put the Image
        on top on mobile, and the Content on the left on desktop.
      */}

      {/* Content Side */}
      <div
        className="order-2 md:order-1 w-full md:w-1/2 h-max min-h-[60vh] md:min-h-0 md:h-full relative flex flex-col p-8 pt-12 md:p-12 lg:p-16 shrink-0 md:shrink"
        style={{ backgroundColor: division.color }}
      >
        {/* Logo */}
        <div className="cursor-pointer z-20 inline-block w-fit group mb-6 md:mb-8" onClick={onBack}>
          <div className="text-2xl md:text-3xl font-heading font-bold tracking-tighter flex items-center text-black group-hover:opacity-80 transition-opacity">
            {t.logo1}<span className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full ml-0.5 mt-1 shadow-sm"></span>
          </div>
          <div className="text-[10px] md:text-xs font-sans font-bold tracking-[0.2em] mt-0.5 text-black group-hover:opacity-80 transition-opacity">{t.logo2}</div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col z-20 max-w-xl overflow-visible md:overflow-y-auto pr-0 md:pr-4 custom-scrollbar text-black pb-12 md:pb-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] tracking-tighter mb-6 md:mb-8"
          >
            {division.cardTitle}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            {division.details.sections.map((section: any, idx: number) => (
              <div key={idx}>
                <h3 className="font-heading font-bold text-lg md:text-xl mb-3 tracking-tight">{section.title}</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {section.items.map((item: string, i: number) => (
                    <li key={i} className="text-black/80 font-medium text-sm md:text-base leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="mt-8 p-5 md:p-6 bg-black/5 rounded-2xl border border-black/10 backdrop-blur-sm">
              <h3 className="font-heading font-bold text-lg md:text-xl mb-3 flex items-center gap-2 tracking-tight">
                {t.insightTitle}
              </h3>
              <p className="text-black/90 font-medium italic text-base md:text-lg leading-relaxed">
                {division.details.inzicht}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Left Half Circle (Desktop Only) */}
        <div
          className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] rounded-full pointer-events-none z-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0) 70%)'
          }}
        />
      </div>

      {/* Right Side (Image + Nav) */}
      <div className="order-1 md:order-2 w-full md:w-1/2 h-[45vh] min-h-[300px] md:h-full relative shrink-0">
        <img src={division.cardImage} alt={division.name} className="absolute inset-0 w-full h-full object-cover" />

        {/* Top Nav */}
        <div className="absolute top-0 left-0 right-0 p-6 md:p-12 flex justify-end gap-2 md:gap-4 z-20 items-center">
          <button 
            onClick={onBack} 
            className="px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-white/20 bg-[#0a0f1a]/60 hover:bg-[#0a0f1a]/80 backdrop-blur-md hover:border-white/40 transition-all font-sans font-medium text-xs md:text-sm text-white/90 hover:text-white shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-1.5 md:gap-2 mr-auto"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">{t.backToHome}</span>
            <span className="sm:hidden">Terug</span>
          </button>
          <button
            onClick={onToggleLang}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 bg-[#0a0f1a]/60 hover:bg-[#0a0f1a]/80 backdrop-blur-md hover:border-white/40 transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center justify-center z-50 mix-blend-normal"
            title={lang === 'nl' ? 'Switch to English' : 'Schakel over naar Nederlands'}
          >
            <Globe className="w-4 h-4 md:w-5 md:h-5 text-white/90" />
            <span className="sr-only">Toggle Language</span>
          </button>
          <a 
            href="https://www.vovon.nl" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-white/20 bg-[#0a0f1a]/60 hover:bg-[#0a0f1a]/80 backdrop-blur-md hover:border-white/40 transition-all font-sans font-medium text-xs md:text-sm text-white/90 hover:text-white shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-1.5 md:gap-2"
          >
            {t.contact}
            <svg width="12" height="12" className="md:w-[14px] md:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>

        {/* Right Half Circle Overlay (Desktop Only) */}
        <div
          className="hidden md:block absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] rounded-full pointer-events-none z-10"
          style={{
            backgroundColor: division.color,
            opacity: 0.5,
            mixBlendMode: 'multiply'
          }}
        />
        
        {/* Mobile Gradient Overlay */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t pointer-events-none" style={{ 
          background: `linear-gradient(to top, ${division.color} 0%, transparent 100%)`
        }} />
      </div>
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState<'nl' | 'en'>('nl');
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  const t = getTranslation(lang);
  const divisions = t.divisions;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    setHoveredDivision(id);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setHoveredDivision(null);
    }, 400);
  };

  const hoveredDivData = divisions.find(d => d.id === hoveredDivision);
  const selectedDivData = divisions.find(d => d.id === selectedDivision);
  const activeDivData = hoveredDivData || selectedDivData;
  const glowColor = activeDivData ? activeDivData.color : '#3b82f6';

  return (
    <>
      <AnimatePresence mode="wait">
        {activePageId === null ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[#02040a] text-white font-sans overflow-hidden relative selection:bg-blue-500/30"
          >
            <StarryBackground />


      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto px-6 py-8 md:py-12">
        
        {/* Top Left Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl mb-8 lg:mb-0 lg:absolute lg:top-12 lg:left-0 z-50 pr-24 lg:pr-0 mt-8 lg:mt-0 pointer-events-none"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold leading-tight tracking-tighter mb-4 lg:mb-6 whitespace-nowrap pointer-events-auto mt-6 lg:mt-0">
            {t.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{t.titleHighlight}</span>
          </h1>
          <p className="text-white/70 text-xs md:text-sm leading-relaxed font-medium max-w-md cursor-default pointer-events-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Top Right Contact/Language Links */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="absolute top-6 right-6 lg:top-12 lg:right-6 xl:right-0 z-50 flex justify-end items-center gap-2 lg:gap-3"
        >
          <button
            onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center pointer-events-auto z-50"
            title={lang === 'nl' ? 'Switch to English' : 'Schakel over naar Nederlands'}
          >
            <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-white/90" />
            <span className="sr-only">Toggle Language</span>
          </button>
          <a
            href="https://www.vovon.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 lg:px-6 lg:py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all font-sans font-medium text-xs lg:text-sm text-white/90 hover:text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] inline-flex items-center gap-1.5 lg:gap-2 pointer-events-auto"
          >
            {t.contact}
            <svg width="12" height="12" className="lg:w-[14px] lg:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center mt-2 lg:mt-0 pt-8 lg:pt-0">
          
          {/* Left Column with Star */}
          <div className="hidden lg:flex lg:col-span-3 justify-center items-center relative h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute right-12 bottom-[20%] cursor-pointer group"
              onClick={() => setActivePageId('kern')}
            >
              {/* Star Glow */}
              <div className="absolute inset-0 bg-yellow-400/30 blur-xl rounded-full scale-150 group-hover:bg-yellow-400/50 transition-colors duration-500" />
              <div className="absolute inset-0 bg-yellow-200/50 blur-md rounded-full scale-110 group-hover:bg-yellow-200/70 transition-colors duration-500" />
              
              {/* Star Core */}
              <div className="relative w-4 h-4 bg-white rounded-full shadow-[0_0_20px_6px_rgba(250,204,21,0.6)] group-hover:shadow-[0_0_30px_10px_rgba(250,204,21,0.8)] transition-shadow duration-500 flex items-center justify-center">
                <div className="w-full h-[1.5px] bg-white absolute rotate-45 scale-150 blur-[1px]" />
                <div className="w-full h-[1.5px] bg-white absolute -rotate-45 scale-150 blur-[1px]" />
              </div>

              {/* Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                <span className="text-yellow-200 font-heading font-bold tracking-widest text-sm drop-shadow-md">{t.coreTooltip}</span>
              </div>
            </motion.div>
          </div>

          {/* Center Globe */}
          <div className="lg:col-span-6 flex justify-center items-center relative z-10 h-[480px] lg:h-[700px] mt-0 lg:mt-0 lg:ml-0 pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute lg:relative w-[160%] lg:w-[110%] max-w-[700px] aspect-square rounded-full -left-[90%] lg:left-0 -top-[5%] lg:top-0"
            >
              {/* Globe Image */}
              <div className="absolute inset-0 rounded-full overflow-hidden relative">
                <motion.img 
                  src="https://image2url.com/r2/default/images/1775378377279-d3e53349-fd3c-4e8d-be7c-44eedf7f115f.png" 
                  alt="Earth" 
                  className="w-full h-full object-cover scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Right-side color gradient overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to left, ${glowColor}90 0%, ${glowColor}00 50%)`,
                    opacity: activeDivData ? 1 : 0,
                    mixBlendMode: 'screen'
                  }}
                />
              </div>
            </motion.div>

            {/* Hover Card */}
            <AnimatePresence>
              {selectedDivData && (
                <motion.div
                  initial={{ opacity: 0, x: -20, y: "-50%", scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
                  exit={{ opacity: 0, x: -20, y: "-50%", scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute right-1/2 top-1/2 w-[85vw] max-w-[500px] h-[280px] bg-[#0a0f1a]/60 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden flex shadow-2xl z-[100] pointer-events-auto"
                >
                  {/* Left Image */}
                  <div className="w-2/5 h-full relative">
                    <img 
                      src={selectedDivData.cardImage} 
                      alt={selectedDivData.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0f1a]/60" />
                  </div>

                  {/* Right Content */}
                  <div className="w-3/5 p-6 flex flex-col relative">
                    <button 
                      className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                      onClick={() => setSelectedDivision(null)}
                    >
                      <X size={16} />
                    </button>
                    
                    <h3 className="text-xl font-heading font-bold mb-3 pr-6 tracking-tight">{selectedDivData.cardTitle}</h3>
                    <p className="text-sm text-white/80 leading-relaxed mb-auto font-medium">
                      {selectedDivData.cardText}
                    </p>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePageId(selectedDivData.id);
                      }}
                      className="mt-4 py-2.5 px-4 rounded-full text-sm font-bold tracking-wide transition-transform hover:scale-105 active:scale-95"
                      style={{ 
                        backgroundColor: selectedDivData.color,
                        color: '#02040a'
                      }}
                    >
                      {selectedDivData.buttonText}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Divisions List */}
          <div className="absolute top-0 bottom-0 right-4 lg:right-0 lg:static lg:col-span-3 flex flex-col justify-center gap-7 lg:gap-4 z-20 pointer-events-none lg:pointer-events-auto items-end lg:items-start lg:pl-8 pt-24 lg:pt-0">
            <AnimatePresence mode="popLayout">
              {divisions.filter(d => d.id !== 'kern').map((div, index, filteredDivs) => {
                const Icon = div.icon;
                const isHovered = hoveredDivision === div.id;
                const isSelected = selectedDivision === div.id;
                const isActive = isHovered || isSelected;
                
                // Curve logic - we use smaller curve on mobile
                const middleIndex = (filteredDivs.length - 1) / 2;
                const distance = Math.abs(index - middleIndex);
                const curveOffset = Math.pow(distance, 2) * (isMobile ? 6 : 12);
                
                return (
                  <motion.div
                    key={div.id}
                    layout
                    initial={{ opacity: 0, x: isMobile ? 50 : 50 + curveOffset }}
                    animate={{ opacity: 1, x: isMobile ? -curveOffset : curveOffset }}
                    exit={{ opacity: 0, x: isMobile ? 50 : 50 + curveOffset, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onMouseEnter={() => handleMouseEnter(div.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setSelectedDivision(div.id)}
                    className="flex items-center gap-3 lg:gap-4 group cursor-pointer h-10 lg:h-12 pointer-events-auto flex-row lg:flex-row"
                  >
                    <div 
                      className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-300 bg-[#02040a]/50 backdrop-blur-md ${isActive ? 'w-10 h-10 lg:w-12 lg:h-12' : 'w-8 h-8'}`}
                      style={{
                        borderColor: isActive ? div.color : 'rgba(255,255,255,0.6)',
                        boxShadow: isActive ? `0 0 20px ${div.color}40, inset 0 0 10px ${div.color}20` : 'none',
                      }}
                    >
                      {/* Small colored accent dot */}
                      <div 
                        className={`absolute -top-1 -left-1 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${isActive ? 'w-4 h-4 text-[10px]' : 'w-3 h-3 text-[8px]'}`}
                        style={{ 
                          backgroundColor: '#02040a',
                          color: div.color,
                        }}
                      >
                        +
                      </div>

                      <Icon 
                        size={isActive ? 18 : 14} 
                        strokeWidth={1.5}
                        className="transition-all duration-300"
                        style={{ color: isActive ? div.color : 'white' }}
                      />
                    </div>
                    <span 
                      className={`font-heading font-semibold tracking-wider transition-all duration-300 ${isActive ? 'text-sm md:text-lg' : 'text-[10px] md:text-sm'} drop-shadow-md`}
                      style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.8)' }}
                    >
                      {div.name}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
      ) : (
        <DivisionPage
          key="division"
          division={divisions.find(d => d.id === activePageId)!}
          t={t}
          lang={lang}
          onToggleLang={() => setLang(lang === 'nl' ? 'en' : 'nl')}
          onBack={() => setActivePageId(null)}
        />
      )}
    </AnimatePresence>
    </>
  );
}
