import React from 'react';
import { hot } from 'react-hot-loader';
import { compose, pure, setStatic } from 'recompose';
import Header from 'app/views/shared/Header';
import delay from 'util/delay';
import idx from 'idx';
import Loader from 'views/shared/Loader';
import Navigation from 'app/views/shared/Navigation';

function Prefetch({ context, prefetchedData, previousPrefetchedData }) {
  // console.log('> Prefetch page : prefetchedData', prefetchedData);
  // console.log('> : previousPrefetchedData', previousPrefetchedData);
  return (
    <div>
      <Header title="Prefetch" />
      <Navigation routerContext={context} />
      <Loader
        value={prefetchedData}
        loading={() => {
          // Example making use of `previousPrefetchedData`;
          // We only care about it if we're loading, because that way
          // we can show that last state while we fetch the new state.
          if (previousPrefetchedData === null) {
            return <Loading />;
          } else {
            return (
              <div>
                <PrefetchedData prefetchedData={previousPrefetchedData} />
                <Loading />
              </div>
            );
          }
        }}
        error={error => <div>Error div!</div>}
      >
        {prefetchedData => {
          // This is rendered if we have our fetched data.
          return <PrefetchedData prefetchedData={prefetchedData} />;
        }}
      </Loader>
    </div>
  );
}

function PrefetchedData({ prefetchedData }) {
  const foo = idx(prefetchedData, _ => _.foo);
  return (
    <div>
      Prefetched data: <span>{foo}</span>
    </div>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

// Defining a static prefetch method makes the appkit wrap our view
// in a PromiseState HOC. That passes our view a `prefetchedData` promise state prop and a `previousPrefetchedData` prop.
// We can pass those promise states to a <Loader /> component to conveniently
// render the 3 possible states (4 possible states if you're making use of
// the `previousPrefetchedData`).
export default compose(
  hot(module),
  setStatic('prefetch', async () => {
    // console.log('> prefetch method called...');
    await delay(1500);
    return { foo: 'bar' };
  }),
  pure
)(Prefetch);
