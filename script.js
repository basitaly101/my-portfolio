// Locomotive Scroll Init
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// Cursor Circle Animation
function circleChaptaKaro() {
  let xscale = 1;
  let yscale = 1;
  let xprev = 0;
  let yprev = 0;
  let timeout;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, (dets.clientX - xprev) / 100);
    yscale = gsap.utils.clamp(0.8, 1.2, (dets.clientY - yprev) / 100);

    xprev = dets.clientX;
    yprev = dets.clientY;

    updateCirclePosition(dets.clientX, dets.clientY, xscale, yscale);

    timeout = setTimeout(() => {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function updateCirclePosition(x, y, xscale = 1, yscale = 1) {
  document.querySelector("#minicircle").style.transform = `translate(${x}px, ${y}px) scale(${xscale}, ${yscale})`;
}

function circleMouseFollower() {
  window.addEventListener("mousemove", (dets) => {
    updateCirclePosition(dets.clientX, dets.clientY);
  });
}

circleChaptaKaro();
circleMouseFollower();

// Navbar Animation with GSAP
window.addEventListener("load", () => {
  gsap.from(".navbar", {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    delay: 0.3,
  });

  gsap.from(".navbar .nav-links li", {
    y: -20,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    delay: 0.6,
    ease: "power2.out",
  });

  gsap.from("#hamburger", {
    y: -20,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power2.out",
  });
});

// Sidebar Toggle Logic
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.add("active");
});

function closeSidebar() {
  sidebar.classList.remove("active");
}

// Interactive Project Image Hover
document.querySelectorAll(".elem").forEach((elem) => {
  let rotate = 0;
  let diffrot = 0;

  const img = elem.querySelector("img");

  elem.addEventListener("mouseleave", () => {
    gsap.to(img, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  });

  elem.addEventListener("mousemove", (dets) => {
    let rect = elem.getBoundingClientRect();
    let diff = dets.clientY - rect.top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(img, {
      opacity: 1,
      top: diff,
      left: dets.clientX - rect.left,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      ease: "power3.out",
    });
  });
});
