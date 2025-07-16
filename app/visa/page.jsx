"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useVisaDetail from "../../store/useVisaDetail";
export default function VisaPage() {
  const { items, fetchItems, isFetchingItems } = useVisaDetail();

  useEffect(() => {
    fetchItems("", "", true);
  }, [fetchItems]);
  const visaServices = [
    {
      country: "Dubai Visa",
      image: "/images/dubai.jpg",
      processing: "3-5 Days",
      validity: "30 Days",
      price: "₹2,500",
      requirements: ["Passport", "Photo", "Bank Statement", "Hotel Booking"],
      description:
        "Tourist visa for Dubai with quick processing and high approval rate.",
    },
  ];

  const visaTypes = [
    {
      title: "Tourist Visa",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      description: "For leisure and sightseeing purposes",
    },
    {
      title: "Business Visa",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
          />
        </svg>
      ),
      description: "For business meetings and conferences",
    },
    {
      title: "Transit Visa",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      description: "For connecting flights and short layovers",
    },
    {
      title: "Medical Visa",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      description: "For medical treatment and healthcare",
    },
  ];

  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/visa/${id}`);
  };

  return (
    <main>
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Visa Services
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Your Gateway to Global Travel
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg opacity-80">
                Get your visa processed quickly and hassle-free with Arisha
                Tours and Travels. We provide comprehensive visa services for
                all major destinations worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Types */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Types of Visa Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We offer various types of visa services to meet your specific
              travel needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visaTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-2xl mx-auto w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Popular Visa Destinations
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Choose from our most popular visa services with guaranteed
              processing and support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items?.map((visa, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={visa.image || "/placeholder.svg"}
                    alt={visa.country}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {visa.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                    {visa.country}
                  </h3>
                  {/* <p className="text-gray-600 text-sm mb-4">
                    {visa.description}
                  </p> */}

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Processing:</span>
                      <span className="font-semibold text-gray-700">
                        {visa.days} Days
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Validity:</span>
                      <span className="font-semibold text-gray-700">
                        {visa.validity} Days
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      Requirements:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {visa.requirements.slice(0, 3).map((req, reqIndex) => (
                        <span
                          key={reqIndex}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                        >
                          {req}
                        </span>
                      ))}
                      {visa.requirements.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          +{visa.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleClick(visa._id)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Why Choose Our Visa Services?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-2xl mx-auto w-fit mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                High Success Rate
              </h3>
              <p className="text-gray-600">
                99% visa approval rate with our expert guidance
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-2xl mx-auto w-fit mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Quick Processing
              </h3>
              <p className="text-gray-600">
                Fast visa processing with regular updates
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl mx-auto w-fit mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock assistance for all your queries
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl mx-auto w-fit mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Document Support
              </h3>
              <p className="text-gray-600">
                Complete assistance with documentation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Apply for Your Visa?
          </h2>
          <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto text-lg">
            Get started with your visa application today. Our experts are here
            to guide you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Application
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-bold py-4 px-8 rounded-full transition-all duration-300">
              Contact Expert
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
