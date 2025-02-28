export default function PrivacyPage() {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
  
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <h3 className="font-medium mb-2">1.1 Non-Personal Information</h3>
            <div className="text-gray-600 mb-4">
              We automatically collect technical information when you use our services:
              <ul className="list-disc pl-6">
                <li>Device information (type, OS, browser)</li>
                <li>Usage data (pages visited, time spent)</li>
                <li>IP address (anonymized)</li>
                <li>Cookies and tracking data</li>
              </ul>
            </div>
  
            <h3 className="font-medium mb-2">1.2 Children&apos;s Privacy</h3>
            <div className="text-gray-600">
              We comply with COPPA regulations:
              <ul className="list-disc pl-6">
                <li>No collection of personal data from users under 13</li>
                <li>Parental consent required for any data collection</li>
                <li>Parents can review/delete child&apos;s information</li>
              </ul>
            </div>
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Data Usage</h2>
            <div className="text-gray-600 mb-4">
              We use collected information to:
              <ul className="list-disc pl-6">
                <li>Provide and maintain services</li>
                <li>Improve user experience</li>
                <li>Analyze usage patterns</li>
                <li>Prevent fraudulent activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Personal Information</h2>
            <div className="text-gray-600">
              maths2fun does not collect or solicit any personally identifiable information from children. 
              There are no contests or chat features on maths2fun.
            </div>
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Advertising</h2>
            <div className="text-gray-600 mb-4">
              We show contextually-based ads or other carefully-selected ads which are not based on 
              a user&apos;s browsing behavior. For more information about online advertising choices:
            </div>
  
            {/* <a 
              href="https://www.networkadvertising.org/managing/opt_out.asp" 
              className="text-yellow-600 hover:text-yellow-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Network Advertising Initiative Opt-Out
            </a> */}
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Contact Information</h2>
            <div className="text-gray-600 mb-2">
              All inquiries concerning maths2fun and its policies may be sent to: 
              <a href="mailto:info@maths2fun.com" className="text-yellow-600 hover:text-yellow-700">
                info@maths2fun.com
              </a>
            </div>
            {/* <address className="not-italic text-gray-600">
              Mailing Address: maths2fun LLC,<br />
              [Your Physical Address Here]<br />
              Phone: [Your Contact Number]
            </address> */}
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Data Security</h2>
            <div className="text-gray-600">
              We implement appropriate technical and organizational measures to protect your information.
            </div>
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Data Retention</h2>
            <div className="text-gray-600">
              We retain your information for as long as necessary to provide services and for legitimate business purposes.
            </div>
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. International Data Transfers</h2>
            <div className="text-gray-600">
              Your information may be transferred to — and maintained on — computers located 
              outside of your state, province, country or other governmental jurisdiction where 
              the data protection laws may differ from those of your jurisdiction.
            </div>
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Policy Updates</h2>
            <div className="text-gray-600">
              We may update this policy periodically. Material changes will be notified through:
              <ul className="list-disc pl-6">
                <li>Email to registered users</li>
                <li>Website banner notification</li>
                <li>Updated revision date below</li>
              </ul>
            </div>
          </section>
  
          <div className="mt-12 border-t pt-8">
            <div className="text-sm text-gray-500">
              Effective Date: {new Date().toLocaleDateString()}<br />
              Last Updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    );
  } 