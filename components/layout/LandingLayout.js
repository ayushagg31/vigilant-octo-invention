("use client");

export default function LandingLayout({ children }) {
  return (
    <>
      <div className="is-flex is-fullwidth">
        <div>{children}</div>
      </div>
    </>
  );
}
