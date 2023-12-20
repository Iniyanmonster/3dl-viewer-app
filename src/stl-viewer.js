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
import oak_wood from "../assets/oak_wood.jpg";
import walnut_wood from "../assets/walnut_wood.jpg";
import silver from "../assets/silver.jpg";
import gold from "../assets/gold.jpg";


import TreeSTLLoader from "three-stl-loader";
import STExporter from "three-stlexporter";
import { Mesh, MeshBasicMaterial } from "three";

import * as dat from "dat.gui";
import Parameter from "./Parameter.js";

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

    const fs = require("fs");
    const path = require("path");

    const filePath = path.join("../assets/json_data.json");

    // Read the content of the JSON file

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
    function onLoad(color) {
      loadStlfile(pathToStl, "notglass", color);
      loadStlfile(pathToStl2, "notglass", color);
      loadStlfile(pathToStl3, "notglass", color);
      loadStlfile(pathToStl4, "notglass", color);
      loadStlfile(pathToStl5, "notglass", color);
      loadStlfile(pathToStl6, "notglass", color);
      loadStlfile(pathToStl7, "notglass", color);
      loadStlfile(pathToStl8, "notglass", color);
      loadStlfile(pathToStl9, "notglass", color);
      loadStlfile(pathToStl10, "notglass", color);
      loadStlfile(pathToStl11, "notglass", color);
      loadStlfile(pathToStl12, "notglass", color);
      loadStlfile(pathToStl13, "glass", matcapPorcelainWhite);
      loadStlfile(pathToStl14, "glass", matcapPorcelainWhite);
    }

    // onLoad(walnut_wood);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        const animateValue = jsonData.animate;

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
          // loadStlfile(pathToStl5, "notglass", color);
          // loadStlfile(pathToStl6, "notglass", color);
          // loadStlfile(pathToStl7, "notglass", color);
          // loadStlfile(pathToStl8, "notglass", color);
          loadStlfile(pathToStl9, "notglass", color);
          loadStlfile(pathToStl10, "notglass", color);
          loadStlfile(pathToStl11, "notglass", color);
          loadStlfile(pathToStl12, "notglass", color);
          // loadStlfile(pathToStl13, "glass", matcapPorcelainWhite);
          loadStlfile(pathToStl14, "glass", matcapPorcelainWhite);
        }

        colorChange(oak_wood);

        // Assuming 'loadedObject' is the loaded 3D model

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
              const totalDistance = animateValue; // Set your desired total distance
              const framesPerSecond = 500; // Set your desired frames per second

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

        function animateOpen() {
          animateStl_open(pathToStl6, "x+", "notglass", 0x000000);
          animateStl_open(pathToStl7, "x+", "notglass", 0x000000);
          animateStl_open(pathToStl5, "x+", "notglass", 0x000000);
          animateStl_open(pathToStl8, "x+", "notglass", 0x000000);
          animateStl_open(pathToStl13, "x+", "glass", matcapPorcelainWhite);
        }

        // animateOpen()
        // animateOpen(color)
        function animateStl_close_exp2(pathToStl, direction, typeglass, color) {
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

            mesh.translateX(animateValue);

            // Render the scene
            renderer.render(scene, camera);

            const animate = () => {
              const totalDistance = animateValue; // Set your desired total distance
              const framesPerSecond_reverse = 500; // Set your desired frames per second

              const translationValue_reverse =
                totalDistance / framesPerSecond_reverse;

              mesh.translateX(-translationValue_reverse);

              // Render the scene
              renderer.render(scene, camera);

              if (mesh.position.x <= 1) {
                return;
              }

              requestAnimationFrame(animate);
            };
            animate();
          });
        }

        function animateClose() {
          animateStl_close_exp2(pathToStl6, "x+", "notglass", walnut_wood);
          animateStl_close_exp2(pathToStl7, "x+", "notglass", walnut_wood);
          animateStl_close_exp2(pathToStl5, "x+", "notglass", walnut_wood);
          animateStl_close_exp2(pathToStl8, "x+", "notglass", walnut_wood);
          animateStl_close_exp2(
            pathToStl13,
            "x+",
            "glass",
            matcapPorcelainWhite
          );
        }

        // animateClose(color);
        animateClose();
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    });

    // // Assuming 'loadedObject' is the loaded 3D model

    const renderer = new THREE.WebGLRenderer();

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.maxDistance = 100;
    controls.minDistance = 6200;

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

    camera.position.set(0, -1, 0);

    animate.animate();
  }
  render() {
    return (
      <div>
        <Parameter />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "200px",
            height: "650px",
          }}
          ref={(ref) => (this.mount = ref)}
        />
      </div>
    );
  }
}
