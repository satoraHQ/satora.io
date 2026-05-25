import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { ReactNode } from "react";

function SecurityPage(): ReactNode {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-[#0A0908]">
        {/* Hero */}
        <section className="px-6 pt-28 pb-24 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-medium mb-6">
            Security
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Satora takes the security of our systems and your funds seriously. We appreciate the security
            community&apos;s help in keeping our platform safe.
          </p>
        </section>

        {/* Reporting */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">Reporting a Vulnerability</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
            If you discover a security vulnerability in Satora, please report it to us privately so we can address it
            before public disclosure. <strong>Do not</strong>{" "}
            report security issues via public GitHub issues, Telegram, or Twitter.
          </p>

          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-4">
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <a
                href="mailto:security@satora.io"
                className="text-gray-600 dark:text-gray-400 underline"
              >
                security@satora.io
              </a>
            </div>
            <div>
              <h3 className="font-medium mb-1">PGP Key</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <a
                  href="/.well-known/security.asc"
                  className="underline"
                >
                  https://satora.io/.well-known/security.asc
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Disclosure Timeline */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">Disclosure Timeline</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
            We aim to respond to all vulnerability reports within 24 hours and will work with you to understand the
            scope and severity of the issue. Our typical disclosure timeline:
          </p>

          <div className="space-y-4">
            {[
              { step: "1. Acknowledgment", desc: "We confirm receipt within 24 hours." },
              { step: "2. Triage", desc: "We assess the report and determine severity within 3 business days." },
              { step: "3. Resolution", desc: "We develop and test a fix. Timeline depends on severity." },
              { step: "4. Release", desc: "We deploy the fix and notify you when it is live." },
              { step: "5. Disclosure", desc: "We coordinate public disclosure after the fix is deployed." },
            ].map((item) => (
              <div
                key={item.step}
                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="font-medium mb-1">{item.step}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Scope */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">Scope</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-3xl">
            We are interested in vulnerabilities affecting:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 max-w-3xl">
            <li>satora.io and its subdomains</li>
            <li>Satora API endpoints</li>
            <li>Satora smart contracts</li>
            <li>Satora mobile applications</li>
            <li>Satora SDK packages</li>
          </ul>
        </section>

        {/* Safe Harbor */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">Safe Harbor</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
            We consider security research conducted in good faith to be protected under safe harbor. This means:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 max-w-3xl">
            <li>
              You will not face legal action from Satora for vulnerability research conducted in accordance with this
              policy.
            </li>
            <li>
              We will not forward your personal data to law enforcement unless you violate applicable law.
            </li>
            <li>
              We ask that you make a good faith effort to avoid privacy violations, data destruction, and interruption
              or degradation of our services.
            </li>
            <li>
              Please only interact with accounts you own or have explicit permission to test.
            </li>
          </ul>
        </section>

        {/* Out of Scope */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">Out of Scope</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-3xl">
            The following are considered out of scope:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 max-w-3xl">
            <li>Rate limiting or brute force protection bypasses</li>
            <li>Missing security headers that do not impact security directly</li>
            <li>Self-XSS or issues requiring unlikely user interactions</li>
            <li>Social engineering attacks</li>
            <li>Physical attacks or physical security issues</li>
            <li>Presence of autofill / password manager attributes in forms</li>
            <li>TLS/SSL configuration issues</li>
            <li>Email SPF/DKIM/DMARC configuration issues</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">Contact</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:security@satora.io" className="underline">
                security@satora.io
              </a>
            </p>
            <p>
              <strong>PGP Key:</strong>{" "}
              <a href="/.well-known/security.asc" className="underline">
                /.well-known/security.asc
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SecurityPage;
