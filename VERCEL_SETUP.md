# Vercel Deployment Instructions

## Automated CI/CD

A GitHub Actions workflow has been set up at `.github/workflows/ci.yml` that:
- Runs lint and build on every push to `main` and every PR
- Uses repository secrets for environment variables

## Manual Vercel Setup Required

The Vercel CLI requires browser-based authentication. The board needs to complete these steps:

### Step 1: Login to Vercel

```bash
cd /home/dj/.paperclip/instances/default/projects/7d09468f-9972-46dc-b9e6-6e88a92b50da/ceebdc79-7df3-489e-8c3c-90e6616b7688/baththeory
vercel login
# Follow the browser prompt to authenticate
```

### Step 2: Deploy

```bash
vercel --yes
# Or use the dashboard: https://vercel.com/new
# Import: dineshjoshi-technologies/baththeory
```

### Step 3: Add Environment Variables

In the Vercel dashboard → Project Settings → Environment Variables, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number with country code (e.g., `919876543210`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Your Razorpay test key ID |

Or via CLI:
```bash
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
vercel env add NEXT_PUBLIC_RAZORPAY_KEY_ID
```

### Step 4: Link Project (for future deploys)

```bash
vercel link
# Select the baththeory project
```

After this, future deployments are as simple as:
```bash
vercel --prod
```

## GitHub Repository Secrets

For the CI workflow to work with env vars, add these in GitHub → Repo Settings → Secrets and variables → Actions:

| Secret | Description |
|--------|-------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay key ID |
