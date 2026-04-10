# 🌿 BioNatural: System Operating Manual (Staff & Admin)
**Building the Franchise of the Future**

This manual outlines the 4-tier Command Center architecture of the BioNatural digital ecosystem.

---

## 1. 🛒 Customer Hub (The Website)
**URL:** [http://localhost:3000](http://localhost:3000) (Demo) / [bio-natural.mx](https://bio-natural.mx) (Live)
* **Staff Role:** None. The site is automated.
* **Key Feature:** The **AI Concierge**. It handles customer queries 24/7 using the "Smart Brain" data stored in Supabase.

---

## 2. 📱 Social Content Hub
**Access:** Teable -> `Content Calendar` Table
**Role: Social Media Manager**
* **Workflow:**
  1. Log into the **"Social Pipeline"** Kanban View.
  2. Review the pre-generated captions in **EN/ES**.
  3. Drag a post card from "Draft" -> "Approved".
  4. **Automation:** Once "Approved," n8n will prepare the post or notify the manager via WhatsApp with the assets.
* **Rule:** Do NOT edit product pricing. You can only view product benefits to ensure accurate captions.

---

## 3. 📦 Staff Operations Hub
**Access:** Teable -> `Master Inventory` Table
**Role: Warehouse/Buyer/Staff**
* **Workflow:**
  1. Use the **"Stock Master"** Grid View.
  2. Update **Price** or **Stock Status** (In Stock / Out of Stock).
  3. **Direct Sync:** Changes here update the Website and Chatbot within 60 seconds.
* **Rule:** You only have access to 200 high-priority products. 

---

## 4. 👑 Admin Command Center
**Access:** Teable -> `Admin Dashboard` Table
**Role: Owner (Meybell) / Architect (Mike)**
* **Workflow:**
  1. **Analytics:** View the counts for New Provider Leads and Franchise Applicants.
  2. **Editorial:** Write or AI-optimize Blog Posts in the "Editorial Desk."
  3. **Authorizations:** Grant or revoke staff access to the Teable Views.
* **Rule:** Full system access.

---

### 🆘 Emergency Instructions
* **System Down:** Restart the terminal and run `node automation/final-system-sync.js`.
* **Database Errors:** All data is backed up daily in the `F:/migration/` folder.

---
*Created by Antigravity for BioNatural | April 2026*
