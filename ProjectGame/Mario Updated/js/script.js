kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  background: [92, 148, 252, ],
})

loadSprite('coin', 'img/coin.png')
loadSprite('evil-shroom', 'img/evil-shroom.png')
loadSprite('brick_top', 'img/brick_top.png')
loadSprite('brick_middle', 'img/brick_middle.png')
loadSprite('block', 'img/block.png')
loadSprite('steel', 'img/steel.png')
loadSprite('mario', 'img/mario.png')
loadSprite('mushroom', 'img/mushroom.png')
loadSprite('surprise', 'img/surprise.png')
loadSprite('unboxed', 'img/unboxed.png')
loadSprite('pipe-top-left', 'img/pipe-top-left.png')
loadSprite('pipe-top-right', 'img/pipe-top-right.png')
loadSprite('pipe-bottom-left', 'img/pipe-bottom-left.png')
loadSprite('pipe-bottom-right', 'img/pipe-bottom-right.png')

loadSprite('blue-block', 'img/blue-block.png')
loadSprite('blue-brick', 'img/blue-brick.png')
loadSprite('blue-steel', 'img/blue-steel.png')
loadSprite('blue-evil-shroom', 'img/blue-evil-shroom.png')
loadSprite('blue-surprise', 'img/blue-surprise.png')

loadSound("sound_coin", "sound/sound_coin.wav")

const SPEED = 130

gravity(3100)

// Level 1-1: 15 linha e 211 colunas
const level = addLevel([
  // Desenhe o nível com símbolos
  "                                                                                                                                                                                                                   ",
  "                                                                                                                                                                                                                   ",
  "                                                                                                                                                                                                                   ",
  "                                                                                                                                                                                                                   ",
  "                                                                                                                                                                                                                   ",
  "                      S                                                                                                                                                                                            ",
  "                                                                                                                                                                                                                   ",
  "                                                                                                                                                                                                                   ",
  "                                                                                                                                                                                                                   ",
  "                S   =S=S=                                                                                                                              ss  s                                                       ",
  "                                                                                                                                                      sss  ss                                                      ",
  "                                                                                                                                                     ssss  sss                                                     ",
  "                  @                                                                                                                                 sssss  ssss                                                    ",
  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg  ggggggggggggggggggg   gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg  gggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg  ggggggggggggggggggg   gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg  gggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
], {
  // The size of each grid
  width: 16,
  height: 16,
  // The position of the top left block
  pos: vec2(8, 0),
  // Define what each symbol means (in components)
  "@": () => [sprite("mario"), area(), body(), origin("bot"), "player", ],
  "=": () => [sprite("brick_top"), area(), solid(), origin("bot"), ],
  "#": () => [sprite("brick_middle"), area(), solid(), origin("bot"), ],
  "g": () => [sprite("block"), area(), solid(), origin("bot"), ],
  "s": () => [sprite("steel"), area(), solid(), origin("bot"), ],
  "S": () => [sprite("surprise"), area(), solid(), origin("bot"), ],
  "$": () => [sprite("coin"), area(), origin("bot"), "coin", ],
  //"^": () => [sprite("spike"), area(), origin("bot"), "danger", ],
})

// Get the player object from tag
const player = get("player")[0]

// Movements
onKeyPress("space", () => {
  if (player.isGrounded()) {
    player.jump()
  }
})

onKeyDown("left", () => {
  player.move(-SPEED, 0)
})

onKeyDown("right", () => {
  player.move(SPEED, 0)
})

// Volta para a posição original se atingir o item "danger"
player.onCollide("danger", () => {
  player.pos = level.getPos(0, 0)
})

// Coma a moeda!
player.onCollide("coin", (coin) => {
  destroy(coin)
  play("sound_coin")
})