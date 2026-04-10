# Beginner's Guide: BioNatural Automation & Setup

If you are new to these tools, don't worry! Here is the plain-English guide to what we are doing and how to start.

## 1. What is "Seed Data"?
Imagine you have a new store with empty shelves. "Seed data" is just the first set of products we put on the shelves so we can see how the store looks.
- **Why I mentioned it:** I created a script called `seed-demo-data.js` that automatically adds 4 items (Vidanat Collagen, Braggs ACV, etc.) to your website so it's not empty.
- **How to do it**: You don't need to do anything yet. I will handle the "stocking" once we confirm the database is ready.

## 2. Your First Step with n8n
n8n is the "Glue" of your business. It's the robot that talks to Teable, Supabase, and Sendr for you.

**How to get started:**
1. **Login**: Go to your n8n dashboard (usually at `n8n.cloud` or your own server).
2. **Import**: I have provided a file called `N8N_SYNC_BLUEPRINT.md`. Inside it is a block of "JSON" code. 
3. **Copy/Paste**: In n8n, you can simply **Copy** that code and **Paste** it directly onto your n8n workspace (where the nodes go). It will automatically "draw" the workflow for you!
4. **Fill in the blanks**: You will see boxes that say "YOUR_TEABLE_ID". You just replace those with the IDs from your Teable account.

## 3. The New "Sales Machine" (BHuman & Sendr)
Adding BHuman and Sendr is a brilliant move. Here is the automated journey we will build:

1. **The Hook**: A customer buys a high-value supplement (like CBD or Collagen) on the website.
2. **The Surprise (BHuman)**: n8n sees the "Purchase" and tells **BHuman** to generate a video. In the video, you (or an AI avatar) says: *"Hola [Nombre], I saw you got the Vidanat Collagen! This is going to be great for your skin. Check out this guide on how to use it..."*
3. **The Delivery (Sendr)**: **Sendr** sends that personalized video directly to their **WhatsApp** instantly.

---

### 🚀 Immediate Recommendation
Would you like me to focus on setting up the **BHuman Video Script** first to capture that "Organic Luxury" vibe we discussed in the SEO research?
