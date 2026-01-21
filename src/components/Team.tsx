import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTranslation } from "react-i18next";
import OptimizedImage from "@/components/ui/OptimizedImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";

const teamMembers = [
  {
    name: "Sarah Müller",
    role: "Salonleiterin & Master Stylistin",
    image: team1,
    experience: "15 Jahre Erfahrung",
    bio: "Präzise Schnitte und moderne Klassik sind Sarahs Markenzeichen. Sie liebt es, natürliche Texturen zu veredeln und Looks zu kreieren, die auch im Alltag mühelos wirken.",
    specialties: ["Signature Cuts", "Brautstyling", "Glossing"],
    signature: "Soft Blunt Bob mit Face-Framing",
    languages: ["Deutsch", "Englisch"],
    availability: "Di–Sa",
  },
  {
    name: "Marco Weber",
    role: "Senior Stylist & Barbier",
    image: team2,
    experience: "10 Jahre Erfahrung",
    bio: "Marco verbindet präzises Barbering mit modernen Texturen. Sein Fokus liegt auf maskulinen Shapes, die jede Gesichtsform betonen und leicht zu stylen sind.",
    specialties: ["Fade-Work", "Bartdesign", "Textur-Styling"],
    signature: "Taper Fade mit definiertem Bart",
    languages: ["Deutsch", "Italienisch"],
    availability: "Mo–Fr",
  },
  {
    name: "Lisa Chen",
    role: "Coloristin & Styling-Expertin",
    image: team3,
    experience: "8 Jahre Erfahrung",
    bio: "Lisas Farbarbeiten leben von weichen Übergängen und glänzenden Tönen. Sie schafft maßgeschneiderte Nuancen, die Hauttöne strahlen lassen.",
    specialties: ["Balayage", "Color Melting", "Styling"],
    signature: "Dimensional Balayage in warmen Tönen",
    languages: ["Deutsch", "Englisch", "Mandarin"],
    availability: "Mi–Sa",
  },
  {
    name: "Nina König",
    role: "Senior Stylistin",
    image: team4,
    experience: "12 Jahre Erfahrung",
    bio: "Nina ist spezialisiert auf klare Linien und moderne, tragbare Looks. Sie arbeitet besonders gern mit feinem Haar und verleiht Volumen mit präziser Technik.",
    specialties: ["Precision Cuts", "Volumenaufbau", "Finish Styling"],
    signature: "Textured Lob mit sanften Stufen",
    languages: ["Deutsch", "Englisch"],
    availability: "Mo–Fr",
  },
  {
    name: "Jonas Richter",
    role: "Style & Grooming",
    image: team5,
    experience: "6 Jahre Erfahrung",
    bio: "Jonas verbindet klassische Barber-Techniken mit zeitgemäßem Styling. Sein Fokus liegt auf sauberen Konturen und natürlichen Übergängen.",
    specialties: ["Classic Cuts", "Grooming", "Styling-Beratung"],
    signature: "Clean Crop mit softem Fade",
    languages: ["Deutsch"],
    availability: "Di–Sa",
  },
];

const Team = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 240,
    damping: 18,
    mass: 0.15,
  });

  // Disable velocity tilt on mobile for better performance, predictability, and if reduced motion is preferred
  const tiltX = useTransform(
    smoothVelocity,
    [-1200, 0, 1200],
    prefersReducedMotion || isMobile ? [0, 0, 0] : [5, 0, -5],
    { clamp: true }
  );

  return (
    <section id="team" className="salon-section bg-secondary overflow-hidden">
      <div className="salon-container">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              {t("team.badge")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="salon-heading text-foreground mb-6">
              {t("team.title")} <span className="italic">{t("team.subtitle")}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-divider" />
          </ScrollReveal>
        </div>

        {/* Team Carousel */}
        <Carousel opts={{ align: "start" }} className="relative px-2 md:px-12">
          <CarouselContent className="-ml-4 md:-ml-6">
            {teamMembers.map((member) => (
              <CarouselItem
                key={member.name}
                className="pl-4 md:pl-6 sm:basis-4/5 md:basis-1/2 lg:basis-[30%] [perspective:1200px]"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <motion.button
                      type="button"
                      className="salon-card group w-full text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background transform-gpu will-change-transform"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                      style={{ rotateX: tiltX }}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[4/5]">
                        <motion.div
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                          className="w-full h-full"
                        >
                          <OptimizedImage
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-3 md:p-4 text-center">
                        <h3 className="font-serif text-lg md:text-xl text-foreground mb-1">
                          {member.name}
                        </h3>
                        <p className="text-primary text-[0.65rem] md:text-xs uppercase tracking-wider mb-2">
                          {member.role}
                        </p>
                        <p className="text-muted-foreground text-[0.65rem] md:text-xs mb-2 md:mb-3">
                          {member.experience}
                        </p>
                        <span className="text-primary text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] md:tracking-[0.3em]">
                          {t("team.moreInfo")}
                        </span>
                      </div>
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="bg-card text-foreground border-border max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                    <div className="grid gap-4 md:gap-6 md:grid-cols-[220px_1fr]">
                      <div className="overflow-hidden rounded-sm max-h-[200px] md:max-h-none">
                        <OptimizedImage
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full"
                        />
                      </div>
                      <div>
                        <DialogHeader className="text-left">
                          <DialogTitle className="font-serif text-xl md:text-2xl">
                            {member.name}
                          </DialogTitle>
                          <DialogDescription className="text-primary uppercase tracking-[0.15em] md:tracking-[0.2em] text-[0.65rem] md:text-xs">
                            {member.role}
                          </DialogDescription>
                        </DialogHeader>
                        <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {member.bio}
                        </p>
                        <div className="mt-4">
                          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-primary">
                            {t("team.specialties")}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5 md:gap-2">
                            {member.specialties.map((specialty) => (
                              <span
                                key={specialty}
                                className="text-[0.65rem] md:text-[0.7rem] uppercase tracking-wider border border-border px-2 py-1 text-muted-foreground"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 grid gap-1.5 md:gap-2 text-xs md:text-sm">
                          <p className="text-muted-foreground">
                            <span className="text-foreground">{t("team.signature")}:</span>{" "}
                            {member.signature}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="text-foreground">{t("team.languages")}:</span>{" "}
                            {member.languages.join(" · ")}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="text-foreground">{t("team.availability")}:</span>{" "}
                            {member.availability}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Team;
