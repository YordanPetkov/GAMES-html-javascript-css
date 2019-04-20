function isPlayerWin(player,physicalBody,sprite,background,winWall){
    var obj = {
        "player": physicalBody.player,
        "x": physicalBody.coordinates.x,
        "y": physicalBody.coordinates.y + physicalBody.speed.y,
        "size": playerHeight
    };
    if(isObjectCollidingWithWall(obj, winWall, "top")){
        //NEXT LEVEL CONDITION
        
        physicalBody.coordinates.x = 10;
        physicalBody.coordinates.y = HEIGHT - sprite.height;
        physicalBody.speed.x = 0;
        physicalBody.speed.y = 0;
        if(physicalBody.player == pikachu){
            curPikachuPosibleHeight = HEIGHT - playerHeight;
        }
        if(physicalBody.player == pokeball){
            curPokeballPosibleHeight = HEIGHT - playerHeight;
        }
        

        if(background.update()){
            gameInProgress = false;
            return true;
        }

        if(player == pikachu){
            clearCanvas(pikachuContex);
            pikaWalls.splice(0, pikaWalls.length);
            pikaQuests.splice(0, pikaQuests.length);
            pikafinalWall.splice(0, pikafinalWall.length);
            [pikaWalls, pikaQuests, pikafinalWall] = background.render();
        }
        else if(player == pokeball){
            clearCanvas(pokeballContex);

            pokefinalWall.splice(0, pokefinalWall.length);
            pokeWalls.splice(0, pokeWalls.length);
            pokeQuests.splice(0, pokeQuests.length);

            [pokeWalls, pokeQuests, pokefinalWall] = background.render();
        }
        
    }
    return false;
}

function clearCanvas(context){
    context.clearRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );
}