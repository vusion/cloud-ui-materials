<template>
  <js-process-graph :dataSource="dataSource"></js-process-graph>
</template>

<script>
export default {
  name: 'ExamplesDemo1',
  data() {
    return {
      dataSource: [
        {
          procInstId: '26deaaac-f6ac-11f0-b2c8-22b265e40da1',
          elementList: [
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '发起',
                },
              ],
              current: false,
              completed: true,
              name: 'start',
              title: '开始222',
              type: 'InitiateTask',
              incomingFlows: ['Process_920b7d71_Start_to_InitiateTask'],
              outcomingFlows: ['sequenceFlow2'],
              completeInfos: [
                {
                  assignee: {
                    userName: 'DEVACC-vue2process',
                    displayName: 'DEVACC-vue2process',
                  },
                  completeTime: '2026-01-21 17:32:50',
                  completed: true,
                  candidates: [
                    {
                      userName: 'DEVACC-vue2process',
                      displayName: 'DEVACC-vue2process',
                    },
                  ],
                  addSignTag: null,
                },
              ],
              x: -627.2923828124987,
              y: 333.671875,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '归档',
                },
              ],
              current: false,
              completed: false,
              name: 'end',
              title: '结束',
              type: 'EndEvent',
              incomingFlows: ['sequenceFlow9'],
              outcomingFlows: [],
              completeInfos: null,
              x: 1309.4515634716663,
              y: 333.671875,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '审核审批',
                },
              ],
              current: false,
              completed: false,
              name: 'parallelGateway1',
              title: null,
              type: 'InclusiveGateway',
              incomingFlows: ['sequenceFlow3'],
              outcomingFlows: ['conditionalFlow2', 'conditionalFlow3'],
              completeInfos: null,
              x: -226.26171875,
              y: 333.671875,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '审核审批',
                },
              ],
              current: false,
              completed: false,
              name: 'parallelGateway2',
              title: null,
              type: 'InclusiveGateway',
              incomingFlows: ['conditionalFlow2'],
              outcomingFlows: ['conditionalFlow4', 'conditionalFlow5'],
              completeInfos: null,
              x: -64.24238281250003,
              y: 213.56704765955226,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '审核审批',
                },
              ],
              current: false,
              completed: false,
              name: 'approvalTask1',
              title: '审批任务1审批任务1审批任务1审批任务1审批任务1审批任务1审批任务1审批任务1审批任务1审批任务1审批任务1',
              type: 'ApprovalTask',
              incomingFlows: ['conditionalFlow3'],
              outcomingFlows: ['sequenceFlow5'],
              completeInfos: null,
              x: -64.24238281250003,
              y: 465.28222656249886,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '审核审批',
                },
              ],
              current: false,
              completed: false,
              name: 'approvalTask2',
              title: '审批任务2',
              type: 'ApprovalTask',
              incomingFlows: ['conditionalFlow4'],
              outcomingFlows: ['sequenceFlow1'],
              completeInfos: null,
              x: 128.12791249195217,
              y: 142.65612269132072,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '审核审批',
                },
              ],
              current: false,
              completed: false,
              name: 'approvalTask3',
              title: '审批任务3',
              type: 'ApprovalTask',
              incomingFlows: ['conditionalFlow5'],
              outcomingFlows: ['sequenceFlow4'],
              completeInfos: null,
              x: 128.12791249195217,
              y: 270.11217737882015,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '审核审批',
                },
              ],
              current: true,
              completed: false,
              name: 'approvalTask4',
              title: '审批任务4',
              type: 'ApprovalTask',
              incomingFlows: ['sequenceFlow2'],
              outcomingFlows: ['sequenceFlow3'],
              completeInfos: [
                {
                  assignee: null,
                  completeTime: '',
                  completed: false,
                  candidates: [
                    {
                      userName: 'DEVACC-vue2process',
                      displayName: 'DEVACC-vue2process',
                    },
                  ],
                  addSignTag: null,
                },
              ],
              x: -426.7770507812493,
              y: 333.671875,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '审核审批',
                },
              ],
              current: false,
              completed: false,
              name: 'exclusiveGateway1',
              title: null,
              type: 'ExclusiveGateway',
              incomingFlows: ['sequenceFlow1', 'sequenceFlow4', 'sequenceFlow6', 'sequenceFlow7'],
              outcomingFlows: ['conditionalFlow7'],
              completeInfos: null,
              x: 601.2197392741787,
              y: 333.671875,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '审核审批',
                },
              ],
              current: false,
              completed: false,
              name: 'exclusiveGateway2',
              title: null,
              type: 'ExclusiveGateway',
              incomingFlows: ['sequenceFlow5'],
              outcomingFlows: ['conditionalFlow1', 'conditionalFlow6'],
              completeInfos: null,
              x: 128.12791249195217,
              y: 465.28222656249886,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '审核审批',
                },
              ],
              current: false,
              completed: false,
              name: 'approvalTask5',
              title: '审批任务5',
              type: 'ApprovalTask',
              incomingFlows: ['conditionalFlow1'],
              outcomingFlows: ['sequenceFlow7'],
              completeInfos: null,
              x: 323.7519359294523,
              y: 549.3847781567667,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '审核审批',
                },
              ],
              current: false,
              completed: false,
              name: 'approvalTask6',
              title: '审批任务6',
              type: 'ApprovalTask',
              incomingFlows: ['conditionalFlow6'],
              outcomingFlows: ['sequenceFlow6'],
              completeInfos: null,
              x: 323.7519359294523,
              y: 392.3031375317684,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '合同盖章',
                },
              ],
              current: false,
              completed: false,
              name: 'approvalTask7',
              title: '审批任务7审批任务7审批任务7审批任务7审批任务7审批任务7审批任务7审批任务7审批任务7审批任务7审批任务7',
              type: 'ApprovalTask',
              incomingFlows: ['conditionalFlow7'],
              outcomingFlows: ['sequenceFlow8'],
              completeInfos: null,
              x: 835.4208994091676,
              y: 333.671875,
              width: 0,
              height: 0,
            },
            {
              extensionBindAttributes: [
                {
                  name: 'groupTitle',
                  type: 'string',
                  value: '归档',
                },
              ],
              current: false,
              completed: false,
              name: 'serviceTask1',
              title: '自动任务1',
              type: 'ServiceTask',
              incomingFlows: ['sequenceFlow8'],
              outcomingFlows: ['sequenceFlow9'],
              completeInfos: null,
              x: 1108.936231440417,
              y: 333.671875,
              width: 0,
              height: 0,
            },
          ],
          flowList: [
            {
              current: false,
              completed: false,
              name: 'conditionalFlow2',
              title: '条件流2',
              type: 'sequenceFlow',
              sourceRef: 'parallelGateway1',
              targetRef: 'parallelGateway2',
              wayPoints: [
                {
                  x: 0,
                  y: -1,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'conditionalFlow3',
              title: '条件流3',
              type: 'sequenceFlow',
              sourceRef: 'parallelGateway1',
              targetRef: 'approvalTask1',
              wayPoints: [
                {
                  x: 0,
                  y: 1,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'conditionalFlow4',
              title: '条件流4',
              type: 'sequenceFlow',
              sourceRef: 'parallelGateway2',
              targetRef: 'approvalTask2',
              wayPoints: [
                {
                  x: 0,
                  y: -1,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'conditionalFlow5',
              title: '条件流5',
              type: 'sequenceFlow',
              sourceRef: 'parallelGateway2',
              targetRef: 'approvalTask3',
              wayPoints: [
                {
                  x: 0,
                  y: 1,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: true,
              name: 'sequenceFlow2',
              title: null,
              type: 'sequenceFlow',
              sourceRef: 'start',
              targetRef: 'approvalTask4',
              wayPoints: [
                {
                  x: 1,
                  y: 0,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'sequenceFlow3',
              title: null,
              type: 'sequenceFlow',
              sourceRef: 'approvalTask4',
              targetRef: 'parallelGateway1',
              wayPoints: [
                {
                  x: 1,
                  y: 0,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'sequenceFlow1',
              title: null,
              type: 'sequenceFlow',
              sourceRef: 'approvalTask2',
              targetRef: 'exclusiveGateway1',
              wayPoints: [
                {
                  x: 1,
                  y: 0,
                },
                {
                  x: 0,
                  y: -1,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'sequenceFlow4',
              title: null,
              type: 'sequenceFlow',
              sourceRef: 'approvalTask3',
              targetRef: 'exclusiveGateway1',
              wayPoints: [
                {
                  x: 1,
                  y: 0,
                },
                {
                  x: 0,
                  y: -1,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'sequenceFlow5',
              title: null,
              type: 'sequenceFlow',
              sourceRef: 'approvalTask1',
              targetRef: 'exclusiveGateway2',
              wayPoints: [
                {
                  x: 1,
                  y: 0,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'sequenceFlow6',
              title: null,
              type: 'sequenceFlow',
              sourceRef: 'approvalTask6',
              targetRef: 'exclusiveGateway1',
              wayPoints: [
                {
                  x: 1,
                  y: 0,
                },
                {
                  x: 0,
                  y: 1,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'sequenceFlow7',
              title: null,
              type: 'sequenceFlow',
              sourceRef: 'approvalTask5',
              targetRef: 'exclusiveGateway1',
              wayPoints: [
                {
                  x: 1,
                  y: 0,
                },
                {
                  x: 0,
                  y: 1,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'sequenceFlow8',
              title: null,
              type: 'sequenceFlow',
              sourceRef: 'approvalTask7',
              targetRef: 'serviceTask1',
              wayPoints: [
                {
                  x: 1,
                  y: 0,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'sequenceFlow9',
              title: null,
              type: 'sequenceFlow',
              sourceRef: 'serviceTask1',
              targetRef: 'end',
              wayPoints: [
                {
                  x: 1,
                  y: 0,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'conditionalFlow1',
              title: '条件流1',
              type: 'sequenceFlow',
              sourceRef: 'exclusiveGateway2',
              targetRef: 'approvalTask5',
              wayPoints: [
                {
                  x: 0,
                  y: 1,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'conditionalFlow7',
              title: '条件流7',
              type: 'sequenceFlow',
              sourceRef: 'exclusiveGateway1',
              targetRef: 'approvalTask7',
              wayPoints: [
                {
                  x: 1,
                  y: 0,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
            {
              current: false,
              completed: false,
              name: 'conditionalFlow6',
              title: '条件流6',
              type: 'sequenceFlow',
              sourceRef: 'exclusiveGateway2',
              targetRef: 'approvalTask6',
              wayPoints: [
                {
                  x: 0,
                  y: -1,
                },
                {
                  x: -1,
                  y: 0,
                },
              ],
            },
          ],
          diagramBeginX: -627.2923828124987,
          diagramBeginY: -1,
          diagramWidth: 1309.4515634716663,
          diagramHeight: 549.3847781567667,
        },
      ],
    };
  }
};
</script>
