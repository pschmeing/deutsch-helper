import { motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookingDialogContent from "@/components/BookingDialogContent";

const Contact = () => {
  return (
    <section id="kontakt" className="salon-section bg-secondary overflow-hidden">
      <div className="salon-container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm mb-4">
              Termin vereinbaren
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="salon-heading text-foreground mb-6">
              Ihr Weg zum <span className="italic">Wunschlook</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-divider" />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8 px-4">
              <Dialog>
                <DialogTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="salon-button-primary flex items-center gap-2 min-h-[48px] w-full sm:w-auto"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Termin online buchen
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-5xl max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-xl md:text-2xl">
                      Termin online buchen
                    </DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[calc(90vh-120px)] overflow-y-auto pr-1 md:pr-2">
                    <BookingDialogContent />
                  </div>
                </DialogContent>
              </Dialog>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+491234567890"
                className="salon-button-outline flex items-center gap-2 min-h-[48px] w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                Anrufen
              </motion.a>
            </div>
          </ScrollReveal>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal variant="fadeIn" className="text-center">
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 md:mb-6">
              Persönliche Beratung
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Erzählen Sie uns kurz von Ihrem Wunschlook oder lassen Sie uns
              gemeinsam den perfekten Stil finden. Wir melden uns zeitnah mit
              Terminbestätigung oder Alternativzeiten.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
