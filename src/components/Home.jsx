import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Facebook, Github, Instagram, Linkedin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';



export default function Home({ data }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [showLightning, setShowLightning] = useState(true);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);

  useEffect(() => {
    const lightningTimer = setTimeout(() => setShowLightning(false), 1500);
    const textTimer = setTimeout(() => setTextAnimationComplete(true), 2500);
    return () => {
      clearTimeout(lightningTimer);
      clearTimeout(textTimer);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Wireframe sphere
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const wireframe = new THREE.WireframeGeometry(sphereGeometry);
    const line = new THREE.LineSegments(
      wireframe,
      new THREE.LineBasicMaterial({ color: 0x666666, transparent: true, opacity: 0.5 })
    );
    scene.add(line);

    // Cube frame
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const edges = new THREE.EdgesGeometry(cubeGeometry);
    const cube = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x444444 }));
    scene.add(cube);

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      requestAnimationFrame(animate);
      line.rotation.x += 0.001;
      line.rotation.y += 0.002;
      cube.rotation.x += 0.0005;
      cube.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(line);
      scene.remove(cube);
      [wireframe, sphereGeometry, cubeGeometry, edges].forEach(g => g.dispose());
    };
  }, []);

  const titleText = data?.title || "I build sharp, fast web experiences";
  const subtitle = data?.subtitle || "Brutalist-inspired interfaces, clean architecture, production-minded details.";
  const titleChars = titleText.split("");
  const socials = data?.socials || [
    { label: "Facebook", url: "https://facebook.com", icon: Facebook },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle", icon: Linkedin },
    { label: "GitHub", url: "https://github.com/your-handle", icon: Github },
    { label: "Twitter", url: "https://twitter.com/your-handle", icon: Instagram },
    { label: "Phone", url: "tel:+977000000000", icon: Phone },
  ];

  return (
    <>
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Lightning effect */}
      {showLightning && (
        <div className="lightning-overlay">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`lightning-bolt ${i > 0 ? `delay-${i * 200}` : ''}`} />
          ))}
          <div className="lightning-flash" />
        </div>
      )}

      <div ref={containerRef} className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-9xl mx-auto">
        {textAnimationComplete ? (
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{titleText}</h1>
        ) : (
          <h1 className="text-4xl md:text-6xl font-bold mb-4 overflow-hidden">
            <div className="flex justify-center flex-wrap">
              {titleChars.map((char, i) => (
                <span
                  key={i}
                  className={`inline-block ${char === " " ? "mx-2" : ""}`}
                  style={{
                    animation: `slideIn 0.5s forwards ${i * 0.1}s`,
                    transform: `translateX(${i < titleText.length / 2 ? "-100vw" : "100vw"})`
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </h1>
        )}

        <p className="text-xl md:text-2xl text-gray-400 mb-8 animate-fade-in">
          {subtitle}
        </p>

        <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: "2.5s" }}>
          {socials.map(({ icon: Icon, url, label }, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:bg-zinc-700 p-3 rounded-full transition-colors"
            >
              <Icon className="h-6 w-6" />
              <span className="sr-only">{label || Icon.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDelay: "3s" }}>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
    </>
  );
}
