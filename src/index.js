const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const colorset = document.querySelector(".colorset");
const colorOption = Array.from(document.querySelectorAll(".colorOption"));
const fillMode = document.querySelector(".fillMode");
const strokeMode = document.querySelector(".strokeMode");

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  setStyle(event.target.value);
}

function setStyle(color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function onClickColorOption(event) {
  const selectedColor = event.target.dataset.color;
  setStyle(selectedColor);
  colorset.value = selectedColor;
}

function onClickFillMode() {
  isFilling = true;
}

function onClickStrokeMode() {
  isFilling = false;
}

function onClickCanvas() {
  if (isFilling) {
    ctx.fill();
  }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change", onLineWidthChange);
colorset.addEventListener("change", onColorChange);
colorOption.forEach((option) =>
  option.addEventListener("click", onClickColorOption)
);
fillMode.addEventListener("click", onClickFillMode);
strokeMode.addEventListener("click", onClickStrokeMode);
canvas.addEventListener("click", onClickCanvas);
