import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Sparkles, Bell, UserRound } from "lucide-react";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import { useToast } from "@/hooks/use-toast";

const services = [
  {
    id: "signature-cut",
    name: "Signature Cut",
    duration: "60 Min",
    price: "ab 48€",
    description: "Individuelle Beratung, Schnitt & Finish",
  },
  {
    id: "color-glow",
    name: "Color Glow",
    duration: "120 Min",
    price: "ab 95€",
    description: "Balayage oder Highlights mit Glossing",
  },
  {
    id: "care-ritual",
    name: "Care Ritual",
    duration: "45 Min",
    price: "ab 35€",
    description: "Intensivpflege mit Kopfhautmassage",
  },
];

const stylists = [
  { id: "any", name: "Erste freie Stylist:in" },
  { id: "sarah", name: "Sarah (Master Stylistin)" },
  { id: "marco", name: "Marco (Senior Stylist)" },
  { id: "lisa", name: "Lisa (Coloristin)" },
];

const steps = [
  {
    icon: CalendarCheck,
    title: "Service & Slot wählen",
    description: "Leistung, Datum und Uhrzeit in wenigen Klicks.",
  },
  {
    icon: Sparkles,
    title: "Wünsche angeben",
    description: "Stylist:in, Notizen und Kontaktdaten ergänzen.",
  },
  {
    icon: Bell,
    title: "Bestätigung erhalten",
    description: "E-Mail mit Zusammenfassung und .ics-Invite.",
  },
];

const buildSchedule = () => {
  const base = new Date();
  const slotSets = [
    ["09:00", "10:30", "12:00", "14:00", "16:30"],
    ["09:30", "11:00", "13:30", "15:00", "17:30"],
    ["10:00", "12:30", "14:30", "16:00"],
    ["09:00", "11:30", "13:00", "15:30", "18:00"],
    ["10:30", "12:00", "14:00", "16:30"],
  ];

  return slotSets.map((slots, index) => {
    const date = new Date(base);
    date.setDate(base.getDate() + index);
    return {
      id: date.toISOString().slice(0, 10),
      weekday: date.toLocaleDateString("de-DE", { weekday: "short" }),
      label: date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "short",
      }),
      slots,
    };
  });
};

const BookingDialogContent = () => {
  const { toast } = useToast();
  const schedule = useMemo(() => buildSchedule(), []);
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [selectedStylist, setSelectedStylist] = useState(stylists[0].id);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
  });

  const currentDay = schedule[selectedDayIndex];
  const serviceInfo = services.find((service) => service.id === selectedService);
  const stylistInfo = stylists.find((stylist) => stylist.id === selectedStylist);

  const handleDayChange = (index: number) => {
    setSelectedDayIndex(index);
    setSelectedSlot(null);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedSlot) {
      toast({
        title: "Bitte Uhrzeit wählen",
        description: "Wählen Sie einen freien Slot, um fortzufahren.",
      });
      return;
    }
    toast({
      title: "Buchung vorgemerkt!",
      description: "Wir senden Ihnen die Bestätigung in wenigen Minuten.",
    });
    setFormData({ name: "", email: "", phone: "", note: "" });
    setSelectedSlot(null);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="salon-card p-6">
          <h3 className="font-serif text-xl text-foreground mb-5">
            In drei Schritten zum Termin
          </h3>
          <StaggerContainer className="grid gap-5">
            {steps.map((step) => (
              <StaggerItem key={step.title}>
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      {step.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="salon-card p-6">
          <h3 className="font-serif text-xl text-foreground mb-5">
            Leistung wählen
          </h3>
          <div className="grid gap-3">
            {services.map((service) => {
              const isActive = selectedService === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service.id)}
                  className={`text-left w-full border rounded-sm p-4 transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-[0_10px_30px_-20px_hsl(43_50%_55%/0.6)]"
                      : "border-border bg-background/80 hover:border-primary/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-serif text-foreground">
                      {service.name}
                    </h4>
                    <span className="text-primary text-sm font-medium">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    {service.description}
                  </p>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {service.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="salon-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-xl text-foreground">
              Datum & Uhrzeit
            </h3>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Live-Verfügbarkeit
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {schedule.map((day, index) => {
              const isActive = index === selectedDayIndex;
              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => handleDayChange(index)}
                  className={`border rounded-sm p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em]">
                    {day.weekday}
                  </p>
                  <p className="text-sm font-medium">{day.label}</p>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {currentDay.slots.map((slot) => {
              const isActive = selectedSlot === slot;
              return (
                <motion.button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  whileHover={{ y: -2 }}
                  className={`border rounded-sm px-3 py-2 text-sm transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_20px_-12px_hsl(43_50%_55%/0.6)]"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {slot}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="salon-card p-6">
          <h3 className="font-serif text-xl text-foreground mb-5">
            Lieblings-Stylist:in
          </h3>
          <div className="grid gap-3">
            {stylists.map((stylist) => {
              const isActive = selectedStylist === stylist.id;
              return (
                <button
                  key={stylist.id}
                  type="button"
                  onClick={() => setSelectedStylist(stylist.id)}
                  className={`flex items-center justify-between border rounded-sm px-4 py-3 text-sm transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                  }`}
                >
                  <span>{stylist.name}</span>
                  {stylist.id === "any" ? (
                    <UserRound className="w-4 h-4 text-primary" />
                  ) : (
                    <span className="text-xs uppercase tracking-[0.2em] text-primary">
                      Spezialist
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <motion.div
          className="salon-card p-6"
          whileHover={{ boxShadow: "0 20px 50px -20px hsl(30 10% 15% / 0.15)" }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-serif text-xl text-foreground mb-5">
            Ihre Angaben
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="booking-name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Name *
              </label>
              <input
                id="booking-name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                placeholder="Ihr vollständiger Name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="booking-email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  E-Mail *
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                  placeholder="name@email.de"
                />
              </div>
              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Telefon
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                  placeholder="+49 ..."
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-note"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Wünsche / Notiz
              </label>
              <textarea
                id="booking-note"
                name="note"
                rows={4}
                value={formData.note}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 resize-none"
                placeholder="Z. B. Farbberatung, Allergien oder Styling-Wunsch"
              />
            </div>

            <motion.button
              type="submit"
              className="salon-button-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Termin anfragen
            </motion.button>
          </form>
        </motion.div>

        <div className="salon-card p-6">
          <h3 className="font-serif text-xl text-foreground mb-5">
            Buchungsübersicht
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Leistung</span>
              <span className="text-foreground font-medium">
                {serviceInfo?.name}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Dauer</span>
              <span className="text-foreground font-medium">
                {serviceInfo?.duration}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Stylist:in</span>
              <span className="text-foreground font-medium">
                {stylistInfo?.name}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Datum</span>
              <span className="text-foreground font-medium">
                {currentDay.weekday}, {currentDay.label}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Uhrzeit</span>
              <span className="text-foreground font-medium">
                {selectedSlot ?? "Bitte wählen"}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-muted-foreground">Preis</span>
              <span className="text-primary font-medium">
                {serviceInfo?.price}
              </span>
            </div>
          </div>
        </div>

        <div className="salon-card p-6">
          <h3 className="font-serif text-xl text-foreground mb-4">
            Flexible Regeln
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Kostenfreie Umbuchung bis 24 Stunden vor Termin. Bei kurzfristiger
            Absage behalten wir uns eine Ausfallgebühr von 30% vor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDialogContent;
