const express=require('express');

const fs=require('fs');

const app=express();

app.listen(3030,()=>console.log('Server running in port 3030'));

const heroes=JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json','utf-8'));

app.get('/',(req,res)=>{
    res.send('​Ni Superman, IronMan o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!.'
    )
});

app.get('/heroes',(req,res)=>{
	res.send(heroes);
});

app.get('/heroes/detalles/:id',(req,res)=>{
	let hero=heroes.find(heroe=>{
		return heroe.id==req.params.id;
	})
	if(hero==null){
		res.send(`No existe heroes con el id numero ${req.params.id}`)
	}
	res.send(`Hola, mi nombre es ${hero.nombre} y soy ${hero.profesion}`);
});


app.get("/heroes/bio/:id/:ok?",(req, res)=>{
    let hero=heroes.find(heroe=>{
        return heroe.id==req.params.id;
    });
    if (hero){
        if (req.params.ok=="ok") {
            res.send(`Hola, mi nombre es ${hero.nombre}.\n${hero.resenia}`);
        }else{
            res.send(
                `Hola, mi nombre es ${hero.nombre} y soy ${hero.profesion}.\nLamento que no desees saber más de mi :(`
            );
        }
    }else{
        res.send(`No encontramos un héroe para mostrarte su biografía`);
    }
});

app.get('/creditos',(req,res)=>{
    res.send('Gracias a Google por ayudarme con el metodo de find.')
})

app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});