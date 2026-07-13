export type VerificationStatus = "pending-verification" | "verified";
export interface Company { legalName: string; shortName: string; ruc: string; phone: string; displayPhone: string; address: string; city: string; region: string; country: string; activitiesStarted: number; status: VerificationStatus }
export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  items: string[];
  whatsappMessage: string;
  source: string;
  status: VerificationStatus;
}
export interface ProcessStep { id: string; title: string; description: string; status: VerificationStatus }
export interface EquipmentItem { id: string; name: string; status: VerificationStatus }
export interface Project { id: string; name: string; description: string; status: VerificationStatus }
