'use strict';
import { INodeType, INode } from './../../../models/node.model.ts';
import { IWorkScope } from './../../../models/work.scope.ts';


declare let jsPlumb: any;

export class SketchpadController {

  public jsPlumbInstance: any;
  public model: INode[];

  /* @ngInject */
  constructor(
    private $log: angular.ILogService,
    private $scope: { $parent: IWorkScope }) {

    let _this = this;
    this.model = $scope.$parent.model;

    jsPlumb.bind('ready', function () {
      _this.$log.debug('jsplumb ready');

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
      _this.jsPlumbInstance = instance;

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

}
