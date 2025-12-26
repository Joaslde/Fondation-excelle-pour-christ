import { Link } from "wouter";
import { Church, Heart, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

const footerLinks = [
  {
    title: "À propos",
    links: [
      { label: "Leadership", href: "/about#leadership" },
      { label: "Mission & Impact", href: "/about#mission" },
      { label: "Historique", href: "/about#history" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Enseignement", href: "/about#teaching" },
      { label: "Formation", href: "/about#training" },
      { label: "Galerie", href: "/about#gallery" },
    ],
  },
  {
    title: "Communauté",
    links: [
      { label: "Actualités", href: "/about#news" },
      { label: "Événements", href: "/about#events" },
      { label: "Bénévolat", href: "/join#volunteer" },
    ],
  },
];

export function Footer() {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  return (
    <footer
      ref={ref}
      className="relative bg-card border-t border-border pt-16 pb-8"
      data-testid="footer"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
        >
          <div className="lg:col-span-2">
            <Link href="/" data-testid="link-footer-logo">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                  <Church className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-serif font-bold tracking-wide">
                  ÉGLISE
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Une communauté spirituelle moderne et vivante, où chaque personne est
              accueillie avec amour et bienveillance.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">123 Rue de la Foi, Paris 75001</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">contact@eglise.fr</span>
              </div>
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <h4 className="font-semibold uppercase tracking-wider text-sm mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span
                        className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Église. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Fait avec <Heart className="w-4 h-4 text-primary fill-primary" /> pour la
            gloire de Dieu
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
