import { useEffect, useRef } from "react";

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;

    const text = "Mariana";
    ctx.font = "bold 60px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left"; // alinhamento à esquerda
    ctx.textBaseline = "top"; // alinhamento no topo
    ctx.fillText(text, 40, 40); // posição no canto superior esquerdo (com um pequeno padding)

    const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particlesArray = [];

    for (let y = 0; y < canvas.height; y += 3) {
      for (let x = 0; x < canvas.width; x += 3) {
        const index = (y * canvas.width + x) * 4;
        if (textData.data[index + 3] > 128) {
          const hue = 300 - (x / canvas.width) * 30;
          particlesArray.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            angle: Math.random() * 2 * Math.PI,
            oscilacao: Math.random() * 2 + 1,
            color: `hsl(${hue}, 100%, 75%)`
          });
        }
      }
    }

    const mouse = {
      x: null,
      y: null,
      radius: 100
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    function drawHeart(x, y, size, color) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -size / 2, -size, -size / 2, -size, 0);
      ctx.bezierCurveTo(-size, size / 1.5, 0, size, 0, size * 1.5);
      ctx.bezierCurveTo(0, size, size, size / 1.5, size, 0);
      ctx.bezierCurveTo(size, -size / 2, 0, -size / 2, 0, 0);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let p of particlesArray) {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let angle = Math.atan2(dy, dx);
          let repulse = force * 1.5;
          p.vx -= Math.cos(angle) * repulse;
          p.vy -= Math.sin(angle) * repulse;
        }

        p.angle += 0.02;
        let oscX = Math.cos(p.angle) * p.oscilacao;
        let oscY = Math.sin(p.angle) * p.oscilacao;

        let dxBack = (p.baseX + oscX) - p.x;
        let dyBack = (p.baseY + oscY) - p.y;
        p.vx += dxBack * 0.01;
        p.vy += dyBack * 0.01;

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.9;
        p.vy *= 0.9;

        drawHeart(p.x, p.y, 2, p.color);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundColor: "black"
      }}
    />
  );
};

export default ParticleCanvas;
