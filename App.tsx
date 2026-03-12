import React, { useState, useEffect } from 'react';
import zeckmontadorImage from './src/assets/zeckmontador.png';
import mariliaImage from './src/assets/marilia-sp.png';
import logoZeckLarImage from './src/assets/logo-zecklar.png';
import { 
  Phone, 
  CheckCircle, 
  Wrench, 
  Truck, 
  Clock, 
  Star, 
  Menu, 
  X, 
  MapPin, 
  ShieldCheck, 
  Hammer,
  ArrowRight,
  Facebook,
  Instagram,
  Briefcase,
  Sofa,
  Monitor,
  BedDouble,
  Box
} from 'lucide-react';

// --- Constants & Types ---

const WHATSAPP_NUMBER = "5514997043527"; 
const WHATSAPP_MSG = "Olá, gostaria de um orçamento para montagem de móveis.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

const NAV_LINKS = [
  { name: 'Início', href: '#home' },
  { name: 'Serviços', href: '#services' },
  { name: 'Sobre', href: '#about' },
  { name: 'Depoimentos', href: '#testimonials' },
  { name: 'Trabalhe Conosco', href: '#careers' },
  { name: 'FAQ', href: '#faq' },
];

const SERVICES = [
  {
    title: "Guarda-Roupas e Closets",
    description: "Montagem precisa de portas de correr, gavetas e prateleiras. Nivelamento perfeito para evitar emperramentos.",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=800&auto=format&fit=crop",
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    title: "Cozinhas Planejadas",
    description: "Instalação técnica de armários aéreos, balcões e nichos. Fixação reforçada e recortes para encanamento.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop",
    icon: <Hammer className="w-5 h-5" />
  },
  {
    title: "Painéis e Home Theater",
    description: "Montagem e fixação segura de painéis para TV, racks e estantes na sala de estar, escondendo a fiação.",
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=800&auto=format&fit=crop",
    icon: <Monitor className="w-5 h-5" />
  },

  {
    title: "Camas e Cabeceiras",
    description: "Montagem de camas box, baú, beliches e fixação de cabeceiras estofadas ou de madeira.",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop",
    icon: <BedDouble className="w-5 h-5" />
  },
  {
    title: "Móveis de Escritório",
    description: "Montagem de escrivaninhas, mesas em L, cadeiras e arquivos para seu home office ou empresa.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    icon: <Wrench className="w-5 h-5" />
  }
];

const DIFFERENTIALS = [
  {
    title: "Pontualidade Rigorosa",
    desc: "Respeitamos seu tempo. Chegamos no horário combinado.",
    icon: <Clock className="w-5 h-5 text-white" />
  },
  {
    title: "Limpeza e Organização",
    desc: "Deixamos o ambiente limpo após o serviço. Sem bagunça.",
    icon: <CheckCircle className="w-5 h-5 text-white" />
  },
  {
    title: "Garantia do Serviço",
    desc: "3 meses de garantia em todas as montagens realizadas.",
    icon: <ShieldCheck className="w-5 h-5 text-white" />
  },
  {
    title: "Preço Justo",
    desc: "Qualidade premium com valores acessíveis para Marília.",
    icon: <Star className="w-5 h-5 text-white" />
  }
];

const TESTIMONIALS = [
  {
    name: "Ana Cláudia",
    location: "Jardim Tropical, Marília",
    text: "O melhor montador de móveis em Marília que já contratei. Montou meu guarda-roupa enorme super rápido e ficou perfeito. Recomendo!",
    stars: 5
  },
  {
    name: "Roberto Silva",
    location: "Centro, Marília",
    text: "Profissionalismo nota 10. Precisava de uma desmontagem de móveis urgente para mudança e a equipe ZECK LAR me atendeu prontamente.",
    stars: 5
  },
  {
    name: "Mariana Souza",
    location: "Esmeralda, Marília",
    text: "Montagem de cozinha impecável. Alinharam todas as portas e gavetas. O acabamento ficou ótimo. Serviço premium mesmo.",
    stars: 5
  }
];

const FAQS = [
  {
    q: "Vocês atendem em quais bairros de Marília?",
    a: "Atendemos em todos os bairros de Marília – SP e também em cidades vizinhas da região. Entre em contato para consultar a taxa de deslocamento para outras cidades."
  },
  {
    q: "Como é feito o orçamento?",
    a: "O orçamento é feito via WhatsApp. Basta nos enviar uma foto do móvel ou o link da loja onde comprou. É rápido e sem compromisso."
  },
  {
    q: "Vocês dão garantia na montagem?",
    a: "Sim! Oferecemos garantia de 90 dias (3 meses) sobre a mão de obra da montagem, garantindo sua total segurança e satisfação."
  },
  {
    q: "Fazem instalação de suporte de TV e cortinas?",
    a: "Sim, além da montagem de móveis, realizamos pequenas instalações residenciais como suportes de TV, cortinas, prateleiras e quadros."
  }
];

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'white' | 'dark' | 'whatsapp' }) => {
  // Reduced padding (px-6 py-2.5) and adjusted font size (text-xs md:text-sm) for a more compact premium look
  const baseStyle = "inline-flex items-center justify-center px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-md text-xs md:text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-zeck-orange to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/40 border border-transparent",
    outline: "border-2 border-zeck-orange text-zeck-orange hover:bg-zeck-orange hover:text-white",
    white: "bg-white text-zeck-brown hover:bg-gray-100 shadow-lg",
    dark: "bg-zeck-brown text-white hover:bg-gray-800",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-lg shadow-green-500/40 border border-transparent"
  };

  if (props.type === 'submit' || props.onClick) {
     return (
       <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
         {children}
       </button>
     );
  }

  return (
    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
      <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    </a>
  );
};

const SectionTitle = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  // Reduced bottom margin (mb-10) and title size (text-2xl md:text-3xl)
  <div className="text-center mb-10 max-w-2xl mx-auto px-4">
    <span className={`text-xs font-bold tracking-widest uppercase ${light ? 'text-orange-300' : 'text-zeck-orange'} mb-2 block`}>
      {subtitle}
    </span>
    <h2 className={`text-2xl md:text-3xl font-bold ${light ? 'text-white' : 'text-zeck-brown'}`}>
      {title}
    </h2>
    <div className={`h-1 w-16 mx-auto mt-4 rounded-full ${light ? 'bg-orange-400' : 'bg-zeck-orange'}`}></div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Career Form State
  const [careerFormStatus, setCareerFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [careerFormData, setCareerFormData] = useState({
    name: '',
    phone: '',
    city: '',
    experience: '',
    plannedFurniture: '',
    about: '',
    availability: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 90; // Slightly smaller offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setMobileMenuOpen(false);
    }
  };

  const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCareerFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCareerFormStatus('submitting');

    try {
      const formData = new FormData();
      Object.entries(careerFormData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const response = await fetch('enviar.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setCareerFormStatus('success');
        setCareerFormData({
          name: '',
          phone: '',
          city: '',
          experience: '',
          plannedFurniture: '',
          about: '',
          availability: ''
        });
      } else {
        setCareerFormStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setCareerFormStatus('error');
    }
  };

  return (
    <div className="font-sans text-gray-600">
      
      {/* Navigation */}
      {/* Reduced py-4 for a sleeker nav */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
             {/* Logo Text - slightly smaller */}
            <div className={`font-bold text-xl md:text-2xl tracking-tighter ${isScrolled ? 'text-zeck-brown' : 'text-zeck-brown md:text-zeck-brown'}`}>
              ZECK <span className="text-zeck-orange">LAR</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-medium text-gray-700 hover:text-zeck-orange transition-colors uppercase tracking-wide cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <Button className="!px-5 !py-2 !text-[10px] md:!text-xs">
              Orçamento WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-zeck-brown"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl py-4 px-6 flex flex-col space-y-3 md:hidden border-t border-gray-100">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-gray-800 text-sm font-medium py-2 border-b border-gray-100 hover:text-zeck-orange cursor-pointer"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <Button className="w-full mt-2 !text-xs">
              Solicitar Orçamento
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {/* Reduced vertical padding (pt-28 pb-16) and text sizes */}
      <header id="home" className="relative pt-28 pb-16 md:pt-40 md:pb-24 bg-zeck-light overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-orange-100 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-gray-200 opacity-50 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-zeck-orange text-[10px] font-bold uppercase tracking-wider mb-4">
                <MapPin size={12} /> Atendendo Marília - SP e Região
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-zeck-brown leading-tight mb-4">
                Montagem de Móveis
                <span className="text-zeck-orange block">Profissional & Premium</span>
              </h1>
              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed max-w-lg mx-auto md:mx-0">
                Especialistas em transformar ambientes. Montagem de guarda-roupa, cozinhas e desmontagem de móveis em Marília com pontualidade, limpeza e preço justo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button className="!px-6 !py-3 shadow-xl shadow-orange-500/20">
                  <Phone className="w-4 h-4 mr-2" />
                  Fazer Orçamento Agora
                </Button>
                <Button 
                  variant="outline"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="!px-6 !py-3"
                >
                  Ver Nossos Serviços
                </Button>
              </div>
              
              <div className="mt-8 flex items-center justify-center md:justify-start gap-4 text-xs md:text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span>4.9/5 Avaliações</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-green-500" />
                  <span>Garantia de 3 Meses</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 w-full relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={zeckmontadorImage} 
                  alt="Montador de móveis profissional em Marília SP montando um guarda-roupa" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <p className="font-bold text-base">Acabamento Impecável</p>
                  <p className="text-xs opacity-90">Cuidado em cada detalhe do seu móvel.</p>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce hidden md:flex">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <CheckCircle className="text-green-600 w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Disponibilidade</p>
                  <p className="text-zeck-brown font-bold text-sm">Agenda Aberta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Differentials Strip */}
      {/* Reduced py-8, gap-6, and font sizes */}
      <section className="bg-zeck-brown py-8 relative -mt-4 z-20 shadow-xl mx-4 md:mx-0 rounded-xl md:rounded-none">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIFFERENTIALS.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-white/90">
                <div className="p-2.5 bg-white/10 rounded-lg backdrop-blur-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm md:text-base mb-0.5">{item.title}</h3>
                  <p className="text-xs text-white/70 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / SEO Section */}
      {/* Reduced py-16, gap-10, text-2xl heading */}
      <section id="about" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-1/2 relative">
               {/* Updated Image with Hero Styling */}
              <div className="relative rounded-xl overflow-hidden shadow-xl border-4 border-white">
                <img 
                  src={mariliaImage}
                  alt="Zeck Lar em Marília-SP" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-zeck-orange font-bold tracking-widest uppercase text-xs mb-2 block">Sobre a ZECK LAR</span>
              <h2 className="text-2xl md:text-3xl font-bold text-zeck-brown mb-4">
                Referência em Montagem de Móveis em Marília – SP
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                A <strong>ZECK LAR</strong> nasceu com a missão de elevar o padrão de serviços de montagem na região. Sabemos que comprar um móvel novo é a realização de um sonho, e a montagem é a etapa final para concretizá-lo.
              </p>
              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                Nossa equipe é formada por <strong>montadores profissionais em Marília SP</strong>, treinados para lidar com todos os tipos de móveis: desde complexos guarda-roupas com portas de correr até cozinhas planejadas moduladas. Utilizamos ferramentas modernas e técnicas que garantem a durabilidade do seu bem.
              </p>
              
              <ul className="space-y-3 mb-6">
                {[
                  "Atendimento em toda Marília e cidades vizinhas",
                  "Ferramentas profissionais para evitar danos",
                  "Experiência com as principais marcas do mercado"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle className="text-zeck-orange w-4 h-4 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* Reduced py-16. Cards height reduced to h-80, padding p-6, font sizes smaller. */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionTitle 
            subtitle="O Que Fazemos" 
            title="Soluções Completas para Seu Lar" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden shadow-lg h-80 cursor-pointer transform hover:-translate-y-2 transition-all duration-300">
                {/* Image Background */}
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zeck-brown via-black/50 to-transparent opacity-90 transition-opacity group-hover:opacity-80"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="bg-zeck-orange w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 shadow-lg">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {service.title}
                  </h3>
                  
                  <div className="h-0.5 w-8 bg-zeck-orange mb-3 rounded-full"></div>
                  
                  <p className="text-gray-200 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {service.description}
                  </p>
                  
                  <div className="mt-3 flex items-center text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                    <span className="mr-2">Solicitar Orçamento</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button>
              <Phone className="w-4 h-4 mr-2" />
              VER TODOS OS SERVIÇOS
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      {/* Reduced padding py-12, font sizes */}
      <section className="py-12 bg-zeck-orange text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Precisa montar um móvel hoje?</h2>
          <p className="text-base text-white/90 max-w-2xl mx-auto mb-6">
            Não arrisque estragar seu móvel novo. Contrate um especialista da ZECK LAR e tenha tranquilidade total. Atendemos Marília e região com agilidade.
          </p>
          <Button variant="whatsapp" className="shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
            <Phone className="w-4 h-4 mr-2 text-white" />
            Chamar no WhatsApp
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      {/* Reduced padding py-16, gap-6, internal padding p-6 */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle 
            subtitle="Depoimentos" 
            title="O Que Nossos Clientes Dizem" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm relative">
                <div className="text-zeck-orange mb-3 flex">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                     <img src={`https://picsum.photos/100/100?random=${10+idx}`} alt="Cliente" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zeck-brown text-sm">{t.name}</h4>
                    <span className="text-[10px] text-gray-500 block">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK WITH US SECTION */}
      {/* Reduced py-16, padding p-8, smaller form inputs */}
      <section id="careers" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionTitle 
            subtitle="Oportunidade" 
            title="Faça Parte da Equipe ZECK LAR" 
          />
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
            {/* Info Side */}
            <div className="lg:w-2/5 bg-zeck-brown p-8 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-zeck-orange opacity-20 blur-2xl"></div>
              
              <div className="relative z-10">
                <img src={logoZeckLarImage} alt="Logo Zeck Lar" className="h-8 mb-4" />
                <h3 className="text-xl font-bold mb-3">Estamos Contratando</h3>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  Vaga para Montador de Móveis – com ou sem experiência.
                </p>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  Atuação em Marília e região.
                </p>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 mb-6">
                  <p className="text-xs text-zeck-orange font-semibold mb-1">Diferencial ZECK LAR</p>
                  <p className="text-xs text-white/70">
                    Treinamento completo oferecido pela ZECK LAR para formar profissionais de alto padrão.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-white/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-zeck-orange" /> Crescimento profissional
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-zeck-orange" /> Ambiente dinâmico
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-3/5 p-8">
              {careerFormStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-zeck-brown mb-2">Candidatura Enviada!</h3>
                  <p className="text-sm text-gray-600 mb-6">Recebemos seus dados com sucesso. Nossa equipe de RH analisará seu perfil e entrará em contato em breve.</p>
                  <Button variant="outline" onClick={() => setCareerFormStatus('idle')}>
                    Enviar outra candidatura
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleCareerSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Nome Completo <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        value={careerFormData.name}
                        onChange={handleCareerChange}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-zeck-orange focus:border-transparent outline-none transition-all"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Telefone / WhatsApp <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required
                        value={careerFormData.phone}
                        onChange={handleCareerChange}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-zeck-orange focus:border-transparent outline-none transition-all"
                        placeholder="(14) 99999-9999"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Cidade <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="city" 
                        required
                        value={careerFormData.city}
                        onChange={handleCareerChange}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-zeck-orange focus:border-transparent outline-none transition-all"
                        placeholder="Ex: Marília - SP"
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <label className="block text-xs font-medium text-gray-700 mb-2">Tem experiência com montagem?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input 
                            type="radio" 
                            name="experience" 
                            value="Sim" 
                            checked={careerFormData.experience === 'Sim'}
                            onChange={handleCareerChange}
                            className="w-3.5 h-3.5 text-zeck-orange focus:ring-zeck-orange" 
                          />
                          <span className="text-xs text-gray-600">Sim</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input 
                            type="radio" 
                            name="experience" 
                            value="Não" 
                            checked={careerFormData.experience === 'Não'}
                            onChange={handleCareerChange}
                            className="w-3.5 h-3.5 text-zeck-orange focus:ring-zeck-orange" 
                          />
                          <span className="text-xs text-gray-600">Não</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <label className="block text-xs font-medium text-gray-700 mb-2">Trabalhou com planejados?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input 
                            type="radio" 
                            name="plannedFurniture" 
                            value="Sim" 
                            checked={careerFormData.plannedFurniture === 'Sim'}
                            onChange={handleCareerChange}
                            className="w-3.5 h-3.5 text-zeck-orange focus:ring-zeck-orange" 
                          />
                          <span className="text-xs text-gray-600">Sim</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input 
                            type="radio" 
                            name="plannedFurniture" 
                            value="Não" 
                            checked={careerFormData.plannedFurniture === 'Não'}
                            onChange={handleCareerChange}
                            className="w-3.5 h-3.5 text-zeck-orange focus:ring-zeck-orange" 
                          />
                          <span className="text-xs text-gray-600">Não</span>
                        </label>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Disponibilidade</label>
                      <input 
                        type="text" 
                        name="availability" 
                        value={careerFormData.availability}
                        onChange={handleCareerChange}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-zeck-orange focus:border-transparent outline-none transition-all"
                        placeholder="Ex: Integral, Manhã, Tarde..."
                      />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Fale um pouco sobre você</label>
                      <textarea 
                        name="about" 
                        rows={3}
                        value={careerFormData.about}
                        onChange={handleCareerChange}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-zeck-orange focus:border-transparent outline-none transition-all resize-none"
                        placeholder="Conte brevemente sobre suas experiências anteriores ou por que deseja trabalhar conosco."
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Button 
                      type="submit" 
                      variant="dark" 
                      className="w-full"
                      disabled={careerFormStatus === 'submitting'}
                    >
                      {careerFormStatus === 'submitting' ? 'Enviando...' : 'ENVIAR CANDIDATURA'}
                    </Button>
                    {careerFormStatus === 'error' && (
                      <p className="text-red-500 text-xs mt-2 text-center">
                        Erro ao enviar. Por favor, tente novamente mais tarde.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* Reduced py-16, padding p-4, text sizes */}
      <section id="faq" className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionTitle 
            subtitle="Dúvidas Frequentes" 
            title="Perguntas Comuns" 
          />
          
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group bg-gray-50 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-zeck-brown group-hover:text-zeck-orange transition-colors">
                  <span className="text-sm md:text-base">{faq.q}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-gray-600 px-4 pb-4 leading-relaxed text-sm animate-fadeIn">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Reduced pt-12 pb-8, gap-8 */}
      <footer className="bg-zeck-brown text-white pt-12 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand */}
            <div>
              <div className="mb-4">
                <img src={logoZeckLarImage} alt="Logo Zeck Lar" className="h-8" />
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Sua melhor opção para montagem de móveis em Marília. Profissionalismo, qualidade premium e respeito pelo seu lar.
                <br/><br/>
                <span className="opacity-75">CNPJ: 157.804.378.66</span>
              </p>
              <div className="flex gap-3">
                {/* Social placeholders */}
                <a href="https://www.facebook.com/zecklar" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-zeck-orange transition-colors cursor-pointer">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/zecklar" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-zeck-orange transition-colors cursor-pointer">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-base mb-4 text-white">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-400 text-xs">
                <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-zeck-orange transition-colors cursor-pointer">Início</a></li>
                <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-zeck-orange transition-colors cursor-pointer">Serviços</a></li>
                <li><a href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')} className="hover:text-zeck-orange transition-colors cursor-pointer">Depoimentos</a></li>
                <li><a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="hover:text-zeck-orange transition-colors cursor-pointer">Perguntas Frequentes</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-base mb-4 text-white">Contato</h4>
              <ul className="space-y-3 text-gray-400 text-xs">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-zeck-orange flex-shrink-0" />
                  <span>Atendendo Marília - SP e toda região próxima</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-zeck-orange flex-shrink-0" />
                  <span>(14) 99704-3527</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zeck-orange flex-shrink-0" />
                  <span>Seg - Sáb: 08:00 - 18:00</span>
                </li>
              </ul>
            </div>

            {/* SEO Keywords Area (Hidden mostly but good for context) */}
            <div>
              <h4 className="font-bold text-base mb-4 text-white">Serviços Populares</h4>
              <div className="flex flex-wrap gap-1.5">
                {['Montagem de Guarda-Roupa', 'Montador em Marília', 'Instalação de Cozinha', 'Desmontagem de Móveis', 'Montador Profissional', 'Reparos de Móveis'].map((tag, i) => (
                  <span key={i} className="text-[10px] bg-white/5 px-2.5 py-1 rounded-full text-gray-400 border border-white/10 hover:border-zeck-orange hover:text-zeck-orange transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
            <p>&copy; {new Date().getFullYear()} ZECK LAR. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      {/* Reduced button size and container size */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center animate-bounce-slow"
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

    </div>
  );
};

export default App;