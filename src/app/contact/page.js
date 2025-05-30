"use client";

import { useRef, useState, useEffect } from "react";
import Lenis from "lenis"; // Import de Lenis avec le bon package
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import emailjs from "emailjs-com";

gsap.registerPlugin(useGSAP);

export default function Contact() {
  const container = useRef();
  const formRef = useRef();
  const scrollIconRef = useRef();
  const [statusMessage, setStatusMessage] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(false);

  const lenisRef = useRef(null); // Référence à Lenis

  useEffect(() => {
    // Initialisation de Lenis pour le défilement fluide
    lenisRef.current = new Lenis({
      duration: 0.6, // Durée du défilement
      easing: (t) => t, // Fonction d'easing (facultatif)
      smoothWheel: true, // Défilement fluide avec la molette
      smoothTouch: true, // Défilement fluide sur mobile
    });

    // Fonction de rafraîchissement
    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    // Demander une nouvelle frame pour Lenis
    requestAnimationFrame(raf);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy(); // Détruire Lenis au démontage
      }
    };
  }, []);

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

  // Send email function using EmailJS
  const sendEmail = (e) => {
    e.preventDefault();

    // Pass the form reference as the third parameter
    emailjs
      .sendForm(
        "service_x2l1ilq",
        "template_y3he5x9",
        formRef.current,
        "si5fFBZ6O48KSc0v3"
      )
      .then(
        (result) => {
          setStatusMessage("Message sent successfully!");
          formRef.current.reset();
          console.log(result);
        },
        (error) => {
          setStatusMessage("Error sending message. Please try again.");
          console.log("Error details:", error);
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

  return (
    <div className="info flex flex-col min-h-screen px-4" ref={container}>
      {/* Première section - Image et texte en haut (prend 100vh) */}
      <div className="flex flex-col md:flex-row items-center justify-around w-full h-screen">
        <div className="flex justify-center mt-10 md:mt-0 md:w-1/2">
          <img
            src="/pungy.png"
            alt="Profile Picture"
            className="w-[90%] h-auto md:w-[80%] rounded-full"
          />
        </div>

        <div className="text-center text-sm sm:text-xl md:text-2xl px-4 md:px-0 md:w-1/2 flex items-center">
          <p>
            Hello! I'm Ibrahim, a Full-Stack Developer with experience in frontend technologies like HTML, CSS, and JavaScript.
            I've worked as a Web Developer at Novances IT and a Full-Stack Developer at One System. Currently,
            I'm advancing my skills at My Digital School Lyon to become a stronger web developer.
          </p>
        </div>
      </div>

      {/* Deuxième section - Formulaire en bas (prend 100vh) */}
      <section className="contact-section bg-black text-white py-16 flex items-center justify-center h-screen">
        <div className="max-w-5xl w-full mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-8 text-center">CONTACT ME</h2>
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2">YOUR NAME</label>
              <input
                type="text"
                id="name"
                name="from_name"
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
                name="from_email"
                className="w-full p-4 border-2 border-white bg-black text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ENTER YOUR EMAIL"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-2">YOUR MESSAGE</label>
              <textarea
                id="message"
                name="message"
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

      {/* Scroll icon */}
      <div
        ref={scrollIconRef}
        onClick={scrollToBottom}
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-white text-3xl w-16 h-16 flex items-center justify-center border-4 border-white rounded-full cursor-pointer"
      >
        <i className="fas fa-chevron-down"></i>
      </div>
    </div>
  );
}
