import { SignInButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-sky-600">Your App</h1>
          <nav>
            <SignInButton />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-sky-50 flex-grow">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center py-20">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome to <span className="text-sky-600">Your App</span>
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Simplify your workflow and manage your accounts seamlessly.
            </p>
            <a
              href="/signup"
              className="inline-block mt-6 px-6 py-3 bg-sky-600 text-white rounded-md shadow hover:bg-sky-700"
            >
              Get Started
            </a>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2">
            <img
              src="https://via.placeholder.com/500"
              alt="Hero Illustration"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-sky-100 rounded-full flex items-center justify-center">
                <span className="text-sky-600 text-3xl font-bold">1</span>
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-800">
                User-Friendly Interface
              </h4>
              <p className="mt-2 text-gray-600">
                Intuitive and simple design to help you manage your accounts
                effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-sky-100 rounded-full flex items-center justify-center">
                <span className="text-sky-600 text-3xl font-bold">2</span>
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-800">
                Secure Data
              </h4>
              <p className="mt-2 text-gray-600">
                Industry-standard security to keep your data safe and private.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-sky-100 rounded-full flex items-center justify-center">
                <span className="text-sky-600 text-3xl font-bold">3</span>
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-800">
                24/7 Support
              </h4>
              <p className="mt-2 text-gray-600">
                Our team is here to assist you at any time of the day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

