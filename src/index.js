const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const colorset = document.querySelector(".colorset");
const colorOption = Array.from(document.querySelectorAll(".colorOption"));
const fillMode = document.querySelector(".fillMode");
const strokeMode = document.querySelector(".strokeMode");
const fileInput = document.querySelector("#file");
const textInput = document.querySelector("#textInput");
const saveBtn = document.querySelector("#saveBtn");
const fontSizeInput = document.querySelector(".font-size");
const clearBtn = document.querySelector(".clear");

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;
let fontsize = fontSizeInput.value;
// const fonturl = "src/ulsanjunggu.ttf";
// let font = new FontFace(
//   "fonttest",
//   "url(https://fonts.gstatic.com/s/notosanskr/v13/PbykFmXiEBPT4ITbgNA5Cgm203Tq4JJWq209pU0DPdWuqxJFA4GNDCBYtw.0.woff2)"
// );
// font.load().then(
//   () => {
//     ctx.font = `${fontsize}px fonttest`;
//     console.log(ctx.font);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

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

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
  fileInput.value = null;
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    updateFont();
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myimage.png";
  a.click();
}

function onFontSizeChange() {
  fontsize = fontSizeInput.value;
  updateFont();
}

function updateFont() {
  ctx.font = `${fontsize}px sans-serif`;
}

function onClearClick() {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
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
fileInput.addEventListener("change", onFileChange);
canvas.addEventListener("dblclick", onDoubleClick);
saveBtn.addEventListener("click", onSaveClick);
fontSizeInput.addEventListener("change", onFontSizeChange);
clearBtn.addEventListener("click", onClearClick);
