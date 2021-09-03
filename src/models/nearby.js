import app from '../base';
import Workspace from './workspace';

const Nearby = {
  collection: 'nearby_locations',
  nearbyLocations: async (coinSymbol) => {
    const locations = await app.firestore()
      .collection(Nearby.collection)
      .where('coin', '==', coinSymbol)
      .get()
      .then(async (results) => {
        return await Promise.all(results.docs.map(async (doc) => {
          return {
            name: doc.id,
            workspaces: await Workspace.locationsForNearby(doc.id),
            ...doc.data()
          }
        }));
      })
      .catch((e) => {
        console.error(e)
        return []
      })

    return locations
  }
};

export default Nearby;
