'use strict';
import { INodeType, INode, INodeInput } from './../../../models/node.model.ts';
import { IWorkScope } from './../../../models/work.scope.ts';
import * as _ from 'lodash';

declare let jsPlumb: any;

export class SketchpadController {

  public jsPlumbInstance: any;
  public model: INode[];

  /* @ngInject */
  constructor(
    private $log: angular.ILogService,
    private $scope: { $parent: IWorkScope }) {

    this.model = $scope.$parent.model;

    this.bind();

  }

  bind() {

    jsPlumb.bind('ready', () => {
      this.$log.debug('jsplumb ready');
      // 新建jsplumb实例
      var instance = jsPlumb.getInstance({
        Connector: ['Bezier', { curviness: 50 }],
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        PaintStyle: { strokeStyle: '#2EFDF6', lineWidth: 1 },
        EndpointStyle: {
          radius: 4
        },
        HoverPaintStyle: { strokeStyle: '#7073EB' },
        EndpointHoverStyle: { fillStyle: '#7073EB' },
        Container: 'sketchpad_desk'
      });
      this.jsPlumbInstance = instance;

      // 绑定
      instance.bind('connection', this.onConnectionFactory(this));

    });
  }

  onDrop(event: any, data: INodeType) {
    // this.$log.debug(event, data);

    this.model.push({
      id: 'TMP' + (new Date()).getTime(),
      type: data,
      operation: undefined,
      address: undefined,
      label: data.tertiaryLabel,
      position: {
        x: event.originalEvent.offsetX,
        y: event.originalEvent.offsetY
      },
      inputs: [],
      outputs: []
    });

  }

  onConnectionFactory(context: SketchpadController) {
    return function (conn: any, event: MouseEvent) {
      // context.$log.debug(context.model, conn);
      let source = parseEndpoint(conn.sourceEndpoint.getUuid());
      let target = parseEndpoint(conn.targetEndpoint.getUuid());
      // context.$log.debug(source, target);

      // let sourceModal = _.find(context.model, (item: INode) => { return item.id === source.id });
      let targetModal = _.find(context.model, (item: INode) => { return item.id === target.id; });
      // context.$log.debug(sourceModal, targetModal);

      /* tslint:disable */
      let targetInput = _.find(targetModal.inputs, (input: INodeInput) => { return input.port == target.portIndex; });
      // context.$log.debug(targetInput);

      targetInput.type = 'ref';
      targetInput.refId = source.id;
      targetInput.refOutputPort = source.portIndex;

      // ---------------------------------------------
      function parseEndpoint(uuid: string) {
        let uuidArr = uuid.split('-');
        return {
          id: uuidArr[0],
          portType: uuidArr[1],
          portIndex: uuidArr[2]
        };
      }
    };
  }

}
