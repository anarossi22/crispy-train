const canvas = document.createElement("canvas");
canvas.width = 600; canvas.height = 400;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let player = { x: 60, y: 300, w: 32, h: 32, hasKey: false };
let objects = [
  { x: 200, y: 220, w: 30, h: 30, type: "key", taken: false },
  { x: 420, y: 100, w: 60, h: 40, type: "door", open: false }
];
let msg = "";

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, 600, 400);
  ctx.fillStyle = "#0af";
  ctx.fillRect(player.x, player.y, player.w, player.h);
  objects.forEach(obj => {
    if (obj.type === "key" && !obj.taken) {
      ctx.fillStyle = "#ff0";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    }
    if (obj.type === "door") {
      ctx.fillStyle = obj.open ? "#0f0" : "#f00";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    }
  });
  ctx.fillStyle = "#fff";
  ctx.font = "18px Arial";
  ctx.fillText("Move: Arrow keys | Interact: E", 12, 24);
  ctx.fillText(msg, 12, 50);
}

document.addEventListener("keydown", e => {
  let moved = false;
  if (e.key === "ArrowLeft") { player.x -= 16; moved = true; }
  if (e.key === "ArrowRight") { player.x += 16; moved = true; }
  if (e.key === "ArrowUp") { player.y -= 16; moved = true; }
  if (e.key === "ArrowDown") { player.y += 16; moved = true; }
  if (moved) msg = "";
  if (e.key === "e" || e.key === "E") {
    // Key
    let key = objects[0];
    if (!key.taken && Math.abs(player.x-key.x)<32 && Math.abs(player.y-key.y)<32) {
      key.taken = true; player.hasKey = true; msg = "You picked up the key!";
    }
    // Door
    let door = objects[1];
    if (Math.abs(player.x-door.x)<60 && Math.abs(player.y-door.y)<40) {
      if (player.hasKey) { door.open = true; msg = "You opened the door. Escaped!"; }
      else msg = "It's locked. Find the key!";
    }
  }
});

function loop() {
  draw();
  requestAnimationFrame(loop);
}
loop();