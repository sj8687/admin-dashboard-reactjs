
export const Card = ({ children, className = "" }:any) => (
  <div className={`bg-slate-800/60 border border-slate-700/50 rounded-2xl backdrop-blur-sm transition-all duration-200 card-hover ${className}`}>
    {children}
  </div>
);