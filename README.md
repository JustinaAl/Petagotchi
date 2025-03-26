# Petagotchi
Tamagotchi-inspired game made with vanilla JS.


1. Användare ska kunna skapa upp flera husdjur (upp till 4 stycken).

2. Varje husdjur som skapas ska ha följande egenskaper:  name, animalType, energy, fullness, och happiness.

3. AnimalType ska kunna väljas mellan fyra förvalda olika djurtyper.

4. Energy, fullness, och happiness ska vara en siffror som indikerar dess värde, mellan 0-100. Startvärde för samtliga ska vara 50.

5. Varje husdjur ska kunna göra följande aktiviteter som uppdaterar dess egenskaper enligt följande krav (siffrorna kan justeras):
    - nap - Ökar energy med 40, sänker happiness med 10 och fullness med 10.
    - play - Ökar happiness med 30, sänker fullness och energy med 10. 
    - eat - Ökar fullness med 30 och happiness med 5, sänker energy med 15. 


6. När man utför en aktivitet, ska det skrivas ut ett meddelande vad man gör och med vilket djur 
t.ex. “You played with Maya!” eller “You took a nap with Lexi” etc. 

7. Det ska finnas en textruta med all historik på samtliga aktiviteter som skett.

8. Om något av värdena når 0, så springer husdjuret iväg på grund av misskötsel. Ta bort husdjuret från DOM:en.

9. Varje husdjur ska sätta igång en timer när den skapas. Var 10:e sekund minskar energy fullness  och happiness med 15.
