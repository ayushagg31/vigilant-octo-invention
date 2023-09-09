("use client");
import NavBar from "./NavBar";

export default function DashboardLayout({ children }) {
    return (
        <>
            <div className="is-flex is-fullwidth" style={{ height: "100vh" }}>
                <NavBar />
                {children}
            </div>

        </>
    );
}
