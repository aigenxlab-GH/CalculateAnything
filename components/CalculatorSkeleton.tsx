export function CalculatorSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-3 w-10 bg-slate-200 rounded" />
        <div className="h-3 w-3 bg-slate-100 rounded" />
        <div className="h-3 w-32 bg-slate-200 rounded" />
      </div>

      {/* Title row */}
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-8 h-8 rounded-lg bg-slate-200 shrink-0" />
        <div className="h-7 w-56 bg-slate-200 rounded-lg" />
      </div>
      <div className="h-4 w-96 bg-slate-100 rounded mb-4" />

      {/* Calculator grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4">
        {/* Inputs panel */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-28 bg-slate-200 rounded" />
              <div className="h-10 bg-slate-100 rounded-xl" />
            </div>
          ))}
          <div className="h-10 bg-slate-200 rounded-xl mt-2" />
        </div>

        {/* Results panel */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          <div className="h-4 w-24 bg-slate-200 rounded" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50">
              <div className="h-3 w-28 bg-slate-100 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
            </div>
          ))}
          <div className="h-40 bg-slate-100 rounded-xl mt-2" />
        </div>

        {/* Comparison panel */}
        <div className="hidden lg:block bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
          <div className="h-4 w-36 bg-slate-200 rounded" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
