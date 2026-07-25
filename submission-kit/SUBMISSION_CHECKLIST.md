# Final submission checklist

## Repository

- [ ] Create a new public GitHub repository.
- [ ] Upload this project with a clear commit history; avoid one giant “final” commit if time allows.
- [ ] Replace `YOUR_REPOSITORY_URL` and live-link placeholders in the README.
- [ ] Confirm `.env` files and real passwords are not committed.
- [ ] Confirm the README diagrams render on GitHub.

## Deployment

- [ ] Deploy PostgreSQL and run migration.
- [ ] Seed one dedicated demo admin.
- [ ] Deploy the Express API.
- [ ] Set the exact frontend origin in `CLIENT_ORIGIN`.
- [ ] Deploy the React client with `VITE_API_URL`.
- [ ] Test from a fresh incognito browser.
- [ ] Confirm the secure cookie works across the two deployed domains.

## Required behavior

- [ ] Valid lead can be submitted.
- [ ] Invalid input is blocked on client and server.
- [ ] `/admin` redirects while signed out.
- [ ] Demo credentials work.
- [ ] Leads persist in PostgreSQL.
- [ ] Search works.
- [ ] Status changes persist after refresh.
- [ ] Activity history records the change.
- [ ] Mobile layout is intentional.
- [ ] Footer says “Built for Digital Heroes Training Task” and links correctly.

## Evidence

- [ ] Record a roughly three-minute Loom.
- [ ] Show a failed validation case.
- [ ] Show a successful form submission.
- [ ] Show admin login from a fresh browser.
- [ ] Show search and status update.
- [ ] Show one code decision and one improvement for another day.
- [ ] Set Loom access to anyone with the link.

## Drive folder

Name the folder:

`FullStackDevelopment_ShreyaLanka`

Include:

1. `01_Live_Links_and_Credentials.pdf` or Google Doc
2. `02_AI_Usage.pdf` or Google Doc
3. `03_Loom_Link.txt`
4. Optional screenshots showing mobile and desktop

The code itself should remain in GitHub; send links rather than duplicate source files.

## Link permissions

- [ ] Google Drive: anyone with the link can view
- [ ] GitHub: public
- [ ] Loom: anyone with the link can view
- [ ] Frontend: loads without login
- [ ] Admin: accessible with demo credentials

## Final Instagram DM

Use `SUBMISSION_MESSAGE.txt`, paste the single Drive folder link, and verify it opens while logged out.
