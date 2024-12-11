'use client'
import React, { useEffect } from "react";

const Instagram = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute("data-use-service-core", "");
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const lastDiv = document.getElementById("lastDiv");
    if (lastDiv) {
      lastDiv.style.setProperty("z-index", "99999", "important");
    }
  }, []);

  return (
    <>
    <div className="pb-6 ">
      <div className="flex justify-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Nuestro Instagram
          </h2>
      </div>
        <div
          className="elfsight-app-4a9d8a5c-734d-4c05-8734-7d524dd964ed"
          data-elfsight-app-lazy
        ></div></div>
    </>
  );
};

export default Instagram;
