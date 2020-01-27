# File explanation

global.js

- Holds all the global variables and functions to manipulate the DOM

### /Data_Process
process_data.js

- Processes the Datafrom /Data/data.json and creates an array with all relevant points. It also creates the coordinates directly.

calc_cluster.js

- Creates the convex hulls from the categories and topic. Functions are getting triggerd in process_data.js

calc_density.js

- Calculates the relative density of a category or topic

### /SVG
draw_points.js

- Simply draws the points on the SVG

draw_radar.js

- Simply draws the radar rings on the SVG and holds some functions to manipulate the rings

### /Dynamic
cluster.js

- holds the function to display the clusterview

filter.js
	
- holds the function to trigger the filterview e.g user clicks on Ring "Observe in the 			Startview"

point.js

- holds the function to display the pointview where you see all the details about a technologie

points.js

- holds two functions to display all the points and if needed multiple Sides (if there are more than 45 points to display) 

search.js

- holds the general search function from the library fuse.js and all the functions for the explicit search views -> cluster,filter,points
	



In general i would say that the techradar has a lot of opportunity's to be improved. A MVC pattern would give the code more structure. I'm not sure if a Frontend Framework will work the proper way because of the situation that D3 and the Frontend Framework want to manipulate the DOM so this should be tested.
	
	


