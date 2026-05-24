import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for CalculateToday — how we collect, use, and protect your data, our cookie practices, and affiliate link disclosures.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Effective date: 24 May 2025 &nbsp;·&nbsp; Last updated: 24 May 2025</p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Introduction</h2>
          <p>
            Welcome to <strong>CalculateToday</strong> (<a href="https://calculate-today.com" className="text-primary hover:underline">https://calculate-today.com</a>).
            We provide free, browser-based financial calculators for income tax, EMI, SIP, GST, and more.
            This Privacy Policy explains what information we collect when you use our website, how we use it,
            and your choices regarding that information.
          </p>
          <p className="mt-3">
            By using CalculateToday, you agree to the practices described in this policy. If you do not agree,
            please discontinue use of the site.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Information We Collect</h2>
          <p>
            CalculateToday is a <strong>fully client-side calculator tool</strong>. We do not require you to
            create an account, log in, or submit any personal information to use the calculators.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>
              <strong>Calculator inputs:</strong> All values you enter (income, loan amount, interest rate, etc.)
              are processed entirely in your browser and are <em>never sent to our servers</em>.
            </li>
            <li>
              <strong>Usage data:</strong> We may collect anonymous analytics data such as pages visited,
              time spent on a page, browser type, device type, and approximate geographic region (country/state).
              This data cannot be used to identify you personally.
            </li>
            <li>
              <strong>Log data:</strong> Like most websites, our hosting infrastructure automatically records
              standard server logs (IP address, referring URL, timestamp). These are used solely for security
              monitoring and are not linked to individual users.
            </li>
          </ul>
        </section>

        {/* 3. How We Use Information */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">3. How We Use Information</h2>
          <p>We use the anonymous information collected to:</p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>Understand which calculators are most useful and improve their accuracy.</li>
            <li>Diagnose technical issues and improve site performance.</li>
            <li>Analyse traffic patterns to prioritise new calculator features.</li>
            <li>Detect and prevent abuse or fraudulent activity.</li>
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> sell, rent, or share your personal information with third parties for
            their own marketing purposes.
          </p>
        </section>

        {/* 4. Cookies */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Cookies</h2>
          <p>
            CalculateToday uses cookies and similar technologies to provide a better experience and to
            understand site usage.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>
              <strong>Analytics cookies:</strong> We use Google Analytics to collect anonymous usage statistics
              (pages viewed, session duration, device info). Google Analytics may set cookies in your browser.
              You can opt out using the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </li>
            <li>
              <strong>Functional cookies:</strong> Some features may use localStorage or session storage
              (entirely in your browser) to remember your last-used inputs. No data is transmitted to us.
            </li>
            <li>
              <strong>Third-party cookies:</strong> Affiliate partner links and embedded content from
              third-party services may set their own cookies. We do not control these cookies.
            </li>
          </ul>
          <p className="mt-3">
            You can configure your browser to refuse all or some cookies, or to alert you when cookies are
            being set. If you disable or refuse cookies, some parts of this site may become inaccessible or
            not function properly.
          </p>
        </section>

        {/* 5. Affiliate Link Disclosure */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Affiliate Link Disclosure</h2>
          <p>
            CalculateToday participates in affiliate marketing programs. This means that some links on this
            website — particularly links to financial products, banks, brokers, mutual fund platforms, or
            other financial services — are <strong>affiliate links</strong>.
          </p>
          <p className="mt-3">
            If you click an affiliate link and subsequently sign up, open an account, or make a purchase,
            we may earn a small commission from the third-party provider. <strong>This comes at no additional
            cost to you</strong> — the price or terms you receive are identical to what you would get by
            visiting the provider directly.
          </p>
          <p className="mt-3">
            Affiliate commissions help us keep all calculators free and maintain the website. Our editorial
            content, calculator logic, and product comparisons are <strong>not influenced by affiliate
            relationships</strong>. We only recommend products and services we consider genuinely useful
            for our users.
          </p>
          <p className="mt-3">
            Affiliate links are clearly labelled where possible with a note such as &ldquo;Affiliate link&rdquo;
            or &ldquo;We may earn a commission.&rdquo; We comply with the guidelines of the Advertising
            Standards Council of India (ASCI) and applicable disclosure requirements.
          </p>
        </section>

        {/* 6. Third-Party Services */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Third-Party Services</h2>
          <p>
            Our website may link to or embed content from third-party services, including but not limited to:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>
              <strong>Google Analytics</strong> — website analytics. See{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google&apos;s Privacy Policy
              </a>.
            </li>
            <li>
              <strong>Affiliate networks</strong> (e.g., Cuelink, and direct partner programs) — for
              tracking referrals to financial products. Each network operates under its own privacy policy.
            </li>
            <li>
              <strong>Netlify</strong> — our hosting provider. Netlify may process server request logs.
              See{' '}
              <a
                href="https://www.netlify.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Netlify&apos;s Privacy Policy
              </a>.
            </li>
          </ul>
          <p className="mt-3">
            We are not responsible for the privacy practices of these third parties. We encourage you to
            review their privacy policies before interacting with their services.
          </p>
        </section>

        {/* 7. Data Security */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Data Security</h2>
          <p>
            Since CalculateToday does not collect or store personal data, financial inputs, or user
            accounts, the risk of a data breach affecting your personal information is minimal. All
            calculator computations occur locally in your browser.
          </p>
          <p className="mt-3">
            Our website is served over HTTPS to encrypt data in transit. We take reasonable technical
            measures to protect the security of our infrastructure.
          </p>
        </section>

        {/* 8. Children's Privacy */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Children&apos;s Privacy</h2>
          <p>
            CalculateToday is not directed at children under the age of 13. We do not knowingly collect
            personal information from children. If you believe a child has provided personal information
            through our website, please contact us and we will promptly delete it.
          </p>
        </section>

        {/* 9. Your Rights */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Your Rights</h2>
          <p>
            As we do not collect identifiable personal data, there is generally no personal data held by
            us to access, correct, or delete. However, if you have concerns about data held by any of our
            third-party service providers (e.g., Google Analytics), you may exercise your rights directly
            with those providers under applicable data protection laws.
          </p>
          <p className="mt-3">
            Indian users may have rights under the Digital Personal Data Protection Act, 2023 (DPDPA).
            For questions, please contact us at the address below.
          </p>
        </section>

        {/* 10. Changes to This Policy */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices,
            technology, or legal requirements. When we make changes, we will update the
            &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this
            policy periodically.
          </p>
          <p className="mt-3">
            Continued use of CalculateToday after any changes constitutes your acceptance of the
            revised policy.
          </p>
        </section>

        {/* 11. Contact Us */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy, please
            contact us at:
          </p>
          <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="font-semibold text-slate-900">CalculateToday</p>
            <p className="text-slate-600">Website: <a href="https://calculate-today.com" className="text-primary hover:underline">https://calculate-today.com</a></p>
            <p className="text-slate-600">Email: <a href="mailto:privacy@calculate-today.com" className="text-primary hover:underline">privacy@calculate-today.com</a></p>
          </div>
        </section>

      </div>
    </div>
  );
}
