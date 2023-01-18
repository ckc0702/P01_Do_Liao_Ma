import { Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

import { SwiperModule } from 'swiper/angular';
import { SwiperComponent } from "swiper/angular";
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

import { trigger, state, style, animate, transition, group, query, animateChild } from '@angular/animations';
// import * as AOS from 'aos';

import {FrontDataService} from '../service/data/front-data.service'
import { Account } from '../model/account.components';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpIntercepterBasicAuthService } from '../service/http/http-intercepter-basic-auth.service';
import { Router } from '@angular/router';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-front',
  standalone: true,
  imports: [
		NgbCarouselModule, 
		NgFor, 
		FormsModule, 
		NgbRatingModule, 
		// CommonModule, 
		SwiperModule,
		MatTableModule,
	],
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations:[
	// animation triggers go here
	trigger('credTblBtnAnimation', [
		state('open', style({
			// display:'none'
		})),
		state('closed', style({
		})),
		// transition('open => closed', [
		// 	animate('1s')
		// ]),
		// transition('closed => open', [
		// 	animate('1s')
		// ])
	]),
	trigger('credTblParentAnimation', [
		state('open', style({
			
		})),
		state('closed', style({
			height:'0'
		})),
		transition('open => closed', [
			group([
				query('@credTblAnimation', animateChild()),
				// animate('.5s ease-out', style({ transform: 'translateX(-100%)' }))
				animate('1s')
			  ]),
		]),
		transition('closed => open', [
			group([
				query('@credTblAnimation', animateChild()),
				animate('1s')
			  ]),
		])
	]),
	trigger('credTblAnimation', [
		state('open', style({
			opcaity:1,
		})),
		state('closed', style({
			opacity:0,
		})),
		transition('open => closed', [
			animate('1s')
		]),
		transition('closed => open', [
			animate('1s')
		])
	])
  ]
})


export class FrontComponent implements OnInit{
	@Input() APP_TITLE: any;
	@Input() AVATAR_IMG_URL: any;
	@Input() COMMENT_AVATAR_IMG_URL: any;

	// ***CAROUSEL DATA***
  	//images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/2133/450`); //adjust image size on html
	//images = ['../assets/img/slider-img-1.jpg', '../assets/img/slider-img-2.jpg', '../assets/img/slider-img-3.jpg'];

	images = [
		{
			image: '../assets/img/slider-img-1.jpg', 
			label:'Start listing you daily todos with DoLiaoMa', 
			text:'DoLiaoMa is a free to use task management application, use DoLiaoMa to help you to list your daily tasks so that you can focus on your tasks.'
		},
		{
			image: '../assets/img/slider-img-2.jpg',
			label:'DoLiaoMa have simple interface and are easy to use',
			text:'Currently we provide 3 basic functions which you can customize your own profile, Have your own dashboard to check your daily tasks and progress, and you can create your daily tasks list.'
		},
		{
			image: '../assets/img/slider-img-3.jpg', 
			label:'Like what you see?', 
			text:'Please consider giving DoLiaoMa a 5 star. Thanks for your support!'
		}
	];

	// ***RATING DUMMY DATA***
	currentRate = 5;
	maxRate = 5;

	// ***COMMENTS DUMMY DATA***
	comments = [
		{
			imgUrl:'',
			username: 'NoobMaster69',
			review: 'This application is so good'
		},
		{
			imgUrl:'',
			username: 'Kelvin',
			review: 'This application is so so good'
		},
		{
			imgUrl:'',
			username: 'Big J',
			review: 'This application is so so so good'
		},
		{
			imgUrl:'',
			username: 'Big J',
			review: 'Kunci Ilek'
		},
		{
			imgUrl:'',
			username: 'Big J',
			review: 'So little time so much cock'
		},
		{
			imgUrl:'',
			username: 'Big J',
			review: '2 + 2 = 100 hehe cause im a island boy'
		},
	]

	constructor(
		private frontService:FrontDataService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.retrieveDemoAccounts();
	}
	
	// ***DATA SUBSCRIPTION***
	accounts!: Account[];
	dataSource:any;
	displayedColumns = ['position', 'username', 'password', 'action'];
	retrieveDemoAccounts(){
		this.frontService.retrieveAllDemoUserAccount().subscribe(
			{
			  next: (v) => 
			  {
				this.accounts = v,
				this.dataSource = new MatTableDataSource(this.accounts)
				this.dataSource.filteredData.forEach((element: any, index:any) => {
					element.password = "123456";
					element.position = index + 1;
				});
			  }
			}
		)
	}


	// ***CAROUSEL CONFIGURATIONS***
	@ViewChild('carousel', { static: true })
	carousel!: NgbCarousel;

	paused = true;
	pauseOnHover = true;
	pauseOnFocus = true;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (!slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}

	// ***SWIPER CONFIGURATIONS***
	@ViewChild('commentSwiper', { static: true })
	commentSwiper!: SwiperComponent;

	swiperConfig = {
		slidesPerView: 3,
		centeredSlides: false,
		spaceBetween: 5,
		pagination:true,
		navigation:true,
		// Responsive breakpoints
		breakpoints: {
		// when window width is >= 100px
		100: {
			slidesPerView: 1,
			spaceBetween: 5
		},
		// when window width is >= 500px
		800: {
			slidesPerView: 2,
			spaceBetween: 5
		},
		// when window width is >= 500px
		1000: {
			slidesPerView: 3,
			spaceBetween: 5
		},
		}
	}

	// ***DATA TABLE CONFIGURATIONS***
	isOpenCredTbl = true;

	toggleTable(el: HTMLElement){
		// console.log(this.isOpenCredTbl);
		this.isOpenCredTbl = !this.isOpenCredTbl;
		// el.scrollIntoView({behavior: 'smooth'});
		if(this.isOpenCredTbl == true){
			el.innerHTML = 'Hide Credentials';
		}else{
			el.innerHTML = 'View Available Credentials';
		}
	}

	
	// dataSource = [
	// 	{position: 1, username: 'Hydrogen', password: 1.0079, action: ''},
	// 	{position: 2, username: 'Helium', password: 4.0026, action: ''},
	// 	{position: 3, username: 'Lithium', password: 6.941, action: ''},
	// 	{position: 4, username: 'Beryllium', password: 9.0122, action: ''},
	// 	{position: 5, username: 'Boron', password: 10.811, action: ''},
	// 	{position: 6, username: 'Carbon', password: 12.0107, action: ''},
	// 	{position: 7, username: 'Nitrogen', password: 14.0067, action: ''},
	// 	{position: 8, username: 'Oxygen', password: 15.9994, action: ''},
	// 	{position: 9, username: 'Fluorine', password: 18.9984, action: ''},
	// 	{position: 10, username: 'Neon', password: 20.1797, action: ''},
	// ];

	useDemoCredential(el: any){
		this.router.navigate(['login'], { state: {username: el.username, password: el.password} });
	}
	
}
