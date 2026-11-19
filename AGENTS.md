<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project architecture
- Keep this phase frontend-only: seed from typed src/data and share the CMS context between public and admin; this lets a future backend replace data access without redesigning pages.
- Use TanStack file routes with separate public/admin shells; each leaf owns metadata, and public details resolve locally published slugs after hydration.
- Leave the canonical site URL unset until a real domain is supplied; omit invented canonical and sitemap URLs.
- Persist draft and published snapshots separately in localStorage, with media blobs in IndexedDB; publishing is explicitly browser-local and provides no authentication.
- Render rich text as allowlisted React elements with validated links, never raw HTML; this keeps imported editorial content inert.
- Load GSAP and ScrollTrigger in a scoped homepage effect, revert on unmount and disable for reduced motion; this preserves SSR and navigation safety.
- Keep the admin login presentation-only with in-memory demo entry in the admin shell; never verify, persist or transmit credentials, because no authentication backend is connected.
