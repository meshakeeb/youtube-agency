export function MaterialBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden [data-theme=web3]_&]:hidden hidden data-[active]:block">
      {/* shown only under material theme via CSS attribute selector */}
      <div className="absolute inset-0 bg-blob-orchestrator" />
      <style>{`
        [data-theme="material"] .material-bg-shapes { display: block; }
        [data-theme="web3"] .material-bg-shapes { display: none; }
      `}</style>
      <div className="material-bg-shapes absolute inset-0">
        <div className="bg-blob-purple absolute -top-32 -left-32 h-[480px] w-[480px]" />
        <div className="bg-blob-mauve absolute top-1/3 -right-32 h-[420px] w-[420px]" />
        <div className="bg-blob-purple absolute -bottom-40 left-1/3 h-[520px] w-[520px] opacity-60" />
      </div>
    </div>
  );
}
