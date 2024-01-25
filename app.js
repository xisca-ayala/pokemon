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
    let url= "https://pokeapi.co/api/v2/pokemon/" + searchInput;
    const card = document.getElementById('card'); 
    let html = '';
       let param={
            headers: {"Content-type": "application/json; charset = UTF-8"},
            method: "GET"
        }
    if(searchInput !== 0){
        fetch(url, param)
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                console.log(data)
                if(!data.error){
                    let pokeName = ''; 
                    pokeName.innerText = data.name;  
                    let pokeId = Number; 
                    pokeId.innerText = data.id; 
                    let pokePhoto = ''; 
                    pokePhoto.src = data.sprites.front_default;

                    // let pokeAbilities= []; 
                    // pokeAbilities.innerText = data.abilities[0].ability.name; 

                    html = ' <div class="cardBox">'+
                    '<div class="card" style="width: 20rem;">'+
                        '<img src="'+ data.sprites.front_default + '" class="card-img-top" alt="..." id="pokePhoto">'+
                        '<div class="card-body">'+
                            '<h5 class="card-title">'+ data.name +'</h5>'+
                            '<p>'+ data.id + '</p>'+
                    ' </div>'+
                        '<table class="table">'+
                        '<thead>'+
                            '<th scope="row"></th>' +
                                '<td colspan="2" class="table-active">Habilidad</td>'+
                            '</thead>'+
                            '<tbody>'+
                            '<tr>' +
                            '<th scope="row">1</th>' +
                            '<td colspan="2" class="table-active">Larry the Bird</td>'+
                            '</tr>'+
                            ' <tr>'+
                            ' <th scope="row">2</th>'+
                                '<td colspan="2" class="table-active">Larry the Bird</td>'+
                            '</tr>'+
                            ' <tr>'+
                            '<th scope="row">3</th>' +
                            '<td colspan="2" class="table-active">Larry the Bird</td>' +
                            '</tr>' +
                            '</tbody>'+
                            '</table>'+
                        '</div>' +
                     '</div>;'

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

    