A simple static website built with **HTML**, **CSS**, and **JavaScript**, deployed using **GitHub Pages**.

## Project File Structure

```
├── index.html
├── index.css
├── wow.js
└── README.md
```

## Getting Started: Upload Files to GitHub

Follow these steps using the **bash/terminal** to push your HTML, CSS, and JS files to a GitHub repository.

### Step 1: Create a repository on GitHub
1. Go to [github.com](https://github.com) and log in.
2. Click **New repository**.
3. Give it a name (e.g., `my-website`).
4. Set visibility to **Public**.
5. Click **Create repository** (don't initialize with a README if you already have local files).

### Step 2: Open your project folder terminal
Open your project folder (containing `index.html`, `style.css`, `script.js`) in terminal:
- use command cd and navigate through your files

### Step 3: Initialize Git in your project folder
```bash
git init
```

### Step 4: Add your files to staging
```bash
git add .(using add . adds all files or u can even select files one at a time using git add file_name )
```

### Step 5: Commit the files
```bash
git commit -m "Initial commit: added HTML, CSS, JS files"
```

### Step 6: Rename branch to main (if needed)
```bash
git branch -M main
```

### Step 7: Connect your local repo to the GitHub repo
Replace the URL with your actual repository URL:
```bash
git remote add origin https://github.com/<your-username>/<repository-name>.git
```

### Step 8: Push your files to GitHub
```bash
git push -u origin main
```

Your files are now uploaded to GitHub! Refresh your repository page to confirm.

---

## Deploying with GitHub Pages

Once your files are pushed, follow these steps to make your site live and viewable by anyone.

### Step 1: Go to your repository on GitHub
Navigate to your repository page.

### Step 2: Open Settings
Click on the **Settings** tab (top right of the repo page).

### Step 3: Find the Pages section
In the left sidebar, click **Pages** (under "Code and automation").

### Step 4: Configure the source
1. Under **Build and deployment → Source**, select **Deploy from a branch**.
2. Under **Branch**, select `main` and folder `/ (root)`.
3. Click **Save**.

### Step 5: Wait for deployment
GitHub will build and deploy your site. This usually takes 1–2 minutes.

### Step 6: View your live site
Refresh the **Pages** settings tab — you'll see a message like:
```
Your site is live at https://<your-username>.github.io/<repository-name>/
```
Click the link to view it. Since the repository is public, **anyone can view this link** without needing a GitHub account.

---

## Making Future Updates

Whenever you make changes to your files, push them again using:

```bash
git add .
git commit -m "Describe your update here"
git push
```

GitHub Pages will automatically redeploy your site with the changes within a minute or two.

---

## Notes
- Make sure your main HTML file is named **`index.html`** — GitHub Pages looks for this file by default.
- It may take a few minutes for changes to appear live; try a hard refresh (`Ctrl + Shift + R`) if you don't see updates.
- You can check deployment status under the **Actions** tab in your repository.