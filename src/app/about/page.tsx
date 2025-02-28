export default function AboutPage() {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">About Maths2Fun</h1>
  
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <div className="text-gray-600 mb-4">
              <p>
                At maths2fun, we&apos;are dedicated to making mathematics engaging and accessible 
                for learners of all ages through interactive games and puzzles.
              </p>
            </div>
  
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Core Values</h2>
            <div className="text-gray-600">
              <ul className="list-disc pl-6">
                <li>Accessible learning for everyone</li>
                <li>Gamified educational experiences</li>
                <li>Safe and inclusive environment</li>
                <li>Adaptive learning paths</li>
                <li>Progress tracking and rewards</li>
              </ul>
            </div>
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Learning Methodology</h2>
            <div className="text-gray-600">
              <p>Our approach combines:</p>
              <ul className="list-disc pl-6">
                <li>Interactive problem solving</li>
                <li>Real-world math applications</li>
                <li>Personalized difficulty scaling</li>
                <li>Instant feedback mechanisms</li>
              </ul>
            </div>
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Safety & Privacy</h2>
            <div className="text-gray-600">
              <ul className="list-disc pl-6">
                <li>COPPA compliant platform</li>
                <li>No personal data collection</li>
                <li>Ad-free learning environment</li>
                <li>Secure cloud storage</li>
              </ul>
            </div>
          </section>
  
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <div className="text-gray-600">
              <p>Have questions or suggestions?</p>
              <a 
                href="mailto:support@maths2fun.com" 
                className="text-yellow-600 hover:text-yellow-700"
              >
                info@maths2fun.com
              </a>
            </div>
          </section>
        </div>
      </div>
    );
  } 