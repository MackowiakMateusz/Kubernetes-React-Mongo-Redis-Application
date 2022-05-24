trzeba wpisac z poziomu katalogu ZAD_2
docker-compose up
i juz
nodemon zainstalowany komenda:

dockerfile z frontendu
FROM node:alpine

WORKDIR /opt/app

COPY ./package.json ./

RUN yarn install
RUN npm install -g nodemon
COPY . .

CMD ["yarn", "start"]
EXPOSE 3000 <- daje dostep do frontendu


dockerfile z backendu
FROM node:alpine

WORKDIR /opt/app

COPY ./package.json ./

RUN npm install
RUN npm install -g nodemon
COPY ./ ./

CMD node index.js
EXPOSE 5432
EXPOSE 5432 < daje dostep do backendu


no i zawsze jakby jakies zmiany sie jednak nie zapisywaly jak zmieniamy kod, to mozna najpierw zatrzymac cala grupke kontenerow w sieci, odinstalowac, potem usunac image'e w interfejsie dockera 
i docker-compose up jeszcze raz

to samo da sie zrobic ponizszymi komendami(na labach je zpaisalem w pliku komendy.txt)
pull <nazwa_imaga> -> pobierze image z docker-huba jezeli istnieje
run <nazwa_imaga> -> sprawdzi czy obraz istneije na komputerze, jezeli nie wyszuka w docker-hubie, jezeli istnieje w docker-hubie, to pobierze
docker ps -> wyswietla wszystkie aktualnie uruchomione containery
docker ps -a -> wyswietla wszystkie containery jakie sa pobrane
docker stop <NAME/CONTAINER ID> -> wylacza container z parametrem NAME z NAMES lub CONTAINER ID, ktory mozna znalesc w docker ps
docker start <CONTAINER ID/NAME> ->wlacza container z parametrem NAME z NAMES lub CONTAINER ID, ktory mozna znalesc w docker ps
docker system prune -> usuwa wszystkie nieuruchomione image'e, volume'y niezwiązane z uruchomionymi image'ami
docker rm <nazwa/id>-> usuwa image

docker build -t <nazwa> <sciezka, np, kropka-> "."> -> buduje skrypt


docker inspect <id networka> jest fajny jeszcze bo mozna w nim podejrzec adres ip roznych kontenerow w networku
