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
                src="https://www.google.com/maps?q=Lagerstra%C3%9Fe%202%2C%2046325%20Borken%20Burlo%2C%20Deutschland&output=embed"
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
            <ScrollReveal variant="fadeIn">
              <div className="flex items-start space-x-4">
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
                    Lagerstraße 2<br />
                    46325 Borken Burlo<br />
                    Deutschland
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeIn" delay={0.1}>
              <div className="flex items-start space-x-4">
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
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeIn" delay={0.2}>
              <motion.a
                href="https://www.google.com/maps?q=Lagerstra%C3%9Fe%202%2C%2046325%20Borken%20Burlo%2C%20Deutschland"
                target="_blank"
                rel="noopener noreferrer"
                className="salon-button-outline inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Route planen
              </motion.a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
