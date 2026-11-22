# Kengash murojaatlari — step-by-step demo

This is the same step-by-step prototype as the online version: a Telegram-bot phone on the left, the staff panel on the right, and **Next / Back / Auto** buttons that walk through a request from start to finish.

- **Sample data only.** Nothing is sent anywhere: no Telegram, no database, no server calls. Everything runs inside the browser.
- **No build step and no packages.** It is plain HTML, CSS and JavaScript.

## What is in the folder

```
kengash-demo/
├── public/              ← the website itself (this is what goes to Cloudflare)
│   ├── index.html
│   ├── css/style.css
│   ├── js/app.js        ← all demo logic and sample data
│   ├── favicon.svg
│   └── _headers         ← security settings Cloudflare applies to every page
├── server.js            ← tiny local server (needs only Node.js)
├── package.json         ← shortcuts: "npm start" and "npm run deploy"
├── wrangler.toml        ← Cloudflare settings for the command-line option
└── README.md
```

---

## Part 1 — Run it on your computer (localhost)

**Quickest way:** open the `public` folder and double-click `index.html`. The demo opens in your browser and works fully.

**Proper localhost way** (same security settings as on Cloudflare):

1. Install **Node.js** (the "LTS" version) from https://nodejs.org. Accept all defaults.
2. Unzip `kengash-demo.zip`, for example to your Desktop.
3. Open a terminal **in that folder**:
   - Windows: open the `kengash-demo` folder, click the address bar, type `cmd`, press Enter.
   - Mac: right-click the folder → **New Terminal at Folder**.
4. Type this and press Enter:
   ```
   npm start
   ```
5. You will see `Demo is running: http://localhost:8080`. Open that address in your browser.
6. To stop it, go back to the terminal and press **Ctrl + C**.

If it says the port is busy, use another number:
- Mac/Linux: `PORT=3000 npm start`
- Windows: `set PORT=3000 && npm start`

Then open `http://localhost:3000`.

---

## Part 2 — Put it on Cloudflare (free)

You get a public address like `https://kengash-demo.pages.dev`. Choose **one** option.

### Option A — Drag and drop in the browser (easiest, nothing to install)

1. Go to https://dash.cloudflare.com and sign in (or create a free account).
2. In the left menu, open **Workers & Pages**.
3. Click **Create application** → **Get started** next to "Drag and drop your files".
4. **Project name:** type `kengash-demo`. This becomes the address: `kengash-demo.pages.dev`.
5. Drag the **`public` folder** (not the whole `kengash-demo` folder) into the upload box.
   - You can also zip only the `public` folder and drop the zip.
   - Check that `index.html` is at the top level of what you upload; otherwise the site shows "not found".
6. Click **Deploy site**. Wait about 30 seconds.
7. Click the link that appears (`https://kengash-demo.pages.dev`). Done.

**To update it later:** Workers & Pages → `kengash-demo` → **Create a new deployment** → choose **Production** → drag the `public` folder again → **Save and Deploy**.

### Option B — From the terminal (good if you will update it often)

Needs Node.js (Part 1, step 1).

1. Open a terminal in the `kengash-demo` folder (Part 1, step 3).
2. Sign in to Cloudflare (a browser window opens; click **Allow**):
   ```
   npx wrangler@4 login
   ```
3. Create the project. Do this **only the first time**:
   ```
   npx wrangler@4 pages project create kengash-demo --production-branch main
   ```
4. Upload the site. Do this **every time** you want to publish changes:
   ```
   npm run deploy
   ```
   The `wrangler.toml` file already tells Cloudflare the project name and that the `public` folder is the site.
5. The terminal prints the address. Open it.

If Cloudflare says the name `kengash-demo` is taken, choose another name. Use it in step 3, and change `name = "kengash-demo"` in `wrangler.toml` to the same name.

---

## Good to know

- **Who can see it:** anyone who has the link. The page asks search engines not to list it (`noindex`). It contains only invented sample people and requests. If you want only colleagues to open it, turn on **Cloudflare Access** for the project (Zero Trust, free for up to 50 users).
- **Changing texts:** all screens, steps and sample data are in `public/js/app.js`; colours and layout are in `public/css/style.css`. Edit, save, refresh the browser. Then publish again (Option A "update" or Option B step 4).
- **This is a demo, not the real system.** The working bot and panel are in the separate `kengash.zip` (Cloudflare Workers + D1), and the production version will run on the Agency's own server as described in the technical document.
- **Free plan limits** are far above what a demo needs. Each file can be up to 25 MiB. Drag and drop allows up to 1,000 files, and this demo has 6.
