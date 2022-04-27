const express = require('express');
var cors = require('cors') // control acceso http
const app = express();
const PORT = 3002;

app.use(cors())
app.use(express.json())


let publications = [
    {   
        id: 1,
        img: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        texto: 'El descanso',
        likes: 5,
        button: " ",
        button2:''
    },
    {
        id: 2,
        img: 'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        texto: 'Paz',
        likes: 8,
        button: " ",
        button2:''
    },
    {
        id: 3,
        img: 'https://images.pexels.com/photos/9470498/pexels-photo-9470498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        texto: 'Palmeras',
        likes: 9,
        button: " ",
        button2:'' 
    }
]

app.get('/publications', (request, response) => {
    response.json(publications)
})

app.post('/publications', (request, response) => {

    let publication = request.body
    console.log("publicacion",publication)
    publication.id = publications.length + 1
    publications.push(publication)
    response.json(publication)
})


app.put('/publications/likes/:id', ((request, response) => {

    let id = request.params.id
    console.log("id",id);

    let publication = publications.find((elem => elem.id === parseInt(id)))
    
    if(publication==undefined){
       response.status(404)
       return response.send("La publicacion con id "+ id + " no existe." )
    }


    console.log("publication",publication)

    publication.likes++
    console.log("publication+1",publication)

    response.json(publication)
}));

app.get('/', (req, res) => {
    res.send('Instagram funcionando!');
});

app.listen(PORT, () => console.log('Escuchando server en el puerto '+PORT));
