import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Scissors, Sparkles, Palette, Crown } from "lucide-react";
import { useRef, MouseEvent, TouchEvent } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTranslation } from "react-i18next";

const services = [
  {
    icon: Scissors,
    category: "Schnitte",
    items: [
      { name: "Damenhaarschnitt", price: "ab 45€" },
      { name: "Herrenhaarschnitt", price: "ab 28€" },
      { name: "Kinderhaarschnitt", price: "ab 18€" },
      { name: "Pony nachschneiden", price: "ab 10€" },
    ],
  },
  {
    icon: Palette,
    category: "Färben",
    items: [
      { name: "Komplettfärbung", price: "ab 65€" },
      { name: "Strähnchen / Highlights", price: "ab 75€" },
      { name: "Balayage", price: "ab 120€" },
      { name: "Ansatz färben", price: "ab 35€" },
    ],
  },
  {
    icon: Sparkles,
    category: "Pflege",
    items: [
      { name: "Intensivpflege", price: "ab 25€" },
      { name: "Keratin-Behandlung", price: "ab 150€" },
      { name: "Kopfhautmassage", price: "ab 15€" },
      { name: "Olaplex-Behandlung", price: "ab 40€" },
    ],
  },
  {
    icon: Crown,
    category: "Styling",
    items: [
      { name: "Föhnen & Styling", price: "ab 30€" },
      { name: "Hochsteckfrisur", price: "ab 55€" },
      { name: "Brautstyling", price: "ab 150€" },
      { name: "Event-Styling", price: "ab 65€" },
    ],
  },
];

interface TiltCardProps {
  service: typeof services[0];
  index: number;
}

const TiltCard = ({ service, index }: TiltCardProps) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const tiltRange = prefersReducedMotion ? 0 : isMobile ? 6 : 15;
  const scrollRange = prefersReducedMotion || isMobile ? 0 : 10;

  const mouseRotateX = useTransform(mouseY, [-0.5, 0.5], [tiltRange, -tiltRange]);
  const mouseRotateY = useTransform(mouseX, [-0.5, 0.5], [-tiltRange, tiltRange]);
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [scrollRange, 0, -scrollRange]);
  const combinedRotateX = useTransform(
    [mouseRotateX, scrollRotateX],
    ([mouse, scroll]) => (mouse as number) + (scroll as number)
  );

  const springConfig = isMobile
    ? { stiffness: 140, damping: 20, mass: 0.6 }
    : { stiffness: 200, damping: 15, mass: 0.3 };

  const smoothRotateX = useSpring(combinedRotateX, springConfig);
  const smoothRotateY = useSpring(mouseRotateY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isMobile || prefersReducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isMobile || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isMobile || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleTouchEnd = () => {
    if (!isMobile || prefersReducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="h-full"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <motion.div
        className="salon-card p-6 md:p-8 h-full transform-gpu cursor-default"
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-6 mx-auto"
            style={{ transform: "translateZ(20px)" }}
          >
            <service.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>

          <h3
            className="font-serif text-xl md:text-2xl text-foreground text-center mb-4 md:mb-6"
            style={{ transform: "translateZ(15px)" }}
          >
            {t(`services.categories.${service.category.toLowerCase()}`)}
          </h3>

          <div className="space-y-3 md:space-y-4" style={{ transform: "translateZ(10px)" }}>
            {service.items.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center border-b border-border pb-2 md:pb-3"
              >
                <span className="text-muted-foreground text-xs md:text-sm">
                  {t(`services.items.${item.name.split(" ")[0].toLowerCase().replace("dr-", "pony")}`)}
                </span>
                <span className="text-primary font-medium text-xs md:text-sm whitespace-nowrap ml-2">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useTranslation();
  return (
    <section id="leistungen" className="salon-section bg-background overflow-hidden">
      <div className="salon-container">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              {t("services.badge")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="salon-heading text-foreground mb-6">
              {t("services.title")} <span className="italic">{t("services.subtitle")}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-divider" />
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <TiltCard key={service.category} service={service} index={index} />
          ))}
        </div>

        {/* Note */}
        <ScrollReveal delay={0.3} className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            {t("services.note")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;
