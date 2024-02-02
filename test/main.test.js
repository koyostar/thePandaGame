let {
  draw,
  changeDirections,
  placeBamboo,
  rows,
  cols,
  blockSize,
  velocityX,
  velocityY,
} = require("../main");

test("bambooPlacement", () => {
  let bambooX = 0;
  let bambooY = 0;

  placeBamboo();

  expect(bambooX).toBeGreaterThanOrEqual(0);
  expect(bambooX).toBeLessThan(cols * blockSize);
  expect(bambooY).toBeGreaterThanOrEqual(0);
  expect(bambooY).toBeLessThan(rows * blockSize);
});

test("movePanda with key pressed", () => {
  let pandaX = blockSize * 5;
  let pandaY = blockSize * 5;

  console.log(`Before changeDirections: ${pandaX}, ${pandaY}`);

  const event = new KeyboardEvent("keyup", { code: "ArrowDown" });
  document.dispatchEvent(event);

  velocityX = 0;
  velocityY = 0;

  changeDirections("downBtn");

  console.log(`After changeDirections: ${pandaX}, ${pandaY}`);

  pandaX += velocityX * blockSize;
  pandaY += velocityY * blockSize;

  expect(pandaX).toBe(blockSize * 5);
  expect(pandaY).toBe(blockSize * 6);

  // changeDirections("upBtn");

  // expect(velocityX).toBe(0);
  // expect(velocityY).toBe(-1);
});
