export function createWhatsAppUrl(phone: string, message: string): string {
  const localPhone = phone.replace(/\D/g, "");
  if (!localPhone) throw new Error("A valid WhatsApp phone number is required.");
  const internationalPhone = /^9\d{8}$/.test(localPhone) ? `51${localPhone}` : localPhone;
  const url = new URL(`https://wa.me/${internationalPhone}`);
  const normalizedMessage = message.trim();
  if (normalizedMessage) url.searchParams.set("text", normalizedMessage);
  return url.toString();
}
