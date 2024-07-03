import request from 'supertest';
import { server, app } from '../../../src/index';

afterAll(() => {
    server.close();
});

describe('GET /api/history/:ocurrence', () => {
    test('debería devolver 200 con eventos AC ordenados', async () => {
        const response = await request(app.callback()).get('/api/history/ac');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.every(e => e.date <= 0)).toBe(true);
        expect(response.body).toEqual(response.body.sort((a, b) => a.date - b.date));
    });

    test('debería devolver 200 con eventos DC ordenados', async () => {
        const response = await request(app.callback()).get('/api/history/dc');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.every(e => e.date > 0)).toBe(true);
        expect(response.body).toEqual(response.body.sort((a, b) => a.date - b.date));
    });

    test('debería devolver 400 para entrada alfanumérica inválida', async () => {
        const response = await request(app.callback()).get('/api/history/a1');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
    });

    test('debería devolver 400 para entrada de longitud inválida', async () => {
        const response = await request(app.callback()).get('/api/history/abc');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'El input debe ser ac o dc' });
    });

    test('debería devolver 400 para entrada numérica', async () => {
        const response = await request(app.callback()).get('/api/history/12');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
    });

    test('debería devolver 400 para entrada de dos letras inválida', async () => {
        const response = await request(app.callback()).get('/api/history/ab');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'El input debe ser ac o dc' });
    });

    test('debería devolver 400 para entrada de menos de 2 letras', async () => {
        const response = await request(app.callback()).get('/api/history/a');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'El input debe ser ac o dc' });
    });

    test('debería devolver 400 para entrada con espacios en blanco', async () => {
        const response = await request(app.callback()).get('/api/history/ a ');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
    });

    test('debería devolver 200 para entrada "Dc" con eventos DC ordenados', async () => {
        const response = await request(app.callback()).get('/api/history/Dc');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.every(e => e.date > 0)).toBe(true);
        expect(response.body).toEqual(response.body.sort((a, b) => a.date - b.date));
    });

    test('debería devolver 200 para entrada "Ac" con eventos AC ordenados', async () => {
        const response = await request(app.callback()).get('/api/history/Ac');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.every(e => e.date <= 0)).toBe(true);
        expect(response.body).toEqual(response.body.sort((a, b) => a.date - b.date));
    });

    test('debería devolver 400 para entrada con caracteres especiales', async () => {
        const response = await request(app.callback()).get('/api/history/@!');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
    });
});
