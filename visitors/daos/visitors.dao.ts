import shortid from 'shortid';
import debug from 'debug';
import { CreateVisitorDto } from '../dto/create.visitor.dto';
import { PutVisitorDto } from '../dto/put.visitor.dto';
const log: debug.IDebugger = debug('app:visitors-dao');

class VisitorsDao {
    visitors: Array<CreateVisitorDto> = [];
    constructor() {
        log('Created new instance of VisitorsDao');
    }

    async addVisitor() {
        const visitor: CreateVisitorDto = {
            id: this.visitors.length + 1,
            unequeId: shortid.generate(),
            numberOfVisit: 1
        };
        this.visitors.push(visitor);
        return visitor;
    }

    async getVisitors() {
        return this.visitors;
    }

    async getVisitorById(visitorId: number) {
        return this.visitors.find(
            (visitor) => visitor.id === visitorId
        );
    }

    async updateVisitorByUnequeId(visitorUnequeId: string, visitor: PutVisitorDto) {
        const objIndex = this.visitors.findIndex(
            (obj: { unequeId: string }) => obj.unequeId === visitorUnequeId
        );

        visitor.numberOfVisit = this.visitors[objIndex].numberOfVisit + 1
        this.visitors.splice(objIndex, 1, visitor);
    }
}

export default new VisitorsDao();