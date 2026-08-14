import UrlShortener from "./components/UrlShortener";

function App() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-xl font-bold tracking-tight">
            Short<span className="text-slate-500">ly</span>
          </div>

          <a
            href="#about"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            About
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex min-h-[calc(100vh-81px)] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mb-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
            Simple. Fast. Powerful.
          </div>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Make your links
            <span className="block text-slate-400">
              shorter and smarter.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            Transform long URLs into short, clean and shareable links
            in seconds.
          </p>

          <div className="mt-10 w-full flex justify-center">
            <UrlShortener />
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
            <span>✓ Fast</span>
            <span>✓ Easy to use</span>
            <span>✓ Secure</span>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-t border-slate-100 bg-slate-50 px-6 py-20"
      >
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-slate-950">
            Everything you need
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Create short URLs quickly and share them anywhere.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-7 text-left shadow-sm">
              <h3 className="font-semibold text-slate-900">
                Easy
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Paste your URL and get a short link instantly.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 text-left shadow-sm">
              <h3 className="font-semibold text-slate-900">
                Fast
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Generate short links through a fast backend API.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 text-left shadow-sm">
              <h3 className="font-semibold text-slate-900">
                Reliable
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Every short code points to its original URL.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;