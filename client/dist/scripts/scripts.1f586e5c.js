"use strict";angular.module("app",["ngResource","ngRoute","ngSanitize","lbServices","infinite-scroll"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/legislators",{templateUrl:"views/legislator.html",controller:"LegislatorCtrl"}).when("/bills",{templateUrl:"views/bill.html",controller:"BillCtrl"}).when("/bills/:billId",{templateUrl:"views/billSingle.html",controller:"BillSingleCtrl"}).when("/legislators/:legislatorId",{templateUrl:"views/legislatorSingle.html",controller:"LegislatorSingleCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("app").controller("MainCtrl",["$scope","Bill","Legislator",function(a,b,c){a.legislators=c.count();var d={where:{chamber:"lower"}},e={where:{chamber:"upper"}};a.legislatorsFull=c.find(),a.houseCount=c.count(d),a.senateCount=c.count(e),a.bills=b.count();var f={where:{status:2}},g={where:{status:3}};a.signedBills=b.count(g),a.passedBills=b.count(f)}]),angular.module("app").controller("LegislatorCtrl",["$scope","Legislator",function(a,b){a.legislators=b.find()}]).controller("LegislatorSingleCtrl",["$scope","$routeParams","Legislator","Bill",function(a,b,c,d){var e=b.legislatorId;a.legislator=c.findById({id:e});var f={filter:{where:{openstateid:"OKB00010097"}}};a.sponsoredBills=d.find(f)}]),angular.module("app").controller("BillCtrl",["$scope","Bill",function(a,b){a.bills=b.find(),a.limitSize=10,a.moreBills=function(){a.limitSize+=50,console.log(a.limitSize)}}]).controller("BillSingleCtrl",["$scope","$routeParams","Bill",function(a,b,c){a.bill=c.findById({id:b.billId}),a.authors=c.introdby({id:b.billId})}]),function(a,b,c){var d="/api",e="authorization",f=b.module("lbServices",["ngResource"]);f.factory("User",["LoopBackResource","LoopBackAuth","$injector",function(a,b){var c=a(d+"/Users/:id",{id:"@id"},{prototype$__findById__accessTokens:{url:d+"/Users/:id/accessTokens/:fk",method:"GET"},prototype$__destroyById__accessTokens:{url:d+"/Users/:id/accessTokens/:fk",method:"DELETE"},prototype$__updateById__accessTokens:{url:d+"/Users/:id/accessTokens/:fk",method:"PUT"},prototype$__get__accessTokens:{isArray:!0,url:d+"/Users/:id/accessTokens",method:"GET"},prototype$__create__accessTokens:{url:d+"/Users/:id/accessTokens",method:"POST"},prototype$__delete__accessTokens:{url:d+"/Users/:id/accessTokens",method:"DELETE"},prototype$__count__accessTokens:{url:d+"/Users/:id/accessTokens/count",method:"GET"},create:{url:d+"/Users",method:"POST"},upsert:{url:d+"/Users",method:"PUT"},exists:{url:d+"/Users/:id/exists",method:"GET"},findById:{url:d+"/Users/:id",method:"GET"},find:{isArray:!0,url:d+"/Users",method:"GET"},findOne:{url:d+"/Users/findOne",method:"GET"},updateAll:{url:d+"/Users/update",method:"POST"},deleteById:{url:d+"/Users/:id",method:"DELETE"},count:{url:d+"/Users/count",method:"GET"},prototype$updateAttributes:{url:d+"/Users/:id",method:"PUT"},login:{params:{include:"user"},interceptor:{response:function(a){var c=a.data;return b.setUser(c.id,c.userId,c.user),b.rememberMe=a.config.params.rememberMe!==!1,b.save(),a.resource}},url:d+"/Users/login",method:"POST"},logout:{interceptor:{response:function(a){return b.clearUser(),b.clearStorage(),a.resource}},url:d+"/Users/logout",method:"POST"},confirm:{url:d+"/Users/confirm",method:"GET"},resetPassword:{url:d+"/Users/reset",method:"POST"},getCurrent:{url:d+"/Users/:id",method:"GET",params:{id:function(){var a=b.currentUserId;return null==a&&(a="__anonymous__"),a}},interceptor:{response:function(a){return b.currentUserData=a.data,a.resource}},__isGetCurrentUser__:!0}});return c.updateOrCreate=c.upsert,c.update=c.updateAll,c.destroyById=c.deleteById,c.removeById=c.deleteById,c.getCachedCurrent=function(){var a=b.currentUserData;return a?new c(a):null},c.isAuthenticated=function(){return null!=this.getCurrentId()},c.getCurrentId=function(){return b.currentUserId},c.modelName="User",c}]),f.factory("Legislator",["LoopBackResource","LoopBackAuth","$injector",function(a){var b=a(d+"/legislators/:id",{id:"@id"},{create:{url:d+"/legislators",method:"POST"},upsert:{url:d+"/legislators",method:"PUT"},exists:{url:d+"/legislators/:id/exists",method:"GET"},findById:{url:d+"/legislators/:id",method:"GET"},find:{isArray:!0,url:d+"/legislators",method:"GET"},findOne:{url:d+"/legislators/findOne",method:"GET"},updateAll:{url:d+"/legislators/update",method:"POST"},deleteById:{url:d+"/legislators/:id",method:"DELETE"},count:{url:d+"/legislators/count",method:"GET"},prototype$updateAttributes:{url:d+"/legislators/:id",method:"PUT"}});return b.updateOrCreate=b.upsert,b.update=b.updateAll,b.destroyById=b.deleteById,b.removeById=b.deleteById,b.modelName="Legislator",b}]),f.factory("Bill",["LoopBackResource","LoopBackAuth","$injector",function(a){var b=a(d+"/bills/:id",{id:"@id"},{create:{url:d+"/bills",method:"POST"},upsert:{url:d+"/bills",method:"PUT"},exists:{url:d+"/bills/:id/exists",method:"GET"},findById:{url:d+"/bills/:id",method:"GET"},find:{isArray:!0,url:d+"/bills",method:"GET"},findOne:{url:d+"/bills/findOne",method:"GET"},updateAll:{url:d+"/bills/update",method:"POST"},deleteById:{url:d+"/bills/:id",method:"DELETE"},count:{url:d+"/bills/count",method:"GET"},prototype$updateAttributes:{url:d+"/bills/:id",method:"PUT"}});return b.updateOrCreate=b.upsert,b.update=b.updateAll,b.destroyById=b.deleteById,b.removeById=b.deleteById,b.modelName="Bill",b}]),f.factory("LoopBackAuth",function(){function a(){var a=this;e.forEach(function(b){a[b]=d(b)}),this.rememberMe=c,this.currentUserData=null}function b(a,b,c){var d=f+b;null==c&&(c=""),a[d]=c}function d(a){var b=f+a;return localStorage[b]||sessionStorage[b]||null}var e=["accessTokenId","currentUserId"],f="$LoopBack$";return a.prototype.save=function(){var a=this,c=this.rememberMe?localStorage:sessionStorage;e.forEach(function(d){b(c,d,a[d])})},a.prototype.setUser=function(a,b,c){this.accessTokenId=a,this.currentUserId=b,this.currentUserData=c},a.prototype.clearUser=function(){this.accessTokenId=null,this.currentUserId=null,this.currentUserData=null},a.prototype.clearStorage=function(){e.forEach(function(a){b(sessionStorage,a,null),b(localStorage,a,null)})},new a}).config(["$httpProvider",function(a){a.interceptors.push("LoopBackAuthRequestInterceptor")}]).factory("LoopBackAuthRequestInterceptor",["$q","LoopBackAuth",function(a,b){return{request:function(f){if(f.url.substr(0,d.length)!==d)return f;if(b.accessTokenId)f.headers[e]=b.accessTokenId;else if(f.__isGetCurrentUser__){var g={body:{error:{status:401}},status:401,config:f,headers:function(){return c}};return a.reject(g)}return f||a.when(f)}}}]).provider("LoopBackResource",function(){this.setAuthHeader=function(a){e=a},this.setUrlBase=function(a){d=a},this.$get=["$resource",function(a){return function(b,c,d){var e=a(b,c,d);return e.prototype.$save=function(a,b){var c=e.upsert.call(this,{},this,a,b);return c.$promise||c},e}}]})}(window,window.angular);