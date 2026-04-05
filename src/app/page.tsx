"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import OrderForm from "@/components/OrderForm";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const featuredProducts = products.filter((p) => p.featured);
  const selected = products.find((p) => p.id === selectedProduct);

  const getWhatsAppMessage = (product?: typeof selected) => {
    if (!product) {
      return encodeURIComponent(
        "Hi! I'd like to know more about Bath Theory products."
      );
    }
    return encodeURIComponent(
      `Hi! I'd like to order:\n\n*${product.name}*\nPrice: ₹${product.price}\nWeight: ${product.weight}\n\nPlease confirm availability and delivery details.`
    );
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollToSection("hero")}
              className="font-serif text-xl font-semibold text-primary-dark"
            >
              Bath Theory
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("products")}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Our Story
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Contact
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-whatsapp text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-whatsapp/90 transition-colors"
              >
                Order on WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-secondary/30">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection("products")}
                  className="text-left text-foreground/70 hover:text-primary transition-colors"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left text-foreground/70 hover:text-primary transition-colors"
                >
                  Our Story
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left text-foreground/70 hover:text-primary transition-colors"
                >
                  Contact
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-whatsapp text-white px-4 py-2 rounded-full text-sm font-medium text-center hover:bg-whatsapp/90 transition-colors"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-16 min-h-screen flex items-center"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-primary font-medium tracking-wide uppercase text-sm">
                Handcrafted with Ancient Wisdom
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                The Ritual of
                <span className="text-primary"> Beautiful</span> Bathing
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed max-w-lg">
                Bath Theory brings the wisdom of Indian bathing rituals into
                modern self-care. Each bar is handcrafted with natural
                ingredients to nourish your skin and soothe your soul.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("products")}
                  className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
                >
                  Explore Products
                </button>
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="border border-primary text-primary px-6 py-3 rounded-full font-medium text-center hover:bg-primary/10 transition-colors"
                >
                  Order Now
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/products/hero.jpg"
                  alt="Bath Theory - Handcrafted Bath Rituals"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-2">
              Our Collection
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Signature Bath Rituals
            </h2>
            <p className="text-foreground/60 mt-4 max-w-2xl mx-auto">
              Each soap is crafted with care, using traditional Indian ingredients
              that have nourished skin for centuries.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => setSelectedProduct(product.id)}
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <span className="bg-white text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      View Details
                    </span>
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-foreground/60 text-sm mt-1">
                    {product.tagline}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-primary font-semibold text-lg">
                      ₹{product.price}
                    </span>
                    <span className="text-foreground/50 text-sm">
                      {product.weight}
                    </span>
                  </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setShowOrderForm(true)}
                        className="flex-1 bg-primary text-white py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
                      >
                        Order Now
                      </button>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage(product)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-whatsapp text-white py-2 px-3 rounded-full text-sm font-medium hover:bg-whatsapp/90 transition-colors text-center"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                    </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sets & Kits */}
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {products
              .filter((p) => p.category !== "single")
              .map((product) => (
                <div
                  key={product.id}
                  className="flex bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-5 flex-1">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-foreground/60 text-sm mt-1">
                      {product.tagline}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-primary font-semibold">
                        ₹{product.price}
                      </span>
                      <button
                        onClick={() => setShowOrderForm(true)}
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        Order →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <Image
                  src="/products/lifestyle.jpg"
                  alt="Bath Theory - Crafted with Love"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-primary font-medium tracking-wide uppercase text-sm">
                Our Story
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                Ancient Rituals, Modern Care
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Bath Theory was born from a simple belief: the wisdom of
                  centuries-old Indian bathing rituals deserves a place in
                  modern self-care.
                </p>
                <p>
                  Our grandmothers knew the power of turmeric for glowing skin,
                  sandalwood for cooling the body, and rose for softening. We&apos;ve
                  taken these time-tested ingredients and crafted them into
                  beautiful, gentle soaps for today&apos;s lifestyle.
                </p>
                <p>
                  Every bar is handcrafted in small batches using natural
                  ingredients. No harsh chemicals, no synthetic fragrances—just
                  pure, skin-loving goodness that honors the rituals of the past.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-primary">5</p>
                  <p className="text-sm text-foreground/60 mt-1">
                    Signature Bars
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-primary">
                    100%
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">
                    Natural Ingredients
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-primary">
                    Small
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">
                    Batch Crafted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-2">
              Why Bath Theory
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              The Bath Theory Difference
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
                title: "Natural Ingredients",
                description:
                  "Only pure, skin-loving ingredients sourced responsibly.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                ),
                title: "Handcrafted",
                description:
                  "Small batches, made with care and attention to detail.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                title: "Ancient Wisdom",
                description:
                  "Time-tested Indian ingredients for modern skincare.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                ),
                title: "Eco-Friendly",
                description:
                  "Sustainable packaging that's kind to the planet.",
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {benefit.icon}
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-2">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Ritual?
          </h2>
          <p className="text-foreground/60 mb-8 max-w-xl mx-auto">
            Order directly through WhatsApp for the fastest response. We accept
            UPI payments and Cash on Delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowOrderForm(true)}
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Place Order
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp text-white px-8 py-3 rounded-full font-medium hover:bg-whatsapp/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order on WhatsApp
            </a>
            <button
              onClick={() => scrollToSection("products")}
              className="border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary/10 transition-colors"
            >
              View Products
            </button>
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-medium text-foreground">Payment</p>
              <p className="text-foreground/60 mt-1">UPI & Cash on Delivery</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Delivery</p>
              <p className="text-foreground/60 mt-1">Pan India, 3-5 days</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Support</p>
              <p className="text-foreground/60 mt-1">WhatsApp, 9am-7pm IST</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-serif text-lg font-semibold text-primary-dark">
              Bath Theory
            </p>
            <p className="text-foreground/50 text-sm">
              © {new Date().getFullYear()} Bath Theory. Handcrafted with love in
              India.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-primary transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-background rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square relative overflow-hidden rounded-t-2xl">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors z-10"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {selected.name}
              </h3>
              <p className="text-primary font-medium mt-1">{selected.tagline}</p>
              <p className="text-foreground/70 mt-4 leading-relaxed">
                {selected.description}
              </p>

              <div className="mt-6">
                <h4 className="font-medium text-foreground mb-2">
                  Key Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-accent text-primary-dark px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-foreground mb-2">Benefits</h4>
                <ul className="space-y-1">
                  {selected.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="text-foreground/70 text-sm flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 text-primary flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-secondary/30">
                <div>
                  <span className="text-primary font-semibold text-2xl">
                    ₹{selected.price}
                  </span>
                  <span className="text-foreground/50 text-sm ml-2">
                    / {selected.weight}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setShowOrderForm(true);
                  }}
                  className="flex-1 bg-primary text-white py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
                >
                  Order Now
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage(selected)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-whatsapp text-white py-3 px-4 rounded-full font-medium hover:bg-whatsapp/90 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {showOrderForm && (
        <OrderForm
          whatsappNumber={WHATSAPP_NUMBER}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </div>
  );
}
