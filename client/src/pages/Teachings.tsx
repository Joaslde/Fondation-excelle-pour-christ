import { motion } from "framer-motion";
import { BookOpen, Play, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const teachings = [
  {
    id: 1,
    title: "La puissance de la prière",
    speaker: "Apôtre Janine AHO",
    date: "15 Décembre 2024",
    duration: "45 min",
    category: "Prière",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007054/477112229_610578731593220_4662935868068050667_n_nhhq43.jpg",
  },
  {
    id: 2,
    title: "Marcher par la foi",
    speaker: "Prophète Cyriaque HOUNSINOU",
    date: "8 Décembre 2024",
    duration: "38 min",
    category: "Foi",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007303/photo_2025-12-29_12-21-01_maxmvm.jpg",
  },
  {
    id: 3,
    title: "La délivrance en Christ",
    speaker: "Apôtre Janine AHO",
    date: "1 Décembre 2024",
    duration: "52 min",
    category: "Délivrance",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007049/480433428_613484304635996_36110986917296892_n_obqrwm.jpg",
  },
  {
    id: 4,
    title: "Le sacrifice dans le Royaume",
    speaker: "Pasteur Mutalleb GOMINA",
    date: "24 Novembre 2024",
    duration: "41 min",
    category: "Enseignement",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007296/photo_2025-12-29_12-20-55_fwdr13.jpg",
  },
];

const categories = ["Tous", "Prière", "Foi", "Délivrance", "Enseignement", "Prophétie"];

export default function Teachings() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011C40] via-[#021F59] to-[#011C40]" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Nos <span className="text-gradient-gold">Enseignements</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Nourrissez votre foi avec les enseignements de nos serviteurs de Dieu. 
              Retrouvez ici les messages qui transforment les vies.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`button-category-${category.toLowerCase()}`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachings.map((teaching, index) => (
              <AnimatedSection key={teaching.id} animation="fade-up" delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden" data-testid={`card-teaching-${teaching.id}`}>
                    <div className="relative aspect-video">
                      <img
                        src={teaching.image}
                        alt={teaching.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <motion.button
                          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="w-8 h-8 text-primary-foreground fill-current" />
                        </motion.button>
                      </div>
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                        {teaching.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{teaching.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{teaching.speaker}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {teaching.date}
                        </div>
                        <span>{teaching.duration}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" data-testid="button-load-more">
              Voir plus d'enseignements
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="scale" className="max-w-3xl mx-auto text-center">
            <Download className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Téléchargez nos <span className="text-gradient-gold">ressources</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Accédez à nos livres, études bibliques et guides de prière pour approfondir votre foi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gold-glow-hover" data-testid="button-download-resources">
                Télécharger les ressources
              </Button>
              <Button size="lg" variant="outline" data-testid="button-join-study">
                Rejoindre une étude biblique
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
