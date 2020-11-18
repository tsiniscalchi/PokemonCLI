const fetch = require("node-fetch");
const fs = require("fs");

async function getPokemonTypes(pokemon) {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(json => json.types);
}

async function main(args) {
    var lines = fs.readFileSync(args[2]).toString().replace("\r", "").split("\n");

    lines.forEach(async function(pokemon) {
        var types = await getPokemonTypes(pokemon);
        var outputString = "";

        var names = pokemon.split(" ");

        names.forEach((item, index) => {
            var name = item.split("");

            name[0] = name[0].toUpperCase();
            outputString += name.join("");

            if (index != names.length - 1) outputString += " ";
            else outputString += ": ";
        });

        types.forEach((item, index) => {
            outputString += item.type.name;
            if (index != types.length - 1) outputString += ", ";
        });

        console.log(outputString);
    });
}
