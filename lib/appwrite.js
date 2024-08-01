import { Account, Client, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mk.aora",
  projectId: "665ec96b003df5b67d3c",
  databaseId: "665eca78000c8c953b17",
  userCollectionId: "665eca890013a1a0ae29",
  videoCollectionId: "665ecb1e00368e392383",
  storageId: "665ecc77001e39e879c4",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (resp) {
      console.log(resp);
    },
    function (err) {
      console.log(err);
    }
  );
};
