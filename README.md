# PRF-Forum-Project
This is my PRF project which implements a Forum


Docker commands to run docker file:
    - "docker build -t my_mongo_image ."      // buildelés
    - "docker run -p 5000:27017 -it --name my_mongo_container -d my_mongo_image"     // a docker image futtatása háttérben
    - "docker rm -f my_mongo_container"       // my_mongo_nevu nevű conatiner törlése
    - "docker ps"         // futó dockeres dolgok listázása, eddigi történtek ellenőrzése
    - "docker exec -it my_mongo_container /bin/bash"  // belépés a mongo containerbe és a /bin/bash futtatása