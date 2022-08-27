import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GUI } from "dat.gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { AmbientLight } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Windw Title
window.onload = function () {
  var pageTitle = document.title;
  var attentionMessage = "Come Back!";

  document.addEventListener("visibilitychange", function (e) {
    var isPageActive = !document.hidden;

    if (!isPageActive) {
      document.title = attentionMessage;
    } else {
      document.title = pageTitle;
    }
  });
};
// document.title = "eee";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();
const gui = new GUI();
gui.hide();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Planes
let planesAngles = [];
let planesTextures = [];
const createPlane = (texture) => {
  planesTextures.push(texture);
  planesAngles.push(Math.random() * Math.PI * 2);

  //Geometry
  const init = 0.5;
  const ratioImg = texture.image.naturalWidth / texture.image.naturalHeight;
  const planeGeometry = new THREE.PlaneBufferGeometry(
    init * ratioImg,
    init,
    100,
    100
  );
  const planeMaterial = new THREE.MeshBasicMaterial();
  planeMaterial.side = THREE.DoubleSide;
  planeMaterial.transparent = true;
  planeMaterial.map = texture;

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.name = "plane";
  plane.position.set(0, 0, -2);
  scene.add(plane);
};
const drake1 = textureLoader.load("/textures/meme/drake1.jpg", (e) => {
  createPlane(e);
});
const velo = textureLoader.load("/textures/meme/velo.jpg", (e) => {
  createPlane(e);
});
const astronaute = textureLoader.load("/textures/meme/astronaute.jpg", (e) => {
  createPlane(e);
});
const batman = textureLoader.load("/textures/meme/batman.jpg", (e) => {
  createPlane(e);
});
const brain = textureLoader.load("/textures/meme/brain.jpg", (e) => {
  createPlane(e);
});
const bras = textureLoader.load("/textures/meme/bras.jpg", (e) => {
  createPlane(e);
});
const cat = textureLoader.load("/textures/meme/cat.jpg", (e) => {
  createPlane(e);
});
const chair = textureLoader.load("/textures/meme/chair.jpg", (e) => {
  createPlane(e);
});
const drake2 = textureLoader.load("/textures/meme/drake2.jpg", (e) => {
  createPlane(e);
});
const gull = textureLoader.load("/textures/meme/gull.jpg", (e) => {
  createPlane(e);
});
const jealous = textureLoader.load("/textures/meme/jealous.jpg", (e) => {
  createPlane(e);
});
const leo = textureLoader.load("/textures/meme/leo.jpg", (e) => {
  createPlane(e);
});
const monkey = textureLoader.load("/textures/meme/monkey.jpg", (e) => {
  createPlane(e);
});
const pablo = textureLoader.load("/textures/meme/pablo.jpg", (e) => {
  createPlane(e);
});
const think = textureLoader.load("/textures/meme/think.jpg", (e) => {
  createPlane(e);
});
const toystory = textureLoader.load("/textures/meme/toystory.jpg", (e) => {
  createPlane(e);
});
const winnie = textureLoader.load("/textures/meme/winnie.jpg", (e) => {
  createPlane(e);
});

//Parameters
const parameters = {};
parameters.size = 0.3;
parameters.ambientLight = "#3c804c";
parameters.yellow = "#ecf000";
parameters.green = "#8dffa8";

//! Models
const modeleLoader = new GLTFLoader();
const newMaterial = new THREE.MeshStandardMaterial({
  color: parameters.green,
});
const transparentMaterial = new THREE.MeshStandardMaterial();
transparentMaterial.transparent = true;
transparentMaterial.opacity = 0;

let globe = new THREE.Mesh();
let heart = new THREE.Mesh();
let cursor = new THREE.Mesh();
let frame = new THREE.Mesh();
let logo = new THREE.Mesh();
let frames = [];

// Globe
parameters.globeScale = 0.02;
modeleLoader.load(
  "/models/globe_with_meridians_3d_icon.glb",
  function (gltf) {
    globe = gltf.scene;

    globe.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });
    globe.scale.set(
      parameters.globeScale,
      parameters.globeScale,
      parameters.globeScale
    );

    globe.position.set(1, 1, 1);

    scene.add(globe);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Heart
modeleLoader.load(
  "/models/pumping_heart_model.glb",
  function (gltf) {
    heart = gltf.scene;
    heart.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });
    const scale = 0.005;
    heart.scale.set(scale, scale, scale);
    heart.position.set(-1, 1, 1);

    scene.add(heart);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Cursor
modeleLoader.load(
  "/models/3d_mouse_cursor.glb",
  function (gltf) {
    cursor = gltf.scene;
    cursor.traverse((o) => {
      if (o.isMesh && o.material.name == "Black") o.material = newMaterial;
      if (o.isMesh && o.material.name == "White")
        o.material = transparentMaterial;
    });
    const scale = 0.05;
    cursor.scale.set(scale, scale, scale);
    cursor.position.set(0, 1, 0);
    scene.add(cursor);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Frame
let famesRandomX = [];
let famesRandomY = [];
// for (let i = 0; i < 0; i++) {
//   modeleLoader.load(
//     "/models/favicon-32x32.glb",
//     function (gltf) {
//       frame = gltf.scene;
//       frame.name = "frame";
//       const scale = 1;
//       frame.scale.set(scale, scale, scale);
//       scene.add(frame);

//       famesRandomX[i] = (Math.random() - 0.5) * 5;
//       famesRandomY[i] = (Math.random() - 0.5) * 3;
//     },
//     undefined,
//     function (error) {
//       console.error(error);
//     }
//   );
// }
modeleLoader.load(
  "/models/favicon-32x32.glb",
  function (gltf) {
    frame = gltf.scene;
    frame.name = "frame";
    const scale = 1.5;
    frame.scale.set(scale, scale, scale);
    scene.add(frame);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Logo
modeleLoader.load(
  "/models/favicon.glb",
  function (gltf) {
    logo = gltf.scene;
    logo.name = "frame";
    const scale = 5;
    logo.scale.set(scale, scale, scale);
    scene.add(logo);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Font loader
const fontLoader = new FontLoader();
const textGroup = new THREE.Group();
scene.add(textGroup);
// Welcome

fontLoader.load("/fonts/Studio Feixen Sans Edgy Trial_Bold.json", (font) => {
  const textGeometry = new TextGeometry("WELCOME TO\nTHE INTERNET", {
    font: font,
    size: parameters.size,
    height: 0.2,
    curveSegment: 5,
    bevelEnabled: true,
    bevelThickness: 0.03, // round he corner combined with bevel size
    bevelSize: 0.008,
    bevelOffset: 0,
    bevelSegments: 12,
  });

  textGeometry.center();
  //   const material = new THREE.MeshNormalMaterial();
  const material = new THREE.MeshStandardMaterial();
  const text = new THREE.Mesh(textGeometry, material);
  textGroup.add(text);
});

// Guide
fontLoader.load("/fonts/Studio Feixen Sans Edgy Trial_Bold.json", (font) => {
  const textGeometry = new TextGeometry("We will be your guide", {
    font: font,
    size: parameters.size * 0.45,
    height: 0.2 * 0.045,
    curveSegment: 5,
    bevelEnabled: true,
    bevelThickness: 0.003, // round he corner combined with bevel size
    bevelSize: 0.0008,
    bevelOffset: 0,
    bevelSegments: 12,
  });

  textGeometry.center();
  //   const material = new THREE.MeshNormalMaterial();
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const text = new THREE.Mesh(textGeometry, material);
  text.position.y = -0.6;
  textGroup.add(text);
});

// Light

let pointlightGreen = null;
let pointlightYellow = null;
let ambientLight = null;
let pointLightHelperG = null;
let pointLightHelperY = null;
let yellowSpotlight = null;
let ySpotlightHelper = null;
const createLight = () => {
  if (pointlightGreen !== null) {
    scene.remove(ambientLight, pointlightGreen, pointlightYellow);
    scene.remove(pointLightHelperG, pointLightHelperY);
    scene.remove(ySpotlightHelper, yellowSpotlight);
  }

  ambientLight = new THREE.AmbientLight(parameters.ambientLight);
  scene.add(ambientLight);

  //Green
  pointlightGreen = new THREE.PointLight();
  pointlightGreen.color = new THREE.Color(parameters.green);
  pointlightGreen.position.z = 0.5;
  pointlightGreen.intensity = 0.5;
  scene.add(pointlightGreen);

  // Yellow
  pointlightYellow = new THREE.PointLight();
  pointlightYellow.color = new THREE.Color(parameters.yellow);
  pointlightYellow.position.z = -1;
  pointlightYellow.position.y = -1;
  pointlightYellow.intensity = 0.5;
  scene.add(pointlightYellow);

  //SpotLight
  yellowSpotlight = new THREE.SpotLight();
  yellowSpotlight.color = new THREE.Color(parameters.yellow);
  yellowSpotlight.angle = Math.PI * 0.1;
  yellowSpotlight.intensity = 0.6;
  yellowSpotlight.penumbra = 0.5;
  yellowSpotlight.position.set(-1, 1, 1);
  scene.add(yellowSpotlight, yellowSpotlight.target);

  ySpotlightHelper = new THREE.SpotLightHelper(yellowSpotlight);
  // scene.add(ySpotlightHelper);

  //Helpers
  pointLightHelperG = new THREE.PointLightHelper(pointlightGreen);
  pointLightHelperY = new THREE.PointLightHelper(pointlightYellow);
  // scene.add(pointLightHelperG, pointLightHelperY);
};
createLight();
gui.addColor(parameters, "ambientLight").onFinishChange(createLight);
gui.addColor(parameters, "yellow").onFinishChange(createLight);
gui.addColor(parameters, "green").onFinishChange(createLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let i = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // light Yellow
  pointlightYellow.position.x = Math.cos(elapsedTime);
  pointlightYellow.position.z = Math.sin(elapsedTime);

  // light Green
  // pointlightGreen.position.x = Math.cos(-elapsedTime);
  // pointlightGreen.position.z = Math.sin(-elapsedTime);

  // YellowSpotlight
  const radiusSpotlight = 0.2;
  yellowSpotlight.target.position.x =
    Math.cos(elapsedTime) * radiusSpotlight - 1;
  yellowSpotlight.target.position.y =
    Math.sin(elapsedTime) * radiusSpotlight - 0.5;

  // yellowSpotlight.target = spotLightTarget;

  // Cursor
  const cursorSpeed = 1;
  const cursorRange = 1.5;
  cursor.position.x = Math.cos(-elapsedTime * cursorSpeed);
  cursor.position.y = Math.sin(elapsedTime * cursorSpeed) * cursorRange;
  cursor.position.z = Math.sin(elapsedTime * cursorSpeed);
  cursor.rotation.y = -elapsedTime;

  //Heart
  const heartSpeed = 1;
  const heartRange = 1;
  heart.position.x = Math.cos(-elapsedTime * heartSpeed) * heartRange;
  heart.position.y = Math.cos(elapsedTime * heartSpeed) * heartRange;
  heart.position.z = Math.sin(-elapsedTime * heartSpeed) * heartRange;
  heart.rotation.y = -elapsedTime;

  //globe
  const globeSpeed = 0.7;
  const globeRange = 2;
  globe.position.x = Math.cos(-elapsedTime * globeSpeed) * globeRange;
  globe.position.y = Math.sin(-elapsedTime);
  globe.position.z = Math.sin(-elapsedTime * globeSpeed) * globeRange;
  globe.rotation.y = -elapsedTime;

  // Frames
  const frameSpeed = 0.9;
  const frameRange = 3;
  frame.position.x = Math.cos(elapsedTime * frameSpeed) * frameRange;
  frame.position.y = Math.sin(elapsedTime);
  frame.position.z = Math.sin(-elapsedTime * frameSpeed) * frameRange;
  frame.rotation.y = -elapsedTime;
  // const frames = scene.children.filter((e) => e.name == "frame");
  // frames.forEach((fr, index) => {
  //   fr.position.x = ((elapsedTime + famesRandomX[index]) % 4) - 2;
  //   fr.position.y = Math.sin(elapsedTime) + famesRandomY[index] * 2;
  //   fr.position.z = Math.sin(elapsedTime + famesRandomY[index]) * 1;
  // });

  // Logo
  const logoSpeed = 0.6;
  const logoRange = 2;
  logo.position.x = Math.cos(-elapsedTime * logoSpeed) * logoRange;
  logo.position.y = Math.sin(elapsedTime);
  logo.position.z = Math.sin(elapsedTime * logoSpeed) * logoRange;
  logo.rotation.z = Math.cos(elapsedTime);
  logo.rotation.y = -elapsedTime;

  //Planes
  const planes = scene.children.filter((e) => e.name == "plane");
  planes.forEach((plane, index) => {
    const delay = elapsedTime - index * 0.3;
    const modulo = 4;
    const radius = 0.4;
    const speed = 2;
    //position
    plane.position.x =
      Math.cos(planesAngles[index]) * (delay % modulo) * radius +
      Math.cos(elapsedTime * 0.5) * 0.5;
    plane.position.y =
      Math.sin(planesAngles[index]) * (delay % modulo) * radius +
      Math.sin(elapsedTime * 0.5) * 0.5;
    plane.position.z = ((delay * speed) % modulo) - modulo;

    //Scale
    const scale = Math.sqrt((plane.position.z + 4) / 4);
    plane.scale.set(scale, scale, scale);

    //opacity
    const z = plane.position.z;
    const upExp = 0.4;
    const downExp = 1;
    const up = Math.sqrt(Math.pow(z + 4, upExp) / Math.pow(4, upExp));
    const down = Math.sqrt(Math.pow(-z, downExp));

    if (plane.position.z > -0.852) {
      plane.material.opacity = down;
    } else {
      plane.material.opacity = up;
    }
    if (index < 1) {
      console.log("z ", z);
      console.log("opacity ", plane.material.opacity);
      console.log("up ", up);
      console.log("down  ", down);
    }
  });

  //textGroup
  const textGroupSpeed = 0.5;
  const textGroupRadius = 0.1;
  textGroup.position.x =
    Math.cos(elapsedTime * textGroupSpeed) * textGroupRadius;
  textGroup.position.y =
    Math.sin(elapsedTime * textGroupSpeed) * textGroupRadius;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

const roundAnim = (object, elapsedTime, speed = 1, radius = 1) => {
  object.position.x = Math.cos(elapsedTime * speed) * radius;
  object.position.z = Math.sin(elapsedTime * speed) * radius;
};
1;

tick();
