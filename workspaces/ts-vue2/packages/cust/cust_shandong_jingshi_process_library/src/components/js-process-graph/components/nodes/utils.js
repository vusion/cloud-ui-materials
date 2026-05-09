import { _hasSubErrorInLogicItem } from '@/views/designer/app/views/logic/jflow-designer/components/shared/utils.js'

export function hasSubError(node) {
    if (node.isUserTask) {
        let errorType = null;
        const DestAttr = node.bindAttrs.find(t => t.name === 'destination')
        if (DestAttr && DestAttr.destination) {
            errorType = _hasSubErrorInLogicItem(DestAttr.destination);
            if (errorType && errorType === 'error') {
                return errorType;
            }
        }
        const AssigneeAttr = node.bindAttrs.find(t => t.name === 'assignee');
        if (AssigneeAttr && AssigneeAttr.assignee) {
            const Aerror = _hasSubErrorInLogicItem(AssigneeAttr.assignee);
            errorType = Aerror || errorType;
            return errorType;
        }
        return errorType;
    }
    if (node.type === 'ExclusiveGateway') {
        const logic = node.logic;
        for (let i = 0; i < logic.body.length; i++) {
            if (_hasSubErrorInLogicItem(logic.body[i])) {
                return true;
            }
        }
    }
    return false;
}