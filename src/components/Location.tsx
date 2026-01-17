import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    content: "+49 123 456 7890",
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: "info@salon-elegance.de",
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    content: (
      <>
        Mo - Fr: 09:00 - 19:00 Uhr<br />
        Sa: 09:00 - 16:00 Uhr<br />
        So: Geschlossen
      </>
    ),
  },
];

const Location = () => {
  return (
    <section id="standort" className="salon-section bg-background overflow-hidden">
      <div className="salon-container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal delay={0.1}>
            <h2 className="salon-heading text-foreground mb-6">
              Unser <span className="italic">Standort</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-divider" />
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
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
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon Standort"
                className="w-full md:h-[400px]"
              />
            </motion.div>
          </ScrollReveal>

          {/* Address Info */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            <ScrollReveal variant="fadeIn">
              <div className="flex items-start space-x-3 md:space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                >
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 md:mb-3">
                    Adresse
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Salon Élégance<br />
                    Lagerstraße 2<br />
                    46325 Borken Burlo<br />
                    Deutschland
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeIn" delay={0.2}>
              <div className="md:pl-4">
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 md:mb-6">
                  Kontakt
                </h3>
                <div className="space-y-4 md:space-y-6">
                  {contactInfo.map((info) => (
                    <div
                      key={info.title}
                      className="flex items-start space-x-3 md:space-x-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                      >
                        <info.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-medium text-foreground mb-0.5 md:mb-1 text-sm md:text-base">
                          {info.title}
                        </p>
                        <p className="text-muted-foreground text-xs md:text-base">{info.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeIn" delay={0.3}>
              <motion.a
                href="https://www.google.com/maps?q=Lagerstra%C3%9Fe%202%2C%2046325%20Borken%20Burlo%2C%20Deutschland"
                target="_blank"
                rel="noopener noreferrer"
                className="salon-button-outline inline-flex min-h-[44px] items-center justify-center"
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
