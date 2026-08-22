const FLOW_STEPS = [
  {
    number: "01",
    title: "Request a quote",
    description: "Choose the source, destination, and amount.",
  },
  {
    number: "02",
    title: "Lock the swap",
    description: "Receive the payment request and its expiry.",
  },
  {
    number: "03",
    title: "Track execution",
    description: "Follow confirmations and state changes.",
  },
  {
    number: "04",
    title: "Claim or recover",
    description: "Complete delivery or show the next safe action.",
  },
];

const SWAP_STATES = [
  {
    state: "Quote expiry",
    guidance: "Refresh terms before the user commits funds.",
  },
  {
    state: "Confirmations",
    guidance: "Show what the route is waiting for.",
  },
  {
    state: "Amount mismatch",
    guidance: "Handle overpayment or underpayment without a dead end.",
  },
  {
    state: "Recovery",
    guidance: "Surface the next safe action if execution stops.",
  },
];

export default function DeveloperIntegrationFlow() {
  return (
    <section className="w-full bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium text-lime dark:text-lime-light uppercase tracking-[0.16em]">
            Integration flow
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Integrate the whole swap flow
          </h2>
          <p className="mt-4 text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
            A production integration covers more than execution. Satora gives your product the states it needs from
            quote creation to completion or recovery.
          </p>
        </div>

        <div className="mt-14">
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-0">
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gray-200 dark:bg-white/[0.12]"
            />

            {FLOW_STEPS.map((step, index) => (
              <div
                key={step.number}
                className="relative grid grid-cols-[40px_1fr] md:block gap-4 pb-8 last:pb-0 md:pb-0 md:px-4 first:md:pl-0 last:md:pr-0"
              >
                {index < FLOW_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="md:hidden absolute left-[19px] top-10 bottom-0 w-px bg-gray-200 dark:bg-white/[0.12]"
                  />
                )}
                <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-lime-light text-black text-[11px] font-semibold ring-4 ring-white dark:ring-black">
                  {step.number}
                </div>
                <div className="md:mt-6">
                  <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[15rem]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-gray-200 dark:border-white/[0.08] overflow-hidden bg-gray-50/70 dark:bg-white/[0.02]">
            <div className="grid grid-cols-1 sm:grid-cols-[0.8fr_1.2fr] gap-6 px-6 sm:px-8 py-7 border-b border-gray-200 dark:border-white/[0.08]">
              <div>
                <p className="text-[11px] font-medium text-lime dark:text-lime-light uppercase tracking-[0.16em]">
                  Beyond the happy path
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Build for every state
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed sm:self-end">
                Keep the interface clear while the swap moves across different rails, confirmations, and time
                constraints.
              </p>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-white/[0.08]">
              {SWAP_STATES.map((item) => (
                <div
                  key={item.state}
                  className="grid grid-cols-1 sm:grid-cols-[0.8fr_1.2fr] gap-2 sm:gap-6 px-6 sm:px-8 py-5"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.state}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.guidance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
