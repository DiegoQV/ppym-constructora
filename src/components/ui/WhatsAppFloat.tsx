import { company } from "@/data/company";
import { createWhatsAppUrl } from "@/lib/whatsapp";

function WhatsAppIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-6 fill-current sm:size-7">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47a8.95 8.95 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35M12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.44 9.44 0 1 1 8 4.41m8.03-17.48A11.3 11.3 0 0 0 12.05.7C5.8.7.72 5.78.72 12.03c0 2 .52 3.95 1.52 5.67L.62 23.62l6.06-1.59a11.3 11.3 0 0 0 5.36 1.37h.01c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.88-3.31-8.05" />
    </svg>
  );
}

export function WhatsAppFloat() {
  const url = createWhatsAppUrl(company.phone, "Hola, quisiera solicitar asesoría técnica.");

  return (
    <a
      href={url}
      aria-label={`Solicitar asesoría técnica por WhatsApp al ${company.displayPhone}`}
      className="whatsapp-attention fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(0,0,0,.3)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_14px_34px_rgba(0,0,0,.36)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:bottom-[calc(1.75rem+env(safe-area-inset-bottom))] sm:right-7 sm:size-15"
    >
      <WhatsAppIcon />
    </a>
  );
}
