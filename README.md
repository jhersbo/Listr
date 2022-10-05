# Listr
#### An application by Jack Ersbo ####
### About ###
This is an application designed originally for my partner and myself to create our weekly grocery list with. It is mobile-only for this reason, and should be viewed inside your browser's development tools with browser cookies enabled for the best experience.

##### Libraries Utilized #####
Listr's client is a Node.js application built in React.js. Listr's server is a Node.js application built in Express.js. It utilizes Sequelize ORM to communicate with the PostgreSQL database.

##### Bugs #####
When on the "make a new list" screen. Be sure to click save after you input the name of a column. Otherwise, the app will save multiple columns of the same name (value of first input).
