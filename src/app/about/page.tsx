import Header from "@/components/Header";
import React from "react";

export default function About() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="container">
        <Header />
        <main className="max-w-3xl mx-auto py-8 px-4  text-black">
          <section className="bg-white p-6 mb-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-4">
              What is Typio?
            </h2>
            <p className="mb-4">
              Typio is a dynamic typing platform designed to help users improve
              their typing speed and accuracy. Whether you're a beginner or a
              seasoned typist, Typio offers a fun and engaging way to track your
              words per minute (WPM), accuracy, and other key metrics.
            </p>
            <p>
              Our mission is to make typing practice accessible, enjoyable, and
              rewarding for everyone.
            </p>
          </section>
          <section className="bg-white p-6 mb-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Real-time WPM and accuracy tracking</li>
              <li>Customizable typing tests with various difficulty levels</li>
              <li>Detailed performance analytics and progress reports</li>
              <li>Interactive challenges and leaderboards</li>
              <li>Support for multiple languages and keyboard layouts</li>
            </ul>
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-4">
              Our Vision
            </h2>
            <p className="mb-4">
              At Typio, we believe that typing is a fundamental skill in the
              digital age. Our goal is to empower users to type faster and more
              accurately through innovative tools and a supportive community.
            </p>
            <p>
              Join us on this journey to master the keyboard and unlock your
              full typing potential!
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
