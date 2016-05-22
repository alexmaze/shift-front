import { INode } from './../../models/node.model.ts';

export class ApiService {

  /** @ngInject */
  constructor(
    private $log: angular.ILogService,
    private $http: angular.IHttpService,
    private $q: angular.IQService,
    private $timeout: angular.ITimeoutService) {
  }


  /**
   * Deploy project
   *
   * @param project
   * @return
   */
  project_deploy(project: { nodes: INode[] }): angular.IHttpPromise<{}> {
    let url = 'api/project/deploy';
    let config = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this.$http.post(url, project, config);
  }

  // /**
  //  * 获取文件信息列表
  //  *
  //  * @param path 绝对路径如/alex/video
  //  * @param recursive 是否递归返回所有文件
  //  * @param type 文件类型数组
  //  * @param searchKey 搜索关键字
  //  *
  //  * @return angular.IHttpPromise<IFile[]>
  //  */
  // getFiles(params: {
  //   path: string;
  //   recursive?: boolean;
  //   type?: string[];
  //   searchKey?: string
  // }): angular.IHttpPromise<IFile[]> {
  //   let url = host + '/files' + '?path=' + params.path;
  //   // let config = { params };
  //   return this.$http.get(url, {});
  // }

  // /**
  //  * 新增文件信息
  //  *
  //  * @param IFile
  //  * @return IFile 文件信息
  //  */
  // addFile(file: IFile): angular.IHttpPromise<IFile> {
  //   let url = host + '/file';
  //   let config = {
  //     headers: { 'Content-Type': 'application/json' }
  //   };
  //   return this.$http.post(url, file, config);
  // }

  // /**
  //  * 修改文件信息
  //  *
  //  * @param IFile
  //  * @return IFile 文件信息
  //  */
  // updateFile(file: IFile): angular.IHttpPromise<IFile> {
  //   let url = host + '/file';
  //   let config = {
  //     headers: { 'Content-Type': 'application/json' }
  //   };
  //   return this.$http.put(url, file, config);
  // }

  // /**
  //  * 删除文件信息
  //  *
  //  * @param id 文件id
  //  * @return IFile
  //  */
  // deleteFile(id: string): angular.IHttpPromise<{}> {
  //   let url = host + '/file/' + id;
  //   return this.$http.delete(url);
  // }

  // /**
  //  * 获取文件信息
  //  *
  //  * @param id 文件id
  //  * @return IFile
  //  */
  // getFile(id: string): angular.IHttpPromise<{}> {
  //   let url = host + '/file/' + id;
  //   return this.$http.delete(url);
  // }

}
