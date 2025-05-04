import Header from "@/components/Header";
import React from "react";

export default function Contact() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="container">
        <Header />
        <main className="max-w-3xl mx-auto py-8 px-4 text-black">
          <section className="bg-white p-6 mb-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-4">
              Get in Touch
            </h2>
            <p className="mb-4">
              We’d love to hear from you! Whether you have questions, feedback,
              or need support, feel free to reach out to the Typio team.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-indigo-900">Email</h3>
                <p>
                  <a
                    href="mailto:support@typio.com"
                    className="text-indigo-600 hover:underline"
                  >
                    support@typio.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-indigo-900">
                  Social Media
                </h3>
                <p>
                  Follow us on{" "}
                  <a
                    href="https://x.com/typio"
                    className="text-indigo-600 hover:underline"
                  >
                    X
                  </a>{" "}
                  for updates and community events.
                </p>
              </div>
            </div>
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-4">
              Support
            </h2>
            <p className="mb-4">
              For technical issues or account-related queries, please visit our{" "}
              <a href="/support" className="text-indigo-600 hover:underline">
                Support Center
              </a>{" "}
              or email us directly.
            </p>
            <p>
              Our team is available Monday through Friday, 9 AM to 5 PM (UTC),
              and we aim to respond within 24 hours.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
