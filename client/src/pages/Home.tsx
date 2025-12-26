import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Music, Users, Heart, ChevronLeft, ChevronRight, Calendar, Clock, Mail, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { VerseCard } from "@/components/verse/VerseCard";
import { useToast } from "@/hooks/use-toast";
import type { Verse } from "@shared/schema";

const carouselImages = [
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768568/photo_2025-12-26_18-01-34_coqlji.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768563/photo_2025-12-26_18-01-49_lt6oge.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768563/photo_2025-12-26_18-01-14_ewh6tz.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768563/photo_2025-12-26_18-01-19_gfqld8.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768563/photo_2025-12-26_18-01-07_owdmbw.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768563/photo_2025-12-26_18-01-54_rksu6y.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768562/photo_2025-12-26_18-01-29_vodgbo.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768562/photo_2025-12-26_18-01-40_g2wvx2.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768562/photo_2025-12-26_18-01-24_hwieor.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768561/photo_2025-12-26_18-02-06_v5npr0.jpg",
  "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766768561/photo_2025-12-26_18-01-59_amlnzr.jpg",
];

const weeklyProgram = [
  { day: "Lundi", time: "18h00", activity: "Prière de groupe", description: "Intercession et louange" },
  { day: "Mercredi", time: "18h00", activity: "Étude biblique", description: "Approfondissement de la Parole" },
  { day: "Jeudi", time: "18h00", activity: "Cellule de maison", description: "Partage et communion" },
  { day: "Vendredi", time: "18h00", activity: "Veillée de prière", description: "Nuit de consécration" },
  { day: "Samedi", time: "16h00", activity: "Répétition chorale", description: "Préparation du culte" },
  { day: "Dimanche", time: "09h00", activity: "Culte principal", description: "Adoration et enseignement" },
];

const upcomingEvents = [
  { title: "21 Jours de Jeûne", date: "1-21 Janvier 2025", type: "Programme spirituel" },
  { title: "Convention Annuelle", date: "15-17 Février 2025", type: "Événement majeur" },
  { title: "Camp de Jeunes", date: "Mars 2025", type: "Ministère Jeunesse" },
];

const blogPosts = [
  {
    title: "La puissance de la prière matinale",
    excerpt: "Découvrez comment commencer votre journée avec Dieu peut transformer votre vie...",
    date: "20 Déc 2025",
    category: "Vie spirituelle",
  },
  {
    title: "Marcher dans la foi au quotidien",
    excerpt: "Des conseils pratiques pour vivre votre foi dans les défis de chaque jour...",
    date: "18 Déc 2025",
    category: "Enseignement",
  },
  {
    title: "L'importance de la communauté",
    excerpt: "Pourquoi nous avons besoin les uns des autres dans notre marche chrétienne...",
    date: "15 Déc 2025",
    category: "Communauté",
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
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
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

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              src={carouselImages[currentImageIndex]}
              alt="Excelle pour Christ"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-[#011C40]/80 via-[#011C40]/60 to-[#011C40]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#011C40]/70 via-transparent to-[#011C40]/70" />

        <div className="relative z-10 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div
              className="backdrop-blur-xl bg-[#011C40]/40 border border-white/10 rounded-md p-8 lg:p-12"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl font-bold text-white/20">01</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === 0 ? "bg-primary" : "bg-white/30"}`}
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-semibold">
                Tirer Mon Verset
              </h2>

              <p className="text-white/70 mb-8 leading-relaxed">
                Laissez-vous inspirer par la Parole de Dieu. Cliquez sur le bouton ci-dessous pour recevoir un verset biblique qui parlera à votre coeur aujourd'hui.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="w-full text-lg py-6 animate-pulse-glow gold-glow-hover group"
                  onClick={getRandomVerse}
                  disabled={isLoadingVerse}
                  data-testid="button-draw-verse"
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Tirer mon verset
                </Button>
              </motion.div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={prevImage}
                  className="text-white/50 hover:text-primary transition-colors"
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2">
                  {carouselImages.slice(0, 5).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentImageIndex % 5 ? "bg-primary w-6" : "bg-white/30"
                      }`}
                      data-testid={`button-carousel-dot-${i}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextImage}
                  className="text-white/50 hover:text-primary transition-colors"
                  data-testid="button-next-image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>

            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-none"
                data-testid="text-hero-title"
              >
                <span className="block text-white/90">EXCELLE</span>
                <span className="block text-gradient-gold">POUR</span>
                <span className="block text-white/90">CHRIST</span>
              </h1>
              <p
                className="text-lg md:text-xl text-white/60 mt-6 max-w-md"
                data-testid="text-hero-subtitle"
              >
                Une oeuvre de foi, un espace de prière, d'écoute et d'amour où chacun peut reprendre souffle.
              </p>
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

      <section className="py-20 bg-card">
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
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
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
                    Soutenir les 21 jours de jeûne
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
              Découvrez nos derniers articles et enseignements pour nourrir votre foi.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={post.title} animation="fade-up" delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-6 h-full" data-testid={`card-blog-${index}`}>
                    <span className="text-xs text-primary uppercase tracking-wider font-medium">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold mt-2 mb-3">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Lire plus
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
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
    </div>
  );
}
