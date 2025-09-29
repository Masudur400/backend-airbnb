import Host from './host.model';
import { IHost } from './host.interface';

const createHost = async (data: IHost) => {
    const host = new Host(data);
    await host.save();
    return host;
};

const getAllHosts = async () => {
    return await Host.find();
};

const getHostById = async (id: string) => {
    return await Host.findById(id);
};

const addRating = async (hostId: string, rating: number) => {
    const host = await Host.findById(hostId);
    if (!host) throw new Error('Host not found');

    const currentTotal = host.totalRatings ?? 0;
    const currentAverage = host.averageRating ?? 0;

    const newTotal = currentTotal + 1;
    const newAverage = (currentAverage * currentTotal + rating) / newTotal;

    host.totalRatings = newTotal;
    host.averageRating = parseFloat(newAverage.toFixed(2)); // last 2 decimal

    await host.save();
    return host;
};




export const hostService = {
    createHost,
    getAllHosts,
    getHostById,
    addRating,
}
