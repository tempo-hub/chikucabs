"use client";

import React from "react";

const Page = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* ==================== HERO ==================== */}
      <section className="bg-[#BE1E23] px-4 pb-16 pt-32 text-white sm:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-white backdrop-blur-sm">
            CHIKU CABS
          </span>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Terms &amp; Conditions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            Please read these Terms &amp; Conditions carefully before using
            Chiku Cabs booking and transportation services.
          </p>
        </div>
      </section>

      {/* ==================== CONTENT ==================== */}
      <section className="px-4 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-white p-5 shadow-lg sm:p-8 md:p-12">
            {/* Last Updated */}
            <div className="mb-8 border-b border-gray-200 pb-5 text-sm text-gray-500">
              <strong className="text-gray-700">Last Updated:</strong>{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>

            {/* ==================== 1 ==================== */}
            <section className="border-b border-gray-100 py-6 first:pt-0">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                1. Introduction
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Welcome to Chiku Cabs. These Terms &amp; Conditions govern your
                use of the Chiku Cabs website, cab booking services,
                transportation services, and related services provided by Chiku
                Cabs.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                By accessing our website or booking a cab through Chiku Cabs,
                you agree to comply with and be bound by these Terms &amp;
                Conditions. If you do not agree with any part of these terms,
                please do not use our services.
              </p>
            </section>

            {/* ==================== 2 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                2. Our Services
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Chiku Cabs provides transportation and cab booking services,
                including but not limited to:
              </p>

              <ul className="mb-4 list-disc space-y-2 pl-6 text-sm leading-7 text-gray-600 sm:text-base">
                <li>One-way cab services</li>
                <li>Round-trip cab services</li>
                <li>Outstation cab services</li>
                <li>Local cab services</li>
                <li>Airport pickup and drop services</li>
                <li>Intercity transportation</li>
                <li>Corporate and business travel</li>
                <li>Other transportation services available on our website</li>
              </ul>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Availability of vehicles and services may depend on location,
                date, time, vehicle category, and other operational factors.
              </p>
            </section>

            {/* ==================== 3 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                3. Booking
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Customers must provide accurate and complete information while
                making a booking. This may include the passenger name, contact
                number, pickup location, destination, travel date, travel time,
                and other required information.
              </p>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                A booking is considered confirmed only after confirmation from
                Chiku Cabs through an appropriate communication channel such as
                phone, SMS, WhatsApp, email, or website confirmation.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Chiku Cabs reserves the right to decline or cancel a booking if
                the requested vehicle or service is unavailable or due to
                operational, safety, or other legitimate reasons.
              </p>
            </section>

            {/* ==================== 4 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                4. Fare and Pricing
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                The fare displayed or communicated at the time of booking is
                based on the information available for the selected journey.
              </p>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Depending on the selected service, additional charges may apply
                for tolls, parking, state taxes, permits, waiting time, extra
                kilometres, night charges, or other applicable government or
                operational charges.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Customers should confirm fare inclusions and exclusions before
                starting their journey.
              </p>
            </section>

            {/* ==================== 5 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                5. Payment
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Payment may be made through the payment methods made available
                by Chiku Cabs.
              </p>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Depending on the booking, customers may be required to pay an
                advance amount or the complete fare before the journey.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Any pending amount must be paid according to the payment terms
                communicated at the time of booking.
              </p>
            </section>

            {/* ==================== 6 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                6. Cancellation Policy
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Customers may request cancellation of their booking by
                contacting Chiku Cabs through the available communication
                channels.
              </p>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Cancellation charges, if applicable, may depend on the time of
                cancellation, vehicle category, journey type, booking
                conditions, and other applicable factors.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Any refund, where applicable, will be processed according to the
                applicable cancellation and refund policy.
              </p>
            </section>

            {/* ==================== 7 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                7. Rescheduling
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Requests to change the pickup time, date, destination, vehicle
                category, or other booking details should be made as early as
                possible.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Rescheduling is subject to vehicle availability and may result
                in additional charges depending on the requested changes.
              </p>
            </section>

            {/* ==================== 8 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                8. Pickup and Drop
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Customers are responsible for providing an accurate pickup
                location and destination.
              </p>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Customers should be available at the agreed pickup location at
                the scheduled pickup time. Delays caused by the passenger may
                result in waiting charges.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                The driver may contact the customer before or during the journey
                to coordinate pickup and drop-off.
              </p>
            </section>

            {/* ==================== 9 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                9. Waiting Time
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Waiting charges may apply when the customer is not available at
                the agreed pickup location or when additional waiting time is
                requested.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Airport, railway station, event, or other pickup locations may
                have specific waiting or parking charges.
              </p>
            </section>

            {/* ==================== 10 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                10. Driver and Vehicle
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Chiku Cabs aims to provide suitable vehicles and professional
                drivers for confirmed bookings.
              </p>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                However, the exact vehicle, driver, or registration number may
                be changed due to operational requirements, maintenance,
                availability, safety concerns, or unforeseen circumstances.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                In exceptional circumstances, Chiku Cabs may provide a
                comparable alternative vehicle.
              </p>
            </section>

            {/* ==================== 11 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                11. Passenger Responsibilities
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Passengers are expected to:
              </p>

              <ul className="mb-4 list-disc space-y-2 pl-6 text-sm leading-7 text-gray-600 sm:text-base">
                <li>Provide accurate booking information.</li>
                <li>Arrive at the pickup location on time.</li>
                <li>Follow reasonable instructions from the driver.</li>
                <li>Maintain cleanliness inside the vehicle.</li>
                <li>Respect the driver and vehicle.</li>
                <li>Follow applicable traffic and safety rules.</li>
              </ul>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Passengers may be responsible for damage caused to the vehicle
                due to intentional or negligent actions.
              </p>
            </section>

            {/* ==================== 12 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                12. Prohibited Activities
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Customers must not use Chiku Cabs services for any unlawful,
                dangerous, or prohibited activity.
              </p>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Carrying illegal substances, hazardous materials, weapons, or
                other prohibited items in the vehicle is not permitted.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Chiku Cabs may refuse transportation where it reasonably
                believes that the safety of passengers, drivers, vehicles, or
                other persons may be at risk.
              </p>
            </section>

            {/* ==================== 13 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                13. Luggage and Personal Belongings
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Customers are responsible for their personal belongings,
                luggage, electronic devices, documents, and valuables during the
                journey.
              </p>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Chiku Cabs is not responsible for personal belongings that are
                lost, damaged, or left behind in a vehicle unless required
                otherwise by applicable law.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Customers should check the vehicle carefully before leaving.
              </p>
            </section>

            {/* ==================== 14 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                14. Travel Delays
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Travel times are estimates and may vary due to traffic, weather
                conditions, road closures, accidents, construction, government
                restrictions, vehicle breakdowns, or other circumstances beyond
                our reasonable control.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Chiku Cabs does not guarantee an exact arrival time unless
                expressly agreed otherwise.
              </p>
            </section>

            {/* ==================== 15 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                15. Vehicle Breakdown or Replacement
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                In the event of vehicle breakdown, accident, maintenance
                requirements, or other unforeseen circumstances, Chiku Cabs will
                make reasonable efforts to arrange an alternative vehicle or
                appropriate assistance.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Any replacement vehicle will be subject to availability.
              </p>
            </section>

            {/* ==================== 16 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                16. Force Majeure
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Chiku Cabs shall not be held responsible for failure or delay in
                providing services caused by circumstances beyond its reasonable
                control.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Such circumstances may include natural disasters, severe
                weather, government restrictions, strikes, riots, road closures,
                accidents, civil disturbances, or other unforeseen events.
              </p>
            </section>

            {/* ==================== 17 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                17. Website Information
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                We make reasonable efforts to keep the information on our
                website accurate and updated. However, fares, vehicle
                availability, routes, services, images, and other information
                may change from time to time.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Website content should not be considered a guarantee of vehicle
                availability or service unless specifically confirmed by Chiku
                Cabs.
              </p>
            </section>

            {/* ==================== 18 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                18. Privacy
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Information collected during booking or while using our website
                may be processed in accordance with our Privacy Policy.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                By using our services, you acknowledge that you have read and
                understood our privacy practices.
              </p>
            </section>

            {/* ==================== 19 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                19. Limitation of Liability
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                To the extent permitted by applicable law, Chiku Cabs shall not
                be liable for indirect, incidental, special, or consequential
                losses arising from delays, changes in travel plans, traffic
                conditions, or circumstances beyond our reasonable control.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Nothing in these Terms &amp; Conditions is intended to exclude
                any liability that cannot legally be excluded under applicable
                law.
              </p>
            </section>

            {/* ==================== 20 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                20. Third-Party Services
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Certain services may involve third-party providers, payment
                gateways, technology providers, or other service partners.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Such services may be subject to the terms and policies of the
                respective third-party provider.
              </p>
            </section>

            {/* ==================== 21 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                21. Intellectual Property
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                All content available on the Chiku Cabs website, including
                logos, text, graphics, images, designs, trademarks, and other
                materials, is owned by or licensed to Chiku Cabs unless
                otherwise stated.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                No content may be copied, reproduced, modified, distributed, or
                commercially used without prior written permission.
              </p>
            </section>

            {/* ==================== 22 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                22. Changes to These Terms
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                Chiku Cabs may update or modify these Terms &amp; Conditions
                from time to time.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Updated terms will be published on this page. Customers are
                encouraged to review this page periodically.
              </p>
            </section>

            {/* ==================== 23 ==================== */}
            <section className="border-b border-gray-100 py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                23. Governing Law
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                These Terms &amp; Conditions shall be governed by and
                interpreted in accordance with the applicable laws of India.
              </p>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Any disputes arising in connection with the use of Chiku Cabs
                services shall be subject to the jurisdiction of the appropriate
                courts, as applicable.
              </p>
            </section>

            {/* ==================== 24 ==================== */}
            <section className="py-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                24. Contact Us
              </h2>

              <p className="mb-5 text-sm leading-7 text-gray-600 sm:text-base">
                If you have any questions, concerns, or complaints regarding
                these Terms &amp; Conditions, please contact Chiku Cabs.
              </p>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Chiku Cabs
                </h3>

                <div className="space-y-3 text-sm text-gray-600 sm:text-base">
                  <p>
                    <strong className="text-gray-800">Customer Support:</strong>{" "}
                    <a
                      href="tel:+916280820037"
                      className="font-semibold text-gray-900 hover:underline"
                    >
                      +91 84484 45504
                    </a>
                  </p>

                  <p>
                    <strong className="text-gray-800">Email:</strong>{" "}
                    <a
                      href="mailto:info@chikucabs.com"
                      className="font-semibold text-gray-900 hover:underline"
                    >
                      info@chikucabs.com
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* ==================== AGREEMENT ==================== */}
            <div className="mt-6 rounded-2xl border border-[#BE1E23]/20 bg-[#BE1E23]/5 px-5 py-8 text-center shadow-sm sm:px-8 sm:py-10">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#BE1E23]/10">
                <span className="text-xl font-bold text-[#BE1E23]">✓</span>
              </div>

              <h3 className="mb-3 text-xl font-bold text-[#BE1E23] sm:text-2xl">
                Thank You for Choosing Chiku Cabs
              </h3>

              <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                By booking a ride with Chiku Cabs, you acknowledge that you have
                read, understood, and agreed to these Terms &amp; Conditions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
