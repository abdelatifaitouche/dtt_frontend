import React from "react";

function TermsPopUp({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h2>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          Grant Thornton Algeria is committed to respecting your privacy and protecting your personal data. 
          In the interest of transparency, Grant Thornton Algeria has adopted a "Personal Data Protection Policy" 
          concerning the personal data collected by Grant Thornton Algeria.
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          Grant Thornton Algeria has updated its Personal Data Protection Policy in accordance with Law No. 18-07 of 
          25 Ramadhan 1439 (June 10, 2018) on the protection of individuals regarding the processing of personal data.
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          This Policy aims to inform you about the commitments made by Grant Thornton Algeria to ensure the protection 
          of your personal data. The data you provide on our site is processed by the data controller, Grant Thornton SPA.
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          Your data can only be processed after obtaining your explicit "consent" and will be used for the following purposes:
        </p>

        <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Subscription to offered services</li>
          <li>Adapting and improving our services for website users</li>
          <li>Targeted advertising</li>
        </ul>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          Personal data is processed by:
        </p>

        <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
          <li>The data controller itself, "Grant Thornton SPA"</li>
          <li>Third parties: any employee within "Grant Thornton SPA"</li>
        </ul>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          Grant Thornton SPA ensures the security of your personal data, which is systematically encrypted using 
          a powerful algorithm. You can request rectification or deletion of your personal data by contacting the data controller.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">Cookies</h3>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          While browsing Our App <a href="http://www.gtdtt.digital" className="text-blue-600">www.gtdtt.digital</a>, 
          cookies may be used. If you continue browsing without changing your browser settings, you accept the use of cookies.
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          Cookies are a set of information stored by your browser on your hard drive. They allow us to understand the characteristics 
          of your visit to our site (browser type, etc.).
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          Grant Thornton Algeria uses two types of cookies:
        </p>

        <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Session or preference cookies necessary for navigation and site functionality</li>
          <li>Analytics cookies to track your browsing for statistical purposes and to help improve our services</li>
        </ul>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          These cookies aim to:
        </p>

        <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Measure the number of users to improve service usability</li>
          <li>Analyze data to understand user interactions with our services</li>
        </ul>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          If you refuse the use of certain cookies, some site functions may not be fully available.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">Security</h3>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          Grant Thornton Algeria takes all necessary precautions, as well as appropriate technical and organizational 
          measures, to ensure the security of your personal data and prevent unauthorized access, alteration, or damage.
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          In particular, Grant Thornton Algeria ensures that personnel authorized to process personal data receive mandatory 
          training on data protection.
        </p>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsPopUp;
