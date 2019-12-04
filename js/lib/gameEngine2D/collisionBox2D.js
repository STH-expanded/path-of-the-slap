function isCollide(playerPos, playerSize, wallPos, wallSize) {
  return !(
    playerPos.y + playerSize.y < wallPos.y ||
    playerPos.y > wallPos.y + wallSize.y ||
    playerPos.x + playerSize.x < wallPos.x ||
    playerPos.x > wallPos.x + wallSize.x
  );
}

function isIntersect(playerPos, playerSize, wallPos, wallSize) {
  return !(
    playerPos.y + playerSize.y <= wallPos.y ||
    playerPos.y >= wallPos.y + wallSize.y ||
    playerPos.x + playerSize.x <= wallPos.x ||
    playerPos.x >= wallPos.x + wallSize.x
  );
}

function inBound(playerPos, playerSize, bound) {
  return !(
    playerPos.y + playerSize.y > bound.size.y / 2 ||
    playerPos.y < -bound.size.y / 2 ||
    playerPos.x + playerSize.x > bound.size.x / 2 ||
    playerPos.x < -bound.size.x / 2
  );
}

var obstaclesAt = (pos, size, obstacles) => {
  var result = [];
  obstacles.forEach(obstacle => {
    if (isIntersect(pos, size, obstacle.pos, obstacle.size)) {
      result.push(obstacle);
    }
  });
  return result;
};
