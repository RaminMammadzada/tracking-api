import { CRUD } from '../../common/crud.interface';
import VisitorsDao from '../daos/visitors.dao';
import { PutVisitorDto } from '../dto/put.visitor.dto';

class VisitorsService implements CRUD {
    async create(resource?: any) {
        return VisitorsDao.addVisitor();
    }
    async list() {
        return VisitorsDao.getAllVisitors();
    }

    async readById(id: number) {
        return VisitorsDao.getVisitorById(id);
    }

    async putByUnequeId(putByUnequeId: string, resource: PutVisitorDto): Promise<any> {
        return VisitorsDao.updateVisitorByUnequeId(putByUnequeId, resource);
    }
}

export default new VisitorsService();