const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200 con un arreglo con mas de 1 elemento", async () => {
        const response = await request(server)
            .get("/cafes")
            .send();
        const coffeeList = response.body;
        const status = response.statusCode;
        expect(status).toBe(200);
        expect(coffeeList).toBeInstanceOf(Array);
        expect(coffeeList.length).toBeGreaterThan(0);
    })

    it("Obteniendo un 404 al eliminar cafe con id que no existe", async () => {
        const response = await request(server)
            .delete("/cafes/5")
            .send()
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
        const status = response.statusCode;

        expect(status).toBe(404);
    })

    it("Enviando un nuevo cafe", async () => {
        const id = 5;
        const cafe = { id, nombre: "Capuccino Vainilla" };

        const { body: cafes, statusCode } = await request(server)
            .post("/cafes")
            .send(cafe);
        expect(cafes).toContainEqual(cafe);
        expect(statusCode).toBe(201);
    });

    it("Obteniendo un 400 al actualizar con diferentes id", async () => {
        const cafe = {
            id: 3,
            nombre: "Vainilla"
        }
        const response = await request(server).put("/cafes/2").send(cafe);
        const status = response.statusCode;
        expect(status).toBe(400);
    })
});
