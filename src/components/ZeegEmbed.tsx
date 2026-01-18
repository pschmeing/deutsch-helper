const DEFAULT_ZEEG_URL = "https://zeeg.me/demo-salon/beratung";

const buildZeegUrl = (baseUrl: string) => {
  try {
    return new URL(baseUrl).toString();
  } catch {
    return DEFAULT_ZEEG_URL;
  }
};

const ZeegEmbed = () => {
  const baseUrl = import.meta.env.VITE_ZEEG_URL || DEFAULT_ZEEG_URL;
  const embedUrl = buildZeegUrl(baseUrl);
  const isDemo = baseUrl === DEFAULT_ZEEG_URL;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          {isDemo ? "Demo-Ansicht mit Beispiel-Link." : "Zeeg-Einbettung aktiv."}
        </span>
        <a
          href={baseUrl}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Zeeg öffnen
        </a>
      </div>
      <div className="rounded-lg border-2 border-border overflow-hidden bg-background">
        <iframe
          title="Zeeg"
          src={embedUrl}
          className="w-full min-h-[650px]"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>
      {isDemo && (
        <p className="text-xs text-muted-foreground">
          Setze <span className="font-medium">VITE_ZEEG_URL</span> in einer
          lokalen <span className="font-medium">.env</span>, um deinen echten
          Zeeg-Link zu verwenden.
        </p>
      )}
    </div>
  );
};

export default ZeegEmbed;
