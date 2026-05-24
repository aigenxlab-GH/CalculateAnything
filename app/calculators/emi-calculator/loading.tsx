/* Explicit Suspense fallback for the EMI route. If anything in the page
   tree suspends (e.g. font loading, chunk fetch), this renders instead
   of falling back to the prefetched root route. */
export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="h-6 w-48 bg-slate-100 rounded mb-6 animate-pulse" />
      <div className="h-12 w-72 bg-slate-100 rounded mb-3 animate-pulse" />
      <div className="h-4 w-96 bg-slate-100 rounded mb-8 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-4">
        <div className="h-[420px] rounded-2xl bg-slate-100 animate-pulse" />
        <div className="h-[420px] rounded-2xl bg-slate-100 animate-pulse" />
        <div className="h-[420px] rounded-2xl bg-slate-100 animate-pulse" />
      </div>
    </div>
  );
}
