/**
 * @description Recorro el array y muestro las imagenes en la pagina
 */
async function getPublications(){
    console.log("hola");
    let axiosResponse = await axios.get('http://localhost:3002/publications');
    console.log("AxiosResponse",axiosResponse.data);

    let database = axiosResponse.data

let arrayPublications = database;
    //llamo al id que tengo en HTML
    let idDiv = document.getElementById('listPublications')

    for(let i=0; i < arrayPublications.length; i++){

        let imgElement;
        let descriptionImage;
        let likesCount;
        let dislikeBtn;
        let likeBtn;

        let divElement;

        imgElement = document.createElement ('img');
        descriptionImage = document.createElement('h5');
        likesCount = document.createElement('h3');
        dislikeBtn = document.createElement('button');
        likeBtn = document.createElement('button');

        divElement = document.createElement('div')

        imgElement.src = arrayPublications[i].img;
        descriptionImage.innerText = arrayPublications[i].texto;

        likesCount.innerText = arrayPublications[i].likes;
        likesCount.setAttribute("id",i);

        dislikeBtn.innerText = arrayPublications[i].button;
        dislikeBtn.setAttribute("id",i)

        likeBtn.innerText = arrayPublications[i].button2;
        likeBtn.setAttribute("id",i)
        likeBtn.style.display="none"

        dislikeBtn.addEventListener('click',async function(){

            //Hago cosas antes de request a backend
            let axiosResponse = await axios.put('http://localhost:3002/publications')

            let publicacionBackend = axiosResponse.data;
            console.log(publicacionBackend);
            //Hago cosas con la respuesta que me da el backend

            likesCount.innerText++;
            database[dislikeBtn.id].likes++;
            dislikeBtn.style.display = "none";
            likeBtn.style.display = "inline-block";
        })

        likeBtn.addEventListener('click',function(){
            likesCount.innerText--;
            database[dislikeBtn.id].likes--;
            dislikeBtn.style.display = "inline-block";
            likeBtn.style.display="none";
        })

        dislikeBtn.classList.add("heartDislike");
        likeBtn.classList.add("heart");

        divElement.appendChild(imgElement);
        divElement.appendChild(descriptionImage);
        divElement.appendChild(likesCount);
        divElement.appendChild(dislikeBtn);
        divElement.appendChild(likeBtn);

        //agrego todo al div mayor "contenedor"
        idDiv.appendChild(divElement);
    }

}

/**
 * @description Subo una nueva publicacion a la pagina
 * @param {object} newPublication
 */
function uploadPublication(newPublication){
    let divContainer = document.getElementById("listPublications")


    let imgElement = document.createElement ('img');
    let descriptionImage = document.createElement('h5');
    let likesCount = document.createElement('h3');
    let dislikeBtn = document.createElement('button');
    let likeBtn = document.createElement('button');

    let divElement = document.createElement('div')
    console.log(newPublication)
    imgElement.src = newPublication.img;
    descriptionImage.innerText = newPublication.texto;

    likesCount.innerText = newPublication.likes;
    likesCount.setAttribute("id",newPublication.id - 1 );

    dislikeBtn.innerText = newPublication.button;
    dislikeBtn.setAttribute("id",newPublication.id - 1)

    likeBtn.innerText = newPublication.button2;
    likeBtn.setAttribute("id",newPublication.id - 1)
    likeBtn.style.display="none"

    dislikeBtn.addEventListener('click',function(){
        likesCount.innerText++;
        database[dislikeBtn.id].likes++;
        dislikeBtn.style.display = "none";
        likeBtn.style.display = "inline-block";
    })

    likeBtn.addEventListener('click',function(){
        likesCount.innerText--;
        database[dislikeBtn.id].likes--;
        dislikeBtn.style.display = "inline-block";
        likeBtn.style.display="none";
    })

    dislikeBtn.classList.add("heartDislike");
    likeBtn.classList.add("heart");

    divElement.appendChild(imgElement);
    divElement.appendChild(descriptionImage);
    divElement.appendChild(likesCount);
    divElement.appendChild(dislikeBtn);
    divElement.appendChild(likeBtn);


    //agrego todo al div mayor "contenedor"
    divContainer.appendChild(divElement);

}

/**
 * @description crea una nueva publicacion
 */
async function createPublication() {
    let imageUrl = document.getElementById('image-url').value
    let textDescripcion = document.getElementById('text-descripcion').value
    let body = {id: 0 ,img:imageUrl, texto:textDescripcion, likes:0, likeBtn:'',dislikeBtn:''}
    //Post al backend
    let axiosResponse = await axios.post('http://localhost:3002/publications', body)
    uploadPublication(axiosResponse.data)
}
