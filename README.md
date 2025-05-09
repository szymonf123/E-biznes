**Zadanie 1** Docker

:white_check_mark: 3.0 obraz ubuntu z Pythonem w wersji 3.10

:white_check_mark: 3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem

:white_check_mark: 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle)

:white_check_mark: 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle

:white_check_mark: 5.0 dodać konfigurację docker-compose


Kod: zad1

**Zadanie 2** Scala

:white_check_mark: 3.0 Należy stworzyć kontroler do Produktów

:white_check_mark: 3.5 Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy

:white_check_mark: 4.0 Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD

:white_check_mark: 4.5 Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok

:white_check_mark: 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD

Kod: zad2

**Zadanie 3** Kotlin

:white_check_mark: 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord

:white_check_mark:3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota)

:white_check_mark:4.0 Zwróci listę kategorii na określone żądanie użytkownika

:white_check_mark:4.5 Zwróci listę produktów wg żądanej kategorii


Kod: zad3

Demo: [Link do demo](https://ujchmura-my.sharepoint.com/:v:/g/personal/s_fortuna_student_uj_edu_pl/EUQRVIBLwcNLjZ4daRnB65MB2fEUOFvOPvtuzgWfEbZ2aw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=h8r3ZI)

**Zadanie 4** Go

Należy stworzyć projekt w echo w Go. Należy wykorzystać gorm do stworzenia 5 modeli, gdzie pomiędzy dwoma musi być relacja. Należy zaimplementować proste endpointy do dodawania oraz wyświetlania danych za pomocą modeli. Jako bazę danych można wybrać dowolną, sugerowałbym jednak pozostać przy sqlite.

:white_check_mark: 3.0 Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD

:white_check_mark: 3.5 Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy)

:white_check_mark: 4.0 Należy dodać model Koszyka oraz dodać odpowiedni endpoint

:white_check_mark: 4.5 Należy stworzyć model kategorii i dodać relację między kategorią, a produktem

:white_check_mark: 5.0 pogrupować zapytania w gorm’owe scope'y

[Demo](https://ujchmura-my.sharepoint.com/:v:/g/personal/s_fortuna_student_uj_edu_pl/EbjXWq7gxX9KpdlwSgexzooBi22SEzrOUdm0y2m8J1Wwvw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=wYsLtC)

Kod: zad4

**Zadanie 5** Frontend

Należy stworzyć aplikację kliencką wykorzystując bibliotekę React.js.
W ramach projektu należy stworzyć trzy komponenty: Produkty, Koszyk oraz Płatności. Koszyk oraz Płatności powinny wysyłać do aplikacji serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach z aplikacji serwerowej. Aplikacja serwera w jednym z trzech języków:
Kotlin, Scala, Go. Dane pomiędzy wszystkimi komponentami powinny być przesyłane za pomocą React hooks.

:white_check_mark: 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach z aplikacji serwerowej;

:white_check_mark: 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing

:white_check_mark: 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za pomocą React hooks

:white_check_mark: 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose

:white_check_mark: 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS

Kod: zad5

[Demo](https://ujchmura-my.sharepoint.com/personal/s_fortuna_student_uj_edu_pl/_layouts/15/stream.aspx?id=%2Fpersonal%2Fs%5Ffortuna%5Fstudent%5Fuj%5Fedu%5Fpl%2FDocuments%2FE%2Dbiznes%20Demos%2FSzymon%20Fortuna%20zad5%20demo%2Emkv&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E62b222f0%2D64ef%2D4488%2D8774%2D3365156c5543)

**Zadanie 6** Testy

Należy stworzyć 20 przypadków testowych w jednym z rozwiązań:

- Cypress JS (JS)

- Selenium (Kotlin, Python, Java, JS, Go, Scala)

Testy mają w sumie zawierać minimum 50 asercji (3.5). Mają również uruchamiać się na platformie Browserstack (5.0). Proszę pamiętać o stworzeniu darmowego konta via https://education.github.com/pack.

:white_check_mark: 3.0 Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium (Kotlin, Python, Java, JS, Go, Scala)

:white_check_mark: 3.5 Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50 asercji

:white_check_mark: 4.0 Należy stworzyć testy jednostkowe do wybranego wcześniejszego projektu z minimum 50 asercjami

:white_check_mark: 4.5 Należy dodać testy API, należy pokryć wszystkie endpointy z minimum jednym scenariuszem negatywnym per endpoint

:white_check_mark: 5.0 Należy uruchomić testy funkcjonalne na Browserstacku

Kod: zad6, zad4 (dot. części na 4.5), zad5 (dot. części na 4.0)

[Demo](https://ujchmura-my.sharepoint.com/:v:/r/personal/s_fortuna_student_uj_edu_pl/Documents/E-biznes%20Demos/Szymon%20Fortuna%20zad6%20demo.mp4?csf=1&web=1&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=xjjvGC)



**Zadanie 7** Sonar

Należy dodać projekt aplikacji klienckiej oraz serwerowej (jeden branch, dwa repozytoria) do Sonara w wersji chmurowej (https://sonarcloud.io/). Należy poprawić aplikacje uzyskując 0 bugów,
0 zapaszków, 0 podatności, 0 błędów bezpieczeństwa. Dodatkowo należy dodać widżety sonarowe do README w repozytorium dane projektu z wynikami.

:white_check_mark: 3.0 Należy dodać litera do odpowiedniego kodu aplikacji serwerowej w hookach gita

3.5 Należy wyeliminować wszystkie bugi w kodzie w Sonarze (kod aplikacji serwerowej)

4.0 Należy wyeliminować wszystkie zapaszki w kodzie w Sonarze (kod aplikacji serwerowej)

4.5 Należy wyeliminować wszystkie podatności oraz błędy bezpieczeństwa w kodzie w Sonarze (kod aplikacji serwerowej)

5.0 Należy wyeliminować wszystkie błędy oraz zapaszki w kodzie aplikacji klienckiej

https://golangci-lint.run/

https://github.com/pinterest/ktlint

https://scalameta.org/scalafmt/docs/installation.html
