import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils";
import pathToStl from "../assets/0.stl";
import pathToStl2 from "../assets/1.stl";
import pathToStl3 from "../assets/2.stl";
import pathToStl4 from "../assets/3.stl";
import pathToStl5 from "../assets/4.stl";
import pathToStl6 from "../assets/5.stl";
import pathToStl7 from "../assets/6.stl";
import pathToStl8 from "../assets/7.stl";
import pathToStl9 from "../assets/8.stl";
import pathToStl10 from "../assets/9.stl";
import pathToStl11 from "../assets/10.stl";
import pathToStl12 from "../assets/11.stl";
import pathToStl13 from "../assets/12.stl";
import pathToStl14 from "../assets/13.stl";

import matcapPorcelainWhite from "../assets/matcap-porcelain-white.jpg";
import matcapPorcelainWhite1 from "../assets/abstract-luxury-gold-yellow-gradient-studio-wall-well-use-as-backgroundlayoutbanner-product-presentation.jpg";
import oak_wood from "../assets/oak-wood-texture-brown-background-with-design-space.jpg";

// import worldImage from "../assets/world-environment.jpeg";
import TreeSTLLoader from "three-stl-loader";
import STExporter from "three-stlexporter";
import { Mesh, MeshBasicMaterial } from "three";

import * as dat from "dat.gui";

const STLLoader = TreeSTLLoader(THREE);

const loader = new STLLoader();
const textureLoader = new THREE.TextureLoader();
const imageLoader = new THREE.ImageLoader();

const gui = new dat.GUI();

/**
 * https://threejs.org/examples/#webgl_lightprobe
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_lightprobe.html
 * @param {*} param0
 */

// function initEnvironment({ scene, imageSrc }) {
//   const sphere = new THREE.SphereGeometry(750, 64, 64);
//   sphere.scale(-1, 1, 1);

//   const texture = new THREE.Texture();

//   const material = new THREE.MeshBasicMaterial({
//     map: texture
//   });

//   imageLoader.load(imageSrc, (image) => {
//     texture.image = image;
//     texture.needsUpdate = true;
//   });

//   scene.add(new THREE.Mesh(sphere, material));
// }

function createAnimate({ scene, camera, renderer }) {
  const triggers = [];

  function animate() {
    requestAnimationFrame(animate);

    triggers.forEach((trigger) => {
      trigger();
    });

    renderer.render(scene, camera);
  }
  function addTrigger(cb) {
    if (typeof cb === "function") triggers.push(cb);
  }
  function offTrigger(cb) {
    const triggerIndex = triggers.indexOf(cb);
    if (triggerIndex !== -1) {
      triggers.splice(triggerIndex, 1);
    }
  }

  return {
    animate,
    addTrigger,
    offTrigger,
  };
}

export class StlViewer extends React.Component {
  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      750,
      window.innerWidth / window.innerHeight,
      10,
      100000
    );
    // Assuming 'loadedObject' is the loaded 3D model
    function loadStlfile(pathToStl, typeglass, color) {
      loader.load(pathToStl, (geometry) => {
        if (typeglass == "glass") {
          const material = new THREE.MeshMatcapMaterial({
            color: 0xffffff,
            matcap: textureLoader.load(matcapPorcelainWhite),
          });

          const mesh = new THREE.Mesh(geometry, material);

          mesh.geometry.computeVertexNormals(true);
          // mesh.geometry.center();
          scene.background = new THREE.Color(0xffffff);
          scene.add(mesh);
        } else if (typeglass == "notglass") {
          const material = new THREE.MeshMatcapMaterial({
            color: 0xffffff,
            matcap: textureLoader.load(color),
          });

          const mesh = new THREE.Mesh(geometry, material);

          mesh.geometry.computeVertexNormals(true);
          // mesh.geometry.center();
          scene.background = new THREE.Color(0xffffff);
          scene.add(mesh);
        }

        // mesh.rotation.x = +1.2;

        // animate.addTrigger(() => {
        // mesh.rotation.x += 0.005;
        // mesh.rotation.y += 0.005;
        // mesh.rotation.z += 0.005;
        // });
      });
    }
    function colorChange(color) {
      loadStlfile(pathToStl, "notglass", color);
      loadStlfile(pathToStl2, "notglass", color);
      loadStlfile(pathToStl3, "notglass", color);
      loadStlfile(pathToStl4, "notglass", color);

      loadStlfile(pathToStl9, "notglass", color);
      loadStlfile(pathToStl10, "notglass", color);
      loadStlfile(pathToStl11, "notglass", color);
      loadStlfile(pathToStl12, "notglass", color);

      loadStlfile(pathToStl14, "glass", color);
    }

    colorChange(0x000000);

    function animateStl_open(pathToStl, direction, typeglass, color) {
      loader.load(pathToStl, (geometry) => {
        // Set the desired scale factor (adjust as needed)

        const material = new THREE.MeshMatcapMaterial({
          color: 0xffffff,
          matcap: textureLoader.load(color),
        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.geometry.computeVertexNormals(true);
        // mesh.geometry.center();
        scene.background = new THREE.Color(0xffffff);
        scene.add(mesh);
        const add_distance = mesh.position.x;

        const animate = () => {
          const totalDistance = 1017; // Set your desired total distance
          const framesPerSecond = 10; // Set your desired frames per second

          const translationValue = totalDistance / framesPerSecond;

          if (direction == "x-") {
            mesh.translateX(-translationValue);
          } else if (direction == "x+") {
            mesh.translateX(translationValue);
          }
          // Render the scene
          renderer.render(scene, camera);

          if (direction == "x+") {
            if (mesh.position.x > add_distance + totalDistance) {
              // Stop the animation by not calling requestAnimationFrame
              return;
            }
          } else if (direction == "x-") {
            if (mesh.position.x <= distance) {
              // Stop the animation by not calling requestAnimationFrame
              return;
            }
          }
          // if (mesh.position.x <= -distance) {
          //   // Stop the animation by not calling requestAnimationFrame
          //   return;
          // }

          // Continue the animation
          requestAnimationFrame(animate);

          // Start the animation loop
        };
        animate();
      });
    }

    // animateStl_open(pathToStl6, "x+", "notglass", 0x000000);
    // animateStl_open(pathToStl7, "x+", "notglass", 0x000000);
    // animateStl_open(pathToStl5, "x+", "notglass", 0x000000);
    // animateStl_open(pathToStl8, "x+", "notglass", 0x000000);
    // animateStl_open(pathToStl13, "x+", "glass", matcapPorcelainWhite);

    function animateStl_close(pathToStl, direction, typeglass, color) {
      loader.load(pathToStl, (geometry) => {
        // Set the desired scale factor (adjust as needed)

        const material = new THREE.MeshMatcapMaterial({
          color: 0xffffff,
          matcap: textureLoader.load(color),
        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.geometry.computeVertexNormals(true);
        // mesh.geometry.center();
        scene.background = new THREE.Color(0xffffff);
        scene.add(mesh);
        const add_distance = mesh.position.x;

        const animate = () => {
          const totalDistance = 1017; // Set your desired total distance
          const framesPerSecond_forward = 1; // Set your desired frames per second
          const framesPerSecond_reverse = 10; // Set your desired frames per second

          const translationValue_forward =
            totalDistance / framesPerSecond_forward;
          const translationValue_reverse =
            totalDistance / framesPerSecond_reverse;

          mesh.translateX(translationValue_forward);

          // Render the scene
          renderer.render(scene, camera);

          if (mesh.position.x >= add_distance + totalDistance) {
            mesh.translateX(-translationValue_reverse);

            return;
          }

          requestAnimationFrame(animate);
        };
        animate();
      });
    }

    // animateStl_close(pathToStl6, "x+", "notglass", 0x000000);
    // animateStl_close(pathToStl7, "x+", "notglass", 0x000000);
    // animateStl_close(pathToStl5, "x+", "notglass", 0x000000);
    // animateStl_close(pathToStl8, "x+", "notglass", 0x000000);
    // animateStl_close(pathToStl13, "x+", "glass", matcapPorcelainWhite);

    function animateStl_close_exp(pathToStl, direction, typeglass, color) {
      loader.load(pathToStl, (geometry) => {
        // Set the desired scale factor (adjust as needed)

        const material = new THREE.MeshMatcapMaterial({
          color: 0xffffff,
          matcap: textureLoader.load(color),
        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.geometry.computeVertexNormals(true);
        // mesh.geometry.center();
        scene.background = new THREE.Color(0xffffff);
        scene.add(mesh);
        const add_distance = mesh.position.x;
        var reverse_state = false;

        const animate_forward = () => {
          const totalDistance = 1017; // Set your desired total distance
          const framesPerSecond = 5; // Set your desired frames per second

          const translationValue = totalDistance / framesPerSecond;

          if (direction == "x-") {
            mesh.translateX(-translationValue);
          } else if (direction == "x+") {
            mesh.translateX(translationValue);
          }
          // Render the scene
          renderer.render(scene, camera);

          if (direction == "x+") {
            if (mesh.position.x >= add_distance + totalDistance) {
              // setGlobalVariable(true);

              // Stop the animation by not calling requestAnimationFrame
              return "check";
            }
          } else if (direction == "x-") {
            if (mesh.position.x <= distance) {
              // Stop the animation by not calling requestAnimationFrame
              return;
            }
          }
          // if (mesh.position.x <= -distance) {
          //   // Stop the animation by not calling requestAnimationFrame
          //   return;
          // }

          // Continue the animation
          requestAnimationFrame(animate_forward);
          console.log("forward completed");
          // Start the animation loop
        };

        animate_forward();
        // console.log(check)

        const animate_reverse = () => {
          console.log("reverse started");
          const totalDistance = 1017; // Set your desired total distance
          const framesPerSecond = 10; // Set your desired frames per second

          const translationValue = totalDistance / framesPerSecond;
          mesh.translateX(-translationValue);

          // Render the scene
          renderer.render(scene, camera);

          if (mesh.position.x <= 1) {
            // Stop the animation by not calling requestAnimationFrame
            return;
          }

          // if (mesh.position.x <= -distance) {
          //   // Stop the animation by not calling requestAnimationFrame
          //   return;
          // }

          // Continue the animation
          requestAnimationFrame(animate_reverse);

          console.log("reverse completed");
        };

        animate_reverse();
      });
    }

    // animateStl_close_exp(pathToStl6, "x+", "notglass", 0x000000);
    // animateStl_close_exp(pathToStl7, "x+", "notglass", 0x000000);
    // animateStl_close_exp(pathToStl5, "x+", "notglass", 0x000000);
    // animateStl_close_exp(pathToStl8, "x+", "notglass", 0x000000);
    // animateStl_close_exp(pathToStl13, "x+", "glass", matcapPorcelainWhite);

    const renderer = new THREE.WebGLRenderer();

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.maxDistance = 10000;
    controls.minDistance = 100;

    // const geometry = new THREE.BoxGeometry(10, 10, 10);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    /**
     * Light setup
     */
    const secondaryLight = new THREE.PointLight(0xff0000, 1, 100);
    secondaryLight.position.set(5, 5, 5);
    scene.add(secondaryLight);

    // gui.add(secondaryLight.position, "y").min(-10).max(10).step(0.1);

    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize, false);

    const animate = createAnimate({ scene, camera, renderer });

    camera.position.z = 500;

    animate.animate();
  }
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}
