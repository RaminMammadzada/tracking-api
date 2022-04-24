import { CRUD } from '../../common/crud.interface';
import VisitorsDao from '../daos/visitors.dao';

class VisitorsService implements CRUD {
    async create(resource?: any) {
        return VisitorsDao.addVisitor();
    }
    async list() {
        return VisitorsDao.getVisitors();
    }

    async readById(id: string) {
        return VisitorsDao.getVisitorByUID(id);
    }
}

export default new VisitorsService();