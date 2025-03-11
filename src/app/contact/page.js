"use client";
import { useRef, useEffect, useState } from "react";
import ReactLenis from "@studio-freight/react-lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import emailjs from "emailjs-com";

gsap.registerPlugin(useGSAP);

const Info = () => {
  const container = useRef();
  const scrollIconRef = useRef();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  
  const formRef = useRef(); // Reference to the form element

  // Scroll listener to detect when the user reaches the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 10) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll icon animation
  useEffect(() => {
    gsap.fromTo(
      scrollIconRef.current,
      { y: 0 },
      {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      }
    );
  }, []);

  // Change the opacity of the scroll icon based on the scroll position
  useEffect(() => {
    if (isAtBottom) {
      gsap.to(scrollIconRef.current, {
        opacity: 0,
        duration: 0.5,
      });
    } else {
      gsap.to(scrollIconRef.current, {
        opacity: 1,
        duration: 0.5,
      });
    }
  }, [isAtBottom]);

  // GSAP animations for text
  useGSAP(
    () => {
      const text = new SplitType(".info p", {
        types: "lines",
        tagName: "div",
        lineClass: "line",
      });

      text.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
      });

      gsap.set(".info p .line span", {
        y: 400,
        display: "block",
      });

      gsap.to(".info p .line span", {
        y: 0,
        duration: 2,
        stagger: 0.075,
        ease: "power4.out",
        delay: 0.25,
      });

      return () => {
        if (text) text.revert();
      };
    },
    { scope: container }
  );

  // Send email function using EmailJS
  const sendEmail = (e) => {
    e.preventDefault();

    // Pass the form reference as the third parameter
    emailjs
      .sendForm(
        "service_x2l1ilq",  // Service ID
        "template_y3he5x9",  // Template ID
        formRef.current,      // Pass the form element
        "si5fFBZ6O48KSc0v3"  // Public key
      )
      .then(
        (result) => {
          setStatusMessage("Message sent successfully!");
          console.log(result);  // Show result for debugging
        },
        (error) => {
          setStatusMessage("Error sending message. Please try again.");
          console.log("Error details:", error);  // Show error details for debugging
        }
      );
  };

  // Function to scroll to the bottom of the page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <ReactLenis root>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        rel="stylesheet"
      />

      <div className="info flex items-center justify-center min-h-screen" ref={container}>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0">
          <div className="col flex justify-center mt-10 md:mt-0">
            <img src="/pungy.png" alt="Profile Picture" className="w-[90%] h-auto md:w-[90%] md:h-auto rounded-full" />
          </div>
          <div className="col text-center md:text-left px-4 md:px-0">
            <p>
              Hello! I'm Ibrahim, a Full-Stack Developer with experience in frontend technologies like HTML, CSS, and JavaScript.
              I've worked as a Web Developer at Novances IT and a Full-Stack Developer at One System. Currently,
              I'm advancing my skills at My Digital School Lyon to become a stronger web developer.
            </p>
          </div>
        </div>
      </div>

      <section className="contact-section bg-black text-white py-16 flex items-center justify-center h-screen">
        <div className="max-w-5xl w-full mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-8 text-center">CONTACT ME</h2>
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2">YOUR NAME</label>
              <input
                type="text"
                id="name"
                name="from_name" // Correspond to {{from_name}} in the template
                className="w-full p-4 border-2 border-white bg-black text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ENTER YOUR NAME"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2">YOUR EMAIL</label>
              <input
                type="email"
                id="email"
                name="from_email" // Correspond to {{from_email}} in the template
                className="w-full p-4 border-2 border-white bg-black text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ENTER YOUR EMAIL"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-2">YOUR MESSAGE</label>
              <textarea
                id="message"
                name="message" // Correspond to {{message}} in the template
                rows="6"
                className="w-full p-4 border-2 border-white bg-black text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="WRITE YOUR MESSAGE"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
          {statusMessage && (
            <div className="text-center text-white mt-4">
              <p>{statusMessage}</p>
            </div>
          )}
        </div>
      </section>

      <div
        ref={scrollIconRef}
        onClick={scrollToBottom} // Scroll to bottom on click
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-white text-3xl w-16 h-16 flex items-center justify-center border-4 border-white rounded-full cursor-pointer"
      >
        <i className="fas fa-chevron-down"></i>
      </div>
    </ReactLenis>
  );
};

export default Info;