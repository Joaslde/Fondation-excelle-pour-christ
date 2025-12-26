import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Globe, BookOpen, Calendar, GraduationCap } from "lucide-react";

const timelineEvents = [
  { year: "1990", title: "Fondation", description: "Création de l'église par une poignée de fidèles passionnés." },
  { year: "2000", title: "Croissance", description: "Ouverture de notre premier lieu de culte permanent." },
  { year: "2010", title: "Expansion", description: "Lancement des programmes de formation et d'enseignement." },
  { year: "2020", title: "Mission", description: "Développement des actions missionnaires et humanitaires." },
  { year: "2024", title: "Aujourd'hui", description: "Une communauté vibrante de plus de 500 membres." },
];

const leaders = [
  {
    name: "Pasteur Jean Dupont",
    role: "Apôtre Principal",
    image: "JD",
    description: "Fondateur et leader spirituel de notre communauté depuis plus de 30 ans.",
  },
  {
    name: "Pasteur Marie Martin",
    role: "Pasteur Assistant",
    image: "MM",
    description: "En charge de la pastorale et de l'accompagnement des familles.",
  },
  {
    name: "Diacre Pierre Bernard",
    role: "Responsable G10",
    image: "PB",
    description: "Coordonne les groupes de maison et la vie communautaire.",
  },
  {
    name: "Sœur Anne Lefèvre",
    role: "Collège des Serviteurs",
    image: "AL",
    description: "Responsable de la louange et du ministère artistique.",
  },
];

const faithStatements = [
  "Tu es béni, car le Seigneur veille sur toi jour et nuit.",
  "Tu es choisi, appelé à un destin unique et glorieux.",
  "Tu es aimé d'un amour éternel et inconditionnel.",
  "Tu es victorieux, car celui qui est en toi est plus grand.",
  "Tu es une nouvelle création en Christ Jésus.",
];

export default function About() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011C40] via-[#021F59] to-[#011C40] opacity-50" />
        <div className="relative container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Qui <span className="text-gradient-gold">sommes-nous</span> ?
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nous sommes une communauté de croyants unis par la foi, l'amour et l'espérance.
              Notre mission est d'accueillir chaque personne avec bienveillance et de l'accompagner
              dans son cheminement spirituel.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section id="history" className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Notre <span className="text-gradient-gold">Histoire</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un parcours de foi, de persévérance et de grâce divine.
            </p>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <AnimatedSection
                  key={event.year}
                  animation={index % 2 === 0 ? "fade-left" : "fade-right"}
                  delay={index * 0.1}
                >
                  <div
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                    data-testid={`timeline-event-${index}`}
                  >
                    <div className="flex-1 md:text-right">
                      {index % 2 === 0 && (
                        <TimelineCard event={event} />
                      )}
                      {index % 2 !== 0 && <div className="hidden md:block" />}
                    </div>

                    <div className="relative z-10">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {event.year}
                      </motion.div>
                    </div>

                    <div className="flex-1">
                      {index % 2 !== 0 && (
                        <TimelineCard event={event} />
                      )}
                      {index % 2 === 0 && <div className="hidden md:block" />}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Déclaration de <span className="text-gradient-gold">Foi</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des paroles de vie et d'encouragement pour chaque jour.
            </p>
          </AnimatedSection>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -1000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...faithStatements, ...faithStatements].map((statement, index) => (
                <Card
                  key={index}
                  className="flex-shrink-0 w-80 p-6 bg-card/50 backdrop-blur-sm border-primary/20"
                >
                  <p className="text-lg font-serif italic text-center">
                    "{statement}"
                  </p>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="leadership" className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Notre <span className="text-gradient-gold">Leadership</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des serviteurs dévoués qui guident notre communauté avec sagesse et amour.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
              <AnimatedSection
                key={leader.name}
                animation="bounce"
                delay={index * 0.1}
              >
                <motion.div
                  className="group"
                  whileHover={{ y: -5 }}
                  data-testid={`card-leader-${index}`}
                >
                  <Card className="p-6 text-center overflow-visible">
                    <motion.div
                      className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-2xl font-bold grayscale group-hover:grayscale-0 transition-all duration-500"
                      whileHover={{ scale: 1.05 }}
                    >
                      {leader.image}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="font-semibold text-lg mb-1">{leader.name}</h3>
                      <Badge variant="secondary" className="mb-3">
                        {leader.role}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {leader.description}
                      </p>
                    </motion.div>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="mission" className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Mission & <span className="text-gradient-gold">Impact</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Notre engagement au service de la communauté et du monde.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Missions",
                description: "Soutien aux œuvres missionnaires à travers le monde.",
                stats: "12 pays",
              },
              {
                icon: Heart,
                title: "Actions Sociales",
                description: "Aide alimentaire, vêtements et soutien aux familles.",
                stats: "500+ familles",
              },
              {
                icon: Users,
                title: "Projets Humanitaires",
                description: "Construction d'écoles et de puits en Afrique.",
                stats: "3 projets",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} animation="bounce" delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-8 text-center" data-testid={`card-mission-${index}`}>
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                    <Badge variant="outline" className="text-primary border-primary">
                      {item.stats}
                    </Badge>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="teaching" className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="text-gradient-gold">Enseignement</span> & Formation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Approfondissez votre connaissance de la Parole de Dieu.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection animation="fade-left">
              <Card className="p-8" data-testid="card-teaching">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-md bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Messages Audio & Vidéo</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Accédez à notre bibliothèque de prédications et d'enseignements
                  pour grandir dans la foi.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Foi</Badge>
                  <Badge>Prière</Badge>
                  <Badge>Famille</Badge>
                  <Badge>Leadership</Badge>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={0.1}>
              <Card className="p-8" data-testid="card-training">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-md bg-primary/20 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">École Tyrannus</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Formation approfondie pour les leaders et les serviteurs
                  souhaitant développer leur ministère.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">12 mois</Badge>
                  <Badge variant="outline">Certification</Badge>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="events" className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Événements & <span className="text-gradient-gold">Programmes</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos prochains événements et programmes spéciaux.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Nuit de Prière", date: "Premier vendredi du mois", type: "Mensuel" },
              { title: "Retraite Spirituelle", date: "15-17 Mars 2025", type: "Annuel" },
              { title: "Conférence Jeunesse", date: "20 Avril 2025", type: "Spécial" },
            ].map((event, index) => (
              <AnimatedSection key={event.title} animation="fade-up" delay={index * 0.1}>
                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring" }}>
                  <Card className="p-6" data-testid={`card-event-${index}`}>
                    <Badge className="mb-3">{event.type}</Badge>
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelineCard({ event }: { event: typeof timelineEvents[0] }) {
  return (
    <Card className="p-6 md:max-w-sm">
      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
      <p className="text-muted-foreground text-sm">{event.description}</p>
    </Card>
  );
}
