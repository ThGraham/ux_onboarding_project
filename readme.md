# UX Intern Onboarding Project - Server
This is the server project required in order to build the [UX Intern Onboarding Project](ux_intern_onboarding_project.md)

## Dependencies
* [mongodb](https://www.mongodb.org/downloads)
* [nodejs](http://nodejs.org/download/)

## Setup
1. Download and install [mongodb](https://www.mongodb.org/downloads).
1. Start the [mongo daemon](http://docs.mongodb.org/manual/tutorial/manage-mongodb-processes/).
1. Install dependencies with `npm install`.
1. Run `node index`.


##API

### Models

### <a name="userModel"></a>User
	{
		[_id: String,]
		firstName: String,
		lastName: String,
		phone: String,
		email: String
	}
`_id` is not required when doing `PUT` and `POST`s.  The `_id` field will be ignored and the `:id` from the route will be used instead.

### Routes

#### `GET /users`

##### Responses:
`500` - There was a problem saving the user.

`200` - Array of [**User**](#userModel) models.

#### `POST /users`

##### Request body:
[**User**](#userModel) model. 

##### Responses:
`500` - There was a problem saving the user.

`200` - [**User**](#userModel) model.

#### `PUT /users/:id`

##### Params	
`:id` - User ID

##### Request body:	
[**User**](#userModel) model. Email cannot be changed.

##### Responses:
`400` - Email address cannot be changed.

`500` - There was a problem saving the user.

`200` - [**User**](#userModel) model
 