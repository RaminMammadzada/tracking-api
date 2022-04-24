import { CRUD } from '../../common/crud.interface';

class VisitorsService implements CRUD {
    async create(resource: any) {
        return null;
    }
    async list(limit: number) {
        return null;
    }
}

export default new VisitorsService();