export default function Divider() {
  return (
    <div className="flex items-center justify-center py-8" aria-hidden="true">
      <svg
        width="120"
        height="24"
        viewBox="0 0 120 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold/40"
      >
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <line x1="20" y1="12" x2="48" y2="12" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="60" cy="12" r="6" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="60" cy="12" r="2" fill="currentColor" />
        <line x1="72" y1="12" x2="100" y2="12" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="108" cy="12" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}
