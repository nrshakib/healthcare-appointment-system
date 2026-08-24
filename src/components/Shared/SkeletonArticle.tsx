export default function SkeletonArticle() {
  return (
    <div className="h-full w-full px-1 py-2 min-[380px]:px-2 sm:px-3">
      <div className="h-full w-full rounded-lg border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div
          className="w-full animate-pulse bg-slate-100"
          style={{ aspectRatio: "16 / 11", minHeight: 190, maxHeight: 250 }}
        />
        <div className="flex flex-col gap-2 p-3 sm:p-4">
          <div className="h-6 w-20 rounded-full bg-slate-100 animate-pulse" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-slate-100 animate-pulse" />
          </div>
          <div className="mt-auto flex items-center gap-2 pt-2">
            <div className="h-3 w-16 rounded bg-slate-100 animate-pulse" />
            <div className="h-1 w-1 rounded-full bg-slate-200" />
            <div className="h-3 w-14 rounded bg-slate-100 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
