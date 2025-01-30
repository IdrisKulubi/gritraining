import { RegistrationForm } from "@/components/forms/registration-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <div className="container max-w-4xl py-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-4xl font-bold text-green-800">
            GRI Certification Training Program 2025
          </h1>
          <p className="text-xl text-green-600">
            Register for our upcoming February cohort
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden mx-auto">
          <div className="p-6 sm:p-10">
            <div className="mb-8 space-y-4">
              <h2 className="text-2xl font-semibold text-green-700 text-center">
                Program Details
              </h2>
              <ul className="space-y-2 text-gray-600 max-w-2xl mx-auto">
                <li>
                  <strong>Dates:</strong> Match 5th - 7th, 2025
                </li>
                <li>
                  <strong>Location:</strong> Forest Lills Vumba (Zimbabwe)
                </li>
                <li>
                  <strong>Course fee:</strong> 500 USD
                </li>
                <li>
                  <strong>Certification:</strong> GRI Certified Sustainability
                  Practitioner
                </li>
              </ul>
              <p className="text-sm text-gray-500 italic text-center max-w-2xl mx-auto">
                This course offers hands-on learning experiences and valuable
                networking opportunities, suitable for both newcomers and
                experienced sustainability professionals.
              </p>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
