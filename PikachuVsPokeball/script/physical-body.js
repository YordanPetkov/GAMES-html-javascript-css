function createPhysicalBody(options){
    "use strict";

    function move() {
        var self = this;


        //var lastCoordinates = JSON.parse(JSON.stringify(self.coordinates));
        var lastCoordinates = { x: self.coordinates.x, y: self.coordinates.y};

        /* if(self.coordinates.x + self.speed.x > WIDTH || self.coordinates.x + self.speed.x < 0)return lastCoordinates;
        if(self.coordinates.y + self.speed.y > HEIGHT || self.coordinates.y + self.speed.y < 0)return lastCoordinates; */
        var obj = {
            
            "player": self.player,
            "x": self.coordinates.x + self.speed.x,
            "y": self.coordinates.y,
            "size": playerHeight,
            "radius": self.radius,
            "data": null
        };

        if(self.player == pikachu){
            obj.data = currentPikachuSprite.context.getImageData(self.coordinates.x, self.coordinates.y, self.width, self.height).data;
            if(options.coordinates.y > curPikachuPosibleHeight){
                curPikachuPosibleHeight = options.coordinates.y;
            }

            if(isObjectCollidingWithWall(obj, pikaWalls, false)){
                self.speed.x = 0;
                
            }
            if(isObjectCollidingWithWall(obj, pikaQuests, false)){
                self.speed.x = 0;
            }
            if(isObjectCollidingWithWall(obj, pikafinalWall, false)){
                self.speed.x = 0;
            }
            if(isObjectCollidingWithWall(obj, pikalavaWalls, false)){
                self.speed.x = 0;
                self.coordinates.x = startX;
                self.coordinates.y = startY;
            }
        }
        else {
            
            obj.data = currentPokeballSprite.context.getImageData(self.coordinates.x, self.coordinates.y, self.width, self.height).data;
            if(options.coordinates.y > curPokeballPosibleHeight){
                curPokeballPosibleHeight = options.coordinates.y;
            }

            if(isObjectCollidingWithWall(obj, pokeWalls, false)){
                self.speed.x = 0;
                
            }
            if(isObjectCollidingWithWall(obj, pokeQuests, false)){
                self.speed.x = 0;
            }
            if(isObjectCollidingWithWall(obj, pokefinalWall, false)){
                self.speed.x = 0;
            }
            if(isObjectCollidingWithWall(obj, pokelavaWalls, false)){
                self.speed.x = 0;
                self.coordinates.x = startX;
                self.coordinates.y = startY;
            }
        }
        
        
        
        

        obj = {
            
            "player": self.player,
            "x": self.coordinates.x,
            "y": self.coordinates.y + self.speed.y,
            "size": playerHeight,
            "radius": self.radius,
            "data": null
        };
        if(self.player == pikachu){
            
            obj.data = currentPikachuSprite.context.getImageData(self.coordinates.x, self.coordinates.y, self.width, self.height).data;
            if(isObjectCollidingWithWall(obj, pikaWalls, "bottom")){
                curPikachuPosibleHeight = self.coordinates.y;
                self.speed.y = 0;
            }
            if(isObjectCollidingWithWall(obj, pikaQuests, "bottom")){
                curPikachuPosibleHeight = self.coordinates.y;
                self.speed.y = 0;
            }
        }
        else {
            
            obj.data = currentPokeballSprite.context.getImageData(self.coordinates.x, self.coordinates.y, self.width, self.height).data;
            if(isObjectCollidingWithWall(obj, pokeWalls, "bottom")){
                curPokeballPosibleHeight = self.coordinates.y;
                self.speed.y = 0;
            }
            if(isObjectCollidingWithWall(obj, pokeQuests, "bottom")){
                curPokeballPosibleHeight = self.coordinates.y;
                self.speed.y = 0;
            }
        }
        

        



        self.coordinates.x += self.speed.x;
        self.coordinates.y += self.speed.y;

        return lastCoordinates;
        
    }

    function collidesWith(otherPhysicalBody){
        var self = this,
            x1 = self.coordinates.x + self.width / 2,
            y1 = self.coordinates.y + self.height / 2,
            x2 = otherPhysicalBody.coordinates.x + otherPhysicalBody.width / 2,
            y2 = otherPhysicalBody.coordinates.y + otherPhysicalBody.height / 2;
        var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        
        return distance <= (self.radius + otherPhysicalBody.radius);
    }

    

    var physicalBody = {
        player: options.player,
        coordinates: options.coordinates,
        defaultAcceleration: options.defaultAcceleration,
        speed: options.speed || { x: 0, y: 0},
        height: options.height,
        width: options.width,
        gravity: options.gravity,
        radius: (options.width + options.height) / 4,
        weaponIndex: options.weaponIndex,
        weaponSorce: options.weaponSorce,
        weaponTimes: {
            "nothing": 0,
            "flash": 0,
            "gravity": 0,
            "freezing": 0
        },
        gravity: 1,

        move: move,
        accelerate: function(axis, direction) {
            var dir;
            if(direction === "up" || direction === "left"){
                dir = -1;
            }
            else {
                dir = 1;
            }

            this.speed[axis] = this.defaultAcceleration[axis] * dir;
        },
        collidesWith: collidesWith
    };

    return physicalBody;
}