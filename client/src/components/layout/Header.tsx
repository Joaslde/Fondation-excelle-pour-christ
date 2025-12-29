import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous", href: "/about" },
  { label: "Enseignement", href: "/teachings" },
  { label: "Faire un don", href: "/donate" },
  { label: "Nous rejoindre", href: "/join" },
];

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-3" : "bg-transparent py-4"
      }`}
      data-testid="header"
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-4">
        <Link href="/" data-testid="link-logo">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <img
              src="https://res.cloudinary.com/dmngvz0f4/image/upload/v1766769765/logo_f_rzbbkh.png"
              alt="Excelle pour Christ"
              className="h-12 w-auto"
            />
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={location === item.href}
            />
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
            data-testid="nav-mobile"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <span
                      className={`block py-3 px-4 rounded-md transition-colors ${
                        location === item.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link href={href}>
      <motion.span
        className={`relative px-3 py-2 text-sm font-medium uppercase tracking-wider cursor-pointer block ${
          isActive ? "text-primary" : "text-foreground"
        }`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        data-testid={`link-${label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {label}
        <motion.span
          className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
          initial={{ scaleX: isActive ? 1 : 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.span>
    </Link>
  );
}
