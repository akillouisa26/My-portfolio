const canvas = document.getElementById("bubble-canvas");
const ctx = canvas.getContext("2d");

let bubbles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createBubble() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        radius: Math.random() * 6 + 2,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
    };
}

for (let i = 0; i < 40; i++) {
    bubbles.push(createBubble());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((b, i) => {
        b.y -= b.speed;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,94,60,${b.opacity})`;
        ctx.fill();

        if (b.y < -10) {
            bubbles[i] = createBubble();
        }
    });

    requestAnimationFrame(animate);
}

animate();