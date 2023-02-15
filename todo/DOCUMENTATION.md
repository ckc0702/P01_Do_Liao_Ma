## ANGULAR SYNTAX ##
***Important Files***
FREQUENT EDIT -
1. style.css - add global style such as (bootstrap) /

2. route file -> app-routing.modules.ts /

3. place holder file -> app.component.html /

4. route-guard.service.ts -> control route access (allow to visit page only when user is authenticated) e.g canActivate:[RouteGuardService] (in app-routing.module) /

NORMALLY NOT TOUCHING -
1. root module -> main.ts & index.html, these run first /

2. filename.spec.ts -> unit testing specifications for each component /

3. package.json -> contain all dependencies

***HTML Syntax***
1. {{}}  -> interpolation, single way binding /

2. [()] -> banana in a box (take value from typescript, when value change in client side automatically update value in typescript),
banana in a box come from formsmodule library so need to be declare in import in app.module.ts to be used 
-> [ngModel] = "todo.targetDate" is property binding, (ngModelChange)="todo.targetDate = $event" is event binding /

3. *ngIf -> similar to laravel @if /

4. *ngFor="let todo of todos"  -> for loop similar to laravel @foreach /

5. {{todo.targetDate | date:'yyyy-MM-dd'}} -> pipe /

6. <form (ngSubmit)="todoForm.valid && saveTodo()" #todoForm="ngForm"> -> similar to laravel form posting, #todoForm act as reference for angular form and the allow conditional checking such as todoForm.valid or invalid (ensure that required field or conditional field meet condition to allow submit) - check reference for form properties : https://angular.io/guide/form-validation  e.g #due_date="ngModel" /

7. <ng-template> has no DOM counterpart, so this tag will not be included in html final result only it's content 

***TS Syntax***
1. @Injectable -> make component available to be dependency injected /

2. import {HttpClient} from '@angular/common/http' -> use to call API URL /

3. app.module.ts -> is where to control what module to import and what component to export to be use by or use others  /

4. this.service.executeHelloWorldBeanService().subscribe(); -> need to call subscribe on http rest response to get the response /

5. implements HttpInterceptor -> this allow us to modify the http request sending from all our https request C:\Users\kelvi\Projects\Spring Boot\todo-list-application\frontend\todo\src\app\service\http\http-intercepter-basic-auth.service.ts /

6. {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true} -> adding http interceptors provider /

7. .pipe -> allow to do stuff at the same time C:\Users\kelvi\Projects\Spring Boot\todo-list-application\frontend\todo\src\app\service\authentication\basic-authentication.service.ts/

***Others***
1. ts or typescript = javascript + better type syntax /

***Angular Commands***
1. Cmd to create project : ng new <proj name>

2. Cmd to run app (default localhost:4200) : ng serve - ensure inside correct proj directory (code change auto update)

3. Cmd to build a file for deployment : ng dist - will generate a dist file and can directly take the folder in dist to deployment

4. Cmd to test individual component (unit test) : ng test

5. Cmd to test whole system : ng e2e

6. Cmd to generate componenet : ng generate component <component name> or ng g c <component name>

7. Cmd to generate service : ng generate service <service name> or ng g s <service name>  - used for login/logout authentication stuff

8. Cmd to generate service in path : ng generate service <path>/<service name>

##################################################################

## SPRING BOOT SYNTAX ##
***What is REST***
1. REST - representational state transfer = HTTP request method (resources - xml, html, json)

***Shortcut Key***
1. Ctrl + 1 to choose import, create class and many recommendation
2. Right click -> source -> generate getter, setter and more
3. Ctrl + Shift + R to search file 
4. Ctrl + Shift + T to search for file generated from dependency
5. Ctrl + Shift + O to choose import type
6. Right click folder -> source -> organize import to auto add import required by each file  

***Important Syntax***
1. @RestController -> define on top of controller to let controller know what type of request will be handled /

2. @RequestMapping(method=RequestMethod.GET, path="/hello-world") -> define on top of method for GET,POST,PUT,DEL and set uri /

3. @GetMapping(path="/hello-world") -> similar to step 2 but more efficient way of writing /

4. The GET mapping is equivalent to class get method, so if using class to return value need to be aware /

5. @PathVariable String name -> in rest method parameter for query string /

6. @CrossOrigin(origins="http://localhost:4200") -> declare above controller to allow other domain to access /

7. @Service -> tell spring the class is a service, let spring boot manage  /

8. @Autowired -> basically for dependency injection, use the class without the need of getter and setter /

9. @DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id){ -> response entity allow return of nothing in response useful for delete /

10. @RequestBody Todo todo -> in rest method parameter, typically use for form save,update request in order to get input data /

11. public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id){ -> this allow api to return status that have no content 
for example returning [return ResponseEntity.notFound().build(); or return ResponseEntity.noContent().build();] /

12. public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo) { -> another type of response entity return, good for return with status 
return new ResponseEntity<Todo>(todo, HttpStatus.OK); /

13. URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(result.getId()).toUri();
return ResponseEntity.created(uri).build();  -> return response entity as a path url, useful for post request /

14. @Configuration @EnableWebSecurity -> To switch off the default web application security configuration completely or to combine multiple Spring Security components such as OAuth2 Client and Resource Server, add a bean of type SecurityFilterChain (doing so does not disable the UserDetailsService configuration or Actuator’s security /

15. @Override -> indicate that method is overriding superclass's method

16. @JsonIgnore -> indicate that to ignore the field when serializing to json, for instance manytoone relationship field need this cause json may not able to convert that field to json format /

17. fetch.type = eager vs fetch.type = lazy -> eager make the relational field to load as soon as possible, while lazy put the field on hold and when need access need to use getter or setter : FOR BETTER PERFORMANCE USE LAZY/
***Important Files***
pom.xml -> this is where we add dependency
application.properties -> similar to .env file, setting for environment password & username, db settings and such

***JWT*** https://jwt.io/
1. Token standard (header, payload, verify signature)
2. Contain user details and authorizations
3. The encoded token is depend on the algorithm
4. url/authenticate - to get token (pass body username and password) AND url/refresh - to get refreshed token (pass token bearer) : from application.properties uri

***H2 DB***
1. Settings in application.properties : 
spring.jpa.show-sql=true
spring.h2.console.enabled=true -> to view on console db info
2. Need to use @Entity to let db create table based on the entity
3. http://localhost:8080/h2-console -> to view the db, jdbc url can be check in console

##################################################################

## HOW TO RUN PROJECT ##
1. Ensure that backend is running (spring boot - localhost:8080 restful-web-services)
2. cd to project directory, then enter command <ng serve>

## RUNNING BACKEND
1. Open restful-web-services as maven project in eclipse ide
2. Right click RestfulWebServicesApplication.java file and run as java application

##################################################################

## VERSIONS ##
(12/2/2022) 
1. Angular CLI  : 15.0.4 
2. Spring Boot  : v2.6.14-SNAPSHOT  (24 Nov, 2022 release - newer version available)
3. Node JS      : v18.12.0 
4. JWT 			: v0.9.1
5. Java  		: v8 (deprecated)

##################################################################

## ANGULAR PACKAGES ##
1. ng add @ng-bootstrap/ng-bootstrap : ^14.0.0
2. ng add @angular/material : ^15.0.3
3. npm i --save ng-chartist chartist : ^7.1.1
4. "@types/jquery": "^3.5.14" -> add in dev dependencies after installing jquery
5. npm install chart.js : "^4.1.2"
6. npm i swiper : "^8.4.5"
7. npm install ng2-charts chart.js --save : "^4.1.1"
8. npm install @fullcalendar/angular @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction : "^6.0.3"
9. npm install sweetalert2 : "^11.7.0"
<!-- 7. npm install aos : "^2.3.4"
8. npm install @types/aos : "^3.0.4" -->

##################################################################

##################################################################

## SPRING BOOT PACKAGES ##
1.  web
2.  devtools
3. jpa
4. sql
5. h2
6. db
7. security (manually add in pom.xml)
8. jjwt (manually add in pom.xml)
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
	<groupId>io.jsonwebtoken</groupId>
	<artifactId>jjwt</artifactId>
	<version>0.9.1</version>
</dependency>
9. dto 
<!-- For dto, manually add or add during spring.io -->
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
	<scope>provided</scope>
</dependency>
		
##################################################################

## ENVIRONMENT CONFIGURATION ##
1. Frontend
> Download visual studio code
> Install node js
> Check with cmd : node -v and npm -v
> Cmd to install angular : npm install -g @angular/cli or npm install -g @angular/cli@<version>
> Cmd to check angular version : ng version

2. Backend
> Go to link https://start.spring.io/
> Generate a maven project - maven proj, spring boot version >2.0.0 (snapshot), jar packaging, dependencies = web, devtools, jpa sql, h2 db
> Download eclipse and import generated proj 
> File > import > existing maven projects

##################################################################

## EXTRA LEARNING SPRING BOOT ##
https://www.bezkoder.com/spring-boot-security-login-jwt/ - to learn more about jwt login
https://docs.spring.io/spring-data/jpa/docs/current/reference/html/ - to learn more about repository (jpa, CRUD, and etc)
https://www.baeldung.com/jsf-spring-boot-controller-service-dao - to learn more about DAO (data acess object)
https://medium.com/uphill-engineering-design/deep-dive-into-mapstruct-spring-7ddd8dac3d6d - to learn more about DTO mapping

1. JDBC, JDBC template vs JPA vs Hibernate
-> JDBC-Template is an enhancement of JDBC for more simplify quey mapping 
-> b4 jpa spring boot uses JDBC for database connection, Java Database Connectivity
-> Hibernate is basically the implementation of JPA, JPA allow others ORM (object relational mapping, but hibernate cannot)
-> We use JPA or Hibernate to reduce query, for easier to maintain and easy to write 

2. Restcontroller vs Controller
https://stackoverflow.com/questions/25242321/difference-between-spring-controller-and-restcontroller-annotation - to learn more about differences of @controller and @restcontroller
-> Basically restcontroller provide default response body to all method so dont need to declare @requestbody on each method
-> But restcontroller can only return data body and cannot return view, so it is best use with frontend application that can process data to view. 

3. What is ORM (Object Relational Mapping)
-> ORM is a technique for converting data between Java objects and relational databases (table)
-> Hibernate is one of the most popular ORM

4. DTO (Data Transfer Object)
https://www.javaguides.net/2022/12/spring-boot-dto-example-tutorial.html
-> A service that store only require data to transfer to client side and able to send only require info to server side
-> e.g i need to get data from 3 entity but only part of data for each entity, we use this so that i do not need to call 3 time from client side and retrieve whole entity data
-> basically to reduce number of call to api
## EXTRA LEARNING ANGULAR ##

##################################################################

## SOME ANGULAR DEPENDENCY LIBRARIES DOCUMENTATION ##
> Full Calendar - https://fullcalendar.io/docs/event-object 

##################################################################

## APPLICATION TEST CASE ##
> Responsive (Take into account of mostly web resolution, not supporting mobile resolution)
768x1024		
768x1280		
800x480		
800x400		
800x1280		
860x540		
960x640		
1024x600		
1024x768		
1136x640		
1280x720		
1280x800		
1334x750		
1920x1080		
2048x1536		

## NEXT VERSION : 1 ##
1. add profile 
2. arrange components files
3. arrange backend mvc files