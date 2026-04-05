"use client";

import { useState } from "react";

interface OrderFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  product: string;
  quantity: number;
  paymentMethod: "upi" | "cod";
  notes: string;
}

interface OrderFormProps {
  whatsappNumber: string;
  onClose: () => void;
}

const PAYMENT_LINKS: Record<string, string> = {
  "aloe-oat": "https://pages.razorpay.com/pl_aloe_oat",
  "milk-honey": "https://pages.razorpay.com/pl_milk_honey",
  "rose-aloe": "https://pages.razorpay.com/pl_rose_aloe",
  "haldi-chandan": "https://pages.razorpay.com/pl_haldi_chandan",
  "sandalwood-aloe": "https://pages.razorpay.com/pl_sandalwood_aloe",
  "discovery-3": "https://pages.razorpay.com/pl_discovery_3",
  "discovery-5": "https://pages.razorpay.com/pl_discovery_5",
};

export default function OrderForm({ whatsappNumber, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    product: "",
    quantity: 1,
    paymentMethod: "upi",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productLabel = formData.product
      ? formData.product
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "";

    const paymentText = formData.paymentMethod === "upi" ? "UPI Payment Link" : "Cash on Delivery";

    const message = `🛍️ *New Order - Bath Theory*

👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone}
📧 *Email:* ${formData.email || "N/A"}

📦 *Product:* ${productLabel}
🔢 *Quantity:* ${formData.quantity}
💰 *Payment:* ${paymentText}

📍 *Address:*
${formData.address}
${formData.city}, ${formData.state} - ${formData.pincode}

${formData.notes ? `📝 *Notes:* ${formData.notes}` : ""}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    setSubmitted(true);

    if (formData.paymentMethod === "upi" && formData.product && PAYMENT_LINKS[formData.product]) {
      window.open(PAYMENT_LINKS[formData.product], "_blank");
    }

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-background rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Order Submitted!</h3>
          <p className="text-foreground/70 mb-6">
            {formData.paymentMethod === "upi"
              ? "Payment link opened in new tab. Send order details on WhatsApp to confirm."
              : "Opening WhatsApp to send your order details."}
          </p>
          <button
            onClick={onClose}
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-background rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold text-foreground">Place Your Order</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-secondary/40 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Product *</label>
              <select
                name="product"
                required
                value={formData.product}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              >
                <option value="">Select a product</option>
                <option value="aloe-oat">Aloe Oat Comfort Bar - ₹249</option>
                <option value="milk-honey">Milk Honey Cream Bar - ₹249</option>
                <option value="rose-aloe">Rose Aloe Softening Bar - ₹249</option>
                <option value="haldi-chandan">Haldi Chandan Glow Bar - ₹249</option>
                <option value="sandalwood-aloe">Sandalwood Aloe Ritual Bar - ₹249</option>
                <option value="discovery-3">3-Bar Discovery Set - ₹649</option>
                <option value="discovery-5">5-Bar Discovery Kit - ₹999</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                max="20"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Payment Method *</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 rounded-lg border border-secondary/30 cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === "upi"}
                    onChange={handleChange}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">UPI Payment</p>
                    <p className="text-xs text-foreground/50">Pay via Razorpay link</p>
                  </div>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-lg border border-secondary/30 cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">Cash on Delivery</p>
                    <p className="text-xs text-foreground/50">Pay when delivered</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Delivery Address *</label>
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                placeholder="House/Flat no., Street, Landmark"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="State"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Pincode *</label>
              <input
                type="text"
                name="pincode"
                required
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="6-digit pincode"
                maxLength={6}
                pattern="[0-9]{6}"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                placeholder="Any special requests or instructions"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
            >
              Place Order via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
