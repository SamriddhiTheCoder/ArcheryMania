AFRAME.registerComponent("arrows", {
    init: function () {
      this.shootArrow();
    },
    shootArrow: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var arrow = document.createElement("a-entity");
  
          arrow.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          arrow.setAttribute("material", "color", "grey");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          arrow.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          arrow.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
  
          arrow.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
          });
 
          arrow.addEventListener("collide", this.removeArrow);
  
          scene.appendChild(arrow);
        }
      });
    },
    removeArrow: function (e) {
      console.log(e.detail.target.el);
  
      console.log(e.detail.body.el);
  
      var element = e.detail.target.el;
  
      var elementHit = e.detail.body.el;
  
      if (elementHit.id.includes("target")) {
        elementHit.setAttribute("material", {
          opacity: 1,
          transparent: true,
        });
  
        var impulse = new CANNON.Vec3(-2, 2, 1);
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        );
  
        elementHit.body.applyImpulse(impulse, worldPoint);

        element.removeEventListener("collide", this.arrow);

        var scene = document.querySelector("#scene");
        scene.removeChild(element);
      }
    },
  });
  
  