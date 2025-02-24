"use client";

import ReactLenis from "@studio-freight/react-lenis";

const Projects = () => {
  return (
    <ReactLenis root>
      <div className="projects">
        <div className="images">
          <img src="/mercadie/mercadie1.png" alt="Project 1" />
          <img src="/pizza/pizza.png" alt="Project 2" />
          <img src="/escape/escape.png" alt="Project 3" />
        </div>
      </div>
    </ReactLenis>
  );
};

export default Projects;