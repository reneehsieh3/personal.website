window.PortfolioCarousel = (function () {
  let $carousel;
  let currIndex = 0;

  function init({ carouselId, nextId, prevId }) {
    $carousel = $("#" + carouselId);

    $("#" + nextId).on("click", function () {
      currIndex++;
      rotate();
    });

    $("#" + prevId).on("click", function () {
      currIndex--;
      rotate();
    });

    $(window).on("resize", function () {
      layout();
      rotate();
    });
  }

  function render(data) {
    if (!$carousel) return;

    $carousel.empty();

    data.forEach((p) => {
      const itemHtml = `
        <div class="item">
          <img src="${p.image}" alt="${p.name}">
          <div class="info">
            <div class="title">${p.name}</div>
            <div class="desc">${p.description}</div>
            <div class="tags">${p.tags.join(" · ")}</div>
          </div>
        </div>
      `;
      $carousel.append(itemHtml);
    });

    currIndex = 0;
    layout();
    rotate();
  }

  function layout() {
    const $items = $carousel.find(".item");
    const count = $items.length;
    if (count === 0) return;

    const width = $carousel.outerWidth();
    const theta = 360 / count;
    const radius = Math.round((width / 2) / Math.tan(Math.PI / count));

    $items.each(function (i) {
      $(this).css("transform", `rotateY(${i * theta}deg) translateZ(${radius}px)`);
    });
  }

  function rotate() {
    const count = $carousel.find(".item").length;
    if (count === 0) return;

    const theta = 360 / count;
    const angle = currIndex * -theta;

    $carousel.css({
      "-webkit-transform": `rotateY(${angle}deg)`,
      "transform": `rotateY(${angle}deg)`
    });
  }

  return { init, render };
})();