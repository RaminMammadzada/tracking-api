
import debug from 'debug';
const log: debug.IDebugger = debug('app:visitors-dao');

class VisitorsDao {
    constructor() {
        log('Created new instance of VisitorsDao');
    }
}

export default new VisitorsDao();