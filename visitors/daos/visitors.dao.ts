import shortid from 'shortid';
import debug from 'debug';
import { CreateVisitorDto } from '../dto/create.visitor.dto';
import { PutVisitorDto } from '../dto/put.visitor.dto';
import Visitor  from '../../db/models/visitor';
const log: debug.IDebugger = debug('app:visitors-dao');

class VisitorsDao {
    constructor() {
        log('Created new instance of VisitorsDao');
    }

    async addVisitor() {
        const visitor: CreateVisitorDto = {
            unequeId: shortid.generate(),
            numberOfVisit: 1
        };

        return await Visitor.create(visitor)
    }

    async getAllVisitors() {
        return Visitor.findAll();
    }

    async getVisitorById(visitorId: number) {
        let visitor: any = null;
        await Visitor.findByPk(visitorId).then(
            (res) => visitor = res

        ).catch(error => { throw error});
        return visitor;
    }

    async updateVisitorByUnequeId(visitorUnequeId: string, payload: PutVisitorDto) {
        const visitor = await Visitor.findOne({ where: { unequeId: visitorUnequeId}})
        if(!visitor) {
            throw new Error(`Visitor not found with the Unequq Id: ${visitorUnequeId}`);
        }

        payload.numberOfVisit = visitor.numberOfVisit + 1
        const updatedVisitor = await ( visitor  ).update(payload);
        return updatedVisitor
    }
}

export default new VisitorsDao();