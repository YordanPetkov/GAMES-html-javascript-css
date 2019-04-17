function applyGravityVertical(physicalBody, gravity) {
    
    if(physicalBody.coordinates.y === (HEIGHT - physicalBody.height)){
        return;
    }


    if(physicalBody.coordinates.y >= (HEIGHT - physicalBody.height)){
        physicalBody.coordinates.y = (HEIGHT - physicalBody.height);
        physicalBody.speed.y = 0;
        return;
    }

    physicalBody.speed.y += gravity;
}

function updatePlayer(objectBody, currentSprite){
        applyGravityVertical(objectBody, 1);
        var lastObjectCoordinates = objectBody.move();

        if(objectBody.coordinates.x < 0)objectBody.coordinates.x = 0;
        if(objectBody.coordinates.x > (WIDTH - objectBody.width))objectBody.coordinates.x = WIDTH - objectBody.width;

        if(objectBody.coordinates.y < 0)objectBody.coordinates.x = 0;
        if(objectBody.coordinates.y > (WIDTH - objectBody.width))objectBody.coordinates.x = WIDTH - objectBody.width;

        currentSprite
                .render(objectBody.coordinates, lastObjectCoordinates)
                .update();
}
    