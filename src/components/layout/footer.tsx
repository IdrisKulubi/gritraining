export function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About GRI Training</h3>
            <p className="text-green-100">
              Leading sustainability reporting training program, empowering
              professionals worldwide.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  Program Details
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  Registration
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-green-100">Email: info@gritraining.com</li>
              <li className="text-green-100">Phone: +254 736489000</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-green-100 hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="text-green-100 hover:text-white">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-green-800 text-center text-green-100">
          <p>
            &copy; {new Date().getFullYear()} GRI Training. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
