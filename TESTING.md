# CSCI3308Project
Who: Robert Belter (robbotorigami), Michael Rahn (7UR7L3), Raghav Sharma (Sharmaraghav260)

Title: CU Scheduler

Description: CU Scheduler will be a utility for planning course schedules across multiple years in order to acheive academic goals. It would allow for data on course requirements to be easily seen and utilized while determining what courses to take.

Vision Statement: To make educational goals reachable and understable

Automated Testing: All automated tests are done using django's wrapper for pythons built in unit test. See Tests.png for screenshot. Currently, tests check for base database functionality

User Acceptance Tests:  

**Use case name**
    Verify scheduler GUI  
**Description**  
    Test that user can add and arrange classes  
**Pre-conditions**  
    Site has had database updated  
**Test steps**  
    1. Navigate to scheduler page  
    2. Add a Fall term  
    3. Add a Spring term  
    4. Add a Summer term  
    5. Add a class to the Fall term  
    6. Add a class to the Spring term  
    7. Add a class to the Summer term  
    8. Rearrange the terms to be Summer, Fall, Spring  
    9. Remove all of the classes   
    10. Remove all of the terms  
**Expected result**  
    User should be able to complete all of the above tasks  
**Actual result**  
    User is unable to delete classes  
**Status (Pass/Fail)**  
    Fail  
**Notes**  
    N/A  
**Post-conditions**  
    None  
	
**Use case name**  
    Verify that admins can update class list  
**Description**  
    Test that admins can update the class list from the cu website  
**Pre-conditions**  
    site must not already have courses from the term/year to be tested  
**Test steps**  
    1. login to admin portal at /admin  
    2. Click on update classes link  
    3. Select year and term  
    4. Click run  
    5. Look at database viewer  
**Expected result**  
    User should be able to see added classes and terms  
**Actual result**  
    User is unable to perform step 2  
**Status (Pass/Fail)**  
    Fail  
**Notes**  
    N/A  
**Post-conditions**  
    None  
	
**Use case name**  
    Verify that user can save and open a schedule  
**Description**  
    Test that user is able to save a scheduler to the server, and then open the schedule  
**Pre-conditions**  
    site must not already have courses from the term/year to be tested  
**Test steps**  
    1. navigate to scheduler page  
    2. Add a fall term  
    3. Add three classes to the term  
    4. Click save  
    5. Enter a name and hit enter  
    6. Refresh the page  
    7. click load  
    8. Enter the name from 5 and hit enter  
**Expected result**  
    User should see the schedule they created  
**Actual result**  
    User is unable to perform step 4  
**Status (Pass/Fail)**  
    Fail  
**Notes**  
    N/A  
**Post-conditions**
    None
	