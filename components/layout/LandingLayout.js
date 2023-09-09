("use client");

export default function LandingLayout({ children }) {
    return (
        <>
            <div className="is-flex is-fullwidth">
                <div style={{ background: 'wheat' }}>
                    {children}
                </div>
            </div>

        </>
    );
}
