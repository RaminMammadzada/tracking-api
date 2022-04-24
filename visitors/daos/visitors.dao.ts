import shortid from 'shortid';
import debug from 'debug';
import { CreateVisitorDto } from '../dto/create.visitor.dto';
const log: debug.IDebugger = debug('app:visitors-dao');

class VisitorsDao {
    visitors: Array<CreateVisitorDto> = [];
    constructor() {
        log('Created new instance of VisitorsDao');
    }

    async addVisitor() {
        const visitor: CreateVisitorDto = {
            id: this.visitors.length + 1,
            uid: shortid.generate(),
            numberOfVisit: 1
        };
        this.visitors.push(visitor);
        return visitor.id;
    }

    async getVisitors() {
        return this.visitors;
    }

    async getVisitorByUID(visitorUID: string) {
        return this.visitors.find(
            (visitor: { uid: string }) => visitor.uid === visitorUID
        );
    }
}

export default new VisitorsDao();