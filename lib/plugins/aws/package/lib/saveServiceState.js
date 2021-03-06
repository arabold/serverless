'use strict';

const BbPromise = require('bluebird');
const path = require('path');
const _ = require('lodash');

module.exports = {
  saveServiceState() {
    const serviceStateFileName = this.provider.naming.getServiceStateFileName();

    const serviceStateFilePath = path.join(
      this.serverless.config.servicePath,
      '.serverless',
      serviceStateFileName
    );

    const artifact = _.last(
      _.split(
        _.get(this.serverless.service, 'package.artifact', ''), path.sep
      )
    );

    const state = {
      service: _.assign({}, _.omit(this.serverless.service, ['serverless', 'package'])),
      package: {
        individually: this.serverless.service.package.individually,
        artifactDirectoryName: this.serverless.service.package.artifactDirectoryName,
        artifact,
      },
    };

    this.serverless.utils.writeFileSync(serviceStateFilePath, state);

    return BbPromise.resolve();
  },
};
