import { transformWithEsbuild } from "vite";
import conf from "../conf.js";
import {Client, ID, TablesDB, Storage} from "appwrite";
const sdk = require('node-appwrite');

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
    try {
        return await this.tablesDB.createRow({
            databaseId: conf.appwriteDatabaseID,
            tableId: conf.appwriteCollectionID,
            rowId: ID.unique(),
            data: {
                title,
                slug,
                content,
                featuredImage,
                status,
                userID
            }
        });
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try{
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionID,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }

            })

        }catch(error){  
            throw error;
        }
    }

    async deletePost(slug){
        try{

            return await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionID,
                rowId: slug
            });

            return true;

        }catch(error){
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }

    }

    async getPosts(slug){
        try{

            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseID,   
                tableId: conf.appwriteCollectionID ,
                      
            })

        }catch(error){
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file){

        try{
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketID,
                fileId: ID.unique(),
                file: file
            })

        }
        catch(error){
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    } 
    
    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketID,
                fileId: fileId
            })
            return true;

        }catch(error){
            console.log("Appwrite service :: deleteFile :: error", error);
             return false;
        }
    }

    async getFilePreview(fileId){
        try{   
            return await this.bucket.getFilePreview({
                bucketId: conf.appwriteBucketID,
                fileId: fileId
            });
        }
        catch(error){
        console.log("Appwrite service :: getFilePreview :: error", error);
        return null;
    }

    }
}

const service = new Service();

export default service;