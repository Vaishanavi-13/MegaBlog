import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage } from "appwrite";

class Service {
  client = new Client();
  tablesDB;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);

    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    return await this.tablesDB.createRow({
      databaseId: conf.appwriteDatabaseID,
      tableId: conf.appwriteCollectionID,
      rowId: ID.unique(),
      data: { title, slug, content, featuredImage, status, userID }
    });
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    return await this.tablesDB.updateRow({
      databaseId: conf.appwriteDatabaseID,
      tableId: conf.appwriteCollectionID,
      rowId: slug,
      data: { title, content, featuredImage, status }
    });
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseID,
        tableId: conf.appwriteCollectionID,
        rowId: slug
      });
      return true;
    } catch (error) {
      console.log("deletePost error", error);
      return false;
    }
  }

  async getPosts() {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseID,
        tableId: conf.appwriteCollectionID
      });
    } catch (error) {
      console.log("getPosts error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketID,
        fileId: ID.unique(),
        file
      });
    } catch (error) {
      console.log("uploadFile error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketID,
        fileId
      });
      return true;
    } catch (error) {
      console.log("deleteFile error", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview({
        bucketId: conf.appwriteBucketID,
        fileId
      });
    } catch (error) {
      console.log("getFilePreview error", error);
      return null;
    }
  }
}

export default new Service();