import axios from "axios";

class JoblyApi {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
      paramsOrData._token = ( // for now, hardcode token for "testuser"
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6" +
      // "InRlc3R1c2VyIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDE1N" +
      // "jQ2Nzl9.LYDHSkl81gEm7jfHv9wJhzD4ndpuBkSzBan8Nirb6UY"
      localStorage.getItem("token")
      );
  
      console.debug("API Call:", endpoint, paramsOrData, verb);
  
      try {
        return (await axios({
          method: verb,
          url: `http://localhost:3001/${endpoint}`,
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

  }

  export default JoblyApi;