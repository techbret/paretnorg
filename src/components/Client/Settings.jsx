import { Fragment, useState } from "react";
import {
  Disclosure,
  Menu,
  RadioGroup,
  Switch,
  Transition,
} from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { UserAuth } from "../../context/AuthContext";

const user = {
  name: "Lisa Marie",
  email: "lisamarie@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const subNavigation = [
  { name: "Profile", href: "#", icon: UserCircleIcon, current: false },
  { name: "Account", href: "#", icon: CogIcon, current: false },
  { name: "Password", href: "#", icon: KeyIcon, current: false },
  { name: "Notifications", href: "#", icon: BellIcon, current: false },
  { name: "Plan & Billing", href: "#", icon: CreditCardIcon, current: true },
  { name: "Integrations", href: "#", icon: SquaresPlusIcon, current: false },
];
const plans = [
  {
    name: "Home School Individual License",
    priceMonthly: 79,
    priceYearly: 850,
    limit: "Up to 2 students",
  },
  {
    name: "Small Group License",
    priceMonthly: 129,
    priceYearly: 1350,
    limit: "Up to 25 students",
  },
  {
    name: "Enterprise",
    priceMonthly: 450,
    priceYearly: 5000,
    limit: "Professional Grading Up to 100 students",
  },
];
const payments = [
  {
    id: 1,
    date: "1/1/2020",
    datetime: "2020-01-01",
    description: "Business Plan - Annual Billing",
    amount: "CA$109.00",
    href: "#",
  },
  // More payments...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);

  const { profile } = UserAuth();

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="h-full">
        <h1 className="text-2xl text-center font-bold pt-8">
          Update your user information
        </h1>
        <h3 className="text-center text-lg">
          This information will not be displayed publicly and we work hard to
          ensure your privacy.
        </h3>

        <main className="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Payment details */}
            <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
              <section aria-labelledby="payment-details-heading">
                <form action="#" method="POST">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2
                          id="payment-details-heading"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          User Details
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Update your user details. This account was created on
                          January 5, 2017, 8:35:40 PM.
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-4 gap-6">
                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="cc-given-name"
                            placeholder={profile.firstName}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="cc-family-name"
                            placeholder={profile.lastName}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            placeholder={profile.email}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                          <p className="text-gray-600 text-xs">
                            *We do not sell you information. Please use an email
                            we can best contact you{" "}
                          </p>
                        </div>

                        <div className="col-span-4 sm:col-span-1">
                          <label
                            htmlFor="expiration-date"
                            className="block text-sm font-medium text-gray-700"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            name="expiration-date"
                            id="expiration-date"
                            autoComplete="cc-exp"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            placeholder={profile.city}
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-1">
                          <label
                            htmlFor="security-code"
                            className="flex items-center text-sm font-medium text-gray-700"
                          >
                            <span>State</span>
                          </label>
                          <input
                            type="text"
                            name="state"
                            id="state"
                            autoComplete="state"
                            placeholder={profile.state}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm font-medium text-gray-700"
                          >
                            ZIP / Postal code
                          </label>
                          <input
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            autoComplete="postal-code"
                            placeholder={profile.zip}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </section>

              {/* Plan */}
              <section aria-labelledby="plan-heading">
                <form action="#" method="POST">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2
                          id="plan-heading"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Update Password
                        </h2>
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-5">
                        <div className="col-span-3 sm:col-span-1">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Old Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="password"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-3 sm:col-span-1">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            name="password1"
                            id="password1"
                            autoComplete="password"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-3 sm:col-span-1">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="password1"
                            id="password1"
                            autoComplete="password1"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </section>

             
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
