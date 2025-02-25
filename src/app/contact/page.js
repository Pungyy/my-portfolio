"use client";
import { useRef } from "react";

import ReactLenis from "@studio-freight/react-lenis";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP);

const Info = () => {
  const container = useRef();

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
    <ReactLenis root>
      <div className="info" ref={container}>
        <div className="col">
          <img src="/pungy.png" alt="" />
        </div>
        <div className="col">
          <p>
            Hello! I'm Ibrahim. I'm a software engineer,
            aspiring to build innovative solutions.
            I specialize in frontend development using HTML, CSS, JS.
          </p>
        </div>
      </div>

      <section className="contact-section bg-black text-white py-16 flex items-center justify-center h-screen">
        <div className="max-w-5xl w-full mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-8 text-center">Contact Me</h2>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-4 border-2 border-white bg-black text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-4 border-2 border-white bg-black text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="w-full p-4 border-2 border-white bg-black text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </ReactLenis>
  );
};

export default Info;
