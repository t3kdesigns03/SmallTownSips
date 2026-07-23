import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** Compact text wordmark for the header/footer. */
export function Wordmark({
  className,
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-terracotta text-cream shadow-soft"
      >
        {/* tiny leaf-in-cup glyph */}
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M6 8h12l-1.4 11.2A2 2 0 0 1 14.6 21H9.4a2 2 0 0 1-2-1.8L6 8Z" fill="#FBF3E4" />
          <path d="M12 17c-3-1-4-4-2-7 3 1 4 4 2 7Z" fill="#7BC043" />
          <rect x="5" y="6" width="14" height="3" rx="1.5" fill="#F3E6CE" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-charcoal">
          {site.name}
        </span>
        {showTagline && (
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-terracotta">
            {site.town}
          </span>
        )}
      </span>
    </span>
  );
}
