import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "@/components/animations/ScrollReveal";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-16 overflow-hidden">
      <div className="salon-container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <ScrollReveal variant="slideRight">
            <div>
              <h3 className="font-serif text-2xl mb-4">
                Salon <span className="text-primary">Élégance</span>
              </h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                {t("hero.description")}
              </p>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal variant="slideLeft" delay={0.1}>
            <div>
              <h4 className="font-medium uppercase tracking-wider text-sm mb-4">
                {t("nav.navigation", { defaultValue: "Navigation" })}
              </h4>
              <ul className="space-y-2">
                {[
                  { id: "home", label: t("nav.home") },
                  { id: "team", label: t("nav.team") },
                  { id: "leistungen", label: t("nav.leistungen") },
                  { id: "kontakt", label: t("nav.kontakt") },
                  { id: "standort", label: t("nav.standort") }
                ].map((link) => (
                  <li key={link.id}>
                    <motion.a
                      href={`#${link.id}`}
                      className="text-primary-foreground/70 hover:text-primary transition-colors text-sm inline-block"
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Social Media */}
          <ScrollReveal variant="slideRight" delay={0.2}>
            <div>
              <h4 className="font-medium uppercase tracking-wider text-sm mb-4">
                {t("footer.followUs", { defaultValue: "Folgen Sie uns" })}
              </h4>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                  aria-label="Instagram"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                  aria-label="Facebook"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Bar */}
        <ScrollReveal variant="fadeIn">
          <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/50">
            <p>© {currentYear} Salon Élégance. {t("footer.rights", { defaultValue: "Alle Rechte vorbehalten." })}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.a
                href="#"
                className="hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                {t("footer.imprint", { defaultValue: "Impressum" })}
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                {t("footer.privacy", { defaultValue: "Datenschutz" })}
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
