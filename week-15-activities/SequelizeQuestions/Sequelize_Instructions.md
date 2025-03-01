* **Instructions:**

* Spend the next few minutes with your partner answering the following questions. You should be using the Sequelize Documentation (and whatever other references you find online).

  ```
  	- Answer: What is Sequelize?
	  ORM for Node.js

  	- Answer: What advantages does it offer?
	* Simple queries to the database.
    * Easy access to MySQL database.

  	- Answer: How do I install it? How do I incorporate it into my app?
	* npm install sequelize

  	- Answer: What the heck is a Sequelize model? What role will it play?
	* A Model represents a table in the database. Sometimes you might also see it referred to as model, or simply as factory. 

  	- Answer: Let's say I have the below table in MySQL. 

  		| Country     | PhoneCode | Capital   | IndependenceYear |
  		|-------------|-----------|-----------|------------------|
  		| Afghanistan | 93        | Kabul     | 1919             |
  		| Belarus     | 375       | Misk      | 1991             |
  		| Netherlands | 31        | Amsterdam | 1648             |
  		| Oman        | 968       | Muscat    | 1970             |
  		| Zambia      | 260       | Lusaka    | 1964             |

  		- How would I model it in Sequelize? 

		  var tableName = sequelize.define('tableName', {
			Country: {
				type: Sequelize.STRING
			},
			PhoneCode: {
				type: Sequelize.INTEGER
			},
			Capital: {
				type: Sequelize.STRING
			},
			IndependenceYear: {
				type: Sequelize.INTEGER
			}
			});

			// force: true will drop the table if it already exists
			tableName.sync({force: true}).then(() => {
			// Table created
			return tableName.create({
				Country: 'Afghanistan',
				PhoneCode: 93,
				Capital: 'Kabul',
				IndependenceYear: 1919
			});
			});

  		- How would I query for all the records where the Independence Year was less than 50 years ago?

  		- How would I query the table, order it by descending Independence Years, and limit the results to just show 2 of the records. Skipping the first two? (i.e. Results: Zambia, Afghanistan)

  	- Bonus: How do I use Sequelize to make changes to an existing table with data in it? 
