import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

class JoblyApi {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
      
      paramsOrData._token = localStorage.getItem("_token")
  
      console.debug("API Call:", endpoint, paramsOrData, verb);
  
      try {
        return (await axios({
          method: verb,
          url: `${BASE_URL}${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData})).data;
          // axios sends query string data via the "params" key,
          // and request body data via the "data" key,
          // so the key we need depends on the HTTP verb
      }
  
      catch(err) {
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
    
    // retrieves one company by handle from backend database 
    // { handle: "", name: "", num_employees: #, description: "", logo_url, jobs: [{}]}
    static async getCompany(handle) {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    }

    // retrieves all companies in database
    // [{ handle: "", name: "", num_employees: #, description: "", logo_url }, {} ... ]
    static async getAllCompanies() {
      let res = await this.request(`companies`);
      return res.companies;
    }

    // retrieves all companies whose handle matches the query string
    // [{ handle: "", name: "", num_employees: #, description: "", logo_url }, {} ... ]
    static async searchCompanies(query) {
      let res = await this.request(`companies?search=${query}`);
      return res.companies;
    }

    // retrieves all jobs in database
    // [{ id: #, title: "", company_handle: "", salary: #, equity: float#, state: null}, {} ...]
    static async getAllJobs() {
      let res = await this.request(`jobs`);
      return res.jobs;
    }

    // retrieves one job whose title matches the query string
    // { id: #, title: "", company_handle: "", salary: #, equity: float#, state: null }
    static async searchJobs(query) {
      let res = await this.request(`jobs?search=${query}`);
      return res.jobs;
    }

    // makes post request to /login, if sucessful returns JWT 
    // { "" }
    static async userLogin(username, pwd){
      let res = await this.request("login", {
        "username": username,
        "password": pwd
      }, "post");
      return res.token;
    }

    // makes post request to /users, if successful sign up a user
    // and returns JWT {""}
    static async userSignup(username, pwd, fname, lname, email){
      let res = await this.request("users/", {
        "username": username,
        "password": pwd,
        "first_name": fname,
        "last_name": lname,
        "email": email
      }, "post");
      return res;
    }

    // makes get request to /users/:username, if sucessful returns all 
    // data about user.
    // {username, first_name, last_name, email, photo_url, jobs: [{},{}...]}
    static async getUser(username){
      let res = await this.request(`users/${username}`);
      return res.user;
    }

    //makes patch request to /users/:username with data from data form
    static async updateUser(username, data) {
      let res = await this.request(`users/${username}`, data, "patch");
      return res.user;
    }

    // makes post request to /jobs/:id/apply to apply a specific job
    static async applyJob(jobId) {
      let res = await this.request(`jobs/${jobId}/apply`, "post");
      return res.message;
    }
  }

  export default JoblyApi;