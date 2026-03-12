export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-360 ${className}`}>
      {children}
    </div>
  );
}