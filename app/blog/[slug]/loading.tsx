export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-16 animate-pulse">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-full" />
          <div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl mb-8" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/5" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}
