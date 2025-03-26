let i = 1;
let chosenPets = [];

class PetCage {
    constructor(petCage) {
        this.checkbox = petCage.querySelector('input[type="checkbox"]');
        this.pet = petCage.querySelector('.pet img');
        this.nameInput = petCage.querySelector(".nameInput.hide");
        this.adoptBtn = petCage.querySelector("button.adopt");

        this.addEventListeners();
    }

    addEventListeners() {
        this.pet.addEventListener('click', () => this.toggleCheckbox());
        this.adoptBtn.addEventListener("click", () => this.adopt());
    }

    toggleCheckbox() {
        this.checkbox.checked = !this.checkbox.checked;
        this.updateActiveClass();
    }

    updateActiveClass() {
        if (this.checkbox.checked) {
            this.pet.classList.add("active");
            this.nameInput.classList.remove("hide");
        } else {
            this.pet.classList.remove("active");
            this.nameInput.classList.add("hide");
        }
    }

    adopt() {
        if (i < 5) {
            let place = document.querySelector(`#chosenPets div:nth-of-type(${i})`);
            let type = `${this.checkbox.value}`.replace(/^happy-/i, '').trim();
            let img = document.createElement("img");
            img.src = `img/${type}Head.svg`;
            let name = this.nameInput.querySelector("input.name").value;
    
            if (name !== "") {
                let nameExists = chosenPets.some(pet => pet.name.toLowerCase() === name.toLowerCase());
    
                if (nameExists) {
                    alert("You can not give the same name to all your pets!");
                } else {
                    place.append(img);
                    this.createPetElement(type, name);
                    i++;
                    document.querySelector("#start").classList.remove("none");
                }
            } else {
                alert("You forgot to give your pet a name!");
            }
        }
    }
    

    createPetElement(type, name) {
        name = name.charAt(0).toUpperCase() + name.slice(1);
        let pet = { type, name };
        chosenPets.push(pet);
    }
}

document.querySelectorAll('.carousel-item').forEach(petCage => new PetCage(petCage));


class Pet {
    constructor(type, name) {
        this.name = name;
        this.type = type;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
        this.history = [];

        this.timer();
    }

    timer() {
        setInterval(() => {
            this.energy -= 15;
            this.fullness -= 15;
            this.happiness -= 15;

            if (this.energy <= 0 || this.fullness <= 0 || this.happiness <= 0) {
                this.runAway();
            }

            this.updateStatBar();
            this.changeImage();
        }, 10000);
    }

    nap() {
        this.energy += 40;
        if(this.energy > 100){
            this.energy = 100;
        }

        this.happiness -= 10;
        if (this.happiness < 0) {
            this.happiness = 0;
        }

        this.fullness -= 10;
        if (this.fullness < 0) {
            this.fullness = 0;
        }

        this.addHistory(`${this.name}`, "took a nap.");
        this.checkIfPetOk();
    }

    play(){
        this.energy -= 10;
        if(this.energy<0){
            this.energy = 0;
        }

        this.happiness += 30;
        if(this.happiness > 100){
            this.happiness = 100;
        }

        this.fullness -= 10;
        if (this.fullness < 0) {
            this.fullness = 0;
        }

        this.addHistory(`${this.name}`,`had a great time playing with you!`);
        this.checkIfPetOk();
    }

    eat(){
        this.energy -= 15;
        if (this.energy < 0) {
            this.energy = 0;
        }

        this.happiness += 5;
        if (this.happiness > 100) {
            this.happiness = 100;
        }

        this.fullness += 30;
        if (this.fullness > 100) {
            this.fullness = 100;
        }

        this.addHistory(`${this.name}`, `ate some food.`);
        this.checkIfPetOk();
    }

    checkIfPetOk(){
        if (this.energy === 0 || this.happiness === 0 || this.fullness === 0) {
            this.runAway();
            this.addHistory(this.name,`Ran away because of neglect.`)
        }else{
            this.changeImage();
        }
    }

    changeImage(){
        let img = document.querySelector(`div#${this.name} img`);
        if (this.happiness > 50 && this.fullness > 50 && this.energy > 50) {
            img.src = `img/happy-${this.type}.svg`;
        }else if (this.happiness > 30 && this.fullness > 30 && this.energy > 30){
            img.src = `img/${this.type}.svg`;
        } else{
            img.src = `img/sad-${this.type}.svg`;
        }
    }

    updateStatBar() {
        let petBox = document.getElementById(this.name);
        let currentEnergy = this.energy
        let currentHappiness = this.happiness
        let currentFullness = this.fullness

        if(petBox){
            petBox.querySelector('.energy').style.width = currentEnergy + "%";
            petBox.querySelector('.fullness').style.width = currentFullness + "%";
            petBox.querySelector('.happiness').style.width = currentHappiness + "%";
        }
    }

    addHistory(name,activity){
        let ul = document.querySelector("#historyBox ul");
        let li = document.createElement("li");
        li.innerHTML = `<span>${name}</span> ${activity}`;
        ul.append(li);
    }

    runAway(){
        let pet = document.querySelector(`#${this.name}`);
        pet.remove();
        alert(`${this.name} ran away because of neglect`)
    }
}

function createGame(){
    let main = document.querySelector('main');
    main.innerHTML = "";
    main.classList.add("game");

    let petPlace = document.createElement("div");
    petPlace.id = "petPlace";

    let sun = document.createElement("img");
    sun.id = "sun"
    sun.src = "img/sun.svg";

    main.append(petPlace,sun);
    createPets();
}

function createPets(){
    chosenPets.forEach(pet => {
        let type = pet.type;
        let name = pet.name;
        let newPet = new Pet(type, name);

        let petBox = document.createElement("div");
        petBox.id = newPet.name;
        petBox.classList.add('petBox');

        petBox.innerHTML = `
        <p class="petName">${newPet.name}</p>
        <div class="stats">
            <p>Energy</p>
            <div class="outsideBar">
                <div class="insideBar energy"></div>
            </div>
            <p>Fullness</p>
            <div class="outsideBar">
                <div class="insideBar fullness"></div>
            </div>
            <p>Happiness</p>
            <div class="outsideBar">
                <div class="insideBar happiness"></div>
            </div>
        </div>
        <img src="img/${newPet.type}.svg" alt="${newPet.type}">
        <div class="buttonbox">
            <button class="napButton">Nap</button>
            <button class="playButton">Play</button>
            <button class="eatButton">Eat</button>
        </div>
        `;

        petBox.querySelector('.napButton').addEventListener('click', () => {
            newPet.nap();
            newPet.updateStatBar();
        });

        petBox.querySelector('.playButton').addEventListener('click', () => {
            newPet.play();
            newPet.updateStatBar();
        });

        petBox.querySelector('.eatButton').addEventListener('click', () => {
            newPet.eat();
            newPet.updateStatBar();
        });

        petPlace.append(petBox);
    });
    createHistory();
}

function createHistory(){
    let historyBtn = document.createElement("button");
    historyBtn.id = "historyBtn";

    historyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
    </svg>History`;

    historyBtn.addEventListener('click', () => {
        if (historyBox.style.display === 'none') {
            historyBox.style.display = 'block';
        } else {
            historyBox.style.display = 'none';
        }
    });
    
    let historyBox = document.createElement("div");
    historyBox.style.display = "none";
    let ul= document.createElement("ul");
    historyBox.append(ul);
    historyBox.id = "historyBox";
    document.querySelector("main").append(historyBtn,historyBox);
}

document.querySelector("#start").addEventListener("click", () => {
    createGame();
});