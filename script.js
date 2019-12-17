'use strict'

const pgp = require('pg-promise')({
    capSQL: true
});
const axios = require('axios');

const cn = {
    host: 'satao.db.elephantsql.com',
    port: 5432,
    database: 'fchhltfc',
    user: 'fchhltfc',
    password: 'vcyFNRGGWwzAIXdQPiTMXcEXz5nYAYLV'
};

const db = pgp(cn);

const baseUrl = 'https://jsonplaceholder.typicode.com/';

const urlify = function(relUrl){
	return baseUrl + '' + relUrl;
};


// db.any('SELECT * FROM "Users_vishal_singh"')
//     .then(function(data) {
//         // success;
//         console.log(data);
//     })
//     .catch(function(error) {
//         // error;
//     });

// axios.get(urlify('posts'))
// 	.then(function(response){
// 		console.log('posts');
// 	})
// 	.catch(function(error){
// 		console.log(error);
// 	});

// axios.get(urlify('comments'))
// 	.then(function(response){
// 		console.log('comments');
// 	})
// 	.catch(function(error){
// 		console.log(error);
// 	});

// axios.get(urlify('users'))
// 	.then(function(response){
// 		console.log('users');
// 	})
// 	.catch(function(error){
// 		console.log(error);
// 	});

// axios.get(urlify('photos'))
// 	.then(function(response){
// 		console.log('photos');
// 	})
// 	.catch(function(error){
// 		console.log(error);
// 	});

// axios.get(urlify('albums'))
// 	.then(function(response){
// 		console.log('albums');
// 	})
// 	.catch(function(error){
// 		console.log(error);
// 	});

// axios.get(urlify('todos'))
// 	.then(function(response){
// 		console.log('todos');
// 	})
// 	.catch(function(error){
// 		console.log(error);
// 	});

// User info to be handled differently from other tables

// populate Users table
const userCols = ['id', 'name', 'username', 'email', 'phone', 'website'];
const csUsers = new pgp.helpers.ColumnSet(userCols, {table: 'Users_vishal_singh'});

// populate Addresses table
const addressCols = ['userId', 'street', 'suite', 'city', 'zipcode', 'geoLat', 'geoLon'];
const csAddresses = new pgp.helpers.ColumnSet(addressCols, {table: 'Addresses_vishal_singh'});

// populate UserCompanies table
const userCompaniesCols = ['userId', 'name', 'catchPhrase', 'bs'];
const csUserCompanies = new pgp.helpers.ColumnSet(userCompaniesCols, {table: 'UserCompanies_vishal_singh'});

const populateUserInfo = function () {
	// body...

	let userRecordsToBeWritten = [];
    let addressRecordsToBeWritten =[];
    let companyRecordsToBeWritten =[];

	let getRecords = function(){


	return axios.get(urlify('users'))
	  .then(function (response) {
	    // handle success
	    let data = response.data;
	    let totalRecords = data.length;

	    

	    data.forEach(e => {
	    	let userRec = {};
	    	userCols.forEach(col => {
	    		userRec[col] = e[col];
	    	});

	    	let addressRec = {};
	    	addressCols.forEach(col => {
	    		if(col === 'userId'){
	    			addressRec[col] = e['id'];
	    			return;
	    		}
	    		if(col !== 'geoLat' && col !== 'geoLon'){
	    			addressRec[col] = e.address[col];
	    		}
	    		else if(col === 'geoLat'){
	    			addressRec[col] = e.address.geo.lat;
	    		}
	    		else{
	    			addressRec[col] = e.address.geo.lng;
	    		}
	    	});

	    	let companyRec = {};
	    	userCompaniesCols.forEach(col => {
	    		if(col === 'userId'){
	    			companyRec[col] = e['id'];
	    			return;
	    		}
	    		companyRec[col] = e.company[col];
	    	});

	    	userRecordsToBeWritten.push(userRec);
	    	addressRecordsToBeWritten.push(addressRec);
	    	companyRecordsToBeWritten.push(companyRec);
	    });

	    console.log(addressRecordsToBeWritten);
	    console.log(companyRecordsToBeWritten);
	}).catch(function (error) {
    // handle error
    	console.log(error);
	  })
	  .finally(function () {
	    // always executed
	  });


	};

	let insertUsers = function(){


		// insert users
	    const queryUsers = pgp.helpers.insert(userRecordsToBeWritten, csUsers);
	    return db.none(queryUsers)
	    .then(data => {
	        console.log('success\ndata: ' + data);
	    })
	    .catch(error => {
	        // error;
	        console.log(error);
	    });


	};

	let insertAddresses = function(){


		// insert addresses
	    const queryAddresses = pgp.helpers.insert(addressRecordsToBeWritten, csAddresses);
	    return db.none(queryAddresses)
	    .then(data => {
	        console.log('success\ndata: ' + data);
	    })
	    .catch(error => {
	        // error;
	        console.log(error);
	    });


	};
	

    let insertCompanies = function(){


    	// insert companies
	    const queryCompanies = pgp.helpers.insert(companyRecordsToBeWritten, csUserCompanies);
	    return db.none(queryCompanies)
	    .then(data => {
	        console.log('success\ndata: ' + data);
	    })
	    .catch(error => {
	        // error;
	        console.log(error);
	    });



    };

    getRecords().then(function(){
    	return insertUsers();
    }).then(function(){
    	return insertAddresses();
    }).then(function(){
    	return insertCompanies();
    })

    

  };

populateUserInfo();


// const postsCols = ['userId', 'id', 'title', 'body'];
// const todosCols = ['userId', 'id', 'title', 'completed'];
// const albumsCols = ['userId', 'id', 'title'];
// const photosCols = ['id', 'albumId', 'title', 'url', 'thumbnailUrl'];
// const commentsCols = ['postId', 'name', 'id', 'email', 'body'];


// const csPosts = new pgp.helpers.ColumnSet(postsCols, {table: 'Posts_vishal_singh'});
// const csTodos = new pgp.helpers.ColumnSet(todosCols, {table: 'Todos_vishal_singh'});
// const csAlbums = new pgp.helpers.ColumnSet(albumsCols, {table: 'Albums_vishal_singh'});
// const csPhotos = new pgp.helpers.ColumnSet(photosCols, {table: 'Photos_vishal_singh'});
// const csComments = new pgp.helpers.ColumnSet(commentsCols, {table: 'Comments_vishal_singh'});


// const populateOtherTables = function(relUrl, tableName){
// 	axios.get(relUrl)
//   .then(function (response) {
//     // handle success
//     let cs, cols;
//     let data = response.data;

//     if(tableName === 'Posts_vishal_singh'){
//     	cs = csPosts;
//     	cols = postsCols;
//     }
//     if(tableName === 'Todos_vishal_singh'){
//     	cs = csTodos;
//     	cols = todosCols;
//     }
//     if(tableName === 'Albums_vishal_singh'){
//     	cs = csAlbums;
//     	cols = albumsCols;
//     }
//     if(tableName === 'Photos_vishal_singh'){
//     	cs = csPhotos;
//     	cols = photosCols;
//     }
//     if(tableName === 'Comments_vishal_singh'){
//     	cs = csComments;
//     	cols = commentsCols;
//     }

//     recsToBeWritten = [];
//     data.forEach(e => {
//     	let rec={};
//     	cols.forEach(col => {
//     		rec[col] = e[col];
//     	});
//     });

//     // insert records
//     const query = pgp.helpers.insert(recsToBeWritten, cs);
//     db.none(query)
//     .then(data => {
//         console.log('success\ndata: ' + data);
//     })
//     .catch(error => {
//         // error;
//         console.log(error);
//     });

//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

// }

// // populate Posts table
// populateOtherTables('posts', 'Posts_vishal_singh');

// // populate Todos table
// populateOtherTables('todos', 'Todos_vishal_singh');

// // populate Albums table
// populateOtherTables('albums', 'Albums_vishal_singh');

// // populate Photos table
// populateOtherTables('photos', 'Photos_vishal_singh');

// // populate Comments table
// populateOtherTables('comments', 'Comments_vishal_singh');
