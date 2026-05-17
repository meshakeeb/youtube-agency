export function Web3Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <style>{`
        [data-theme="web3"] .web3-bg-shapes { display: block; }
        [data-theme="material"] .web3-bg-shapes { display: none; }
      `}</style>
      <div className="web3-bg-shapes absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="bg-orb-orange absolute -top-32 right-10 h-[460px] w-[460px]" />
        <div className="bg-orb-gold absolute bottom-0 -left-32 h-[500px] w-[500px]" />
      </div>
    </div>
  );
}
