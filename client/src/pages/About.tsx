import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, BookOpen, Star, Globe, HandHeart, Church, Award, Mail, Phone, X } from "lucide-react";

const logoUrl = "https://res.cloudinary.com/dmngvz0f4/image/upload/v1766769765/logo_f_rzbbkh.png";

const leaders = [
  {
    name: "Prophète Cyriaque HOUNSINOU",
    description: "Intercesseur persévérant et enseignant patient",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007303/photo_2025-12-29_12-21-01_maxmvm.jpg",
  },
  {
    name: "Pasteur Mutalleb GOMINA",
    description: "Leadership pastoral bienveillant",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007296/photo_2025-12-29_12-20-55_fwdr13.jpg",
  },
  {
    name: "Pasteure Françoise TOFFA",
    description: "Servante dévouée et compatissante",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007314/photo_2025-12-29_12-20-48_o0kwrp.jpg",
  },
  {
    name: "Prophétesse Claudia BENON",
    description: "Voix prophétique et encourageante",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007384/photo_2025-12-29_12-20-41_vsicrl.jpg",
  },
  {
    name: "Pasteur Sam LAO",
    description: "Enseignant fidèle de la Parole",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007297/photo_2025-12-29_12-20-33_ijncli.jpg",
  },
  {
    name: "Prophétesse Joaline JAMES",
    description: "Intercesseur passionné pour les âmes",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007297/photo_2025-12-29_12-20-24_iffyc1.jpg",
  },
  {
    name: "Apôtre Elias AMOUSSA",
    description: "Homme de vision et d'action",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007681/480518246_612821551368938_5648666174098026126_n_xg7wry.jpg",
  },
  {
    name: "Évangéliste COCO Fernande",
    description: "Passionnée pour l'évangélisation",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007688/514308477_709654841685608_3833446210879277504_n_xdl5ic.jpg",
  },
  {
    name: "Docteur CHAHOUNKA Séraphin",
    description: "Enseignant érudit et sage",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007703/603878608_845574508093640_2706517759738635183_n_qo5fmb.jpg",
  },
  {
    name: "Pasteure Euphrasie AHO",
    description: "Servante humble et fidèle",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007672/480277386_612202498097510_8773660056191443748_n_aicuma.jpg",
  },
  {
    name: "Prophétesse Victoire OSSE",
    description: "Femme de prière et de foi",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007687/492992529_664131249571301_1105889650415845183_n_zwizyf.jpg",
  },
  {
    name: "Pasteur Marius AHO",
    description: "Berger attentif et dévoué",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007693/525547656_733502642634161_6536859824729186157_n_ehqhqe.jpg",
  },
  {
    name: "Prophète Boris D'OLIVEIRA",
    description: "Voix prophétique audacieuse",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007694/556877275_778856381432120_3011736033028012044_n_qozl5f.jpg",
  },
  {
    name: "Docteur Patrick AHO",
    description: "Docteur de la Parole",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767009123/photo_2025-12-29_12-51-32_sgk0zo.jpg",
  },
  {
    name: "Pasteure Huguette ACACHA",
    description: "Servante aimante et attentionnée",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767008134/photo_2025-12-27_17-59-09_bt3yfn.jpg",
  },
  {
    name: "Prophète Francis BENON",
    description: "Homme de foi inébranlable",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767008141/photo_2025-12-27_17-59-09_2_xnzabn.jpg",
  },
  {
    name: "Pasteur Gwendal OSSE",
    description: "Pasteur dynamique et engagé",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007700/557731701_785126300805128_967292843510034901_n_gvc6ul.jpg",
  },
  {
    name: "Pasteur Yanik HOUNGBO",
    description: "Serviteur zélé et discipliné",
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767007699/555527958_778856754765416_3567995304576630408_n_w1mykj.jpg",
  },
];

const values = [
  "L'Amour pour Dieu, pour l'être humain et la compassion pour la misère du prochain",
  "La communion fraternelle",
  "La vie de prière",
  "Le respect de la famille selon les Saintes Écritures",
  "L'obéissance à la Parole de Dieu",
  "L'humilité",
  "La sincérité",
  "Le bon témoignage au dehors",
  "Les prévenances réciproques",
];

const churches = [
  "Parakou", "Gogounou", "Bembereke", "Nikki", "Sikki", "Ouèssènè", "Natitingou", "Moukokotamou", "Kaboli", "Assoula",
  "Okouta Ossé", "Comé", "Azove", "Ouidah", "Pahou", "Cococodji", "Pk10", "Ketou", "Idigny", "Adjagbo",
];

const responsablesG10 = [
  "Pst AMOUSSA Elias", "AGON Félicienne", "ACLEHINTO Faoziath", "TCHANKA Priscille", "YOUBOE Franckel",
  "Proph d'OLIVEIRA Boris", "Pst. AHO Marius", "AHO Euphrasie", "ADANDJEHOUNDE Flora", "ACLEHINTO Lyonel",
  "ALE GOMINA Muttaleb", "OSSE Gwendal", "Past HOUNGBO Yanik", "OUENDO Florence", "ZOUNMENOU Barthélémy",
  "AMOUSSA Monrayo", "HOUNGBO Irène", "FASSIA Kétsia", "NOUKPO Yolande", "SID Jude",
  "Pst LAO Sam", "TOGBEVI Appolos", "BALLEY Alexis", "MITOSSEDE Philibert", "APLOGAN Sylvie",
  "HOUNSINOU Cyriaque", "BENON Claudia", "YABI Élise", "Pst ZOUMENOU Eléonore", "KPODJEDO Pélagie",
  "DAZOUNDJI Célestine", "MEGBLETO Cyprien", "TAMADAHO Carine", "Proph JAMES Joaline", "OSSE Victoire",
  "Dr. CHAHOUNKA Séraphin", "AISSI Luc", "APLOGAN Roselyne", "ATINMADJEGANGNI Paulin", "LAADE Justin",
  "AGBESSADJI Clotilde", "AVOCEGAMOU Augustin", "Pst. CHAHOUNKA Odette", "SID Justin", "COCO Fernande",
  "AWOKOU Fidélia", "AMOUZOUN Cathérine", "AGBETOU Alimath", "MEGBLETO Dorcas", "ZANKLAN Louise", "Pst. ACACHA Huguette"
];

const historyEvents = [
  {
    date: "05 Avril 2001",
    title: "Naissance de l'oeuvre",
    description: "L'Eglise Excelle pour Christ International, autrefois connue sous le nom Mount Horeb International Fondation, a vu le jour le 5 avril 2001 à Guinkomey, à Cotonou, au Bénin. Le 1er programme a rassemblé 78 personnes.",
    color: "primary",
  },
  {
    date: "05 Février 2008",
    title: "Ordination de l'Apôtre Janine AHO",
    description: "Alors qu'elle officiait sous l'onction prophétique, la Prophétesse Janine AHO a été ordonnée Apôtre par Papa TAMINI du Burkina Faso en présence de son père spirituel, l'apôtre Paul Oumar DIAGOURAGA du Mali.",
    color: "accent",
  },
  {
    date: "23 Mars 2008",
    title: "Naissance de l'Église missionnaire",
    description: "L'église missionnaire Excelle pour Christ International a vu le jour. Le 1er culte s'est déroulé au Palais de Sports de Kouhounou devant environ 500 personnes.",
    color: "primary",
  },
  {
    date: "Août 2010",
    title: "Camp International de la Jeunesse",
    description: "Organisation du Camp International de la Jeunesse avec papa Mamadou Philippe KARAMBIRI comme orateur principal. Le thème était 'L'Affaire Cozbi'. Ce camp a rassemblé plus de 1000 jeunes.",
    color: "accent",
  },
  {
    date: "1er Décembre 2013",
    title: "1er culte à Fifadji",
    description: "Après 10 ans sur le site des Cheminots à Zongo, le ministère a établi ses quartiers à Fifadji avec la pose de la première pierre de la construction du temple.",
    color: "primary",
  },
  {
    date: "1er Mars 2020",
    title: "Nouveau nom: Excelle pour Christ",
    description: "En pleine crise de la COVID-19, MHIF devient Fondation Excelle pour Christ. L'oeuvre amorce ainsi un virage décisif de son existence.",
    color: "accent",
  },
];

export default function About() {
  const [showG10Modal, setShowG10Modal] = useState(false);

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011C40] via-[#021F59] to-[#011C40]" />
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              Qui <span className="text-gradient-gold">sommes-nous</span> ?
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Excelle pour Christ International, Ex Mount Horeb International Fondation est une oeuvre missionnaire. Elle entend prêcher tout l'évangile à tout l'Homme.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Notre <span className="text-gradient-gold">Mission</span>
              </h2>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2">
              <AnimatedSection animation="fade-right">
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    Assurer le <strong className="text-foreground">bien-être spirituel et moral</strong> des personnes en difficultés et en particulier à un programme d'intégration. Pour cela, nous envisageons :
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span>Faire connaître l'Évangile de Jésus-Christ au monde</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span>Créer des centres de réhabilitation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <HandHeart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span>Apporter de l'aide aux personnes malades</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Church className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span>Développer des oeuvres partout où besoin sera</span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-left">
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
                  <h3 className="text-xl font-serif font-bold mb-4 text-primary">Une oeuvre de délivrance</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Excelle pour Christ International est un ministère de délivrance consacré à la restauration complète de l'Homme. Par la puissance de la Parole de Dieu et l'action du Saint-Esprit, le ministère oeuvre à libérer les vies de toute forme d'oppression spirituelle, émotionnelle et sociale.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                    Sous la houlette du Saint Esprit, un programme de prière rassemblait chaque jeudi de 9h à 14h plus de 2000 personnes venues de Cotonou et ses environs avec une grande manifestation de la puissance de Dieu.
                  </p>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#011C40]/30 to-background" />

        <div className="relative z-10 container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Nos <span className="text-gradient-gold">Valeurs</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <AnimatedSection key={value} animation="fade-up" delay={index * 0.05}>
                <motion.div
                  className="p-4 rounded-md bg-card border border-border text-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{value}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <AnimatedSection animation="fade-right">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
                <HandHeart className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-serif font-bold mb-4">Une oeuvre sociale</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Au-delà de l'annonce de l'Évangile, Excelle pour Christ International exprime concrètement l'amour de Christ à travers une oeuvre sociale active et engagée.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Le ministère de compassion <strong className="text-foreground">« Tabitha »</strong> vient en aide aux personnes démunies, aux prisonniers, ainsi qu'à d'autres couches sociales fragilisées.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Le <strong className="text-foreground">Comité d'Action Sociale (CAS)</strong> accompagne les membres de la communauté ecclésiale lorsqu'ils traversent des situations difficiles.
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="fade-left">
              <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
                <Globe className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-serif font-bold mb-4">Une église missionnaire</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Excelle pour Christ International est une église résolument missionnaire, née avec la vision d'annoncer l'Évangile de Jésus-Christ au plus grand nombre.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Aujourd'hui, l'église compte <strong className="text-foreground">une vingtaine d'églises implantées</strong> à travers le Bénin.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {churches.slice(0, 10).map((church) => (
                    <span key={church} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      {church}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                    +{churches.length - 10} autres
                  </span>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="founder" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011C40] via-[#021F59] to-[#011C40]" />

        <div className="relative z-10 container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
              La <span className="text-gradient-gold">Fondatrice</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <AnimatedSection animation="fade-right">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dmngvz0f4/image/upload/v1767013074/photo_2025-12-29_12-06-43_bvxxdp.jpg"
                  alt="Apôtre Janine AHO"
                  className="w-full max-w-md mx-auto rounded-md shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-12 h-12 text-white" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left">
              <div className="text-white/80 space-y-4">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Apôtre Janine AHO</h3>
                <p className="text-sm leading-relaxed">
                  Économiste de formation, l'Apôtre Janine AHO est une femme de foi, entièrement consacrée au service de Dieu et profondément engagée dans le développement spirituel et personnel des âmes depuis 2001.
                </p>
                <p className="text-sm leading-relaxed">
                  Titulaire du Certificat d'Études Financières, Économiques et Bancaires (CEFEB) obtenu à Paris en 1992, et d'un MBA délivré par SIUC, Illinois, USA.
                </p>
                <p className="text-sm leading-relaxed">
                  Sur le plan théologique, elle est titulaire d'un <strong className="text-primary">Master of Divinity</strong> obtenu en 2024 à TELEO University (T-NET), Tennessee, États-Unis avec la Mention Excellent.
                </p>
                <p className="text-sm leading-relaxed">
                  Elle a été distinguée <strong className="text-primary">Ambassadrice Mondiale de la Paix</strong> le 7 novembre 2025 par CONACCEE CHAPLAINS, une ONG américaine accréditée auprès des Nations Unies.
                </p>
                <div className="pt-4">
                  <p className="text-xs text-white/50">
                    Mariée au Contre-Amiral Patrick AHO, ancien Chef d'État-Major Général des Forces Armées Béninoises, et mère de quatre enfants.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Notre <span className="text-gradient-gold">Histoire</span>
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />
              
              {historyEvents.map((event, index) => (
                <AnimatedSection key={event.date} animation="fade-up" delay={index * 0.1}>
                  <motion.div
                    className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary border-4 border-background z-10" />
                    
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"} pl-12 md:pl-0`}>
                      <span className={`text-sm font-semibold uppercase tracking-wider ${
                        event.color === "primary" ? "text-primary" : "text-accent"
                      }`}>
                        {event.date}
                      </span>
                      <h3 className="text-xl font-serif font-bold mt-2 mb-3">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                    </div>
                    
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011C40] via-[#021F59] to-[#011C40]" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
              Collège des <span className="text-gradient-gold">Serviteurs</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Aux côtés de la Fondatrice, plusieurs serviteurs de Dieu notamment des apôtres, prophètes, pasteurs, évangélistes et docteurs sont engagés dans le service de Dieu.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {leaders.map((leader, index) => (
              <AnimatedSection key={leader.name} animation="scale" delay={index * 0.03}>
                <motion.div
                  className="p-4 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 text-center"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  data-testid={`card-leader-${index}`}
                >
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary/30">
                    <img
                      src={leader.image || logoUrl}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = logoUrl;
                      }}
                    />
                  </div>
                  <p className="text-sm text-white/90 font-medium mb-1">{leader.name}</p>
                  <p className="text-xs text-white/50">{leader.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={0.5} className="mt-12">
            <div className="max-w-md mx-auto">
              <div className="p-6 rounded-md bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 text-center">
                <img
                  src="https://res.cloudinary.com/dmngvz0f4/image/upload/v1767010683/605533087_850589044258853_7709447793809649617_n_gollok.jpg"
                  alt="Couple Apostolique"
                  className="w-full max-w-xs mx-auto rounded-md mb-4"
                />
                <h3 className="text-lg font-serif font-bold text-white">Le Couple Apostolique</h3>
                <p className="text-sm text-white/60 mt-2">Apôtre Janine AHO et Contre-Amiral Patrick AHO</p>
                <Button
                  className="mt-4 bg-primary hover:bg-primary/80"
                  onClick={() => setShowG10Modal(true)}
                  data-testid="button-voir-g10"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Voir les Responsables G10
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.6} className="mt-8">
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                className="border-primary/50 text-white hover:bg-primary/20"
                onClick={() => window.location.href = "tel:+22901968164"}
                data-testid="button-contacter-secretariat"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contacter le secrétariat
              </Button>
              <Button
                variant="outline"
                className="border-accent/50 text-white hover:bg-accent/20"
                onClick={() => window.location.href = "mailto:contact@excellepourchrist.org?subject=Courrier%20%C3%A0%20l%27Ap%C3%B4tre%20Janine%20AHO"}
                data-testid="button-courrier-apotre"
              >
                <Mail className="w-4 h-4 mr-2" />
                Adressez un courrier à l'Apôtre
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <AnimatePresence>
        {showG10Modal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowG10Modal(false)}
            />
            <motion.div
              className="relative bg-[#011C40] border border-primary/30 rounded-md p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowG10Modal(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
                data-testid="button-close-g10"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-serif font-bold text-white mb-6 text-center">
                Responsables <span className="text-primary">G10</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {responsablesG10.map((name, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 rounded-md text-center"
                  >
                    <p className="text-sm text-white/80">{name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
