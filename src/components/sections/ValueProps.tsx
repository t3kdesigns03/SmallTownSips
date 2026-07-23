import { site } from "@/content/site";

const icons: Record<string, React.ReactNode> = {
  leaf: (
    <path d="M4 20c0-8 6-14 16-16-1 12-7 17-16 16Zm3-2 9-9" strokeWidth="1.8" />
  ),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeWidth="1.6" strokeLinejoin="round" />,
  cup: (
    <>
      <path d="M6 8h12l-1.3 11.3A2 2 0 0 1 14.7 21H9.3a2 2 0 0 1-2-1.7L6 8Z" strokeWidth="1.7" />
      <path d="M5 8h14" strokeWidth="1.7" />
    </>
  ),
  home: <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" strokeWidth="1.6" strokeLinejoin="round" />,
};

export function ValueProps() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {site.valueProps.map((v) => (
        <li
          key={v.label}
          className="flex items-center gap-3 rounded-lg border border-charcoal/10 bg-cream/70 px-4 py-3.5 shadow-soft backdrop-blur-sm"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-soft/60 text-sage-deep">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              {icons[v.icon]}
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-charcoal">{v.label}</span>
            <span className="text-xs text-charcoal-soft">{v.note}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
