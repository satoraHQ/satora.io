import HomepageSwapWidget from "@/components/sections/HomepageSwapWidget";

const BENEFITS = [
  "No exchange deposit",
  "Receive in your wallet",
  "Recovery paths built in",
];

export default function RetailHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f4ef] dark:bg-black">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-25" />
      <div
        className="pointer-events-none absolute left-1/2 top-4 h-[760px] w-[min(900px,140vw)] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(194, 232, 33, 0.14) 0%, rgba(194, 232, 33, 0.06) 38%, rgba(194, 232, 33, 0) 72%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
        <h1 className="mx-auto max-w-5xl text-center text-[2.35rem] font-semibold leading-none tracking-[-0.055em] text-gray-950 min-[360px]:text-[2.7rem] sm:text-6xl lg:text-[4.25rem] dark:text-white">
          Make Bitcoin Move
        </h1>

        <div className="relative mx-auto mt-7 min-w-0 w-full max-w-xl sm:mt-9">
          <div
            className="pointer-events-none absolute -inset-x-16 -inset-y-20 sm:-inset-x-24 sm:-inset-y-28"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(194, 232, 33, 0.18) 0%, rgba(194, 232, 33, 0.08) 42%, rgba(194, 232, 33, 0) 74%)",
            }}
          />
          <HomepageSwapWidget />
        </div>

        <div className="mx-auto mt-9 max-w-3xl text-center sm:mt-11">
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
            Swap without trust.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
            Move between Bitcoin and stablecoins from your wallet to your chosen destination, without making an exchange
            deposit first.
          </p>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-gray-500 dark:text-gray-400">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
