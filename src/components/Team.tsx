import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const teamMembers = [
  {
    name: "Sarah Müller",
    role: "Salonleiterin & Master Stylistin",
    image: team1,
    experience: "15 Jahre Erfahrung",
  },
  {
    name: "Marco Weber",
    role: "Senior Stylist & Barbier",
    image: team2,
    experience: "10 Jahre Erfahrung",
  },
  {
    name: "Lisa Chen",
    role: "Coloristin & Styling-Expertin",
    image: team3,
    experience: "8 Jahre Erfahrung",
  },
];

const Team = () => {
  return (
    <section id="team" className="salon-section bg-secondary overflow-hidden">
      <div className="salon-container">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Unser Team
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="salon-heading text-foreground mb-6">
              Leidenschaft für <span className="italic">Perfektion</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-divider" />
          </ScrollReveal>
        </div>

        {/* Team Grid */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member) => (
            <StaggerItem key={member.name}>
              <motion.div
                className="salon-card group cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent"
                  />
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="font-serif text-2xl text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm uppercase tracking-wider mb-2">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {member.experience}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Team;
