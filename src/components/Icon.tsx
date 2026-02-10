export function Icon({ name }: { name: "home" | "plus" | "book" | "download" | string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  if (name === "home")
    return (
      <svg {...common}>
        <path
          d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.2Z"
          stroke="rgba(18,20,23,0.75)"
          strokeWidth="1.6"
        />
      </svg>
    );
  if (name === "plus")
    return (
      <svg {...common}>
        <path d="M12 5v14M5 12h14" stroke="rgba(18,20,23,0.75)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  if (name === "book")
    return (
      <svg {...common}>
        <path
          d="M7 4h12v16H7a2 2 0 0 0-2 2V6a2 2 0 0 1 2-2Z"
          stroke="rgba(18,20,23,0.75)"
          strokeWidth="1.6"
        />
        <path d="M7 20h12" stroke="rgba(18,20,23,0.75)" strokeWidth="1.6" />
      </svg>
    );
  if (name === "download")
    return (
      <svg {...common}>
        <path d="M12 3v10" stroke="rgba(18,20,23,0.75)" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="m8 10 4 4 4-4"
          stroke="rgba(18,20,23,0.75)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M5 20h14" stroke="rgba(18,20,23,0.75)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8" stroke="rgba(18,20,23,0.6)" strokeWidth="1.6" />
    </svg>
  );
}
