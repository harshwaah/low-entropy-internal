import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">404</h1>
        <h2 className="text-xl font-semibold text-slate-700">Page Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested page could not be found. Please return to the overview portal.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
