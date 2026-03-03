import Container from "./Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#0f3d4f] to-sky py-20 sm:py-28 lg:py-36">
      {/* Decorative shapes */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sky/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-sand/10 blur-2xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
              The only app that connects{" "}
              <span className="text-sand">nature</span> and{" "}
              <span className="text-sand">people</span>.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              Track local climate impact, explore maps, and join the community
              working to protect our natural world.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold text-white bg-green-accent hover:bg-green-accent-hover rounded-full shadow-lg shadow-green-accent/25 transition-all focus:outline-none focus:ring-2 focus:ring-green-accent focus:ring-offset-2 focus:ring-offset-navy"
              >
                Explore our app
              </a>
              <a
                href="#"
                className="text-base font-medium text-sky hover:text-white underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-sky rounded px-1"
              >
                How it works →
              </a>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-40 h-40 text-green-accent/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={0.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c4.97 0 9 4.03 9 9a9 9 0 01-9 9m0-18a9 9 0 00-9 9 9 9 0 009 9m0-18v18m-4.5-13.5C9.5 9 11 11.5 12 12m0 0c1-0.5 2.5-3 4.5-4.5"
                />
              </svg>
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-sand/20" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-sky/20" />
              <div className="absolute top-1/4 -right-3 w-8 h-8 rounded-full bg-green-accent/30" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
