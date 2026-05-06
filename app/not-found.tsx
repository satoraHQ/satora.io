import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Not Found</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Could not find requested resource
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-80 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
}
