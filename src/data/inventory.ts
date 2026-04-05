export interface InventoryItem {
  productId: string;
  productName: string;
  sku: string;
  stockLevel: number;
  reorderThreshold: number;
  costPerUnit: number;
  lastRestocked: string;
  status: "in_stock" | "low_stock" | "out_of_stock";
}

export const initialInventory: InventoryItem[] = [
  {
    productId: "aloe-oat-comfort",
    productName: "Aloe Oat Comfort Bar",
    sku: "BT-AOC-100",
    stockLevel: 50,
    reorderThreshold: 15,
    costPerUnit: 80,
    lastRestocked: "2026-04-01",
    status: "in_stock",
  },
  {
    productId: "milk-honey-cream",
    productName: "Milk Honey Cream Bar",
    sku: "BT-MHC-100",
    stockLevel: 45,
    reorderThreshold: 15,
    costPerUnit: 85,
    lastRestocked: "2026-04-01",
    status: "in_stock",
  },
  {
    productId: "rose-aloe-softening",
    productName: "Rose Aloe Softening Bar",
    sku: "BT-RAS-100",
    stockLevel: 40,
    reorderThreshold: 15,
    costPerUnit: 80,
    lastRestocked: "2026-04-01",
    status: "in_stock",
  },
  {
    productId: "haldi-chandan-glow",
    productName: "Haldi Chandan Glow Bar",
    sku: "BT-HCG-100",
    stockLevel: 35,
    reorderThreshold: 15,
    costPerUnit: 85,
    lastRestocked: "2026-04-01",
    status: "in_stock",
  },
  {
    productId: "sandalwood-aloe-ritual",
    productName: "Sandalwood Aloe Ritual Bar",
    sku: "BT-SAR-100",
    stockLevel: 30,
    reorderThreshold: 15,
    costPerUnit: 90,
    lastRestocked: "2026-04-01",
    status: "in_stock",
  },
  {
    productId: "discovery-set-3",
    productName: "3-Bar Discovery Set",
    sku: "BT-DS3-300",
    stockLevel: 20,
    reorderThreshold: 8,
    costPerUnit: 240,
    lastRestocked: "2026-04-01",
    status: "in_stock",
  },
  {
    productId: "discovery-kit-5",
    productName: "5-Bar Discovery Kit",
    sku: "BT-DK5-500",
    stockLevel: 15,
    reorderThreshold: 5,
    costPerUnit: 400,
    lastRestocked: "2026-04-01",
    status: "in_stock",
  },
];
