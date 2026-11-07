import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl space-y-6 px-4 py-32 text-center">
      <h1 className="text-6xl">We couldn&rsquo;t find that page</h1>
      <p className="text-haze">The link may be old, or the perfume may have moved.</p>
      <Link href="/fragrances" className="btn-primary">
        Browse the collection
      </Link>
    </div>
  );
}
