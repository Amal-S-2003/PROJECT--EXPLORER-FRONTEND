import { commonAPI } from "./commonAPI";
import { server_url } from "./serverurl";

// Register API
export const registerAPI = async (user) => {
  return await commonAPI("POST", `${server_url}/register`, user,"");
};

// Login API
export const loginAPI = async (user) => {  
  return await commonAPI("POST", `${server_url}/login`, user, "");
};

// addProjectAPI
export const addProjectAPI = async (reqBody,reqHeader) => {
  return await commonAPI("POST", `${server_url}/add-project`, reqBody, reqHeader);
};

// getHomeProject
export const getHomeProject = async () => {
  return await commonAPI("GET", `${server_url}/home-project`, "", "");
};

   
// getAllProject
export const getAllProject = async (reqHeader,searchKey) => {
  return await commonAPI("GET", `${server_url}/all-project?search=${searchKey}`, "",reqHeader );
};
// getUserProject
export const getUserProject = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/user-project`, "",reqHeader );
};


// updateProjectAPI
export const updateProjectAPI = async (id,reqBody,reqHeader) => {
  return await commonAPI("PUT", `${server_url}/projects/${id}/update`, reqBody,reqHeader );
};

// deleteProjectAPI
export const deleteProjectAPI = async (id,reqHeader) => {
  return await commonAPI("DELETE", `${server_url}/projects/${id}/delete`, {},reqHeader );
};