//Global Variable Declaration
const test = require("../../index")
const request = require("supertest")
const {BASE_PRODUCTS_ENDPOINT, BASE_STAFF_ENDPOINT, BASE_USER_ENDPOINT} = require("../../config/endpoints")
let mainServer;


describe("/api/users", () => {
    beforeEach(() => {test})

    afterEach(() => {test.close()})


    describe("/POST", () => {
        it("should sign up a new users when correct data is passed through", () => {
            request(mainServer).post(`${BASE_USER_ENDPOINT}/signup`)
            .send({email: "ashgrif567@gmail.com", password: "testerpass45"})
            .expect(200)

      
        })
//      
       it("should send error message if user passes in incorrect email or password schema with joi (email: less than 8 characters)", () => {
            request(mainServer).post(`${BASE_USER_ENDPOINT}/signup`)
            .send({email: "juewell132", password: 123345})
       })
    })

    // //Get Requests
    // describe("/GET", () => {
    //     //DESCRIBE ALL THE GET TESTS
    // })

})
