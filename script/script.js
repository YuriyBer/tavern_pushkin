const tabTitle = document.querySelector(".filter");
const tabContent = document.querySelector(".tabs");

const getActiveTabName = () => {
    return tabTitle.querySelector(".tab-title__active").dataset.tab;
};

const setActiveContent = () => {
    tabContent
        .querySelector(".tab-content__active")
        .classList.remove("tab-content__active");
    tabContent
        .querySelector(`[data-tab=${getActiveTabName()}]`)
        .classList.add("tab-content__active");
};

tabTitle.addEventListener("click", (e) => {
    const caption = e.target.closest(".tab-title");
    if (!caption) {
        return;
    }
    if (caption.classList.contains("tab-title__active")) {
        return;
    }

    changeTab(caption);
});

function changeTab(caption) {
    tabTitle
        .querySelector(".tab-title__active")
        .classList.remove("tab-title__active");
    caption.classList.add("tab-title__active");
    setActiveContent(getActiveTabName());
}

tabTitle.addEventListener("pointerdown", handleTouchStart, false);
tabTitle.addEventListener("pointermove", handleTouchMove, false);

tabTitle.addEventListener("dragstart", (e) => {
    return false;
});

let xDown = null;

function handleTouchStart(e) {
    xDown = e.offsetX;
}

function handleTouchMove(e) {
    if (!xDown || window.matchMedia("(min-width: 576px)").matches) {
        return;
    }

    let xUp = e.offsetX;
    let xDiff = xDown - xUp;
    let caption = null;
    if (Math.abs(xDiff) > 0 && e.target.classList.contains("tab-title")) {
        if (xDiff > 0) {
            if (e.target.nextElementSibling) {
                caption = e.target.nextElementSibling;
            } else {
                caption = tabTitle.firstElementChild;
            }
        } else {
            if (e.target.previousElementSibling) {
                caption = e.target.previousElementSibling;
            } else {
                caption = tabTitle.lastElementChild;
            }
        }
        changeTab(caption);
    }
    xDown = null;
}