import Image from 'next/image'

export default function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-bg-primary px-4 border-palette-light-gray shadow-sm">
      <div className="flex items-center gap-2">
        <Image 
          src="/logo.png" 
          alt="FlowTrace AI Logo" 
          width={32} 
          height={32} 
          className="rounded-md"
        />
        <span className="text-size8 font-bold font-poppins text-text-primary">FlowTrace AI</span>
        <span className="ml-4 rounded-full bg-palette-red px-2 py-0.5 text-size3 font-semibold text-text-secondary border border-palette-red">
          LIVE
        </span>
      </div>
      <div className="flex items-center gap-3 text-size6 font-poppins">
        <span className="font-medium text-text-text4">Union Bank CBS</span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-palette-blue"></div>
          <span className="text-text-text5">Connected</span>
        </div>
      </div>
    </header>
  )
}
