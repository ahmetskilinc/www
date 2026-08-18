import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-xl font-semibold text-red-400">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-600 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/" prefetch={true} className="font-mono text-sm font-semibold leading-6 text-gray-400 hover:underline">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
