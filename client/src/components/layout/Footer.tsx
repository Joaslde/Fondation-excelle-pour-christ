import { Link } from "wouter";
import { Heart, Mail, Phone, MapPin, Music, Users } from "lucide-react";
import { SiInstagram, SiYoutube, SiTelegram, SiWhatsapp, SiFacebook, SiTiktok } from "react-icons/si";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Qui sommes-nous", href: "/about" },
      { label: "Enseignement", href: "/teachings" },
      { label: "Faire un don", href: "/donate" },
      { label: "Nous rejoindre", href: "/join" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Programme", href: "/#program" },
      { label: "Blog", href: "/#blog" },
      { label: "La Fondatrice", href: "/about#founder" },
    ],
  },
];

const socialLinks = [
  { icon: SiFacebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
  { icon: SiInstagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
  { icon: SiYoutube, href: "#", label: "YouTube", color: "hover:text-red-500" },
  { icon: SiTiktok, href: "#", label: "TikTok", color: "hover:text-white" },
  { icon: SiTelegram, href: "#", label: "Telegram", color: "hover:text-blue-400" },
  { icon: SiWhatsapp, href: "#", label: "WhatsApp", color: "hover:text-green-500" },
];

const ministries = [
  {
    title: "Rejoindre la Chorale",
    description: "Servez Dieu par la louange et l'adoration",
    icon: Music,
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767010074/480442435_613482244636202_2163775223475163300_n_vqz2af.jpg",
  },
  {
    title: "Rejoindre l'Accueil",
    description: "Accueillez les visiteurs avec chaleur",
    icon: Users,
    image: "https://res.cloudinary.com/dmngvz0f4/image/upload/v1767010061/482203144_627413513243075_6794549427594719951_n_vdd1nk.jpg",
  },
];

export function Footer() {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  return (
    <footer
      ref={ref}
      className="relative bg-[#011C40] border-t border-white/10 pt-16 pb-8"
      data-testid="footer"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.title}
              className="relative overflow-hidden rounded-md group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              data-testid={`card-ministry-${index}`}
            >
              <div className="aspect-[3/1] relative">
                <img
                  src={ministry.image}
                  alt={ministry.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#011C40]/90 to-[#011C40]/60" />
                <div className="absolute inset-0 flex items-center p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <ministry.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{ministry.title}</h3>
                      <p className="text-sm text-white/60">{ministry.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          <div className="lg:col-span-1">
            <Link href="/" data-testid="link-footer-logo">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="https://res.cloudinary.com/dmngvz0f4/image/upload/v1766769765/logo_f_rzbbkh.png"
                  alt="Excelle pour Christ"
                  className="h-14 w-auto"
                />
              </div>
            </Link>
            <p className="text-white/60 mb-6 text-sm">
              Une oeuvre de foi, un espace de prière, d'écoute et d'amour où chacun peut reprendre souffle.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">Fifadji, Cotonou, Bénin</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">+229 97 00 00 00</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">contact@excellepourchrist.org</span>
              </div>
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
            >
              <h4 className="font-semibold uppercase tracking-wider text-sm mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span
                        className="text-white/60 hover:text-primary transition-colors cursor-pointer text-sm"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h4 className="font-semibold uppercase tracking-wider text-sm mb-4 text-white">
              Suivez-nous
            </h4>
            <p className="text-white/60 text-sm mb-6">
              Restez connectés avec notre communauté sur les réseaux sociaux.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`flex flex-col items-center gap-2 p-3 rounded-md bg-white/5 border border-white/10 text-white/60 ${social.color} transition-all group`}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="text-xs">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Excelle pour Christ International. Tous droits réservés.
          </p>
          <p className="text-sm text-white/40 flex items-center gap-1">
            Fait avec <Heart className="w-4 h-4 text-primary fill-primary" /> pour la gloire de Dieu
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
