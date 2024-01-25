class pokemon{
    constructor(name, photo, abilities){
        this.name = name;
        this.photo = photo;
        this.abilities = abilities; 
    }
}


const apiButton = document.getElementById('apiButton');


apiButton.addEventListener('click', getPokemon);

function getPokemon(){
    const searchInput = document.getElementById('searchInput').value; 
    
    const pokeName = document.getElementById('pokeName');
    const pokePhoto = document.getElementById('pokePhoto');
    const pokeAbilities = document.getElementById('pokeAbilities')
    const pokeId = document.getElementById('pokeId');

    console.log(searchInput); 

    let url= "https://pokeapi.co/api/v2/pokemon/" + searchInput;

    let param={
            headers: {"Content-type": "application/json; charset = UTF-8"},
            method: "GET"
        }


    fetch(url, param)
        .then(res=>{
            return res.json();
        })
        .then(data=> {
            console.log(data)
            if(!data.error){
                pokeName.value = data.name; 
                console.log(pokeName.value); 
                pokeName.innerText = data.name; 
                pokeId.value = data.id;
                console.log(pokeId.value); 
                pokeId.innerText = data.id; 
                pokePhoto.value = data.sprites.front_default;
                console.log(pokePhoto.value);
                pokePhoto.src = data.sprites.front_default;
                // pokeAbilities.value = data.abilities[0].ability.name; 
                // console.log(pokeAbilities.value);
                // map per accedir a diferents habilitats
              
            }else{
                showToast("ERROR: " + data.mensaje, "bg-danger")
            }
        })
        .catch(error=>{
            console.error(error);
        })
    }

  

    