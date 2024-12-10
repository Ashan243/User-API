
const {addition} = require("../test/unit/calculator")
const {message} = require("../test/unit/messaging")
const {dayOfTheWeek} = require("../test/arraytest")
const {postData, deleteData} = require("../test/object")
const { describe, default: test } = require("node:test")
const {maths} = require("../test/unit/maths")
const {lotsize} = require("../test/unit/lotsize")

//JEST = function test name our test and write code

// test("Number Type JavaScipt Test", () => {
//     //What the test is going about
//     throw new Error("Error!")
// })
describe("Calculator Function Test", () => {
    //Describe Function holds a group of tests
    //it a single test within the group tests

    test("Non-Negative value test - if any of the arguments are negative then the function should return 0 or the 2 arguments should return a positive number", () => {

        const expectedAnswer = addition(2, 10)

        //Assertion - expect function takes the value of result 
                // toBe method askes for the value you expect
        expect(expectedAnswer).toBe(12)

    })


test("Negative value test - if any of the arguments are negative -1 will be returned", () =>{

    const expectedAnswer =  addition(-4, 5)

    expect(expectedAnswer).toBe(-1)

})
})


describe("String Tests", () => {
    test("User name and message will be returned to screen", () =>{

        const expectedAnswer = message("Ashan", "Hello World...")
    
        expect(expectedAnswer).toBe("Hello Ashan, here is your custom message: Hello World...")
    })
    
    
    test("Politeness Test", () =>{
    
        const expectedAnswer = message("Ashan", "Cool...")
        expect(expectedAnswer).toMatch(/Hello/)
    })
    
    
    
    test("Options for the day of the week ranging from mon-sun", () =>{
    
        //Fixed Array/Enum
        const expectedAnswer = dayOfTheWeek() //["MON", "Tues"...."Sun"]
        expect(expectedAnswer[0]).toBe("mon") //Expecting to be a value based on index
        expect(expectedAnswer).toContain("sun") //looking for a value
    
        //Checking the contains of our array,
        const array = ["mon", "tue", "wed", "thurs", "fri", "sat", "sun"]
        expect(expectedAnswer).toEqual(expect.arrayContaining(array))
    
    
    })
})

//Object and Function test

describe('arrayContaining', () => {
    const expected = ['Alice', 'Bob'];
    it('matches even if received contains additional elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
    });
    it('does not match if received does not contain expected elements', () => {
      expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
    });
  });

test("function test", () =>{

    const expectedAnswer = postData(47)
    expect(expectedAnswer).toStrictEqual({name: "Juewell", email: "j123@hotmail.com", id: 47})
    

})

test("Options for the day of the week ranging from mon-sun", () =>{
    
    //Fixed Array/Enum
    const expectedAnswer = dayOfTheWeek() //["MON", "Tues"...."Sun"]
    expect(expectedAnswer[0]).toBe("mon") //Expecting to be a value based on index
    expect(expectedAnswer).toContain("sun") //looking for a value

    //Checking the contains of our array,
    const array = ["mon", "tue", "wed", "thurs", "fri", "sat", "sun"]
    expect(expectedAnswer).toEqual(expect.arrayContaining(array))


})

describe("fuctionality test", () =>{

        test("function test", () =>{

            const expectedAnswer = postData(47)
            expect(expectedAnswer).toStrictEqual({name: "Juewell", email: "j123@hotmail.com", id: 47})

        })


        //NULL - Checking for falsy values 
        //[null, undefined, "", 0, false, NaN]
        //NaN - Not a Nuber - Testing Schema Fields 
        test("Error Testing",  () => {
                const cb = () => deleteData(null).toThrow()
                expect(cb)
                //Describing a process to happen rather than a value means we use a FUNCTION
                //Describe the condition that will throw the expected the error
            })


})//End of Describe

test("Timestamp", () => {
    
    const expectedValue = deleteData(43)
    expect(expectedValue).toMatchObject({id: 43}) //Contains our ID of arg value means that no expection was thrown 
    //Timestamps cant calculated or expected in a test 

    //Alternative
    const EstTime = 0
    expect(expectedValue.timeStamp).toBeGreaterThan(0)
})



describe("maths check", () =>{

    test("Testing two positive numbers to see the values multiplied or added together", () => {

        const expectedValue = maths(4, 6)
        expect(expectedValue).toBe(24)
    })


    test("Testing two negative numbers whem values are multiplied or added"), () =>{

        const expectedValue = maths(-2, -3)
        expect(expectedValue).toBe(-5)
    }

    test("Testing a negative and a positive number when multiplied or added together", () => {

        const expectedValue = maths(4, -2)
        expect(expectedValue).toBe(2)
    })

    test("Testing zero with a positive number with multiplication or addition", () =>{

        const expectedValue = maths(0, 3)
        expect(expectedValue).toBe(3)
    })

    test("Testing zero with zero with multiplication or addition", () =>{

        const expectedValue = maths(0, 0)
        expect(expectedValue).toBe(0)
    })
})



// describe("Trading Functions", () =>{

//     test("Testing non-zero balance and risk percentage between 1-5", () =>{

//         const expectedValue = lotsize(100, 3)
//         expect(expectedValue).toBeCloseTo(0.03)
//         //If we have a recurring value instead of to be we use toBeCloseTo
//     })

//     // test("Testing 0 balance with max risk", () =>{

//     //     const expectedValue = lotsize(0, 5)
//     //     expect(expectedValue).toBe(0)
//     // })
// })



