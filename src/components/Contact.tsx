import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/animations/ScrollReveal";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Anfrage gesendet!",
      description: "Wir melden uns schnellstmöglich bei Ihnen.",
    });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  return (
    <section id="kontakt" className="salon-section bg-secondary overflow-hidden">
      <div className="salon-container">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Termin vereinbaren
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="salon-heading text-foreground mb-6">
              Kontaktieren Sie <span className="italic">uns</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-divider" />
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <ScrollReveal variant="slideRight" className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-6">
                Besuchen Sie uns
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Wir freuen uns darauf, Sie in unserem Salon begrüßen zu dürfen.
                Vereinbaren Sie noch heute Ihren Termin für ein unvergessliches
                Haarstyling-Erlebnis.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                  >
                    <info.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-medium text-foreground mb-1">{info.title}</p>
                    <p className="text-muted-foreground">{info.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal variant="slideLeft">
            <motion.div
              className="salon-card p-8"
              whileHover={{ boxShadow: "0 20px 50px -20px hsl(30 10% 15% / 0.15)" }}
              transition={{ duration: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                      placeholder="Ihr Name"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                      placeholder="Ihre Telefonnummer"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                    placeholder="ihre@email.de"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Gewünschte Leistung
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="schnitt">Haarschnitt</option>
                    <option value="farbe">Färben / Highlights</option>
                    <option value="pflege">Pflege-Behandlung</option>
                    <option value="styling">Styling / Event</option>
                    <option value="beratung">Beratung</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 resize-none"
                    placeholder="Ihre Nachricht oder Terminwunsch..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="salon-button-primary w-full flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Send className="w-4 h-4" />
                  Anfrage senden
                </motion.button>
              </form>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
