import historicalEventsRepository from '../repository/historicalEventsRepository'

exports.getHistoricalEventsByOcurrence = (ctx) => {
    const { ocurrence } = ctx.params;

    if (ocurrence.length !== 2) {
        ctx.status = 400;
        ctx.body = { message: 'El input debe ser ac o dc' };
        return ctx;
    }

    if (!/^[a-zA-Z]+$/.test(ocurrence)) {
        ctx.status = 400;
        ctx.body = { message: 'Solo se aceptan caracteres no numéricos' };
        return ctx;
    }

    const events = historicalEventsRepository.getHistoricalEvents(ocurrence.toLowerCase());

    if (ocurrence.toLowerCase() !== 'ac' && ocurrence.toLowerCase() !== 'dc') {
        ctx.status = 400;
        ctx.body = { message: 'El input debe ser ac o dc' };
        return ctx;
    }
    
    ctx.status = 200;
    ctx.body = events;
    return ctx;
};