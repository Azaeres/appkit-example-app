import React from 'react';
import { testStore } from 'app/views/pages/One';
import withStore from 'views/shared/withStore';
import { hot } from 'react-hot-loader';
import { compose, pure, lifecycle } from 'recompose';
import Header from 'app/views/shared/Header';
import Navigation from 'app/views/shared/Navigation';
// import ipfsAPI from 'ipfs-api';
// console.log('> : ipfsAPI', ipfsAPI);

// var ipfsAPI = require('ipfs-api');
// console.log('> : ipfsAPI', ipfsAPI);

const config = (() => {
  const { hostname } = window.location;
  if (hostname === 'localhost') {
    return {
      host: hostname,
      port: 5001,
      protocol: 'http',
    };
  } else {
    return {
      host: hostname,
      port: 443,
      protocol: 'https',
    };
  }
})();

console.log('> : config', config);
const ipfs = (typeof window.IpfsApi === 'function' && window.IpfsApi(config)) || null;
console.log('> : ipfs', ipfs);

function Two({ value, context }) {
  return (
    <div>
      <Header title="Page Two" />
      <Navigation routerContext={context} />
      <div>{value}</div>
    </div>
  );
}

export default compose(
  hot(module),
  withStore(testStore),
  lifecycle({
    componentDidMount() {
      console.log('> componentDidMount ipfs:', ipfs);
      if (ipfs !== null) {
        console.log('> Getting id... ');
        ipfs.id((err, res) => {
          console.log('> id cb : res', res);
          console.log('> : err', err);
          if (err) throw err;
          const pkg = {
            id: res.id,
            version: res.agentVersion,
            protocol_version: res.protocolVersion,
          };
          console.log('> : pkg', pkg);
          // this.setState();
        });
      }
    },
  }),
  pure
)(Two);
