export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  spicyLevel: number; // 0 to 5
  type: "snack" | "drink" | "spice";
  image: string; // fallback pic or local description
}

export interface FlavorProfile {
  spicy: number;
  tangy: number;
  sweet: number;
  clove: number;
}

export interface InquiryForm {
  name: string;
  email: string;
  type: string;
  message: string;
}

export interface InquiryResult {
  category: string;
  suggestedResponse: string;
  actionSteps: string[];
}
