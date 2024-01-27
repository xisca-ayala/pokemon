class Pokemon{
    constructor(id, name, photo, abilities, types){
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.abilities = abilities; 
        this.types = types;
    }
}

const apiButton = document.getElementById('apiButton');
apiButton.addEventListener('click', getPokemon);

const inputId = document.getElementById('searchInput');
inputId.addEventListener('keydown', function onEvent(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        getPokemon();
    }
});

function getPokemon(){
    const searchInput = document.getElementById('searchInput').value; 
    let url= "https://pokeapi.co/api/v2/pokemon/" + searchInput;
    const card = document.getElementById('card'); 
    let html = '';
    let param = {
        headers: {"Content-type": "application/json; charset = UTF-8"},
        method: "GET"
    }
    if(searchInput !== 0) {
        fetch(url, param)
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                console.log(data)
                if(!data.error){
                    const pokemon = setPokemon(data);
                    html = '<div class="cardBox">'+
                                '<div class="card" style="width: 20rem;">'+
                                    '<img src="'+ pokemon.photo + '" class="card-img-top" alt="..." id="pokePhoto">'+
                                    '<div class="card-body">'+
                                        '<h5 class="card-title">#' + pokemon.id + ' - ' + capitalize(pokemon.name) +'</h5>'+
                                    '</div>'+
                                    '<table class="table">'+
                                        '<thead>'+
                                            '<th scope="row"></th>' +
                                            '<td colspan="2" class="table-active">Habilidades</td>'+
                                        '</thead>'+
                                        '<tbody>';
                                        pokemon.abilities.forEach(function (ability, index) {
                                            html += '<tr>' +
                                                        '<th scope="row">' + (index+1) + '</th>' +
                                                        '<td colspan="2" class="table-active">' + capitalize(ability.ability.name) + '</td>'+
                                                    '</tr>';
                                        });
                                html += '</tbody>'+
                                    '</table>'+
                                '</div>' +
                            '</div>';
                card.innerHTML = html;   
                }else{
                    showToast("ERROR: " + data.mensaje, "bg-danger")
                }
            })
            .catch(error=>{
                console.error(error);
            })
    }
}

function setPokemon(data) {
    let pokemon = new Pokemon(
        data.id,
        data.name,
        data.sprites.front_default, 
        data.abilities,
        data.types);
    return pokemon;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

    