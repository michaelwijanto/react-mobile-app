import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mk.aora",
  projectId: "665ec96b003df5b67d3c",
  databaseId: "665eca78000c8c953b17",
  userCollectionId: "665eca890013a1a0ae29",
  videoCollectionId: "665ecb1e00368e392383",
  storageId: "665ecc77001e39e879c4",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAcc = await account.create(ID.unique(), email, password, username);

    if (!newAcc) {
      throw Error;
    }

    const avatarUrl = avatars.getInitials();

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAcc.$id,
        email,
        username,
        avatar: avatarUrl,
        password,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const sesh = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currAcc = await account.get();
    if (!currAcc) throw Error;

    const currUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currAcc.$id)]
    );
    if (!currUser) throw Error;

    return currUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
