import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for CalculateToday — rules governing your use of our free online calculators, disclaimers, intellectual property, and liability limitations.',
  alternates: { canonical: '/terms-of-service/' },
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-500">Effective date: 25 May 2025 &nbsp;·&nbsp; Last updated: 25 May 2025</p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed">

        {/* 1. Acceptance of Terms */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            Welcome to <strong>CalculateToday</strong> (<a href="https://calculate-today.com" className="text-primary hover:underline">https://calculate-today.com</a>),
            operated by <strong>CalculateToday</strong>. By accessing or using this website, you agree to be
            bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms,
            please discontinue use of the website immediately.
          </p>
          <p className="mt-3">
            We reserve the right to update or modify these Terms at any time. Continued use of the
            website after any changes constitutes your acceptance of the revised Terms. We encourage
            you to review this page periodically.
          </p>
        </section>

        {/* 2. Description of Service */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Description of Service</h2>
          <p>
            CalculateToday provides free, browser-based financial and general-purpose calculators,
            including tools for income tax, EMI, SIP, GST, BMI, and more. All calculator computations
            are performed entirely within your browser. No user account, login, or personal data
            submission is required to use the calculators.
          </p>
          <p className="mt-3">
            CalculateToday is an <strong>informational tool only</strong>. The results produced by
            our calculators are estimates based on the inputs you provide and publicly known
            formulas/rules. They do not constitute financial, investment, tax, legal, or any other
            professional advice.
          </p>
        </section>

        {/* 3. Permitted and Prohibited Use */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Permitted and Prohibited Use</h2>
          <p className="font-medium text-slate-800">You may:</p>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>Use the calculators for personal, educational, or informational purposes.</li>
            <li>Share links to CalculateToday pages with others.</li>
            <li>Reference calculation results for personal financial planning.</li>
          </ul>
          <p className="font-medium text-slate-800 mt-4">You may not:</p>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>
              Reproduce, copy, or redistribute the calculator tools, source code, or any substantial
              portion of the website content without prior written permission.
            </li>
            <li>
              Use automated scripts, bots, or scrapers to access or extract content from
              CalculateToday in bulk.
            </li>
            <li>
              Use the website for any unlawful purpose or in violation of any applicable laws or
              regulations.
            </li>
            <li>
              Attempt to interfere with, compromise, or disrupt the security or performance of
              the website or its underlying infrastructure.
            </li>
            <li>
              Misrepresent CalculateToday results as official tax, financial, or legal assessments.
            </li>
          </ul>
        </section>

        {/* 4. Disclaimer of Warranties */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Disclaimer of Warranties</h2>
          <p>
            CalculateToday is provided on an <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> basis,
            without any warranties of any kind, either express or implied. We do not warrant that:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>The website will be uninterrupted, error-free, or free of viruses or other harmful components.</li>
            <li>
              The calculator results are accurate, complete, current, or applicable to your specific
              situation. Tax rules, interest rates, and financial regulations change frequently — always
              verify results with a qualified professional or official government source.
            </li>
            <li>The website content is suitable for any particular purpose.</li>
          </ul>
          <p className="mt-3">
            <strong>CalculateToday is not a registered financial advisor, tax consultant, or legal
            professional.</strong> Results from our calculators should not be used as a substitute for
            professional advice. Always consult a certified financial planner, chartered accountant, or
            qualified advisor before making significant financial decisions.
          </p>
        </section>

        {/* 5. Limitation of Liability */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, CalculateToday, its owners, employees, and
            affiliates shall not be liable for any direct, indirect, incidental, special, consequential,
            or punitive damages arising out of or in connection with your use of, or inability to use,
            CalculateToday — including but not limited to:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>Financial losses resulting from reliance on calculator outputs.</li>
            <li>Errors, inaccuracies, or omissions in calculator results.</li>
            <li>Unauthorized access to or alteration of your data.</li>
            <li>Any other matter relating to the website or its content.</li>
          </ul>
          <p className="mt-3">
            Your sole remedy for dissatisfaction with the website is to discontinue use.
          </p>
        </section>

        {/* 6. Intellectual Property */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Intellectual Property</h2>
          <p>
            All content on CalculateToday — including but not limited to text, graphics, logos,
            calculator logic, user interface design, and code — is the property of CalculateToday and
            is protected under applicable intellectual property laws.
          </p>
          <p className="mt-3">
            You are granted a limited, non-exclusive, non-transferable licence to access and use
            the website for personal, non-commercial purposes only. No other rights are granted.
            Unauthorised use may give rise to a claim for damages and/or be a criminal offence.
          </p>
        </section>

        {/* 7. Third-Party Links and Affiliate Disclosure */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Third-Party Links &amp; Affiliate Disclosure</h2>
          <p>
            CalculateToday may contain links to third-party websites, financial products, or services,
            some of which are <strong>affiliate links</strong>. If you click an affiliate link and
            make a purchase or sign up, we may earn a commission at no additional cost to you.
          </p>
          <p className="mt-3">
            We are not responsible for the content, accuracy, or practices of any third-party websites
            linked from CalculateToday. The inclusion of any link does not imply our endorsement of
            that website or its operator. We encourage you to review the terms and privacy policies
            of any third-party site you visit.
          </p>
        </section>

        {/* 8. Privacy */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Privacy</h2>
          <p>
            Your use of CalculateToday is also governed by our{' '}
            <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>,
            which is incorporated into these Terms by reference. Please review the Privacy Policy
            to understand our practices regarding data collection and use.
          </p>
        </section>

        {/* 9. Governing Law */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of
            <strong> India</strong>, without regard to its conflict of law provisions. Any disputes
            arising under these Terms shall be subject to the exclusive jurisdiction of the courts
            located in India.
          </p>
        </section>

        {/* 10. Severability */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid under applicable
            law, that provision shall be modified to the minimum extent necessary to make it
            enforceable, and the remaining provisions shall continue in full force and effect.
          </p>
        </section>

        {/* 11. Contact */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms of Service, please contact us at:
          </p>
          <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="font-semibold text-slate-900">CalculateToday</p>
            <p className="text-slate-600">Website: <a href="https://calculate-today.com" className="text-primary hover:underline">https://calculate-today.com</a></p>
            <p className="text-slate-600">Email: <a href="mailto:aigenxlab@gmail.com" className="text-primary hover:underline">aigenxlab@gmail.com</a></p>
          </div>
        </section>

      </div>
    </div>
  );
}
