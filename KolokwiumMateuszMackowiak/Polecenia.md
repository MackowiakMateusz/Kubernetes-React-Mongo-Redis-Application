**Zadanie 1.** 

Celem zadania jest stworzenie wymieniających informacje kontenerów. Jeden kontener będzie za pomocą curl-a odpytywał API działające na drugim. Utwórz dwa Dockerfile tworzące obrazy dla:
- serwera ExpressJS przygotowanego w projekcie *zad_1*. Serwer powinien nasłuchiwać na porcie ustawionym za pomocą zmiennej środowiskowej. Ponadto serwer powinien znaleźć się w folderze `/opt/express_server`.
- dystrybucji alpine. Dockerfile inicjalizować kontener w taki sposób, aby było możliwe wywołanie polecenia curl. Podczas uruchomienia kontenera, powinno domyślnie wysyłać zapytanie pod endpoint movies. Np.: (adres_ip/movies). Powinna być również możliwość uruchomienia kontenera w trybie interaktywnym i samodzielnego wysyłania requestów.

**Rozwiązanie należy wykonać BEZ korzystania z docker-compose.yml**

**Oprócz rozwiązania zawrzyj plik README.md, w którym opiszesz potrzebne do uruchomienia polecenia. Bez pliku README.md rozwiązanie będzie niekompletne**


**Zadanie 2.** 

W folderze *zad_2* umieszczone są dwa projekty: ExpressJS z API oraz React. Utwórz konfigurację służącą do developmentu tych aplikacji. Backend i frontend powinny się przeładowywać, gdy programista dokona zmian w poszczególnych projektach. Nie zapomnij o ustawieniu zmiennych środowiskowych. Projekty powinny się znaleźć w odpowiednich folderach katalogu `/opt`.

**Oprócz rozwiązania zawrzyj plik README.md, w którym opiszesz potrzebne do uruchomienia polecenia. Bez pliku README.md rozwiązanie będzie niekompletne**
