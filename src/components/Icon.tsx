export function Icon({
  name,
  size = 20,
  color = "currentColor",
}: {
  name: "home" | "plus" | "book" | "download" | "camera" | "cloud" | "back" | "close" | "save" | "delete" | "location" | "sun" | "edit" | string;
  size?: number;
  color?: string;
}) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  const stroke = { stroke: color, strokeWidth: "1.8", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (name === "home")
    return (
      <svg {...common}>
        <path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.2Z" {...stroke} />
      </svg>
    );

  if (name === "plus")
    return (
      <svg {...common}>
        <path d="M12 5v14M5 12h14" {...stroke} strokeWidth="2" />
      </svg>
    );

  if (name === "book")
    return (
      <svg {...common}>
        <path d="M7 4h12v16H7a2 2 0 0 0-2 2V6a2 2 0 0 1 2-2Z" {...stroke} />
        <path d="M7 20h12" {...stroke} />
      </svg>
    );

  if (name === "download")
    return (
      <svg {...common}>
        <path d="M12 3v10" {...stroke} />
        <path d="m8 10 4 4 4-4" {...stroke} />
        <path d="M5 20h14" {...stroke} />
      </svg>
    );

  if (name === "camera")
    return (
      <svg {...common}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11Z" {...stroke} />
        <circle cx="12" cy="13" r="4" {...stroke} />
      </svg>
    );

  if (name === "cloud")
    return (
      <svg {...common}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z" {...stroke} />
      </svg>
    );

  if (name === "back")
    return (
      <svg {...common}>
        <path d="m15 18-6-6 6-6" {...stroke} />
      </svg>
    );

  if (name === "close")
    return (
      <svg {...common}>
        <path d="M18 6 6 18M6 6l12 12" {...stroke} />
      </svg>
    );

  if (name === "save")
    return (
      <svg {...common}>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" {...stroke} />
        <path d="M17 21v-8H7v8M7 3v5h8" {...stroke} />
      </svg>
    );

  if (name === "delete")
    return (
      <svg {...common}>
        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" {...stroke} />
      </svg>
    );

  if (name === "location")
    return (
      <svg {...common}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" {...stroke} />
        <circle cx="12" cy="10" r="3" {...stroke} />
      </svg>
    );

  if (name === "sun")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="5" {...stroke} />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" {...stroke} />
      </svg>
    );

  if (name === "edit")
    return (
      <svg {...common}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" {...stroke} />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" {...stroke} />
      </svg>
    );

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}
