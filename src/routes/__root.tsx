import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoreProvider } from "@/lib/store";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 text-center">
      <div>
        <div className="text-[11px] tracking-luxe text-gold mb-4">ERROR · 404</div>
        <h1 className="font-display text-7xl text-gradient-gold">Lost in the atelier</h1>
        <p className="mt-4 text-sm text-muted-foreground">The page you seek is not part of this collection.</p>
        <Link to="/" className="inline-block mt-8 px-7 py-3 bg-gold text-background text-[11px] tracking-luxe uppercase">Return Home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="font-display text-4xl text-foreground">Something interrupted us</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => { router.invalidate(); reset(); }} className="px-6 py-3 bg-gold text-background text-[11px] tracking-luxe uppercase">Try again</button>
          <a href="/" className="px-6 py-3 border border-border text-[11px] tracking-luxe uppercase hover:border-gold">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "House of Valerion — Cinematic Menswear, Tailored in Italy" },
      { name: "description", content: "House of Valerion — luxury menswear. Tuxedos, blazers, knitwear, hoodies, shirts and trousers crafted for the discerning few." },
      { property: "og:title", content: "House of Valerion" },
      { property: "og:description", content: "Cinematic menswear, tailored in Italy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <Toaster />
        </div>
      </StoreProvider>
    </QueryClientProvider>
  );
}
