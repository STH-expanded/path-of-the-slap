var isCollide = (playerPos, playerSize, wallPos, wallSize) => {
  return !(
    playerPos.y + playerSize.y < wallPos.y ||
    playerPos.y > wallPos.y + wallSize.y ||
    playerPos.x + playerSize.x < wallPos.x ||
    playerPos.x > wallPos.x + wallSize.x
  );
};

var isIntersect = (playerPos, playerSize, wallPos, wallSize) => {
  return !(
    playerPos.y + playerSize.y <= wallPos.y ||
    playerPos.y >= wallPos.y + wallSize.y ||
    playerPos.x + playerSize.x <= wallPos.x ||
    playerPos.x >= wallPos.x + wallSize.x
  );
};

var inBound = (playerPos, playerSize, bound) => {
  return !(
    playerPos.y + playerSize.y > bound.y / 2 ||
    playerPos.y < -bound.y / 2 ||
    playerPos.x + playerSize.x > bound.x / 2 ||
    playerPos.x < -bound.x / 2
  );
};

var obstaclesAt = (pos, size, obstacles, bound) => {
  var result = [];
  obstacles.forEach(obstacle => {
    if (inBound(pos, size, bound)) {
      result.push(obstacle);
    }
  });
  return result;
};
