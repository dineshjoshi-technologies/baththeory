export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  weight: string;
  category: "single" | "set" | "kit";
  ingredients: string[];
  benefits: string[];
  image: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "aloe-oat-comfort",
    name: "Aloe Oat Comfort Bar",
    tagline: "Gentle nourishment for sensitive skin",
    description: "A soothing daily-use soap crafted with organic aloe vera and colloidal oatmeal. Perfect for sensitive skin that needs extra care without harsh chemicals.",
    price: 249,
    weight: "100g",
    category: "single",
    ingredients: ["Aloe Vera", "Colloidal Oatmeal", "Coconut Oil", "Shea Butter", "Essential Oils"],
    benefits: ["Calms irritation", "Deep moisturizing", "pH balanced", "Daily use"],
    image: "/products/aloe-oat.jpg",
    featured: true,
  },
  {
    id: "milk-honey-cream",
    name: "Milk Honey Cream Bar",
    tagline: "Luxurious moisture for dry skin",
    description: "Rich and creamy, this premium soap combines the ancient benefits of milk proteins with natural honey to deeply nourish and soften your skin.",
    price: 249,
    weight: "100g",
    category: "single",
    ingredients: ["Milk Proteins", "Raw Honey", "Cocoa Butter", "Almond Oil", "Vitamin E"],
    benefits: ["Intense hydration", "Skin softening", "Anti-aging", "Premium care"],
    image: "/products/milk-honey.jpg",
    featured: true,
  },
  {
    id: "rose-aloe-softening",
    name: "Rose Aloe Softening Bar",
    tagline: "Floral elegance meets skin comfort",
    description: "A delicate blend of rose petals and aloe vera that leaves your skin feeling silky smooth. Beautiful enough for gifting, gentle enough for daily use.",
    price: 249,
    weight: "100g",
    category: "single",
    ingredients: ["Rose Petals", "Aloe Vera", "Glycerin", "Jojoba Oil", "Rose Essential Oil"],
    benefits: ["Skin softening", "Natural fragrance", "Gift-worthy", "Antioxidant rich"],
    image: "/products/rose-aloe.jpg",
    featured: true,
  },
  {
    id: "haldi-chandan-glow",
    name: "Haldi Chandan Glow Bar",
    tagline: "Traditional wisdom for radiant skin",
    description: "Inspired by centuries-old Indian beauty rituals, this soap combines turmeric and sandalwood to brighten and even out your skin tone naturally.",
    price: 249,
    weight: "100g",
    category: "single",
    ingredients: ["Turmeric", "Sandalwood", "Saffron", "Gram Flour", "Milk"],
    benefits: ["Skin brightening", "Traditional recipe", "Bridal favorite", "Natural glow"],
    image: "/products/haldi-chandan.jpg",
    featured: true,
  },
  {
    id: "sandalwood-aloe-ritual",
    name: "Sandalwood Aloe Ritual Bar",
    tagline: "Our flagship premium ritual soap",
    description: "The crown jewel of Bath Theory. Pure sandalwood meets cooling aloe in this luxurious bar that transforms your daily bath into a mindful ritual.",
    price: 249,
    weight: "100g",
    category: "single",
    ingredients: ["Pure Sandalwood", "Aloe Vera", "Saffron", "Coconut Milk", "Essential Oils"],
    benefits: ["Premium ingredients", "Mindful ritual", "Cooling effect", "Signature scent"],
    image: "/products/sandalwood-aloe.jpg",
    featured: true,
  },
  {
    id: "discovery-set-3",
    name: "3-Bar Discovery Set",
    tagline: "Find your perfect ritual",
    description: "Can't decide? Try three of our bestsellers in this curated discovery set. Perfect for gifting or finding your personal favorite.",
    price: 649,
    weight: "3 x 100g",
    category: "set",
    ingredients: ["Choose any 3 bars"],
    benefits: ["Great value", "Perfect gift", "Try before you commit", "Beautifully packaged"],
    image: "/products/discovery-3.jpg",
  },
  {
    id: "discovery-kit-5",
    name: "5-Bar Discovery Kit",
    tagline: "The complete Bath Theory experience",
    description: "Experience our entire collection in this beautifully packaged discovery kit. The perfect introduction to the wisdom of Indian bathing rituals.",
    price: 999,
    weight: "5 x 100g",
    category: "kit",
    ingredients: ["All 5 signature bars"],
    benefits: ["Complete collection", "Best value", "Premium packaging", "Perfect gift"],
    image: "/products/discovery-5.jpg",
  },
];
