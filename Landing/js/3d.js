  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const container = document.getElementById('threejs-container');
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Enable transparency and antialiasing
  renderer.setClearColor(0x000000, 0); // Set clear color to black with zero opacity
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Add a directional light source
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increase intensity
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(directionalLight);
  
  // Add an ambient light source
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Add ambient light with lower intensity
  scene.add(ambientLight);
  
  // Set up the DRACOLoader
  const dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  
  // Set up the GLTFLoader and use the DRACOLoader
  const loader = new THREE.GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  
  // Set up OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable damping (inertia)
  controls.dampingFactor = 0.25; // Damping factor
  controls.screenSpacePanning = false; // Disable panning in screen space
  
  // Load the GLTF model
  loader.load('assets/3d/couch.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);
  
    // Rotate the model
    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y -= 0.005; // Rotate the model
      controls.update(); // Update controls
      renderer.render(scene, camera);
    }
    animate();
  }, undefined, function (error) {
    console.error(error);
  });
  
  // Set the camera position
  camera.position.z = 15;
  camera.position.y = 2;
  
  // Handle window resize
  window.addEventListener('resize', function () {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });