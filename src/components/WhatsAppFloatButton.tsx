export function WhatsAppFloatButton() {
  const whatsappUrl =
    "https://wa.me/2290157002427?text=Bonjour%20TobiDev%2C%20je%20souhaite%20discuter%20de%20mon%20projet.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter TobiDev sur WhatsApp"
      className="group fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_14px_30px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-105"
    >
      <span className="pointer-events-none absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/35" />
      <svg
        viewBox="0 0 32 32"
        className="relative z-10 h-7 w-7 fill-white"
        aria-hidden="true"
      >
        <path d="M19.11 17.08c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.67.15-.2.29-.77.94-.95 1.14-.17.2-.35.22-.64.07-.29-.15-1.24-.46-2.35-1.47-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.14-.14.29-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.29-1.04 1.01-1.04 2.47s1.06 2.88 1.21 3.08c.15.2 2.08 3.18 5.04 4.45.7.3 1.25.48 1.68.62.71.23 1.35.2 1.86.12.57-.08 1.71-.7 1.95-1.38.24-.69.24-1.28.17-1.4-.07-.12-.27-.2-.57-.35Z" />
        <path d="M16 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.25.59 4.37 1.62 6.21L3.2 28.8l6.78-1.58A12.74 12.74 0 0 0 16 28.8c7.07 0 12.8-5.73 12.8-12.8S23.07 3.2 16 3.2Zm0 23.27c-1.89 0-3.73-.51-5.35-1.48l-.38-.23-4.02.94.94-3.92-.25-.4a10.16 10.16 0 0 1-1.57-5.38c0-5.61 4.56-10.17 10.17-10.17s10.17 4.56 10.17 10.17S21.61 26.47 16 26.47Z" />
      </svg>
      <span className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-[#25D366]/30 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white shadow-xl backdrop-blur-sm group-hover:block">
        WhatsApp
      </span>
    </a>
  );
}
