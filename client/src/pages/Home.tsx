import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Music, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { VerseCard } from "@/components/verse/VerseCard";
import { useToast } from "@/hooks/use-toast";
import type { Verse } from "@shared/schema";

export default function Home() {
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [isLoadingVerse, setIsLoadingVerse] = useState(false);
  const verseRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#011C40] via-[#021F59] to-[#011C40]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          </div>
          <div className="absolute inset-0 dark-wash" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
              data-testid="text-hero-title"
            >
              Bienvenue dans la
              <span className="block text-gradient-gold">maison de Dieu</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            data-testid="text-hero-subtitle"
          >
            Une communauté spirituelle vivante où chaque âme trouve sa place.
            Rejoignez-nous pour une expérience de foi transformatrice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 animate-pulse-glow gold-glow-hover"
                onClick={getRandomVerse}
                disabled={isLoadingVerse}
                data-testid="button-draw-verse"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Tirer mon verset
              </Button>
            </motion.div>
          </motion.div>

          <div ref={verseRef}>
            <VerseCard
              verse={currentVerse}
              isLoading={isLoadingVerse}
              onNewVerse={getRandomVerse}
              onDownload={downloadVerse}
            />
          </div>
        </div>

        <motion.button
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          onClick={scrollToContent}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          data-testid="button-scroll-down"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Notre <span className="text-gradient-gold">Mission</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Partager l'amour de Dieu et transformer des vies à travers la foi,
              la communauté et le service.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionItems.map((item, index) => (
              <AnimatedSection
                key={item.title}
                animation="fade-up"
                delay={index * 0.1}
              >
                <motion.div
                  className="p-8 rounded-md bg-background border border-border text-center"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  data-testid={`card-mission-${index}`}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#011C40] to-[#021F59] opacity-50" />
        <div className="relative container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Nos <span className="text-gradient-gold">Cultes</span>
            </h2>
            <p className="text-muted-foreground">
              Rejoignez-nous chaque semaine pour des moments de partage et de communion.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                day: "Dimanche",
                time: "10h00",
                title: "Culte Principal",
                description: "Louange, enseignement et communion fraternelle",
              },
              {
                day: "Mercredi",
                time: "19h00",
                title: "Étude Biblique",
                description: "Approfondissement de la Parole de Dieu",
              },
            ].map((service, index) => (
              <AnimatedSection
                key={service.day}
                animation={index === 0 ? "fade-left" : "fade-right"}
                delay={0.2}
              >
                <motion.div
                  className="p-8 rounded-md bg-card border border-border"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  data-testid={`card-service-${index}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-md bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">{service.time}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">
                        {service.day}
                      </p>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection animation="scale">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Prêt à nous <span className="text-gradient-gold">rejoindre</span> ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Que vous soyez nouveau dans la foi ou que vous cherchiez une nouvelle
              communauté, vous êtes le bienvenu parmi nous.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="text-lg px-8 gold-glow-hover"
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
