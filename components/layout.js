import Nav from "./nav";

function Layout({ children }) {
    return (
        <div className="mx-6 md:max-w-5xl md:mx-auto font-poppins px-5">
            <Nav />
            <main> { children } </main>
        </div>
    );
}

export default Layout;