document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(".container");
    const gridButton = document.getElementById("submit-grid");
    const clearGridButton = document.getElementById("clear-grid");
    const gridWidth = document.getElementById("width-range");
    const gridHeight = document.getElementById("height-range");
    const colorButton = document.getElementById("color-input");
    const eraseBtn = document.getElementById("erase-btn");
    const paintBtn = document.getElementById("paint-btn");
    const widthValue = document.getElementById("width-value");
    const heightValue = document.getElementById("height-value");

    let draw = false;
    let erase = false;
    let deviceType = 'mouse';

    const events = {
        mouse: {
            down: "mousedown",
            move: "mousemove",
            up: "mouseup"
        },
        touch: {
            down: "touchstart",
            move: "touchmove",
            up: "touchend",
        },
    };

    const isTouchDevice = () => {
        try {
            document.createEvent("TouchEvent");
            deviceType = "touch";
            return true;
        } catch (e) {
            deviceType = "mouse";
            return false;
        }
    };

    isTouchDevice();

    const createGrid = () => {
        container.innerHTML = "";
        for (let i = 0; i < gridHeight.value; i++) {
            const row = document.createElement("div");
            row.classList.add("gridRow");
            for (let j = 0; j < gridWidth.value; j++) {
                const col = document.createElement("div");
                col.classList.add("gridCol");
                col.addEventListener(events[deviceType].down, startDrawing);
                col.addEventListener(events[deviceType].move, drawOnMove);
                col.addEventListener(events[deviceType].up, () => draw = false);
                row.appendChild(col);
            }
            container.appendChild(row);
        }
    };

    const startDrawing = (e) => {
        draw = true;
        applyColor(e.target);
    };

    const drawOnMove = (e) => {
        if (draw) {
            const col = document.elementFromPoint(
                deviceType === 'mouse' ? e.clientX : e.touches[0].clientX,
                deviceType === 'mouse' ? e.clientY : e.touches[0].clientY
            );
            if (col && col.classList.contains("gridCol")) {
                applyColor(col);
            }
        }
    };

    const applyColor = (element) => {
        element.style.backgroundColor = erase ? "transparent" : colorButton.value;
        element.style.transition = "background-color 0.2s";
    };

    gridButton.addEventListener("click", createGrid);

    clearGridButton.addEventListener("click", () => {
        container.innerHTML = "";
    });

    eraseBtn.addEventListener("click", () => {
        erase = true;
        eraseBtn.classList.add('active');
        paintBtn.classList.remove('active');
    });

    paintBtn.addEventListener("click", () => {
        erase = false;
        paintBtn.classList.add('active');
        eraseBtn.classList.remove('active');
    });

    gridWidth.addEventListener("input", () => {
        widthValue.textContent = gridWidth.value.padStart(2, '0');
    });

    gridHeight.addEventListener("input", () => {
        heightValue.textContent = gridHeight.value.padStart(2, '0');
    });

    window.onload = () => {
        gridHeight.value = 0;
        gridWidth.value = 0;
    };
});
