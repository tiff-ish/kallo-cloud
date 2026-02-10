import { useEffect, useState } from "react";
import { safeId } from "../lib/storage";

export function useToast() {
  const [toast, setToast] = useState<{ id: string; message: string } | null>(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);
  return {
    toast,
    show: (message: string) => setToast({ id: safeId(), message }),
  };
}
