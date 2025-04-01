import { Group, LinearLayout, Text } from '@joskii/jflow-core';

const verticalLayout = new LinearLayout({
    direction: 'vertical',
    gap: 4,
    alignment: 'start',
});

const horizontalLayout = new LinearLayout({
    direction: 'horizontal',
    gap: 4,
})
// class BranchGroup extends Group {
//     beforeRender() {
//         return true;
//     }
// }

export function createBranchGroup(branchInfo) {
    const wrapper = new Group({
        layout: horizontalLayout,
    });
    const _a = new Group({
        layout: horizontalLayout,
        backgroundColor: '#E4F1FF',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 2,
        paddingBottom: 2,
    });
    const s1 = new Text({
        fontSize: '12px',
        lineHeight: 16,
        textColor: '#3377FF',
        content: branchInfo.priority,
    })
    if(branchInfo.priority) {
        _a.addToStack(s1);
        _a.recalculate();
        wrapper.addToStack(_a);
    }
    const s2 = new Text({
        fontSize: '12px',
        lineHeight: 16,
        textColor: '#777',
        content: branchInfo.branchName,
    });
    wrapper.addToStack(s2);
    wrapper.recalculate();
    
    return {
        getNode() {
            return wrapper
        },
        setBranchInfo(branchInfo) {
            if(branchInfo.branchName !== s2.content) {
                s2.setConfig({
                    content: branchInfo.branchName
                });
                s2.preCalculateText();
            }
            if(branchInfo.priority && branchInfo.priority !== s1.content) {
                s1.setConfig({
                    content: branchInfo.priority
                });
                s1.preCalculateText();
                _a.recalculate();
            }
            wrapper.recalculate();
        }
    };
    
}
