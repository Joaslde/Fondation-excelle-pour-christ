import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Music, Users, Heart, ChevronLeft, ChevronRight, Calendar, Clock, Mail, ArrowRight, BookOpen, Baby, Church, UserCheck, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { VerseCard } from "@/components/verse/VerseCard";
import { useToast } from "@/hooks/use-toast";
import type { Verse } from "@shared/schema";

const heroImages = [
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007054/477112229_610578731593220_4662935868068050667_n_nhhq43.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007049/480433428_613484304635996_36110986917296892_n_obqrwm.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007047/480242065_613484364635990_5047702027247346028_n_kqmy8w.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768568/photo_2025-12-26_18-01-34_coqlji.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768563/photo_2025-12-26_18-01-49_lt6oge.jpg",
];

const weeklyProgram = [
  { day: "Lundi", time: "18h00", activity: "Prière de groupe", description: "Intercession et louange" },
  { day: "Mercredi", time: "18h00", activity: "Étude biblique", description: "Approfondissement de la Parole" },
  { day: "Jeudi", time: "09h00 - 14h00", activity: "Programme de prière", description: "Grande manifestation de Dieu" },
  { day: "Vendredi", time: "18h00", activity: "Veillée de prière", description: "Nuit de consécration" },
  { day: "Samedi", time: "16h00", activity: "Répétition chorale", description: "Préparation du culte" },
  { day: "Dimanche", time: "09h00", activity: "Culte principal", description: "Adoration et enseignement" },
];

const upcomingEvents = [
  { title: "40 Jours de Jeûne", date: "1 Janvier - 9 Février 2026", type: "Programme spirituel" },
  { title: "Convention Annuelle", date: "15-17 Février 2026", type: "Événement majeur" },
  { title: "Camp de Jeunes", date: "Mars 2026", type: "Ministère Jeunesse" },
];

const blogPosts = [
  {
    title: "Mariage au sein de l'église",
    excerpt: "Découvrez les célébrations de mariage bénis par Dieu dans notre communauté...",
    date: "20 Déc 2025",
    category: "Mariage",
    icon: Heart,
    images: [
      "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767009920/480098564_611450778172682_6798617492885972987_n_klpftp.jpg",
      "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767009903/480630458_612061191444974_1348450523764156471_n_tyuihh.jpg",
    ],
  },
  {
    title: "Naissances et bénédictions",
    excerpt: "La joie de nouvelles vies bénies par le Seigneur dans notre famille spirituelle...",
    date: "18 Déc 2025",
    category: "Naissances",
    icon: Baby,
    images: [
      "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767009906/480876331_612825628035197_639909860806576304_n_sxq1sh.jpg",
      "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767010066/515436188_715016531149439_4803492833574481698_n_tyxzxj.jpg",
    ],
  },
  {
    title: "Baptêmes",
    excerpt: "Les moments sacrés de baptême célébrant l'engagement envers Christ...",
    date: "15 Déc 2025",
    category: "Baptême",
    icon: Church,
    images: [
      "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768563/photo_2025-12-26_18-01-14_ewh6tz.jpg",
    ],
  },
  {
    title: "Ministère Jeunesse",
    excerpt: "Les activités et moments forts de nos jeunes engagés pour Christ...",
    date: "12 Déc 2025",
    category: "Jeunesse",
    icon: Users,
    images: [
      "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767009905/480332077_612675714716855_7610465832913779808_n_ayirqs.jpg",
      "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767010101/480425430_613484047969355_6196918662763288291_n_rualw1.jpg",
    ],
  },
  {
    title: "Ados et Enfants",
    excerpt: "L'épanouissement spirituel de nos plus jeunes dans la foi...",
    date: "10 Déc 2025",
    category: "Enfants",
    icon: UserCheck,
    images: [
      "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767010068/518273622_723016867016072_681193536579697104_n_bv3db1.jpg",
      "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767010057/480495171_613484371302656_8396054715167267095_n_szblns.jpg",
    ],
  },
];

const missionItems = [
  {
    title: "Adoration",
    description: "Vivre des moments de louange authentiques et profonds, connectés à la présence divine.",
    icon: Music,
  },
  {
    title: "Communauté",
    description: "Créer des liens forts et durables au sein d'une famille spirituelle aimante.",
    icon: Users,
  },
  {
    title: "Service",
    description: "Impacter positivement notre société à travers des actions concrètes et bienveillantes.",
    icon: Heart,
  },
];

export default function Home() {
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [isLoadingVerse, setIsLoadingVerse] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const verseRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const getRandomVerse = useCallback(async () => {
    setIsLoadingVerse(true);
    try {
      const response = await fetch("/api/verse/random");
      if (!response.ok) throw new Error("Failed to fetch verse");
      const verse = await response.json();
      setCurrentVerse(verse);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le verset. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingVerse(false);
    }
  }, [toast]);

  const closeVerse = () => {
    setCurrentVerse(null);
  };

  const downloadVerse = useCallback(async () => {
    if (!currentVerse) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const element = verseRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        backgroundColor: "#011C40",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `verset-${currentVerse.reference.replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast({
        title: "Téléchargement réussi",
        description: "Votre verset a été téléchargé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement.",
        variant: "destructive",
      });
    }
  }, [currentVerse, toast]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubscribing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubscribing(false);
    setNewsletterEmail("");
    toast({
      title: "Inscription réussie !",
      description: "Vous recevrez nos enseignements chaque matin.",
    });
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <img
              src={heroImages[currentImageIndex]}
              alt="Excelle pour Christ"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-[#011C40]/95 via-[#011C40]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#011C40]/90" />

        <div className="relative z-10 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.span
                className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Bienvenue chez nous
              </motion.span>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6"
                data-testid="text-hero-title"
              >
                <span className="text-white">Excelle pour</span>
                <br />
                <span className="text-gradient-gold">Christ International</span>
              </h1>

              <p
                className="text-lg text-white/70 mb-8 max-w-lg"
                data-testid="text-hero-subtitle"
              >
                Une oeuvre de foi, un espace de prière, d'écoute et d'amour où chacun peut reprendre souffle et rencontrer Dieu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 gold-glow-hover group"
                    onClick={getRandomVerse}
                    disabled={isLoadingVerse}
                    data-testid="button-draw-verse"
                  >
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                    Tirer mon verset
                  </Button>
                </motion.div>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
                  onClick={() => window.location.href = "/about"}
                  data-testid="button-discover"
                >
                  Découvrir l'église
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevImage}
                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-colors"
                    data-testid="button-prev-image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-colors"
                    data-testid="button-next-image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentImageIndex ? "bg-primary w-8" : "bg-white/30"
                      }`}
                      data-testid={`button-carousel-dot-${i}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:flex justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="grid grid-cols-1 gap-4 max-w-sm">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-md p-6">
                  <h3 className="text-primary font-semibold mb-2">Voeux 2026</h3>
                  <p className="text-white/70 text-sm">
                    Que cette nouvelle année soit remplie des bénédictions du Seigneur.
                  </p>
                  <img
                    src="https://res.cloudinary.com/dmngvz0f4/image/upload/v1767006976/photo_2025-12-29_12-06-43_nxzfsu.jpg"
                    alt="Voeux 2026"
                    className="w-full h-32 object-cover rounded-md mt-4"
                  />
                </div>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-md p-6">
                  <h3 className="text-primary font-semibold mb-2">Prochain culte</h3>
                  <p className="text-white/70 text-sm">Dimanche à 09h00</p>
                  <p className="text-white/50 text-xs mt-1">Fifadji, Cotonou</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div ref={verseRef}>
          <VerseCard
            verse={currentVerse}
            isLoading={isLoadingVerse}
            onNewVerse={getRandomVerse}
            onDownload={downloadVerse}
            onClose={closeVerse}
          />
        </div>

        <motion.button
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-primary transition-colors"
          onClick={scrollToContent}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          data-testid="button-scroll-down"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </section>

      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Notre <span className="text-gradient-gold">Mission</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Conduire les coeurs vers Jésus-Christ et accompagner les personnes dans leur chemin de guérison et de transformation.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionItems.map((item, index) => (
              <AnimatedSection
                key={item.title}
                animation="fade-up"
                delay={index * 0.15}
              >
                <motion.div
                  className="group p-8 rounded-md bg-background border border-border text-center relative overflow-visible"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  data-testid={`card-mission-${index}`}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center border border-primary/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <item.icon className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011C40] via-[#021F59] to-[#011C40]" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-white">
              Programme de la <span className="text-gradient-gold">Semaine</span>
            </h2>
            <p className="text-white/60 text-lg">
              Rejoignez-nous chaque semaine pour des moments de partage et de communion.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {weeklyProgram.map((item, index) => (
              <AnimatedSection key={item.day} animation="fade-up" delay={index * 0.1}>
                <motion.div
                  className="p-6 rounded-md bg-white/5 backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  data-testid={`card-program-${index}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center border border-primary/30">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-primary uppercase tracking-wider font-medium">
                        {item.day}
                      </p>
                      <p className="text-xs text-white/50">{item.time}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.activity}</h3>
                  <p className="text-sm text-white/60">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection animation="fade-right">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Événements <span className="text-gradient-gold">à venir</span>
              </h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.title}
                    className="p-6 rounded-md bg-background border border-border"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    data-testid={`card-event-${index}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs text-primary uppercase tracking-wider font-medium">
                          {event.type}
                        </span>
                        <h3 className="text-lg font-semibold mt-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left">
              <Card className="p-8 bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">
                    Soutenir les 40 jours de jeûne
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Participez à ce temps de consécration en semant dans ce programme spirituel. Votre soutien permet de bénir et d'accompagner des centaines de fidèles.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      className="gold-glow-hover"
                      onClick={() => window.location.href = "/donate"}
                      data-testid="button-support-program"
                    >
                      Semer dans ce programme
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#011C40]/20 to-background" />

        <div className="relative z-10 container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Notre <span className="text-gradient-gold">Blog</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Découvrez les moments forts de notre communauté.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, index) => (
              <AnimatedSection key={post.title} animation="fade-up" delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden h-full" data-testid={`card-blog-${index}`}>
                    <div className="aspect-video relative">
                      <img
                        src={post.images[0]}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <Button variant="ghost" size="sm" className="text-primary">
                          Lire plus
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            {blogPosts.slice(3).map((post, index) => (
              <AnimatedSection key={post.title} animation="fade-up" delay={(index + 3) * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden" data-testid={`card-blog-${index + 3}`}>
                    <div className="flex">
                      <div className="w-1/3 min-h-32">
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <span className="text-xs text-primary uppercase tracking-wider font-medium">
                          {post.category}
                        </span>
                        <h3 className="text-base font-semibold mt-1 mb-2">{post.title}</h3>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection animation="scale">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Prêt à nous <span className="text-gradient-gold">rejoindre</span> ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
              Que vous soyez nouveau dans la foi ou que vous cherchiez une nouvelle
              communauté, vous êtes le bienvenu parmi nous.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="text-lg px-10 py-6 gold-glow-hover"
                onClick={() => window.location.href = "/join"}
                data-testid="button-join-cta"
              >
                Nous rejoindre
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Recevez un <span className="text-gradient-gold">enseignement</span> chaque matin
              </h2>
              <p className="text-muted-foreground">
                Inscrivez-vous à notre newsletter pour recevoir une parole inspirante et fortifiante chaque jour dans votre boîte email.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                className="gold-glow-hover"
                disabled={isSubscribing}
                data-testid="button-newsletter-submit"
              >
                {isSubscribing ? "Inscription..." : "S'abonner"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-xl gold-glow-hover relative group"
          onClick={() => {
            toast({
              title: "Chat IA bientôt disponible",
              description: "Cette fonctionnalité sera bientôt disponible. Posez vos questions sur la foi, la religion chrétienne et l'église.",
            });
          }}
          data-testid="button-ai-chat"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-12 right-0 bg-card text-foreground text-xs px-3 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
            Questions sur la foi ?
          </span>
        </Button>
      </motion.div>
    </div>
  );
}
