# Project Name: To-do list

Your project description goes here. What problem did you solve? How did you solve it?

## Description
Duration: 2 Days Sprint

 I have done this project in 16 hours.
 Below is problems that I did solve:
    * : propblem
    - : how did I solve it

  ## Base 
  * Create a front end experience that allows a user to create a Task.
    - I create the an input field and a button in HTML file.

  * The Task should be stored inside of a database (SQL)
    - I use Postico postgres to store my database. In Postico, I create a file name weekend-to-do-app which contain all the tasks that I will add later.

  * The front end should refresh to show all tasks that need to be completed.
    - I setup the stuffs inside server-side and router. To add tasks and append the to DOM:  
        - In the client-side, I use Jquery to add and get tasks then append data from database to DOM.
        - To save data in database. Via AJAX, I create GET and POST request in server/router.

  * Task's visual representation should change on the front end. The complete option should be  'checked off'. 
    - Then I create the complete buttons for each of task. I use some CSS style to when the button is clicked => visual representation change
    - 
  * Deleting a Task should remove it both from the front end as well as the Database.
    - I create a delete button. Using DELETE request in route
        
  * Styling: Background, font family and size, text-color of Tasks (to show completed or not), background color Tasks (to show completed or not)
    - I write codes in style.css file to do this problem.


        
  ## Stretch
    * Git branching.  When we have many people working on the same project. Divide branch will be a great option that GitHub offers for us.
        - With GitHub, I have :
            `git branch BRANCH_NAME` to create new branch
            `git branch` to show branch that I am currently on
            `git branch -a` to show all available branch that have been created
            `git checkout BRANCH_NAME` to go to the branch with name BRANCH_NAME
            `git merge --no-ff BRANCH-NAME` to merge BRANCH-NAME into the current branch
            `git pull origin BRANCH-NAME` to pull down changes inside the BRANCH-NAME from the remote when I am in branch master. 
     * Working with branchs
        - To successful in working on branching. To respond to the requirements of the assignment, I create a new branch with git branch BRANCH_NAME. Then I switch to that branch to write the codes, changing codes which is I support to do in that branch. When I am done, I will add and commit what I wrote in that branch. (I also can push what I have change in that branch to GitHub with `git push origin BRANCH_NAME`). Come bach master branch where all changes of other branches will have been pull in it. I use `git pull --no-ff "BRANCH_NAME" to pull changes from the BRANCH_NAME branch into the master branch. End of all, in the master branch, I will push all of the code that I wrote up to GitHub by `git push origin master`. 


# Built With
HTML, CSS, JavaScript, Jquery,Node , database.

# Acknowledgement
Thanks to Prime Digital Academy who equipped and helped me to make this application a reality. 

# Support
If you have suggestions or issues, please email me at thyvu411@gmail.com






Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
