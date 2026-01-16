import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const Location = () => {
  return (
    <section id="standort" className="salon-section bg-background overflow-hidden">
      <div className="salon-container">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Anfahrt
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="salon-heading text-foreground mb-6">
              Unser <span className="italic">Standort</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-divider" />
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Embed */}
          <ScrollReveal variant="scale">
            <motion.div
              className="salon-card overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.4097618789877!2d13.388860076812896!3d52.51703493622846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburger%20Tor!5e0!3m2!1sde!2sde!4v1705000000000!5m2!1sde!2sde"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon Standort"
                className="w-full"
              />
            </motion.div>
          </ScrollReveal>

          {/* Address Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
              >
                <MapPin className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-serif text-2xl text-foreground mb-3">
                  Adresse
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Salon Élégance<br />
                  Musterstraße 123<br />
                  10115 Berlin<br />
                  Deutschland
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
              >
                <Navigation className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-serif text-2xl text-foreground mb-3">
                  Anfahrt
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Mit der U-Bahn:</strong> U6 bis Friedrichstraße,
                  dann 5 Minuten zu Fuß.<br /><br />
                  <strong>Mit dem Auto:</strong> Parkplätze direkt vor dem
                  Salon sowie im Parkhaus nebenan verfügbar.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="salon-button-outline inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Route planen
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
