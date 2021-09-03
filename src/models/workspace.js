import app from '../base';

const CLOUD_FUNCTION_API = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
  'http://localhost:5001/denizen-3e818/us-central1' :
  'https://us-central1-denizen-3e818.cloudfunctions.net'

const Workspace = {
  collection: 'workspaces',
  locationsForNearby: async (nearbyName) => {
    const workspaces = await app.firestore()
      .collection(Workspace.collection)
      .where('nearby', '==', nearbyName)
      .get()
      .then((results) => {
        return results.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
      })
      .catch((e) => {
        console.log(e)
        return []
      })

    return workspaces
  },
  getAll: async () => {
    const workspaces = await app.firestore()
      .collection(Workspace.collection)
      .get()
      .then((results) => {
        return results.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
      })

    return workspaces
  },
  getById: async (docId) => {
    const workspace = await app.firestore()
      .collection(Workspace.collection)
      .doc(docId)
      .get()
      .then((doc) => {
        return { id: doc.id, ...doc.data() }
      })

    return workspace
  },
  accessWorkspace: async (workspaceId, walletAddr) => {
    const response = await fetch(`${CLOUD_FUNCTION_API}/authWorkspace`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ workspaceId, walletAddr }),
    }).then((res) => res.json())
      .then((res) => res)
      .catch((e) => {
        console.error(e)
        return null
      })

    return response
  }
};

export default Workspace;
