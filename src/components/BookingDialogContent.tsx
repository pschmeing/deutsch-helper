import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, User, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";

// Services
const services = [
  { id: "cut", name: "Haarschnitt", duration: 45, price: 45 },
  { id: "color", name: "Färben", duration: 90, price: 85 },
  { id: "styling", name: "Styling", duration: 30, price: 35 },
];

// Stylists
const stylists = [
  { id: "any", name: "Egal / Erste:r Freie:r", specialty: null },
  { id: "sarah", name: "Sarah", specialty: "Schnitte & Braut" },
  { id: "marco", name: "Marco", specialty: "Barbier" },
  { id: "lisa", name: "Lisa", specialty: "Coloristin" },
];

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateLabel = (date: Date) =>
  date.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });

// Time slots
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

// Simulated booked slots (would come from backend)
const getBookedSlots = (): Record<string, string[]> => {
  const stored = localStorage.getItem("bookedSlots");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem("bookedSlots");
    }
  }

  // Default some slots as booked for demo
  const defaultBooked: Record<string, string[]> = {};
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (date.getDay() === 0) continue;
    const key = formatDateKey(date);
    defaultBooked[key] = [
      timeSlots[Math.floor(Math.random() * 3)],
      timeSlots[Math.floor(Math.random() * 3) + 4],
    ];
  }
  localStorage.setItem("bookedSlots", JSON.stringify(defaultBooked));
  return defaultBooked;
};

const BookingDialogContent = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookedSlots, setBookedSlots] = useState(getBookedSlots);

  const service = services.find((s) => s.id === selectedService);
  const stylist = stylists.find((s) => s.id === selectedStylist);
  const selectedDateKey = selectedDate ? formatDateKey(selectedDate) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSlotBooked = (date: string, time: string) => {
    return bookedSlots[date]?.includes(time) || false;
  };

  const availableSlots = selectedDateKey
    ? timeSlots.filter((t) => !isSlotBooked(selectedDateKey, t))
    : [];

  const canProceed = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedStylist;
    if (step === 3) return !!selectedDate && !!selectedTime;
    if (step === 4) return name.trim() && email.trim();
    return false;
  };

  const handleNext = () => {
    if (canProceed() && step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBook = () => {
    if (!selectedDate || !selectedTime || !name || !email || !selectedDateKey) return;

    // Save booking
    const newBooked = { ...bookedSlots };
    if (!newBooked[selectedDateKey]) newBooked[selectedDateKey] = [];
    newBooked[selectedDateKey].push(selectedTime);
    localStorage.setItem("bookedSlots", JSON.stringify(newBooked));
    setBookedSlots(newBooked);

    toast({
      title: "Termin gebucht!",
      description: `${formatDateLabel(selectedDate)} um ${selectedTime} Uhr${
        stylist?.id !== "any" ? ` bei ${stylist?.name}` : ""
      }`,
    });

    // Reset
    setStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setName("");
    setEmail("");
  };

  return (
    <div className="py-2">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-1 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                s < step
                  ? "bg-primary text-primary-foreground"
                  : s === step
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s < step ? <Check className="w-3 h-3" /> : s}
            </div>
            {s < 4 && (
              <div
                className={`w-8 h-0.5 mx-0.5 ${
                  s < step ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between text-[10px] text-muted-foreground mb-6 px-2">
        <span className={step === 1 ? "text-primary font-medium" : ""}>Leistung</span>
        <span className={step === 2 ? "text-primary font-medium" : ""}>Stylist</span>
        <span className={step === 3 ? "text-primary font-medium" : ""}>Termin</span>
        <span className={step === 4 ? "text-primary font-medium" : ""}>Kontakt</span>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            <h3 className="font-serif text-xl text-center mb-4">Was möchten Sie buchen?</h3>
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedService(s.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedService === s.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-foreground">{s.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3" />
                      {s.duration} Min
                    </p>
                  </div>
                  <span className="text-lg font-medium text-primary">{s.price}€</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            <h3 className="font-serif text-xl text-center mb-4">Bei wem möchten Sie?</h3>
            {stylists.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStylist(s.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedStylist === s.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      s.id === "any" ? "bg-muted" : "bg-primary/10"
                    }`}>
                      {s.id === "any" ? (
                        <Users className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <User className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{s.name}</p>
                      {s.specialty && (
                        <p className="text-xs text-muted-foreground">{s.specialty}</p>
                      )}
                    </div>
                  </div>
                  {selectedStylist === s.id && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="font-serif text-xl text-center mb-4">Wann passt es Ihnen?</h3>

            {/* Date Selection */}
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Tag wählen
                </p>
                <CalendarPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  disabled={[{ before: today }, { dayOfWeek: [0] }]}
                  weekStartsOn={1}
                  className="rounded-lg border-2 border-border"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Sonntag geschlossen. Monatsansicht im Kalender.
                </p>
              </div>

              {/* Time Selection */}
              <div className="md:pt-1">
                {selectedDate ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Uhrzeit wählen
                      <span className="ml-auto text-xs">
                        {availableSlots.length} verfügbar
                      </span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                      {timeSlots.map((time) => {
                        const booked = selectedDateKey ? isSlotBooked(selectedDateKey, time) : false;
                        return (
                          <button
                            key={time}
                            onClick={() => !booked && setSelectedTime(time)}
                            disabled={booked}
                            className={`p-3 rounded-lg border-2 text-center transition-all ${
                              booked
                                ? "border-border bg-muted text-muted-foreground cursor-not-allowed line-through"
                                : selectedTime === time
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Durchgestrichene Zeiten sind bereits vergeben
                    </p>
                  </motion.div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-border p-4 text-sm text-muted-foreground">
                    Bitte zuerst einen Tag im Kalender auswählen.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="font-serif text-xl text-center mb-4">Fast geschafft!</h3>

            {/* Summary */}
            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Leistung:</span>
                <span className="font-medium">{service?.name}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Stylist:</span>
                <span className="font-medium">{stylist?.name}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Termin:</span>
                <span className="font-medium">
                  {selectedDate ? formatDateLabel(selectedDate) : ""}, {selectedTime} Uhr
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Preis:</span>
                <span className="font-medium text-primary">{service?.price}€</span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Ihr Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Max Mustermann"
                  className="w-full p-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="max@beispiel.de"
                  className="w-full p-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-all"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-border hover:border-primary/50 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </button>
        )}

        {step < 4 ? (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
              canProceed()
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Weiter
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleBook}
            disabled={!canProceed()}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
              canProceed()
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <Check className="w-4 h-4" />
            Jetzt buchen
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingDialogContent;
