export default function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-sm bg-blue-900 text-white flex items-center justify-center font-bold">
          FA
        </div>
        <span className="text-xl font-bold">FlowTrace AI</span>
        <span className="ml-4 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600 border border-red-200">
          LIVE
        </span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="font-medium text-slate-700">Union Bank CBS</span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-slate-500">Connected</span>
        </div>
      </div>
    </header>
  )
}
