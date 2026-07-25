# Product and UX decisions

## Visual direction: calm operations

Most CRM interfaces compete for attention with charts, sidebars, and dense controls. LeadDesk Mini uses a restrained slate-and-indigo system, generous whitespace, and a single primary action per area. This supports the central concept: signal, not clutter.

## Public landing page

- The form is visible beside the hero on large screens so the CTA has no navigation tax.
- On mobile, content stacks naturally and the form remains early in the page.
- The copy sets a concrete expectation: a useful response, not an automatic sales call.
- The budget choices are broad enough to qualify without creating false precision.
- Success replaces the form to remove duplicate-submit anxiety.

## Admin dashboard

- Summary cards provide queue context before the table.
- Search is the dominant control because names, emails, and project language are likely retrieval paths.
- Status remains editable in-place, reducing navigation for the most common action.
- Clicking identity—not the status control—opens details, avoiding competing row behaviors.
- The detail drawer preserves the queue context while showing the full message and audit history.

## Accessibility

- Native form controls and labels are used throughout.
- Status is communicated with text, not color alone.
- Focus styles are explicit.
- Dialog behavior uses semantic roles and a visible close action.
- Motion is disabled for users who prefer reduced motion.
- Desktop tables transform into mobile cards rather than forcing horizontal scrolling.
