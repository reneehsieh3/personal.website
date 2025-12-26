$(document).ready(function () {

  firebase.initializeApp({
    apiKey: "AIzaSyBnPWnv3rITuoc2Fcll9JYuuRKQLrWhRB4",
    authDomain: "text-aac81.firebaseapp.com",
    projectId: "text-aac81",
  });

  const db = firebase.firestore();

  db.collection("users").doc("web").get().then((doc) => {
    const textArray = doc.data().alltexts;

    textArray.forEach((text) => {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      $(dot).data("info", text);
      $(".container").append(dot);
    });
  });

  $(".container").on("mouseenter", ".dot", function () {
    $("#intext_container").text($(this).data("info"));
    $(".mask").css("display", "flex");
  });

  $(".container").on("mouseleave", ".dot", function () {
    $(".mask").hide();
    $("#intext_container").text("");
  });

  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");

  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function createStars() {
    stars = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        v: Math.random() * 0.2 + 0.05
      });
    }
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";

    stars.forEach(s => {
      s.y += s.v;
      if (s.y > canvas.height) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animateStars);
  }

  createStars();
  animateStars();
});