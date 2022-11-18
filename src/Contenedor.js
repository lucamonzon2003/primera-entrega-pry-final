const fs = require('fs/promises');

class Contenedor {
    constructor(name) {
        this.name = name

    }

    async save(producto) {
        try {
            const data = await fs.readFile(`./src/storage/${this.name}.json`, {
                encoding: "utf-8",
            });
            const dataP = await JSON.parse(data);
            const id = dataP[dataP.length - 1]?.id + 1 || 1
            producto.id = id
            dataP.push(producto);
            await fs.writeFile(`./src/storage/${this.name}.json`, JSON.stringify(dataP, null, 2));
            return id
        } catch (err) {
            console.log(err);
        }
    }
    async getAll() {
        try {
            const data = await fs.readFile(`./src/storage/${this.name}.json`, {
                encoding: "utf-8",
            });
            let dataP = await JSON.parse(data);
            return (dataP);

        } catch (err) {
            console.log(err)
        }
    }
    async getById(id) {
        try {
            const data = await fs.readFile(`./src/storage/${this.name}.json`, {
                encoding: "utf-8",
            });
            let dataP = await JSON.parse(data);
            let resultado = dataP.find(producto => producto.id == id)
            return (resultado);

        } catch (err) {
            console.log(err)
        }
    }
    async deleteById(id) {
        try {
            const data = await fs.readFile(`./src/storage/${this.name}.json`, {
                encoding: "utf-8",
            });
            let dataP = await JSON.parse(data);
            let resultado = dataP.filter(producto => producto.id != id);
            await fs.writeFile(`./src/storage/${this.name}.json`, JSON.stringify(resultado, null, 2));

        } catch (err) {
            console.log(err)
        }
    }
    async updateById(producto, id) {
        try {
            const data = await fs.readFile(`./src/storage/${this.name}.json`, {
                encoding: "utf-8",
            });
            let dataP = await JSON.parse(data);
            let resultado = dataP.filter(producto => producto.id != id);
            producto.id = id
            resultado.push(producto);
            await fs.writeFile(`./src/storage/${this.name}.json`, JSON.stringify(resultado, null, 2));

        } catch (err) {
            console.log(err)
        }
    }

}

let ejp = {
    title: "goma",
    price: 5,
    thumbnail: "link1234.com"
}

let ejp2 = {
    title: "goma1",
    price: 51,
    thumbnail: "link1234.com1"
}

module.exports = Contenedor;

const pr = new Contenedor('productos')

