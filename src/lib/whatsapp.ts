export function createWhatsAppUrl(phone: string, message: string): string {
  const normalizedPhone = phone.replace(/\D/g, "");
  if (!normalizedPhone) throw new Error("A valid WhatsApp phone number is required.");
  const url = new URL(`https://wa.me/${normalizedPhone}`);
  const normalizedMessage = message.trim();
  if (normalizedMessage) url.searchParams.set("text", normalizedMessage);
  return url.toString();
}
