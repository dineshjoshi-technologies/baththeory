# Bath Theory Deployment Guide

## Prerequisites
- GitHub account (already have: dineshjoshi-technologies/baththeory)
- Vercel account (free tier)
- Domain name (e.g., baththeory.in)
- WhatsApp Business number
- Razorpay account (for payment links)

---

## 1. Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." → "Project"
3. Import the `baththeory` repository from dineshjoshi-technologies
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_WHATSAPP_NUMBER=<your-actual-whatsapp-number-with-country-code>
   NEXT_PUBLIC_GA_MEASUREMENT_ID=<your-ga4-measurement-id>
   NEXT_PUBLIC_RAZORPAY_KEY_ID=<your-razorpay-key-id>
   ```
6. Click "Deploy"
7. Wait for deployment to complete (~2 minutes)

### Option B: Vercel CLI
```bash
npm i -g vercel
cd baththeory
vercel login
vercel
# Follow prompts, add env vars in dashboard after deploy
```

---

## 2. Configure Custom Domain

1. Go to Vercel dashboard → your project → Settings → Domains
2. Add your domain (e.g., `baththeory.in`)
3. Vercel will show DNS records to add:
   - **Type**: A or CNAME
   - **Name**: @ or www
   - **Value**: Vercel-provided value
4. Add these records in your domain registrar (GoDaddy, Namecheap, etc.)
5. Wait for DNS propagation (up to 48 hours, usually faster)
6. Vercel auto-provisions SSL certificate

---

## 3. Set Up WhatsApp Business

1. Download WhatsApp Business app on your phone
2. Register with your business number
3. Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel env vars
4. Format: country code + number (e.g., `919876543210` for India)
5. Set up business profile:
   - Business name: Bath Theory
   - Category: Health/Beauty
   - Description: Handcrafted bath & body products
   - Business hours: 9am-7pm IST

---

## 4. Set Up Razorpay Payment Links

1. Sign up at [razorpay.com](https://razorpay.com)
2. Complete KYC verification
3. Go to Payment Links → Create Payment Link
4. Create one link per product:
   - Aloe Oat Comfort Bar → ₹249
   - Milk Honey Cream Bar → ₹249
   - Rose Aloe Softening Bar → ₹249
   - Haldi Chandan Glow Bar → ₹249
   - Sandalwood Aloe Ritual Bar → ₹249
   - 3-Bar Discovery Set → ₹649
   - 5-Bar Discovery Kit → ₹999
5. Copy each payment link URL
6. Update `src/components/OrderForm.tsx` with actual links in the `PAYMENT_LINKS` object:
   ```typescript
   const PAYMENT_LINKS: Record<string, string> = {
     "aloe-oat": "https://pages.razorpay.com/pl_your_actual_link",
     // ... update all products
   };
   ```
7. Commit and push changes (auto-deploys to Vercel)

---

## 5. Set Up Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new property for Bath Theory
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to Vercel env vars as `NEXT_PUBLIC_GA_MEASUREMENT_ID`

---

## 6. Verify Deployment

After everything is set up:
1. Visit your domain (e.g., https://baththeory.in)
2. Test the order flow:
   - Click "Order Now" on any product
   - Fill in the form
   - Verify WhatsApp message opens with correct details
   - Verify Razorpay link opens (if UPI selected)
3. Visit `/admin` to check inventory dashboard
4. Check page speed at [pagespeed.web.dev](https://pagespeed.web.dev)

---

## Admin Access

The admin dashboard is at `https://yourdomain.com/admin`

Currently it uses localStorage for inventory tracking. For production use, share the admin URL only with team members. Phase 2 will add proper authentication.

---

## Ongoing Maintenance

- **Inventory**: Update stock levels in `/admin` dashboard after each batch production
- **Orders**: Monitor WhatsApp for incoming orders
- **Analytics**: Check Google Analytics dashboard weekly for traffic insights
- **Re-deployment**: Any push to GitHub main branch auto-deploys to Vercel
