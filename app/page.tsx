export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 gap-16 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <main className="flex flex-col gap-8 row-start-2 w-full">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome to Our Content Management System (CMS)
            </h1>
          </div>
        </header>

        {/* Introduction Section */}
        <section className="w-full mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            An Innovative CMS for Effortless Content Management
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Our CMS is designed to make content management easier, faster, and
            more efficient. With a user-friendly interface and powerful
            features, managing your website&apos;s content has never been more
            straightforward. Whether you&apos;re adding, editing, or organizing
            content, our system provides everything you need to keep your site
            updated.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Key Features:
          </h3>
          <ul className="list-inside list-disc text-gray-600 space-y-2">
            <li>
              Easy-to-use interface for creating, updating, and deleting content
            </li>
            <li>Real-time preview of content changes</li>
            <li>
              Image slider integration for showcasing your content visually
            </li>
            <li>Seamless plugin management for extending functionality</li>
          </ul>
        </section>

        {/* Plugin Management */}
        <section className="w-full mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Plugin Management
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Our CMS includes a powerful plugin management system. Easily enable
            or disable plugins like the image slider, allowing you to customize
            the functionality of your website without any hassle.
          </p>
        </section>
      </main>
    </div>
  );
}
