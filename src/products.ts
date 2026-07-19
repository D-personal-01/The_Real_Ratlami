import { Product } from "./types";

export interface SoftDrinkProduct extends Product {
  badge: "Still Drink" | "Signature" | "New" | "Bestseller" | "Classic";
  price: string;
  sparkling: boolean;
}

export const REAL_RATLAMI_PRODUCTS: SoftDrinkProduct[] = [
  {
    id: "ratlami-zeera",
    name: "Ratlami Zeera",
    tagline: "Made with real desi spices — the way your naani always knew best.",
    description: "Bold cumin soda with desi spices. The original Indian digestive drink that offers a fizzy, throat-tingling punch.",
    ingredients: ["Carbonated Water", "Roasted Cumin Powder (Zeera)", "Black Salt (Kala Namak)", "Mint Extract", "Lemon Juice"],
    spicyLevel: 2,
    type: "drink",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600",
    badge: "Classic",
    price: "Rs.10 Only",
    sparkling: true
  },
  {
    id: "ratlami-nimbu-masala",
    name: "Ratlami Nimbu Masala",
    tagline: "Chatpata nimbu masala — the classic desi summer hit.",
    description: "Tangy lemon combined with chatpata masala spices. The ultimate mouth-watering, refreshing desi combination.",
    ingredients: ["Carbonated Water", "Fresh Lemon Juice", "Kala Namak", "Black Pepper", "Dry Ginger", "Special Masala Blend"],
    spicyLevel: 3,
    type: "drink",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600",
    badge: "Bestseller",
    price: "Rs.10 Only",
    sparkling: true
  },
  {
    id: "ratlami-mojito",
    name: "Ratlami Mojito",
    tagline: "Cafe-style mojito taste in a Rs.10 pack. No kidding.",
    description: "Fresh lime-mint fizz with an authentic desi twist. It delivers premium lounge-like refreshment at a pocket-friendly price.",
    ingredients: ["Carbonated Water", "Fresh Lime Extract", "Mint Sprigs Essence", "Lemon Juice", "Sugar"],
    spicyLevel: 1,
    type: "drink",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    badge: "Signature",
    price: "Rs.10 Only",
    sparkling: true
  },
  {
    id: "ratlami-blueberry",
    name: "Ratlami Blueberry",
    tagline: "Bold berry burst — refreshing from the very first sip.",
    description: "Bold blueberry burst with sparkling fizz. Vibrant, cool, and incredibly refreshing with a unique modern aesthetic.",
    ingredients: ["Carbonated Water", "Natural Blueberry Pulp", "Citric Acid", "Sugar"],
    spicyLevel: 0,
    type: "drink",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600",
    badge: "New",
    price: "Rs.10 Only",
    sparkling: true
  },
  {
    id: "ratlami-lychee",
    name: "Ratlami Lychee",
    tagline: "Juicy lychee goodness — sip karo, smile karo.",
    description: "Pure lychee taste, completely non-fizzy. Just sweet, juicy, and real fruit goodness packed into every soothing sip.",
    ingredients: ["Pure Lychee Juice", "Purified Water", "Sugar", "Citric Acid"],
    spicyLevel: 0,
    type: "drink",
    image: "https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=600",
    badge: "Still Drink",
    price: "Rs.10 Only",
    sparkling: false
  },
  {
    id: "ratlami-mango",
    name: "Ratlami Mango",
    tagline: "Sun-kissed mango magic — desi summer in a bottle.",
    description: "Pure sun-ripened mango goodness. Non-fizzy, thick, incredibly sweet, and totally desi like real Aamras.",
    ingredients: ["Alphonso Mango Pulp", "Purified Water", "Sugar", "Cardamom Touch", "Jaggery Sweetener"],
    spicyLevel: 0,
    type: "drink",
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=600",
    badge: "Still Drink",
    price: "Rs.10 Only",
    sparkling: false
  }
];
