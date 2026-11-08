import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/cart";

/** Floating chat button, bottom right on every page. Hidden while the bag is open. */
export function WhatsAppFloat({ number }: { number?: string }) {
  if (!number) return null;
  return (
    <a
      href={whatsappUrl(`Hello ${siteConfig.name}, I have a question about your perfumes.`, number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-float fixed right-4 bottom-4 z-30 flex items-center gap-2 rounded-full bg-[#177a43] py-3 pr-5 pl-3.5 text-sm font-medium text-white shadow-lg shadow-black/20 transition-[background-color,translate] hover:-translate-y-0.5 hover:bg-[#12663a] sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
