
najpierw wpisuje z poziomu folderu /dystrybucjaAlpineBackend/ po kolei

docker build -t z1k .
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
docker run -dp 5000:5000 z1k


#nazwa dowolna, z1k wybralem bo taki skrot od zadanie 1 kolokwium
pozniej przechodze cd .. do folderu /zad1/

i odpalam npm install, npm start

pozniej bawie sie curl'ami w konsoli i wciskam gety i posty, albo odpalam postmana i sprawdzam nim, albo wogole wchodze w przegladarke na https://localhost:/5000(tutaj posta nie zrobie bez form'a)

Opis dockerfile'a w dystrybucjaAlpineBackend

FROM node:alpine#<- bierze dystrybucja alpine'a z strony docker'a
WORKDIR './opt/express_server'<- wyznacza katalog pracy na ./opt/express_server w kontenerze tak jak mialo byc
COPY ./package.json ./ <- kopiuje package.jsona do tego katalogu pracy ./app, no tutaj jest napisane ./ ale do ./app bo ustawilismy wczesniej
RUN npm install <- robi w kontenerze komende npm install zeby zaleznosci zainstalowalo
COPY . .
CMD ["npm", "run", "start"] <- po kolei odpala skrypty  npm run i npm start, no i trzeba je zdefiniowac w jsonie zeby sie nic nie wywalilo
EXPOSE 5000 <- udostepnia dostep innym kontenerom w tej samej sieci do tego portu dla tego kontenera, dlatego 5000 bo taki port w index.js wybralem. no generalnie jakby yml to ze zmiennej srodowiskowej by bralo zazwyczaj, zalezy jakby ustawic

przyklad z .yml mam w lab6, no ale mialo byc bez