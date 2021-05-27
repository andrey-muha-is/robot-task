# robot-task
API for robot task. Will run on `http://localhost:3000`. 

# Api endpoints
There is postman collection `./Robot task.postman_collection.json` which can be used to test api.

* `POST /init/:filename` - will parse provided map file and save it into `./server/maps`. Return map as an two-dimension array in response. You can use `./robot-map.txt` file to generate map.;
* `GET /set?x=..&y=..&dir=..` - set robot position and direction. Robot direction can be explained in `./server/src/constants.js` file;
* `GET /move` - try to move robot straight his direction;
* `GET /turn?spin=left|right` - rotate robot;

## Running application in docker
* `docker-compose build && docker-compose up`

## Running application locally
* `cd ./server`
* `npm run start:dev`