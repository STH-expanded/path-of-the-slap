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

var inBound = (playerPos, playerSize, boundPos, boundSize) => {
  return !(
    playerPos.y + playerSize.y > boundPos.y + boundSize.y ||
    playerPos.y < boundPos.y ||
    playerPos.x + playerSize.x > boundPos.x + boundSize.x ||
    playerPos.x < boundPos.x
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
