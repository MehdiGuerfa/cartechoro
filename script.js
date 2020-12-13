/// CREATION D'UNE CARTE WEB CHOROPLETE DYNAMIQUE REPRESENTANT LEs RESIDENCES SECONDAIRES ET VACANTES PAR COMMUNE DE FRANCE EN UTILISANT D3JS//


// URL des données : 
let communesURL = 'https://srv-store4.gofile.io/download/slGNSt/a-com2020-topo-3857.json'
let logementsURL = 'https://srv-store2.gofile.io/download/vnxIHB/logements_communes.json'

// Variables dont on a besoin pour faire la carte pas encore déclarés : 
let communes
let logements 

// Espace pour dessiner la carte : 
let canvas = d3.select('#canvas')


//Fonction pour dessiner la carte : 
let dessinerCarte = () => {
   canvas.selectAll('path') // On sélectionne tous les paths du svg canvas
         .data(communes) // Associer les paths du svg aux arrays du json
         .enter() //On lui dit quoi faire quand il n'y a pas de paths dans les communes => ajouter un nouveau path
         .append('path')
         .attr('d', d3.geoPath())
         .attr('class', 'com')
}

// Importer les données en utilisant une promesse : si il n'y a pas d'erreur, assigner les données aux variables sinon afficher l'erreur : 
d3.json(communesURL).then(  //La méthode d3.json retourne une promesse : soit ça convertir le fichier json de l'url en objet javascript
    (data, erreur) => {
        if(erreur){
            console.log(erreur) //Afficher l'erreur retournée 
        }
        else{ // Ce code s'exécute uniquement si le résultat de la promesse est positif : ca veut dire que les données de communes ont été importés sans erreur
            communes = topojson.feature(data, data.objects.a_com2020).features
            
            console.log(communes)
            
             // Assinger les données des communes et les afficher 
            // ET ENSUITE importer les données de salaires => L'ordre est important, c'est pour ça qu'on fait une promesse : d'abord 
            //communes puis les données attributaires 
            d3.json(logementsURL).then(
                (data, erreur) => {
                    if(erreur){
                        console.log(erreur)
                    }
                    else{
                        logements = data
                        console.log(logements)
                        dessinerCarte()
                    }
                }
            )
            


        }
    }
)
