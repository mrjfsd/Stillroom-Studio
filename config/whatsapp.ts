/**
 * WhatsApp Click-to-Chat Configuration
 *
 * Phone number in international format without '+' or other characters.
 * Correct WhatsApp number: 918792212704 (+91 87922 12704)
 */
export const WHATSAPP_CONFIG = {
  number: "918792212704",
  defaultMessage:
    "Hi The White Atelier, I'm interested in discussing an interior design project. I'd love to know more about your services and how we can get started.",
  getLink: (message?: string) => {
    const text = message ?? WHATSAPP_CONFIG.defaultMessage;
    return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(text)}`;
  },
};

export const WHATSAPP_CHAT_URL = WHATSAPP_CONFIG.getLink();
