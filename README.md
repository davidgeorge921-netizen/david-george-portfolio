# David George Automotive Portfolio

Premium Next.js portfolio for an automotive photography application, designed around product-first imagery, cinematic scroll, and Tesla-adjacent restraint.

## Run

This machine did not have `node` or `npm` available in the shell when the project was generated. Once Node.js 20+ is installed:

```bash
cd tesla-photography-portfolio
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Edit

- Portfolio content: `src/lib/portfolio.ts`
- Homepage sections: `src/app/page.tsx`
- Project pages: `src/app/projects/[slug]/page.tsx`
- Global styling: `src/app/globals.css`
- Images: `public/images`
- Resume link: `public/David_George_Resume.pdf`

Replace `mailto:hello@example.com` and the LinkedIn URL in `src/app/page.tsx` with your final contact links before publishing.

## Built In

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion page and reveal animation
- Lenis smooth scrolling
- Full-screen cinematic project pages
- Masonry gallery with filters
- Keyboard lightbox navigation
- Scroll progress indicator
- Dark/light mode toggle
- Resume download
