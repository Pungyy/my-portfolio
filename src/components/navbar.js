"use client";
import { useTransitionRouter } from "next-view-transitions";


const Navbar = () => {

    const router = useTransitionRouter();

    function slideInOut() {
        document.documentElement.animate(
            [
                {
                    opacity: 1,
                    transform: "translateY(0)"
                },
                {
                    opacity: 0.2,
                    transform: "translateY(-35%)"
                },
            ], {
                duration: 1500,
                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        document.documentElement.animate(
            [
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                },
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                },
            ], {
                duration: 1500,
                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            },
        );
    }

    return(
        <nav className="nav bg-black md:bg-transparent fixed top-0 w-full p-4 z-50">
            <div className="logo">
                <div className="link">
                    <a 
                        onClick={(e) => {
                            e.preventDefault();
                            router.push("/", {
                                onTransitionReady: slideInOut,
                            });
                        }}
                        href="/"
                    >
                        HOME
                    </a>
                </div>
            </div>
            <div className="links">
                <div className="link">
                <a 
                        onClick={(e) => {
                            e.preventDefault();
                            router.push("/projects", {
                                onTransitionReady: slideInOut,
                            });
                        }}
                        href="/projects"
                    >
                        PROJECTS
                    </a>
                </div>
                <div className="link">
                <a 
                        onClick={(e) => {
                            e.preventDefault();
                            router.push("/contact", {
                                onTransitionReady: slideInOut,
                            });
                        }}
                        href="/contact"
                    >
                        CONTACT
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;