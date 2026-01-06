
AOS.init({ duration: 900, once: true });

/* COUNTERS */
document.querySelectorAll('.counter').forEach(counter => {
  const target = +counter.dataset.target;
  let count = 0;
  const step = target / 40;
  const interval = setInterval(() => {
    count += step;
    counter.innerText = Math.ceil(count);
    if (count >= target) clearInterval(interval);
  }, 30);
});

/* THREE.JS */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg3d'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 0x2563eb, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

camera.position.z = 6;

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.002;
  sphere.rotation.y += 0.003;
  renderer.render(scene, camera);
}
animate();
